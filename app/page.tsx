'use client'

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { INITIAL_COURSES } from './config';
import { submitEnrollment } from './actions';

export default function EnrollmentForm() {
  const [courses] = useState(INITIAL_COURSES);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle Checkbox Logic
  const handleCourseChange = (courseId: string) => {
    setSelectedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  // Auto-Calculate Total Price
  const totalPrice = useMemo(() => {
    const baseTotal = courses
      .filter(c => selectedCourses.includes(c.id))
      .reduce((sum, c) => sum + c.price, 0);

    return Math.max(0, baseTotal - discount);
  }, [courses, selectedCourses, discount]);

  // Promo Code Logic
  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'DISCOUNT500') {
      setDiscount(500);
      alert('Promo Code Applied: 500 OFF');
    } else {
      setDiscount(0);
      alert('Invalid Promo Code');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    // Append calculated price specifically
    formData.append('totalPrice', totalPrice.toString());

    const result = await submitEnrollment(formData);
    alert(result.message);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto my-10 relative">
      {/* Glow Effect behind the card */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange via-brand-pink to-brand-cyan rounded-2xl blur opacity-25"></div>

      <div className="relative bg-slate-900 shadow-2xl rounded-2xl overflow-hidden border border-slate-800">

        {/* Top Gradient Bar */}
        <div className="h-2 bg-gradient-to-r from-brand-orange via-brand-pink to-brand-cyan"></div>

        <div className="p-8 md:p-12">

          {/* Logo & Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo.png"
                alt="Institute Logo"
                width={160}
                height={160}
                priority
                className="object-contain drop-shadow-[0_0_15px_rgba(0,194,255,0.3)]"
              />
            </div>
            <h1 className="text-4xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Digital Skills Registration
            </h1>
            <p className="text-slate-400 text-lg">
              Learn Digital Skills By Sitting at Your Home. <span className="text-brand-cyan font-medium">"Skills Pay The Bills"</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Personal Information */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-brand-orange flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-300">Full Name *</label>
                  <input required name="name" type="text" placeholder="e.g. Ali Khan" className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-brand-cyan focus:border-transparent outline-none transition-all" />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-300">Email (Gmail Only)</label>
                  <input name="email" type="email" placeholder="example@gmail.com" className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-brand-cyan focus:border-transparent outline-none transition-all" />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-300">WhatsApp Number *</label>
                  <input required name="whatsapp" type="text" placeholder="+92 300 1234567" className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-brand-cyan focus:border-transparent outline-none transition-all" />
                  <p className="text-xs text-slate-500 text-right font-urdu mt-1">براہ کرم اپنا واٹس ایپ نمبر درج کریں</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-300">City *</label>
                  <input required name="city" type="text" placeholder="e.g. Lahore" className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-brand-cyan focus:border-transparent outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Gender *</label>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative flex items-center">
                      <input type="radio" name="gender" value="Male" className="peer sr-only" required />
                      <div className="w-5 h-5 border-2 border-slate-600 rounded-full peer-checked:border-brand-cyan peer-checked:bg-brand-cyan transition-all"></div>
                    </div>
                    <span className="ml-2 text-slate-300 group-hover:text-white transition-colors">Male</span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative flex items-center">
                      <input type="radio" name="gender" value="Female" className="peer sr-only" required />
                      <div className="w-5 h-5 border-2 border-slate-600 rounded-full peer-checked:border-brand-pink peer-checked:bg-brand-pink transition-all"></div>
                    </div>
                    <span className="ml-2 text-slate-300 group-hover:text-white transition-colors">Female</span>
                  </label>
                </div>
              </div>
            </section>

            {/* Course Selection */}
            <section className="space-y-4 pt-4 border-t border-slate-800">
              <h2 className="text-xl font-semibold text-brand-cyan flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                Select Courses <span className="text-sm font-normal text-slate-500 ml-2">(Multiple Allowed)</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {courses.map(course => (
                  <label key={course.id} className={`relative flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer group ${selectedCourses.includes(course.id)
                    ? 'bg-slate-800/80 border-brand-cyan shadow-[0_0_15px_rgba(0,194,255,0.1)]'
                    : 'bg-slate-800/40 border-slate-700 hover:border-slate-500'
                    }`}>
                    <input
                      type="checkbox"
                      name="courses"
                      value={course.id}
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => handleCourseChange(course.id)}
                      className="peer sr-only"
                    />
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center mr-3 transition-colors ${selectedCourses.includes(course.id) ? 'bg-brand-cyan border-brand-cyan' : 'border-slate-500'
                      }`}>
                      {selectedCourses.includes(course.id) && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium transition-colors ${selectedCourses.includes(course.id) ? 'text-white' : 'text-slate-300'}`}>{course.name}</h3>
                      <p className="text-brand-cyan font-bold text-sm">{course.price.toLocaleString()} PKR</p>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {/* Total Fee & Promo */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 space-y-4 shadow-inner">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium text-slate-400">Total Fee</h3>
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-blue-500">
                    {totalPrice.toLocaleString()} PKR
                  </div>
                </div>

                <div className="flex w-full md:w-auto gap-2">
                  <input
                    type="text"
                    name="promoCode"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter Promo Code"
                    className="flex-1 md:w-48 p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-brand-cyan outline-none uppercase tracking-wider"
                  />
                  <button type="button" onClick={applyPromo} className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Attendance Commitment */}
            <section className="space-y-4 pt-4 border-t border-slate-800">
              <h2 className="text-xl font-semibold text-brand-pink flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                Attendance Commitment
              </h2>
              <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50">
                <p className="text-slate-300 mb-3">Will you attend daily online classes (via Zoom/Meet) and mark attendance in the WhatsApp group?</p>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative flex items-center">
                      <input type="radio" name="attendance" value="Yes" className="peer sr-only" required />
                      <div className="w-5 h-5 border-2 border-slate-600 rounded-full peer-checked:border-brand-pink peer-checked:bg-brand-pink transition-all"></div>
                    </div>
                    <span className="ml-2 text-slate-300 group-hover:text-white transition-colors">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative flex items-center">
                      <input type="radio" name="attendance" value="No" className="peer sr-only" required />
                      <div className="w-5 h-5 border-2 border-slate-600 rounded-full peer-checked:border-red-500 peer-checked:bg-red-500 transition-all"></div>
                    </div>
                    <span className="ml-2 text-slate-300 group-hover:text-white transition-colors">No</span>
                  </label>
                </div>
              </div>
            </section>

            {/* Admission Manager */}
            <section className="space-y-4 pt-4 border-t border-slate-800">
              <h2 className="text-xl font-semibold text-brand-orange flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                Admission Manager Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Select Admission Manager *</label>
                  <div className="relative">
                    <select required name="manager" className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white appearance-none focus:ring-2 focus:ring-brand-orange outline-none">
                      <option value="" disabled selected>Select Manager</option>
                      <option value="Manager 1">Admission Manager 1</option>
                      <option value="Manager 2">Admission Manager 2</option>
                      <option value="Manager 3">Admission Manager 3</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-300">Did you save the admission manager's number?</label>
                  <div className="flex gap-6">
                    <label className="flex items-center cursor-pointer group">
                      <div className="relative flex items-center">
                        <input type="radio" name="numberSaved" value="Yes" className="peer sr-only" required />
                        <div className="w-5 h-5 border-2 border-slate-600 rounded-full peer-checked:border-green-500 peer-checked:bg-green-500 transition-all"></div>
                      </div>
                      <span className="ml-2 text-slate-300 group-hover:text-white transition-colors">Yes, Saved</span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <div className="relative flex items-center">
                        <input type="radio" name="numberSaved" value="No" className="peer sr-only" required />
                        <div className="w-5 h-5 border-2 border-slate-600 rounded-full peer-checked:border-red-500 peer-checked:bg-red-500 transition-all"></div>
                      </div>
                      <span className="ml-2 text-slate-300 group-hover:text-white transition-colors">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Upload */}
            <div className="pt-4">
              <div className="border-2 border-dashed border-slate-700 bg-slate-800/30 p-8 text-center rounded-xl hover:border-brand-cyan hover:bg-slate-800/50 transition-all group">
                <div className="flex flex-col items-center gap-3">
                  <svg className="w-10 h-10 text-slate-500 group-hover:text-brand-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                  <div>
                    <label className="block text-lg font-medium text-slate-200 mb-1">Upload Payment Screenshot *</label>
                    <p className="text-slate-400 text-sm mb-4">Click to select or drag and drop image here</p>
                  </div>
                  <input required name="paymentScreenshot" type="file" accept="image/*" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-brand-cyan file:text-white hover:file:bg-cyan-400 cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Warnings */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
              <h4 className="flex items-center text-red-400 font-bold mb-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                Important Instructions
              </h4>
              <ul className="list-disc list-inside text-sm text-red-200/80 space-y-1 ml-1">
                <li><strong>Recheck your name and number</strong> before submitting.</li>
                <li>Submit the form only once.</li>
                <li>Do not share your passwords with anyone.</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-brand-cyan via-blue-600 to-blue-700 text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all transform hover:-translate-y-1 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </span>
              ) : (
                'Submit Application'
              )}
            </button>

            {/* Social Media Links */}
            <div className="pt-8 mt-8 border-t border-slate-800 text-center">
              <p className="text-slate-400 mb-4 font-medium uppercase tracking-widest text-xs">Follow us on Social Media</p>
              <div className="flex justify-center gap-6">
                {/* Facebook */}
                <a href="https://www.facebook.com/profile.php?id=61585924344497" target="_blank" rel="noopener noreferrer" className="p-4 bg-[#1877F2]/10 border border-[#1877F2]/20 rounded-full text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all transform hover:scale-110 shadow-lg" title="Follow us on Facebook">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>

                {/* Instagram */}
                <a href="https://www.instagram.com/triangletech.digital" target="_blank" rel="noopener noreferrer" className="p-4 bg-[#E4405F]/10 border border-[#E4405F]/20 rounded-full text-[#E4405F] hover:bg-[#E4405F] hover:text-white transition-all transform hover:scale-110 shadow-lg" title="Follow us on Instagram">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 014.18 3.388c.636-.247 1.363-.416 2.427-.465C7.901 2.013 8.254 2 11.685 2h.63zm-.081 1.802h-.468c-3.356 0-3.698.015-4.853.064-.7.03-1.096.138-1.362.241-.366.143-.63.313-.91.592-.28.28-.45.543-.592.91-.103.266-.211.66-.241 1.362-.049 1.155-.064 1.497-.064 4.853v.468c0 3.356.015 3.698.064 4.853.03.7.138 1.096.241 1.362.143.366.313.63.592.91.28.28.543.45.91.592.266.103.66.211 1.362.241 1.155.049 1.497.064 4.853.064h.468c3.356 0 3.698-.015 4.853-.064.7-.03 1.096-.138 1.362-.241.366-.143.63-.313.91-.592.28-.28.45-.543.592-.91.103-.266.211.66.241-1.362.049-1.155.064-1.497.064-4.853v-.468c0-3.356-.015-3.698-.064-4.853-.03-.7-.138-1.096-.241-1.362-.143-.366-.313-.63-.592-.91-.28-.28-.543-.45-.91-.592-.266-.103-.66-.211-1.362-.241-1.155-.049-1.497-.064-4.853-.064z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M12.315 6.853a5.148 5.148 0 110 10.297 5.148 5.148 0 010-10.297zm0 1.802a3.346 3.346 0 100 6.691 3.346 3.346 0 000-6.691zM18.667 6.463a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4z" clipRule="evenodd" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a href="https://wa.me/923442210969" target="_blank" rel="noopener noreferrer" className="p-4 bg-[#25D366]/10 border border-[#25D366]/20 rounded-full text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all transform hover:scale-110 shadow-lg" title="Chat on WhatsApp">
                  <span className="sr-only">WhatsApp</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.122-1.342A9.961 9.961 0 0012.016 22c5.506 0 9.989-4.478 9.989-9.984 0-5.507-4.483-9.984-9.993-9.984zm0 18.266a8.256 8.256 0 01-4.223-1.154l-.303-.179-3.138.823.837-3.059-.196-.313a8.27 8.27 0 01-1.258-4.415c0-4.57 3.727-8.286 8.293-8.286 4.566 0 8.285 3.716 8.285 8.286 0 4.57-3.719 8.286-8.286 8.286zm4.537-6.204c-.249-.124-1.475-.727-1.703-.81-.229-.083-.396-.124-.563.125-.166.249-.643.81-.788.976-.145.166-.29.186-.54.062-.249-.124-1.051-.387-2.003-1.235-.745-.664-1.248-1.485-1.393-1.734-.146-.249-.015-.383.109-.507.112-.11.249-.29.374-.435.124-.146.166-.249.249-.415.083-.166.041-.311-.021-.435-.062-.124-.562-1.353-.769-1.853-.201-.486-.406-.419-.562-.427l-.479-.009c-.166 0-.436.062-.664.311-.228.249-.873.853-.873 2.081 0 1.228.894 2.415 1.018 2.581.125.166 1.76 2.687 4.263 3.767 2.503 1.08 2.503.72 2.96.679.457-.042 1.474-.602 1.682-1.184.207-.581.207-1.079.145-1.183-.062-.104-.228-.166-.477-.291z" />
                  </svg>
                </a>
              </div>
            </div>

          </form>
        </div>
      </div>
      {/* FIXED: Top Right Social Buttons (FB & Insta) */}
      <div className="fixed top-6 right-6 z-50 flex gap-4">
        {/* Facebook */}
        <a
          href="https://www.facebook.com/profile.php?id=61585924344497"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-full text-white shadow-lg hover:bg-blue-600 hover:border-blue-500 transition-all transform hover:scale-110 group"
          title="Visit Facebook Page"
        >
          <span className="sr-only">Facebook</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/triangletech.digital"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-full text-white shadow-lg hover:bg-pink-600 hover:border-pink-500 transition-all transform hover:scale-110 group"
          title="Visit Instagram"
        >
          <span className="sr-only">Instagram</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.153 1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 014.18 3.388c.636-.247 1.363-.416 2.427-.465C7.901 2.013 8.254 2 11.685 2h.63zm-.081 1.802h-.468c-3.356 0-3.698.015-4.853.064-.7.03-1.096.138-1.362.241-.366.143-.63.313-.91.592-.28.28-.45.543-.592.91-.103.266-.211.66-.241 1.362-.049 1.155-.064 1.497-.064 4.853.064h.468c3.356 0 3.698-.015 4.853-.064.7-.03 1.096-.138 1.362-.241.366-.143.63-.313.91-.592.28-.28.45-.543.592-.91.103-.266.211-.66.241-1.362-.241-1.155-.049-1.497-.064-4.853-.064z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M12.315 6.853a5.148 5.148 0 110 10.297 5.148 5.148 0 010-10.297zm0 1.802a3.346 3.346 0 100 6.691 3.346 3.346 0 000-6.691zM18.667 6.463a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4z" clipRule="evenodd" />
          </svg>
        </a>
      </div>

      {/* FIXED: Bottom Right WhatsApp Button */}
      <a
        href="https://wa.me/923442210969"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 bg-green-500 rounded-full text-white shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:bg-green-600 hover:scale-110 transition-all flex items-center justify-center animate-bounce-slow"
        title="Chat on WhatsApp"
      >
        <span className="sr-only">WhatsApp</span>
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.122-1.342A9.961 9.961 0 0012.016 22c5.506 0 9.989-4.478 9.989-9.984 0-5.507-4.483-9.984-9.993-9.984zm0 18.266a8.256 8.256 0 01-4.223-1.154l-.303-.179-3.138.823.837-3.059-.196-.313a8.27 8.27 0 01-1.258-4.415c0-4.57 3.727-8.286 8.293-8.286 4.566 0 8.285 3.716 8.285 8.286 0 4.57-3.719 8.286-8.286 8.286zm4.537-6.204c-.249-.124-1.475-.727-1.703-.81-.229-.083-.396-.124-.563.125-.166.249-.643.81-.788.976-.145.166-.29.186-.54.062-.249-.124-1.051-.387-2.003-1.235-.745-.664-1.248-1.485-1.393-1.734-.146-.249-.015-.383.109-.507.112-.11.249-.29.374-.435.124-.146.166-.249.249-.415.083-.166.041-.311-.021-.435-.062-.124-.562-1.353-.769-1.853-.201-.486-.406-.419-.562-.427l-.479-.009c-.166 0-.436.062-.664.311-.228.249-.873.853-.873 2.081 0 1.228.894 2.415 1.018 2.581.125.166 1.76 2.687 4.263 3.767 2.503 1.08 2.503.72 2.96.679.457-.042 1.474-.602 1.682-1.184.207-.581.207-1.079.145-1.183-.062-.104-.228-.166-.477-.291z" />
        </svg>
      </a>
    </div>
  );
}