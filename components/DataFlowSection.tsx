"use client";

import { Brain, FileText, Server, Workflow, Zap, BarChart } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";
import { TRANSLATIONS } from "@/src/constants/translations";
import { Reveal } from "@/components/Reveal";

export const DataFlowSection = () => {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language].dataFlow;

    return (
        <section className="py-24 overflow-hidden">
            <div className="container-custom">
                <Reveal width="100%">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary text-sm font-medium mb-4">
                            <Workflow className="size-4" />
                            {t.badge}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">{t.title}</h2>
                        <p className="text-gray-600">
                            {t.description}
                        </p>
                    </div>
                </Reveal>

                <Reveal width="100%" delay={0.4}>
                    <div className="relative max-w-6xl mx-auto">
                        {/* Connecting Lines Layer (Behind) */}
                        <div className="absolute top-12 left-0 w-full h-full -z-10 hidden md:block">
                            <svg className="w-full h-24" preserveAspectRatio="none">
                                {/* Line 1-2 */}
                                <path
                                    d="M 90,40 L 330,40"
                                    fill="none"
                                    stroke="#e2e8f0"
                                    strokeWidth="2"
                                    className="opacity-50"
                                />
                                <path
                                    d="M 90,40 L 330,40"
                                    fill="none"
                                    stroke="#0054a6"
                                    strokeWidth="2"
                                    strokeDasharray="10, 10"
                                    className="animate-[dash_10s_linear_infinite]"
                                />
                                {/* Line 2-3 */}
                                <path
                                    d="M 420,40 L 660,40"
                                    fill="none"
                                    stroke="#e2e8f0"
                                    strokeWidth="2"
                                    className="opacity-50"
                                />
                                <path
                                    d="M 420,40 L 660,40"
                                    fill="none"
                                    stroke="#0054a6"
                                    strokeWidth="2"
                                    strokeDasharray="10, 10"
                                    className="animate-[dash_10s_linear_infinite]"
                                />
                                {/* Line 3-4 */}
                                <path
                                    d="M 750,40 L 990,40"
                                    fill="none"
                                    stroke="#e2e8f0"
                                    strokeWidth="2"
                                    className="opacity-50"
                                />
                                <path
                                    d="M 750,40 L 990,40"
                                    fill="none"
                                    stroke="#0054a6"
                                    strokeWidth="2"
                                    strokeDasharray="10, 10"
                                    className="animate-[dash_10s_linear_infinite]"
                                />
                            </svg>
                        </div>

                        <div className="grid md:grid-cols-4 gap-8 relative">
                            {/* Step 1: Document Input */}
                            <div className="relative flex flex-col items-center text-center">
                                <div className="relative mb-6">
                                    <div className="size-24 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-gray-50 z-10 relative">
                                        <FileText className="size-10 text-gray-700" />
                                    </div>
                                    <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20" />
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 hidden lg:block z-20">
                                        <div className="px-3 py-1 bg-white shadow-sm border border-gray-100 rounded text-xs font-mono text-primary whitespace-nowrap">
                                            PDF / IMG
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{t.step1}</h3>
                                <p className="text-sm text-gray-500 max-w-[200px]">
                                    {t.step1Desc}
                                </p>
                            </div>

                            {/* Step 2: AI OCR */}
                            <div className="relative flex flex-col items-center text-center">
                                <div className="relative mb-6">
                                    <div className="size-24 bg-primary text-white rounded-full shadow-2xl shadow-primary/30 flex items-center justify-center border-4 border-white z-10 relative">
                                        <Brain className="size-10" />
                                        <Zap className="absolute top-0 right-0 size-6 text-yellow-300 fill-yellow-300 animate-bounce" />
                                    </div>
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 hidden lg:block z-20">
                                        <div className="px-3 py-1 bg-white shadow-sm border border-gray-100 rounded text-xs font-mono text-primary whitespace-nowrap">
                                            AI OCR
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{t.step2}</h3>
                                <p className="text-sm text-gray-500 max-w-[200px]">
                                    {t.step2Desc}
                                </p>
                            </div>

                            {/* Step 3: ERP Storage */}
                            <div className="relative flex flex-col items-center text-center">
                                <div className="relative mb-6">
                                    <div className="size-24 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-full shadow-xl flex items-center justify-center border-4 border-white z-10 relative">
                                        <Server className="size-10" />
                                    </div>
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 hidden lg:block z-20">
                                        <div className="px-3 py-1 bg-white shadow-sm border border-gray-100 rounded text-xs font-mono text-primary whitespace-nowrap">
                                            SAP/ERP
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{t.step3}</h3>
                                <p className="text-sm text-gray-500 max-w-[200px]">
                                    {t.step3Desc}
                                </p>
                            </div>

                            {/* Step 4: BI Dashboard */}
                            <div className="relative flex flex-col items-center text-center">
                                <div className="relative mb-6">
                                    <div className="size-24 bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-full shadow-xl flex items-center justify-center border-4 border-white z-10 relative">
                                        <BarChart className="size-10" />
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{t.step4}</h3>
                                <p className="text-sm text-gray-500 max-w-[200px]">
                                    {t.step4Desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
