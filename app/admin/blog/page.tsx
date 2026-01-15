import Link from 'next/link';
import { getAllPosts } from '@/src/lib/blog';
import { Plus } from 'lucide-react';
import BlogPostList from '@/components/BlogPostList';

export const metadata = {
    title: 'Manage Blog Posts - WG Technology Admin',
    description: 'Manage blog posts for WG Technology',
};

export default function BlogManagementPage() {
    const postsEn = getAllPosts('en');
    const postsVi = getAllPosts('vi');

    const allPosts = [
        ...postsEn.map(post => ({ ...post, lang: 'en' as const })),
        ...postsVi.map(post => ({ ...post, lang: 'vi' as const })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Blog Posts</h1>
                    <p className="text-slate-400">Manage your blog content</p>
                </div>
                <Link
                    href="/admin/blog/new"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
                >
                    <Plus className="w-5 h-5" />
                    Create New Post
                </Link>
            </div>

            {/* Blog Post List */}
            <BlogPostList posts={allPosts} />
        </div>
    );
}
