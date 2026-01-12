"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/src/context/LanguageContext';
import { TRANSLATIONS } from '@/src/constants/translations';
import { BlogPost } from '@/src/lib/blog';

interface Props {
    postsVi: BlogPost[];
    postsEn: BlogPost[];
}

export const BlogSection = ({ postsVi, postsEn }: Props) => {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language];
    // Need to add blog translations to translations.ts first or hardcode for now/reuse existing.
    // I will use simple hardcoded for section section specifically or reuse 'news' key if I can.

    const posts = language === 'vi' ? postsVi : postsEn;
    const latestPosts = posts.slice(0, 3);

    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center max-w-3xl mx-auto mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
                        {language === 'vi' ? 'Tin Tức & Sự Kiện' : 'News & Insights'}
                    </h2>
                    <h3 className="text-lg text-slate-600 font-light max-w-2xl mb-8">
                        {language === 'vi'
                            ? 'Cập nhật xu hướng công nghệ mới nhất'
                            : 'Update the latest technology trends'}
                    </h3>
                    <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                        {language === 'vi' ? 'Xem tất cả' : 'View all'}
                        <ArrowRight className="size-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {latestPosts.map((post) => (
                        <Link href={`/blog/${post.id}`} key={post.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-500">
                            <div className="relative h-48 w-full overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                                        {post.tags[0]}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-wider mb-3">
                                    <ClockIcon className="size-3" />
                                    <span>{post.date}</span>
                                </div>

                                <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h4>
                                <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-1">
                                    {post.description}
                                </p>

                                <span className="inline-flex items-center gap-1 text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
                                    {language === 'vi' ? 'Đọc tiếp' : 'Read more'}
                                    <ArrowRight className="size-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-bold">
                        {language === 'vi' ? 'Xem tất cả' : 'View all'}
                        <ArrowRight className="size-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

// Simple Icon component to avoid import issues if not available
const ClockIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
