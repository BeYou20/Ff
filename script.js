// هذا الملف يقوم بتحميل باقي الملفات ديناميكياً
// لضمان عمل الكود بشكل صحيح دون تغيير في صفحات الـ HTML

// قم بإنشاء و تحميل ملف data.js أولاً
const dataScript = document.createElement('script');
dataScript.src = 'data.js';
document.head.appendChild(dataScript);

// عند اكتمال تحميل data.js، قم بتحميل app.js
dataScript.onload = () => {
    const appScript = document.createElement('script');
    appScript.src = 'app.js';
    document.head.appendChild(appScript);
};
