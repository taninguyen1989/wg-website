"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScanLine, FileCheck, Database, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/src/context/LanguageContext';
import { TRANSLATIONS } from '@/src/constants/translations';

export const IntegrationFlow = () => {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language].solutions.integration.flow;

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const steps = [
        {
            id: 'capture',
            icon: ScanLine,
            color: 'text-blue-500',
            bg: 'bg-blue-100',
            title: t.capture.title,
            desc: t.capture.desc
        },
        {
            id: 'process',
            icon: FileCheck,
            color: 'text-indigo-500',
            bg: 'bg-indigo-100',
            title: t.process.title,
            desc: t.process.desc
        },
        {
            id: 'sync',
            icon: Database,
            color: 'text-fuchsia-500',
            bg: 'bg-fuchsia-100',
            title: t.sync.title,
            desc: t.sync.desc
        }
    ];

    return (
        <section className="py-24 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">{t.title}</h2>
                </div>

                <div ref={containerRef} className="relative max-w-5xl mx-auto">
                    {/* Progress Line Background */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2 hidden md:block" />
                    <div className="absolute left-8 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2 block md:hidden" />

                    {/* Animated Progress Line */}
                    <motion.div
                        style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
                        className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-fuchsia-500 -translate-x-1/2 hidden md:block"
                    />
                    <motion.div
                        style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
                        className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-fuchsia-500 -translate-x-1/2 block md:hidden"
                    />

                    <div className="relative z-10 space-y-24 md:space-y-32">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Content Side */}
                                <div className="flex-1 text-left md:text-right pl-16 md:pl-0">
                                    <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <h3 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 mb-4`}>
                                            {step.title}
                                        </h3>
                                        <p className="text-lg text-slate-600 leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Icon Node */}
                                <div className="relative flex-shrink-0">
                                    <div className={`w-16 h-16 rounded-full ${step.bg} flex items-center justify-center shadow-lg shadow-slate-200 border-4 border-white relative z-10`}>
                                        <step.icon className={`size-8 ${step.color}`} />
                                    </div>
                                    <div className={`absolute inset-0 rounded-full ${step.bg} opacity-50 animate-ping`} />
                                </div>

                                {/* Empty Side for Balance */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
