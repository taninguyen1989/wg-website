"use client";

import { useState } from "react";
import { SERVICES_DATA } from "@/src/constants/services";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/src/context/LanguageContext";
import { TRANSLATIONS } from "@/src/constants/translations";

export const ServicesSection = () => {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language].services;

    return (
        <section className="py-24 bg-gray-50">
            <div className="container-custom">
                <Reveal width="100%">
                    <div className="flex flex-col items-center max-w-3xl mx-auto mb-16 text-center">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                            {t.title}
                        </h2>
                        <p className="text-gray-600">
                            {t.description}
                        </p>
                    </div>
                </Reveal>

                <Reveal width="100%" delay={0.2}>
                    <div className="grid md:grid-cols-3 gap-8">
                        {SERVICES_DATA.map((service, idx) => (
                            <div
                                key={idx}
                                className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
                            >
                                <div className="size-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <service.icon className="size-7 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700">
                                    {service.description[language]}
                                </p>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
