"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/src/context/LanguageContext';
import { TRANSLATIONS } from '@/src/constants/translations';
import { Server, Cloud, Cpu, Users, ShieldCheck, Box } from 'lucide-react';

const PartnersPage = () => {
    const { language } = useLanguage();
    // Safe access with basic type casting
    const t = TRANSLATIONS[language].partners as any;

    const categoryIcons = {
        ecm: Server,
        erp: Box,
        cloud: Cloud,
        specialized: Users
    };

    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-primary/20">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6"
                    >
                        {t.hero.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed"
                    >
                        {t.hero.subtitle}
                    </motion.p>
                </div>
            </section>

            {/* Partners Grid */}
            <div className="container mx-auto px-4 pb-32 space-y-20">
                {Object.entries(t.categories).map(([key, category]: [string, any], sectionIdx: number) => {
                    const CategoryIcon = categoryIcons[key as keyof typeof categoryIcons] || Cpu;

                    return (
                        <section key={key}>
                            {/* Section Header */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4 mb-8 border-b border-slate-200 pb-4"
                            >
                                <div className="p-2 bg-blue-50 rounded-lg text-primary">
                                    <CategoryIcon className="size-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    {category.title}
                                </h2>
                            </motion.div>

                            {/* Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.items.map((partner: any, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -5 }}
                                        className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
                                    >
                                        <div className="h-12 mb-6 flex items-center">
                                            {/* Placeholder for Logo - In real app use Image */}
                                            <span className="text-2xl font-black text-slate-800 tracking-tighter group-hover:text-primary transition-colors">
                                                {partner.name}
                                            </span>
                                        </div>
                                        <p className="text-slate-600 leading-relaxed text-sm">
                                            {partner.desc}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>

            {/* CTA / Trust Indicator */}
            <section className="py-20 bg-slate-900 text-white text-center">
                <div className="container mx-auto px-4">
                    <ShieldCheck className="mx-auto size-12 text-primary mb-6" />
                    <h2 className="text-3xl font-serif font-bold mb-4">
                        {language === 'vi' ? 'Cam Kết Chất Lượng' : 'Quality Commitment'}
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                        {language === 'vi'
                            ? 'Mỗi đối tác của chúng tôi đều được lựa chọn kỹ lưỡng để đảm bảo tiêu chuẩn cao nhất cho doanh nghiệp của bạn.'
                            : 'Every partner is carefully selected to ensure the highest standards for your enterprise.'}
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default PartnersPage;
