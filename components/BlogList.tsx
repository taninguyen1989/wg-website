"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { Header } from '@/components/Header';
import { useLanguage } from '@/src/context/LanguageContext';
import { TRANSLATIONS } from '@/src/constants/translations';
import { BlogPost } from '@/src/lib/blog';

interface Props {
    postsVi: BlogPost[];
    postsEn: BlogPost[];
}

export const BlogList = ({ postsVi, postsEn }: Props) => {
    const { language } = useLanguage();
    const commonT = TRANSLATIONS[language];

    // Select posts based on language
    const posts = language === 'vi' ? postsVi : postsEn;

    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-primary/20">
            <Header />

            <div className="container mx-auto px-4 py-24">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
                    <div className="mb-4 md:mb-0">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-4">
                            <ArrowLeft className="size-4" />
                            {commonT.contact.backToHome}
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
                            {language === 'vi' ? 'Bài Viết Mới Nhất' : 'Latest Insights'}
                        </h1>
                        <p className="text-lg text-slate-600 font-light max-w-xl mt-4">
                            {language === 'vi'
                                ? 'Cập nhật xu hướng công nghệ, giải pháp chuyển đổi số và tin tức từ WG Technology.'
                                : 'Update technology trends, digital transformation solutions, and news from WG Technology.'}
                        </p>
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {posts.map((post) => (
                        <Link href={`/blog/${post.id}`} key={post.id} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
                            {/* Thumbnail */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 group-hover:blur-[2px] transition-all duration-700 ease-out"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Top Tags */}
                                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                    {post.tags.slice(0, 2).map((tag, idx) => (
                                        <span key={idx} className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-6 md:p-8 flex flex-col">
                                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-wider mb-4">
                                    <Clock className="size-3" />
                                    <span>{post.date}</span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {post.description}
                                </p>

                                <div className="mt-auto">
                                    <span className="inline-flex items-center gap-1 text-sm font-bold text-primary group-hover:translate-x-1 transition-transform cursor-pointer">
                                        {language === 'vi' ? 'Đọc tiếp' : 'Read more'}
                                        <ArrowLeft className="size-4 rotate-180" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
};
