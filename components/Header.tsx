"use client";

import Link from "next/link";
import { useLanguage } from "@/src/context/LanguageContext";
import { TRANSLATIONS } from "@/src/constants/translations";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ContactModal } from "@/components/ContactModal";
import { useState, useEffect } from "react";

export const Header = () => {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language].header;
    const [scrolled, setScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm" : "bg-transparent"}`}>
                <div className="container-custom flex h-20 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-8 bg-primary rounded-br-lg rounded-tl-lg" />
                        <span className="text-xl font-serif font-bold tracking-tight text-primary-dark">{t.companyName}</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">{t.home}</Link>
                        <Link href="/solutions/integration" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">{t.services}</Link>
                        <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">{t.about}</Link>
                        <Link href="/partners" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">{t.partners}</Link>
                        <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">{t.blog}</Link>
                        <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">{t.contact}</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        <Link href="/login" className="hidden md:block text-sm font-medium text-primary hover:underline">{t.login}</Link>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-5 py-2.5 bg-gradient-to-r from-primary-dark to-primary-light text-white text-sm font-medium rounded-full hover:brightness-110 transition-colors shadow-lg shadow-primary/20"
                        >
                            {t.getStarted}
                        </button>
                    </div>
                </div>
            </header>

            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};
