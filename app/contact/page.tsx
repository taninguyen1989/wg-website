"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Clock, Send, Loader2, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/src/context/LanguageContext';
import { TRANSLATIONS } from '@/src/constants/translations';

type FormData = {
    fullName: string;
    businessEmail: string;
    companyName: string;
    solution: string;
    message: string;
};

const ContactPage = () => {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language].contact;
    const footerT = TRANSLATIONS[language].footer;

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(data);
        setIsSubmitting(false);
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <main className="min-h-screen flex flex-col pt-12 bg-slate-50 relative">
            <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20">
                <Link
                    href="/"
                    className="group flex items-center gap-2 text-slate-500 hover:text-primary transition-colors duration-300"
                >
                    <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:-translate-x-1">
                        <ArrowLeft className="size-5" />
                    </div>
                    <span className="font-medium text-sm hidden md:block opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        {t.backToHome}
                    </span>
                </Link>
            </div>

            <div className="flex-grow container mx-auto px-4 py-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
                        {t.title}
                    </h1>
                    <p className="text-xl text-slate-600">
                        {t.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Left Column: Info */}
                    <div className="flex flex-col gap-10">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-primary pl-4">
                                {t.infoTitle}
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-6 group">
                                    <div className="mt-1 text-primary group-hover:scale-110 transition-transform duration-300">
                                        <MapPin className="size-8 stroke-[1.5]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Address</p>
                                        <p className="text-xl text-slate-800 font-light leading-relaxed">{t.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="mt-1 text-primary group-hover:scale-110 transition-transform duration-300">
                                        <Phone className="size-8 stroke-[1.5]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Hotline</p>
                                        <p className="text-xl text-slate-800 font-light">{t.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="mt-1 text-primary group-hover:scale-110 transition-transform duration-300">
                                        <Mail className="size-8 stroke-[1.5]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email</p>
                                        <p className="text-xl text-slate-800 font-light">{t.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="mt-1 text-primary group-hover:scale-110 transition-transform duration-300">
                                        <Clock className="size-8 stroke-[1.5]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Working Hours</p>
                                        <p className="text-xl text-slate-800 font-light">{t.workingHours}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="relative">
                        {/* Decorative background elements */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl" />

                        <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg rounded-2xl p-8 md:p-12">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2 group">
                                        <label className="text-sm font-medium text-slate-500 group-focus-within:text-primary transition-colors">
                                            {t.form.fullName}
                                        </label>
                                        <input
                                            {...register("fullName", { required: true })}
                                            className="w-full px-0 py-3 bg-transparent border-b border-slate-300 focus:border-primary focus:ring-0 outline-none transition-all placeholder:text-transparent"
                                            placeholder={t.form.fullName}
                                        />
                                        {errors.fullName && <span className="text-xs text-red-500">Required field</span>}
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="text-sm font-medium text-slate-500 group-focus-within:text-primary transition-colors">
                                            {t.form.businessEmail}
                                        </label>
                                        <input
                                            {...register("businessEmail", { required: true, pattern: /^\S+@\S+$/i })}
                                            className="w-full px-0 py-3 bg-transparent border-b border-slate-300 focus:border-primary focus:ring-0 outline-none transition-all placeholder:text-transparent"
                                            placeholder="name@company.com"
                                        />
                                        {errors.businessEmail && <span className="text-xs text-red-500 font-light mt-1 block">Valid email required</span>}
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-sm font-medium text-slate-500 group-focus-within:text-primary transition-colors">
                                        {t.form.companyName}
                                    </label>
                                    <input
                                        {...register("companyName")}
                                        className="w-full px-0 py-3 bg-transparent border-b border-slate-300 focus:border-primary focus:ring-0 outline-none transition-all placeholder:text-transparent"
                                        placeholder={t.form.companyName}
                                    />
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-sm font-medium text-slate-500 group-focus-within:text-primary transition-colors">
                                        {t.form.solution}
                                    </label>
                                    <div className="relative">
                                        <select
                                            {...register("solution")}
                                            className="w-full px-0 py-3 bg-transparent border-b border-slate-300 focus:border-primary focus:ring-0 outline-none transition-all appearance-none text-slate-800"
                                        >
                                            <option value="">{t.form.solutionPlaceholder}</option>
                                            <option value="docuware">{t.form.options.docuware}</option>
                                            <option value="sap">{t.form.options.sap}</option>
                                            <option value="ai">{t.form.options.ai}</option>
                                            <option value="iso">{t.form.options.iso}</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none text-slate-400">
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-sm font-medium text-slate-500 group-focus-within:text-primary transition-colors">
                                        {t.form.message}
                                    </label>
                                    <textarea
                                        {...register("message", { required: true })}
                                        rows={4}
                                        className="w-full px-0 py-3 bg-transparent border-b border-slate-300 focus:border-primary focus:ring-0 outline-none transition-all placeholder:text-transparent resize-none"
                                        placeholder={t.form.message}
                                    />
                                    {errors.message && <span className="text-xs text-red-500 font-light mt-1 block">Message required</span>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-serif font-bold tracking-wide rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            {t.form.submitting}
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            {t.form.submit}
                                        </>
                                    )}
                                </button>

                                {isSuccess && (
                                    <div className="p-4 bg-green-50 text-green-700 rounded-lg text-center border border-green-200 animate-fadeIn">
                                        {t.form.success}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Google Maps */}
            <div className="w-full h-[450px] bg-slate-100 mt-24 relative z-0">
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src="https://maps.google.com/maps?q=S%E1%BB%91+22+%C4%90%C6%B0%E1%BB%9Dng+39%2C+Khu+%C4%91%C3%B4+Th%E1%BB%8B+V%E1%BA%A1n+Ph%C3%BAc%2C+Th%E1%BB%A7+%C4%90%E1%BB%A9c%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    title="WG Office Map"
                    className="grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
                ></iframe>
            </div>

            {/* Floating Chat Button */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                {/* Chat Menu */}
                <div className="group relative">
                    <button className="flex items-center justify-center size-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 hover:scale-110">
                        <div className="absolute -top-1 -right-1 size-3 bg-red-500 rounded-full animate-ping" />
                        <div className="absolute -top-1 -right-1 size-3 bg-red-500 rounded-full" />
                        {/* Simple Message Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle">
                            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                        </svg>
                    </button>

                    {/* Hover Menu */}
                    <div className="absolute bottom-full right-0 mb-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col gap-3 min-w-[160px]">
                        <a
                            href="https://zalo.me/0969861612"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-xl hover:bg-blue-50 transition-colors border border-blue-100"
                        >
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/1200px-Icon_of_Zalo.svg.png" alt="Zalo" className="size-6 object-contain" />
                            <span className="font-semibold text-slate-700">Chat Zalo</span>
                        </a>
                        <a
                            href="https://wa.me/84969861612"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-xl hover:bg-green-50 transition-colors border border-green-100"
                        >
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" alt="WhatsApp" className="size-6 object-contain" />
                            <span className="font-semibold text-slate-700">WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-12 mt-auto relative z-10">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="size-6 bg-primary rounded-br-md rounded-tl-md" />
                        <span className="text-lg font-serif font-bold text-gray-900">WG</span>
                    </div>
                    <p className="text-sm text-gray-500">{footerT.copyright}</p>
                </div>
            </footer>
        </main>
    );
};

export default ContactPage;
