"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Database, Cloud, BrainCircuit, ShieldCheck, Target, Lightbulb, UserCheck, Eye, Award, Briefcase, Scan, Languages } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/src/context/LanguageContext';
import { TRANSLATIONS } from '@/src/constants/translations';

const AboutPage = () => {
    const { language } = useLanguage();
    // Access nested translations safely. 
    // In a real app, I'd define strict types, but for now I cast or access directly knowing structure
    const t = TRANSLATIONS[language].about as any;
    const commonT = TRANSLATIONS[language];

    const expertiseIcons = {
        erp: Database,
        cloud: Cloud,
        ai: BrainCircuit,
        security: ShieldCheck
    };

    const valueIcons = [Lightbulb, UserCheck, Target];
    const chooseIcons = [Award, Briefcase, Scan, Languages];

    return (
        <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-primary/20 flex flex-col">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
                        alt="WG Office"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-slate-900/70" />
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
                    >
                        {t.hero.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-light"
                    >
                        {t.hero.subtitle}
                    </motion.p>
                </div>
            </section>

            {/* Story-telling Section (Zig-zag) */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    {/* Vision */}
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 mb-24">
                        <div className="md:w-1/2 relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop"
                                alt="Vision"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="p-3 bg-blue-100 rounded-full text-primary">
                                    <Eye className="size-6" />
                                </span>
                                <h2 className="text-3xl font-serif font-bold text-slate-900">
                                    {t.story.vision.title}
                                </h2>
                            </div>
                            <p className="text-lg text-slate-600 leading-relaxed font-light">
                                {t.story.vision.content}
                            </p>
                        </div>
                    </div>

                    {/* Mission */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20 mb-24">
                        <div className="md:w-1/2 relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
                                alt="Mission"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="p-3 bg-blue-100 rounded-full text-primary">
                                    <Target className="size-6" />
                                </span>
                                <h2 className="text-3xl font-serif font-bold text-slate-900">
                                    {t.story.mission.title}
                                </h2>
                            </div>
                            <p className="text-lg text-slate-600 leading-relaxed font-light">
                                {t.story.mission.content}
                            </p>
                        </div>
                    </div>

                    {/* Core Values */}
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-slate-900 text-center mb-12">
                            {t.story.values.title}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {t.story.values.items.map((item: any, idx: number) => {
                                const Icon = valueIcons[idx];
                                return (
                                    <div key={idx} className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300">
                                        <div className="mx-auto size-16 bg-white rounded-full flex items-center justify-center text-primary mb-6 shadow-sm">
                                            <Icon className="size-8" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                        <p className="text-slate-600">{item.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">
                            {language === 'vi' ? 'Sự khác biệt' : 'The Difference'}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
                            {t.whyChooseUs.title}
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto font-light">
                            {t.whyChooseUs.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {t.whyChooseUs.items.map((item: any, idx: number) => {
                            const Icon = chooseIcons[idx];
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="size-12 bg-white rounded-lg flex items-center justify-center text-primary mb-6 shadow-sm border border-slate-100">
                                        <Icon className="size-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Connecting Section */}
            <div className="h-32 bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            {/* Expertise Section (Animated) */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t.expertise.title}</h2>
                        <p className="text-slate-400 text-lg">{t.expertise.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {Object.entries(t.expertise.items).map(([key, item]: [string, any], idx) => {
                            const Icon = expertiseIcons[key as keyof typeof expertiseIcons];
                            return (
                                <motion.div
                                    key={key}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -10 }}
                                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl hover:border-primary/50 hover:bg-slate-800 transition-all duration-300 group"
                                >
                                    <div className="size-14 bg-slate-900 rounded-xl flex items-center justify-center text-primary group-hover:text-white group-hover:bg-primary transition-all duration-300 mb-6 shadow-lg shadow-black/20">
                                        <Icon className="size-7" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default AboutPage;
