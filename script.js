// Function to get the course ID from the URL
function getCourseIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// Function to find course data by ID
function findCourseById(id) {
  return courses.find(course => course.id === id);
}

// Function to populate the page with course data
function populatePage(course) {
  // Update the page title
  document.getElementById('page-title').textContent = course.title.replace(/<[^>]*>?/gm, '');

  // Update Hero section
  document.getElementById('hero-title').innerHTML = course.title;
  document.getElementById('hero-description').textContent = course.description;
  
  // Update Marquee
  document.getElementById('marquee-text').textContent = course.marquee;

  // Update Course About
  document.getElementById('course-about').textContent = course.description;

  // Update Objectives list
  const objectivesList = document.getElementById('objectives-list');
  objectivesList.innerHTML = ''; // Clear previous content
  course.objectives.forEach(obj => {
    const li = document.createElement('li');
    li.innerHTML = `<i class="fas fa-bullseye"></i> ${obj}`;
    objectivesList.appendChild(li);
  });

  // Update Axes list
  const axesList = document.getElementById('axes-list');
  axesList.innerHTML = ''; // Clear previous content
  course.axes.forEach(axis => {
    const li = document.createElement('li');
    li.innerHTML = `<i class="fas fa-calendar-alt"></i> ${axis}`;
    axesList.appendChild(li);
  });
  
  // Update Achievements text
  document.getElementById('achievements-text').innerHTML = course.achievements;

  // Update hidden form field
  const courseNameInput = document.getElementById('course-name-input');
  if (courseNameInput) {
    courseNameInput.value = course.title.replace(/<[^>]*>?/gm, '').trim();
  }

  // Populate Instructors Slider
  const instructorsSlider = document.getElementById('instructors-slider');
  const instructorDotsContainer = instructorsSlider.querySelector('.instructor-dots');
  instructorsSlider.querySelectorAll('.instructor-slide').forEach(slide => slide.remove());
  
  course.instructors.forEach((instructor, index) => {
      const slideDiv = document.createElement('div');
      slideDiv.classList.add('instructor-slide');
      if (index === 0) slideDiv.classList.add('active');
      slideDiv.innerHTML = `
          <div class="instructor-card">
              <img src="https://i.ibb.co/L519VjL/certificate.png" alt="صورة المدرب">
              <h4>${instructor.name}</h4>
              <p>${instructor.expertise}</p>
          </div>
      `;
      instructorsSlider.insertBefore(slideDiv, instructorDotsContainer);
  });

  // Populate Testimonials Slider
  const testimonialsSlider = document.getElementById('testimonials-slider');
  const testimonialDotsContainer = testimonialsSlider.querySelector('.testimonial-dots');
  testimonialsSlider.querySelectorAll('.testimonial-slide').forEach(slide => slide.remove());

  course.testimonials.forEach((testimonial, index) => {
    const slideDiv = document.createElement('div');
    slideDiv.classList.add('testimonial-slide');
    if (index === 0) slideDiv.classList.add('active');
    slideDiv.innerHTML = `
      <p class="testimonial-text">"${testimonial.text}"</p>
      <p>– ${testimonial.name}</p>
    `;
    testimonialsSlider.insertBefore(slideDiv, testimonialDotsContainer);
  });
  
  // Populate FAQ section
  const faqContainer = document.getElementById('faq-container');
  faqContainer.innerHTML = ''; // Clear previous content
  course.faq.forEach(item => {
    const faqItem = document.createElement('div');
    faqItem.classList.add('faq-item');
    faqItem.innerHTML = `
      <div class="faq-question">${item.question} <i class="fas fa-chevron-down"></i></div>
      <div class="faq-answer">${item.answer}</div>
    `;
    faqContainer.appendChild(faqItem);
  });
  
  // Re-initialize dynamic scripts
  AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  initSliders();
  initFaqToggle();
}

// Sliders and FAQ functions (from previous code, updated for dynamic content)
function initSliders() {
    const testimonialSlides = document.querySelectorAll('#testimonials-slider .testimonial-slide');
    const testimonialDotsContainer = document.querySelector('#testimonials-slider .testimonial-dots');
    let currentTestimonial = 0;
    
    // Clear previous interval if it exists
    if (window.testimonialInterval) clearInterval(window.testimonialInterval);

    function nextTestimonial() {
      testimonialSlides[currentTestimonial].classList.remove('active');
      currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
      testimonialSlides[currentTestimonial].classList.add('active');
      updateTestimonialDots();
    }
    
    function updateTestimonialDots() {
      testimonialDotsContainer.innerHTML = '';
      testimonialSlides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === currentTestimonial) dot.classList.add('active');
        dot.addEventListener('click', () => {
          clearInterval(window.testimonialInterval);
          testimonialSlides[currentTestimonial].classList.remove('active');
          currentTestimonial = i;
          testimonialSlides[currentTestimonial].classList.add('active');
          updateTestimonialDots();
          window.testimonialInterval = setInterval(nextTestimonial, 4000);
        });
        testimonialDotsContainer.appendChild(dot);
      });
    }
    if (testimonialSlides.length > 0) {
        updateTestimonialDots();
        window.testimonialInterval = setInterval(nextTestimonial, 4000);
    }
  
    const instructorSlides = document.querySelectorAll('#instructors-slider .instructor-slide');
    const instructorDotsContainer = document.querySelector('#instructors-slider .instructor-dots');
    let currentInstructor = 0;
    if (window.instructorInterval) clearInterval(window.instructorInterval);
    
    function nextInstructor() {
        instructorSlides[currentInstructor].classList.remove('active');
        currentInstructor = (currentInstructor + 1) % instructorSlides.length;
        instructorSlides[currentInstructor].classList.add('active');
        updateInstructorDots();
    }
    
    function updateInstructorDots() {
      instructorDotsContainer.innerHTML = '';
      instructorSlides.forEach((_, i) => {
          const dot = document.createElement('span');
          dot.classList.add('dot');
          if (i === currentInstructor) dot.classList.add('active');
          dot.addEventListener('click', () => {
              clearInterval(window.instructorInterval);
              instructorSlides[currentInstructor].classList.remove('active');
              currentInstructor = i;
              instructorSlides[currentInstructor].classList.add('active');
              updateInstructorDots();
              window.instructorInterval = setInterval(nextInstructor, 5000);
          });
          instructorDotsContainer.appendChild(dot);
      });
    }
    if (instructorSlides.length > 0) {
        updateInstructorDots();
        window.instructorInterval = setInterval(nextInstructor, 5000);
    }
}

function initFaqToggle() {
    document.querySelectorAll('.faq-question').forEach(q => q.addEventListener('click', ()=>{
        const parentItem = q.closest('.faq-item');
        const answer = parentItem.querySelector('.faq-answer');
        const isVisible = answer.style.display === 'block';
    
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.style.display = 'none';
            ans.closest('.faq-item').querySelector('.faq-question').classList.remove('active');
        });
    
        if (!isVisible) {
          answer.style.display = 'block';
          q.classList.add('active');
        }
      }));
}


// Main function to run on page load
document.addEventListener('DOMContentLoaded', () => {
  const courseId = getCourseIdFromUrl();
  const courseData = findCourseById(courseId);

  if (courseData) {
    populatePage(courseData);
  } else {
    // Handle case where course is not found
    document.body.innerHTML = '<h1>عفواً، لم يتم العثور على الدورة المطلوبة.</h1><p>يرجى التأكد من الرابط والمحاولة مرة أخرى.</p>';
  }

  // Form submission and sticky button logic
  const stickyRegisterBtn = document.querySelector('.sticky-register-btn');
  const stickyWhatsappBtn = document.querySelector('.sticky-whatsapp-btn');
  const footer = document.querySelector('footer');

  window.addEventListener('scroll', ()=>{ 
    const isAtBottom = window.innerHeight + window.scrollY >= footer.offsetTop - 50;
    if (window.scrollY > 300 && !isAtBottom) {
        stickyRegisterBtn.classList.remove('hidden');
        stickyWhatsappBtn.classList.remove('hidden');
        stickyRegisterBtn.style.display = 'block';
    } else {
        stickyRegisterBtn.classList.add('hidden');
        stickyWhatsappBtn.classList.add('hidden');
    }
  });

  const scriptURL = 'https://script.google.com/macros/s/AKfycbztWgyn56xZxcgj3S9TVLnR47CfEFluzCX8q-VDL3THa-NCZCBsyEm9Hk2UyjyV39DMuw/exec';
  const form = document.forms['form'];
  const submitButton = form.querySelector('button[type="submit"]');
  let formDataStored = {};

  window.submitForm = function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const phoneInput = form.querySelector('input[name="phone"]');
    formData.set('phone', phoneInput.value.replace(/\s/g, ''));
    
    for (let [key, value] of formData.entries()) {
        formDataStored[key] = value;
    }
    
    submitButton.disabled = true;
    submitButton.textContent = 'جاري الإرسال...';
    
    fetch(scriptURL, { method: 'POST', body: formData})
      .then(response => {
        const message = generateWhatsAppMessage(formDataStored);
        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/967778185189?text=${encodedMessage}`;
        window.location.href = whatsappLink;
      })
      .catch(error => {
        alert('حدث خطأ أثناء الإرسال. حاول مرة أخرى.');
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'إرسال البيانات';
      });
  }

  function generateWhatsAppMessage(data) {
    const courseTitle = document.getElementById('page-title').textContent;
    return `السلام عليكم، تم التسجيل في دورة "${courseTitle}".
الاسم: ${data.name}
الجنس: ${data.gender}
العمر: ${data.age}
البلد: ${data.country}
رقم الهاتف: ${data.phone}
رابط التيليجرام: ${data.Telegram}
أرجو إتمام التسجيل في الدورة.`;
  }
});


