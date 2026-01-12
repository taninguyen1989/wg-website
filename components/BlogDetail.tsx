"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Facebook, Linkedin, Link2, Share2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { useLanguage } from '@/src/context/LanguageContext';
import { BlogPost } from '@/src/lib/blog';

interface Props {
    slug: string;
    postVi: BlogPost | null;
    postEn: BlogPost | null;
    relatedVi: BlogPost[];
    relatedEn: BlogPost[];
}

export const BlogDetail = ({ slug, postVi, postEn, relatedVi, relatedEn }: Props) => {
    const { language } = useLanguage();

    // Select post based on language
    const post = language === 'vi' ? postVi : postEn;
    const relatedPosts = language === 'vi' ? relatedVi : relatedEn;

    if (!post) {
        return (
            <main className="min-h-screen bg-white font-sans text-slate-900 flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">404</h1>
                        <p className="mb-4">Post not found in {language.toUpperCase()}</p>
                        <Link href="/blog" className="text-primary hover:underline">Back to Blog</Link>
                    </div>
                </div>
            </main>
        );
    }

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        alert(language === 'vi' ? 'Đã sao chép liên kết!' : 'Link copied!');
    };

    return (
        <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-primary/20">
            <Header />

            {/* Hero Image */}
            <div className="relative h-[40vh] md:h-[50vh] w-full mt-20">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap gap-3 mb-6">
                            {post.tags.map((tag, idx) => (
                                <span key={idx} className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight shadow-sm">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-4 text-slate-200 text-sm md:text-base">
                            <div className="flex items-center gap-2">
                                <Calendar className="size-4" />
                                <span>{post.date}</span>
                            </div>
                            <span className="w-1 h-1 bg-slate-400 rounded-full" />
                            <span>WG Technology Team</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                    {/* Main Content */}
                    <article className="flex-1">
                        {/* Back Button */}
                        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-8">
                            <ArrowLeft className="size-4" />
                            {language === 'vi' ? 'Quay lại tin tức' : 'Back to News'}
                        </Link>

                        {/* Markdown Render */}
                        <div className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-primary prose-img:rounded-xl">
                            <ReactMarkdown>
                                {post.content}
                            </ReactMarkdown>
                        </div>

                        {/* Share Section */}
                        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
                            <span className="font-bold text-slate-700 flex items-center gap-2">
                                <Share2 className="size-5" />
                                {language === 'vi' ? 'Chia sẻ bài viết' : 'Share this article'}
                            </span>
                            <div className="flex gap-4">
                                <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                                    <Facebook className="size-5" />
                                </button>
                                <button className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors">
                                    <Linkedin className="size-5" />
                                </button>
                                <button onClick={handleCopyLink} className="p-2 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors">
                                    <Link2 className="size-5" />
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar / Related Posts */}
                    <aside className="lg:w-80 space-y-8">
                        <div className="sticky top-24">
                            <h3 className="text-xl font-bold font-serif text-slate-900 mb-6 pb-2 border-b border-slate-200">
                                {language === 'vi' ? 'Bài viết liên quan' : 'Related Posts'}
                            </h3>
                            <div className="space-y-6">
                                {relatedPosts.length > 0 ? (
                                    relatedPosts.map((relPost) => (
                                        <Link href={`/blog/${relPost.id}`} key={relPost.id} className="group block">
                                            <div className="relative h-40 w-full mb-4 rounded-xl overflow-hidden">
                                                <Image
                                                    src={relPost.image}
                                                    alt={relPost.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <h4 className="font-bold text-slate-800 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                                                {relPost.title}
                                            </h4>
                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                <Calendar className="size-3" />
                                                <span>{relPost.date}</span>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-slate-500 italic text-sm">
                                        {language === 'vi' ? 'Không có bài viết liên quan.' : 'No related posts found.'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
};
