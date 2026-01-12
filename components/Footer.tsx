"use client";

import React from 'react';
import { useLanguage } from '@/src/context/LanguageContext';
import { TRANSLATIONS } from '@/src/constants/translations';

export const Footer = () => {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language].footer;

    return (
        <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
            <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="size-6 bg-primary rounded-br-md rounded-tl-md" />
                    <span className="text-lg font-serif font-bold text-gray-900">WG</span>
                </div>
                <p className="text-sm text-gray-500">{t.copyright}</p>
            </div>
        </footer>
    );
};
