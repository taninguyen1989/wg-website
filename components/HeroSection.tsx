"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";
import { TRANSLATIONS } from "@/src/constants/translations";

export const HeroSection = () => {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language].hero;

    return (
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-b from-white to-gray-50/50">
            <div className="container-custom relative">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="relative z-10 max-w-2xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-[1.2] mb-8 tracking-tight">
                            {t.title} <br />
                            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">
                                {t.titleHighlight}
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
                            {t.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="#" className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-dark to-primary-light text-white rounded-full font-medium hover:brightness-110 transition-all transform hover:-translate-y-1 shadow-xl shadow-primary/25">
                                {t.ctaPrimary}
                                <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    <div className="relative lg:h-[600px] flex items-center justify-center lg:justify-end">
                        <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square max-w-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-white/20 ring-1 ring-gray-100/50 bg-white">
                            <Image
                                src="/hero-data.png"
                                alt="Hero Image"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-1000"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent pointer-events-none" />
                        </div>

                        <div className="absolute top-1/4 -left-8 p-4 bg-white rounded-xl shadow-lg border border-gray-100 hidden md:block animate-bounce duration-[3000ms]">
                            <div className="flex items-center gap-3">
                                <div className="size-3 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-sm font-semibold text-gray-800">{t.systemConnected}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-blue-50/40 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4 pointer-events-none" />
                <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-indigo-50/40 rounded-full blur-3xl opacity-40 -translate-x-1/3 translate-y-1/4 pointer-events-none" />
            </div>
        </section>
    );
};
