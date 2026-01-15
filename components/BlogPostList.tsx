'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, Edit, Search, Globe } from 'lucide-react';

interface Post {
    id: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    lang: 'en' | 'vi';
}

interface BlogPostListProps {
    posts: Post[];
}

export default function BlogPostList({ posts }: BlogPostListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [langFilter, setLangFilter] = useState<'all' | 'en' | 'vi'>('all');
    const [deleting, setDeleting] = useState<string | null>(null);

    // Filter posts
    const filteredPosts = posts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLang = langFilter === 'all' || post.lang === langFilter;
        return matchesSearch && matchesLang;
    });

    const handleDelete = async (slug: string, lang: 'en' | 'vi') => {
        if (!confirm('Are you sure you want to delete this post?')) {
            return;
        }

        setDeleting(slug);
        try {
            const response = await fetch(`/api/blog/delete?slug=${slug}&lang=${lang}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                // Refresh the page to show updated list
                window.location.reload();
            } else {
                alert(data.error || 'Failed to delete post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post');
        } finally {
            setDeleting(null);
        }
    };

    return (
        <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
            {/* Filters */}
            <div className="p-6 border-b border-slate-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Language Filter */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setLangFilter('all')}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${langFilter === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setLangFilter('en')}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${langFilter === 'en'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                }`}
                        >
                            🇬🇧 EN
                        </button>
                        <button
                            onClick={() => setLangFilter('vi')}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${langFilter === 'vi'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                }`}
                        >
                            🇻🇳 VI
                        </button>
                    </div>
                </div>
            </div>

            {/* Posts Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-800 text-slate-300 text-sm">
                        <tr>
                            <th className="px-6 py-3 text-left font-medium">Title</th>
                            <th className="px-6 py-3 text-left font-medium">Date</th>
                            <th className="px-6 py-3 text-left font-medium">Language</th>
                            <th className="px-6 py-3 text-left font-medium">Tags</th>
                            <th className="px-6 py-3 text-right font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {filteredPosts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                                    No posts found
                                </td>
                            </tr>
                        ) : (
                            filteredPosts.map((post) => (
                                <tr key={`${post.lang}-${post.id}`} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-white font-medium">{post.title}</p>
                                            <p className="text-sm text-slate-400 line-clamp-1">{post.description}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-300 text-sm">
                                        {new Date(post.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${post.lang === 'en'
                                                ? 'bg-blue-500/20 text-blue-300'
                                                : 'bg-purple-500/20 text-purple-300'
                                            }`}>
                                            <Globe className="w-3 h-3" />
                                            {post.lang.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {post.tags.slice(0, 3).map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {post.tags.length > 3 && (
                                                <span className="px-2 py-1 text-slate-400 text-xs">
                                                    +{post.tags.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/blog/edit/${post.id}?lang=${post.lang}`}
                                                className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.id, post.lang)}
                                                disabled={deleting === post.id}
                                                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
