"use client";

import { useLanguage } from "@/src/context/LanguageContext";

export const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
            <button
                onClick={() => setLanguage("vi")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === "vi"
                        ? "bg-white text-primary shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
            >
                VN
            </button>
            <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === "en"
                        ? "bg-white text-primary shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
            >
                EN
            </button>
        </div>
    );
};
