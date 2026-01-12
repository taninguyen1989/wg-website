"use client";

import React from 'react';
import { Header } from '@/components/Header';
import { useLanguage } from '@/src/context/LanguageContext';
import { TRANSLATIONS } from '@/src/constants/translations';
import { ArrowRight, Database, Brain, RefreshCw, ShieldCheck, Cloud, Server, FileText, Cpu, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { IntegrationFlow } from '@/components/IntegrationFlow';

const IntegrationPage = () => {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language].solutions.integration;
    const commonT = TRANSLATIONS[language];

    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-primary/20">
            {/* Custom Header for Solutions Page or use standard Header */}
            <Header />

            <div className="container mx-auto px-4 py-24">
                {/* Breadcrumb / Back */}
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                        <ArrowLeft className="size-4" />
                        {commonT.contact.backToHome}
                    </Link>
                </div>

                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary-dark mb-6 leading-tight">
                        {t.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </div>

                {/* Integration Flow Component */}
                <div className="mb-24">
                    <IntegrationFlow />
                </div>

                {/* Technical Integration Diagram (Original CSS/DOM based) */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 font-serif">Technical Architecture</h2>
                </div>
                <div className="mb-24 p-8 md:p-12 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
                    <div className="absolute inset-0 bg-grid-slate-50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                        {/* Source Node */}
                        <div className="flex flex-col items-center gap-4 group">
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-50 rounded-2xl flex items-center justify-center border-2 border-blue-100 shadow-lg group-hover:scale-105 transition-transform duration-500">
                                <Database className="size-10 md:size-12 text-primary" />
                            </div>
                            <span className="font-semibold text-sm md:text-base text-slate-700 text-center uppercase tracking-wide">
                                {t.diagram.source}
                            </span>
                        </div>

                        {/* Connection Arrow 1 */}
                        <div className="flex-1 flex items-center justify-center relative w-full md:w-auto transform rotate-90 md:rotate-0 my-4 md:my-0">
                            <div className="h-0.5 w-full bg-gradient-to-r from-blue-200 via-primary to-indigo-200 absolute top-1/2 -translate-y-1/2 hidden md:block" />
                            <div className="w-0.5 h-24 bg-gradient-to-b from-blue-200 via-primary to-indigo-200 relative block md:hidden" />
                            <div className="bg-white p-2 rounded-full border border-primary/20 shadow-sm z-10 animate-pulse">
                                <ArrowRight className="size-5 text-primary rotate-90 md:rotate-0" />
                            </div>
                        </div>

                        {/* Processing Node */}
                        <div className="flex flex-col items-center gap-4 group">
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-indigo-50 rounded-2xl flex items-center justify-center border-2 border-indigo-100 shadow-lg group-hover:scale-105 transition-transform duration-500">
                                <Brain className="size-10 md:size-12 text-indigo-600" />
                            </div>
                            <span className="font-semibold text-sm md:text-base text-slate-700 text-center uppercase tracking-wide">
                                {t.diagram.processing}
                            </span>
                        </div>

                        {/* Connection Arrow 2 */}
                        <div className="flex-1 flex items-center justify-center relative w-full md:w-auto transform rotate-90 md:rotate-0 my-4 md:my-0">
                            <div className="h-0.5 w-full bg-gradient-to-r from-indigo-200 via-purple-500 to-fuchsia-200 absolute top-1/2 -translate-y-1/2 hidden md:block" />
                            <div className="w-0.5 h-24 bg-gradient-to-b from-indigo-200 via-purple-500 to-fuchsia-200 relative block md:hidden" />
                            <div className="bg-white p-2 rounded-full border border-purple-500/20 shadow-sm z-10 animate-pulse delay-1000">
                                <ArrowRight className="size-5 text-purple-600 rotate-90 md:rotate-0" />
                            </div>
                        </div>

                        {/* Storage Node */}
                        <div className="flex flex-col items-center gap-4 group">
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-fuchsia-50 rounded-2xl flex items-center justify-center border-2 border-fuchsia-100 shadow-lg group-hover:scale-105 transition-transform duration-500">
                                <FileText className="size-10 md:size-12 text-fuchsia-600" />
                            </div>
                            <span className="font-semibold text-sm md:text-base text-slate-700 text-center uppercase tracking-wide">
                                {t.diagram.storage}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">

                    {/* Card 1: Central Hub (Large) */}
                    <div className="md:col-span-6 lg:col-span-8 row-span-2 bg-gradient-to-br from-primary to-blue-900 rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                            <Server className="size-64 text-white transform translate-x-1/3 -translate-y-1/3" />
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="p-3 bg-white/10 w-fit rounded-xl mb-6 backdrop-blur-sm">
                                <Server className="size-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-4">{t.cards.centralHub.title}</h3>
                                <p className="text-blue-100 text-lg leading-relaxed max-w-xl">
                                    {t.cards.centralHub.desc}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: AI OCR (Medium - Vertical) */}
                    <div className="md:col-span-3 lg:col-span-4 row-span-2 bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="p-3 bg-indigo-50 w-fit rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Cpu className="size-8 text-indigo-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{t.cards.aiOcr.title}</h3>
                            <p className="text-slate-500 leading-relaxed">
                                {t.cards.aiOcr.desc}
                            </p>
                        </div>
                    </div>

                    {/* Card 3: ERP Sync (Medium - Horizontal) */}
                    <div className="md:col-span-3 lg:col-span-4 bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 group hover:border-fuchsia-200 transition-colors">
                        <div className="flex flex-col h-full justify-between">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-fuchsia-50 w-fit rounded-xl group-hover:rotate-12 transition-transform duration-300">
                                    <RefreshCw className="size-6 text-fuchsia-600" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{t.cards.erpSync.title}</h3>
                                <p className="text-slate-500 text-sm">{t.cards.erpSync.desc}</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Security (Small) */}
                    <div className="md:col-span-3 lg:col-span-4 bg-slate-900 rounded-3xl p-8 shadow-lg relative overflow-hidden group">
                        <div className="absolute inset-0 bg-grid-white/[0.05]" />
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="p-3 bg-white/10 w-fit rounded-xl mb-4 group-hover:bg-green-500/20 transition-colors">
                                <ShieldCheck className="size-6 text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{t.cards.security.title}</h3>
                                <p className="text-slate-400 text-sm">{t.cards.security.desc}</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 5: Cloud (Small) */}
                    <div className="md:col-span-3 lg:col-span-4 bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 group hover:bg-sky-50 transition-colors">
                        <div className="flex flex-col h-full justify-between">
                            <div className="p-3 bg-sky-50 w-fit rounded-xl mb-4 group-hover:bg-white transition-colors">
                                <Cloud className="size-6 text-sky-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{t.cards.cloud.title}</h3>
                                <p className="text-slate-500 text-sm">{t.cards.cloud.desc}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default IntegrationPage;
