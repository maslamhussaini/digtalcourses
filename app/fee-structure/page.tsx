'use client';

import Image from 'next/image';
import Link from 'next/link';
const feeData = [
    { course: 'Social Media Sales Specialist', mentor: 'IMRAN', fee: 'R.s 750/-', duration: '1.5 Month' },
    { course: 'Graphic Designing & Branding Program', mentor: 'MEMOONA', fee: 'R.s 750/-', duration: '1.5 Month' },
    { course: 'Digital Video Editing & Animation', mentor: 'SEHRISH', fee: 'R.s 750/-', duration: '1.5 Month' },
    { course: 'Digital Creative Content Writing', mentor: 'MAIRA', fee: 'R.s 750/-', duration: '1.5 Month' },
    { course: 'Wordpress & Ai Website Building', mentor: 'SUMIYA', fee: 'R.s 750/-', duration: '1.5 Month' },
    { course: 'Amazon Business Program', mentor: 'AASHIR', fee: 'R.s 2000/-', duration: '1.5 Month' },
    { course: 'Professional Branding: CV, LinkedIn & Email Marks', mentor: 'ASMA', fee: 'R.s 750', duration: '1.5 Month' },
    { course: 'E-Commerce Ai Shopify Dropshipping', mentor: 'ABDUL REHMAN', fee: 'R.s 2000/-', duration: '1.5 Month' },
    { course: 'Youtube Automation & Ai Monetisation', mentor: 'AHMED ALI', fee: 'R.s 750/-', duration: '1.5 Month' },
    { course: 'Ai Skills for the Future', mentor: 'QASIM', fee: 'R.s 750/-', duration: '1.5 Month' },
    { course: 'Fiverr & Freelancing Skills Program', mentor: 'ZEESHAN', fee: 'R.s 750/-', duration: '1.5 Month' },
    { course: 'Next-Gen Creativity: Canva + ChatGPT', mentor: 'NAVEED', fee: 'R.s 750/-', duration: '1.5 Month' },
    { course: 'Microsoft Office Business Essential', mentor: 'NAVEED', fee: 'R.s 750/-', duration: '1.5 Month' },
    { course: 'Ethical Hacking & Cyber Security', mentor: 'QASIM', fee: 'R.s 750/-', duration: '1.5 Month' },
    { course: 'English Language & Grammar Mastery', mentor: 'MAIRA', fee: 'R.s 750/-', duration: '1.5 Month' },
    { course: 'Professional Crypto Trade & Trends', mentor: 'LAIQ HASSAN', fee: 'R.s 750/-', duration: '1.5 Month' },
];

export default function FeeStructure() {
    return (
        <div className="min-h-screen p-4 md:p-10 flex flex-col items-center">

            {/* Glow Effect behind the card */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-pink/20 rounded-full blur-[100px]" />
            </div>

            <div className="relative w-full max-w-5xl bg-slate-900/90 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden border border-slate-700">

                {/* Top Gradient Bar */}
                <div className="h-2 bg-gradient-to-r from-brand-orange via-brand-pink to-brand-cyan"></div>

                <div className="p-6 md:p-10">
                    {/* Logo & Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-6">
                            <Image
                                src="/logo.png"
                                alt="Institute Logo"
                                width={140}
                                height={140}
                                priority
                                className="object-contain drop-shadow-[0_0_15px_rgba(0,194,255,0.3)]"
                            />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 uppercase tracking-wide">
                            Fee Structure
                        </h1>
                        <div className="h-1 w-24 bg-brand-orange mx-auto rounded-full"></div>
                    </div>

                    {/* Table Container */}
                    <div className="overflow-x-auto rounded-lg border border-slate-700 shadow-xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gradient-to-r from-brand-orange to-red-600 text-white shadow-md">
                                    <th className="p-4 md:p-5 font-bold text-sm md:text-base uppercase tracking-wider border-r border-white/20">Course Name</th>
                                    <th className="p-4 md:p-5 font-bold text-sm md:text-base uppercase tracking-wider text-center border-r border-white/20">Mentor</th>
                                    <th className="p-4 md:p-5 font-bold text-sm md:text-base uppercase tracking-wider text-center border-r border-white/20">Fee</th>
                                    <th className="p-4 md:p-5 font-bold text-sm md:text-base uppercase tracking-wider text-center">Duration</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {feeData.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={`
                        transition-colors hover:bg-slate-800/80
                        ${index % 2 === 0 ? 'bg-slate-900/50' : 'bg-slate-800/30'}
                      `}
                                    >
                                        <td className="p-4 text-slate-200 font-medium border-r border-slate-700/50">
                                            {item.course}
                                        </td>
                                        <td className="p-4 text-slate-300 text-center font-medium border-r border-slate-700/50">
                                            {item.mentor}
                                        </td>
                                        <td className="p-4 text-brand-cyan font-bold text-center border-r border-slate-700/50 text-lg">
                                            {item.fee}
                                        </td>
                                        <td className="p-4 text-slate-300 text-center font-medium">
                                            {item.duration}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer / Back Button */}
                    <div className="mt-8 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg border border-slate-600 transition-all hover:border-brand-cyan hover:shadow-[0_0_15px_rgba(0,194,255,0.2)] group"
                        >
                            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                            Back to Registration
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
