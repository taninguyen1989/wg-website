"use client";

import React from 'react';
import Image from 'next/image';
import { PROJECTS_DATA, type Project } from '@/src/constants/projects';
import { Reveal } from './Reveal';
import { useLanguage } from "@/src/context/LanguageContext";
import { TRANSLATIONS } from "@/src/constants/translations";

const ProjectSection = () => {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language].projects;

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS_DATA.map((project: Project, index: number) => (
                        <Reveal key={project.id} delay={index * 0.1}>
                            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col h-full">
                                {/* Image Container with Hover Zoom */}
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.title[language]}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                    {/* Category Tag */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-4 py-1 rounded-full bg-white/90 backdrop-blur-md text-primary text-sm font-semibold shadow-lg">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <project.icon className="w-6 h-6 text-primary" />
                                        <h3 className="text-xl font-bold text-slate-900 line-clamp-1">
                                            {project.title[language]}
                                        </h3>
                                    </div>
                                    <p className="text-slate-600 mb-6 flex-grow leading-relaxed">
                                        {project.description[language]}
                                    </p>

                                    <button className="group/btn flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                                        {t.viewDetails}
                                        <svg
                                            className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectSection;
