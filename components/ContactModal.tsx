"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Send, Loader2 } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";
import { TRANSLATIONS } from "@/src/constants/translations";

const contactFormSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    company: z.string().optional(),
    service: z.string().min(1),
    requestType: z.string().min(1),
    message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language].contactModal;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to submit");
            }

            setSubmitStatus("success");
            reset();
            setTimeout(() => {
                onClose();
                setSubmitStatus("idle");
            }, 2000);
        } catch (error) {
            console.error("Contact form error:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-primary-dark to-primary-light text-white px-8 py-6 rounded-t-3xl">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
                        aria-label="Close"
                    >
                        <X className="size-6" />
                    </button>
                    <h2 className="text-2xl font-bold font-serif mb-2">{t.title}</h2>
                    <p className="text-white/90 text-sm">{t.subtitle}</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                            {t.form.fullName} <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("fullName")}
                            id="fullName"
                            type="text"
                            placeholder={t.form.fullNamePlaceholder}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                        {errors.fullName && (
                            <p className="mt-1 text-sm text-red-500">{t.form.validation.nameRequired}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            {t.form.email} <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("email")}
                            id="email"
                            type="email"
                            placeholder={t.form.emailPlaceholder}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email.type === "invalid_string"
                                    ? t.form.validation.emailInvalid
                                    : t.form.validation.emailRequired}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                            {t.form.phone} <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("phone")}
                            id="phone"
                            type="tel"
                            placeholder={t.form.phonePlaceholder}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-500">{t.form.validation.phoneRequired}</p>
                        )}
                    </div>

                    {/* Company */}
                    <div>
                        <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                            {t.form.company}
                        </label>
                        <input
                            {...register("company")}
                            id="company"
                            type="text"
                            placeholder={t.form.companyPlaceholder}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    </div>

                    {/* Service */}
                    <div>
                        <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                            {t.form.service} <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("service")}
                            id="service"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        >
                            <option value="">{t.form.servicePlaceholder}</option>
                            <option value="docuware">{t.form.services.docuware}</option>
                            <option value="erp">{t.form.services.erp}</option>
                            <option value="ai">{t.form.services.ai}</option>
                            <option value="iso">{t.form.services.iso}</option>
                            <option value="other">{t.form.services.other}</option>
                        </select>
                        {errors.service && (
                            <p className="mt-1 text-sm text-red-500">{t.form.validation.serviceRequired}</p>
                        )}
                    </div>

                    {/* Request Type */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            {t.form.requestType} <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {(["demo", "trial", "consultation"] as const).map((type) => (
                                <label
                                    key={type}
                                    className="relative flex items-center justify-center cursor-pointer"
                                >
                                    <input
                                        {...register("requestType")}
                                        type="radio"
                                        value={type}
                                        className="peer sr-only"
                                    />
                                    <div className="w-full px-4 py-3 text-center rounded-xl border-2 border-gray-300 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all font-medium text-sm">
                                        {t.form.requestTypes[type]}
                                    </div>
                                </label>
                            ))}
                        </div>
                        {errors.requestType && (
                            <p className="mt-1 text-sm text-red-500">{t.form.validation.requestTypeRequired}</p>
                        )}
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                            {t.form.message}
                        </label>
                        <textarea
                            {...register("message")}
                            id="message"
                            rows={4}
                            placeholder={t.form.messagePlaceholder}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                        />
                    </div>

                    {/* Status Messages */}
                    {submitStatus === "success" && (
                        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-medium">
                            {t.form.success}
                        </div>
                    )}
                    {submitStatus === "error" && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
                            {t.form.error}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                            disabled={isSubmitting}
                        >
                            {t.form.cancel}
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-primary-dark to-primary-light text-white font-semibold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" />
                                    {t.form.submitting}
                                </>
                            ) : (
                                <>
                                    <Send className="size-5" />
                                    {t.form.submit}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
