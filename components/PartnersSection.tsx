"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Boxes } from 'lucide-react';
import { useLanguage } from '@/src/context/LanguageContext';
import { TRANSLATIONS } from '@/src/constants/translations';

export const PartnersSection = () => {
    const { language } = useLanguage();
    // Safe casting for immediate usage
    const t = TRANSLATIONS[language].partners as any;

    // Flatten featured partners from categories for the homepage display
    const featuredPartners = [
        ...t.categories.ecm.items.slice(0, 1), // DocuWare
        ...t.categories.erp.items.slice(0, 1), // SAP
        ...t.categories.cloud.items,           // Microsoft
        ...t.categories.specialized.items.slice(0, 1) // TANCA
    ];

    return (
        <section className="py-24 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center max-w-3xl mx-auto mb-16 text-center">
                    <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">
                        {language === 'vi' ? 'Hệ Sinh Thái' : 'Ecosystem'}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
                        {t.hero.title}
                    </h2>
                    <Link
                        href="/partners"
                        className="group flex items-center justify-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors"
                    >
                        {language === 'vi' ? 'Xem tất cả đối tác' : 'View all partners'}
                        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {featuredPartners.map((partner: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white h-32 rounded-xl border border-slate-100 shadow-sm flex items-center justify-center p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                        >
                            {/* In a real app, this would be <Image /> */}
                            <span className="text-xl md:text-2xl font-black text-slate-800 tracking-tighter opacity-80 hover:opacity-100 transition-opacity">
                                {partner.name}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Marquee effect or simple list explanation */}
                <div className="mt-12 text-center">
                    <p className="text-slate-500 text-sm">
                        {language === 'vi'
                            ? 'Tin cậy bởi các tập đoàn hàng đầu thế giới và Việt Nam'
                            : 'Trusted by world-leading corporations and Vietnam top enterprises'}
                    </p>
                </div>
            </div>
        </section>
    );
};
