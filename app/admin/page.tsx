import { getAllPosts } from '@/src/lib/blog';
import Link from 'next/link';
import { FileText, Plus } from 'lucide-react';
import ChangePasswordForm from '@/components/ChangePasswordForm';

export const metadata = {
    title: 'Admin Dashboard - WG Technology',
    description: 'Admin dashboard for managing WG Technology website content',
};

export default function AdminDashboard() {
    const postsEn = getAllPosts('en');
    const postsVi = getAllPosts('vi');

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-slate-400">Welcome to WG Technology Admin Panel</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 text-sm font-medium">English Posts</p>
                            <p className="text-4xl font-bold text-white mt-2">{postsEn.length}</p>
                        </div>
                        <FileText className="w-12 h-12 text-blue-200 opacity-50" />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 shadow-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 text-sm font-medium">Vietnamese Posts</p>
                            <p className="text-4xl font-bold text-white mt-2">{postsVi.length}</p>
                        </div>
                        <FileText className="w-12 h-12 text-purple-200 opacity-50" />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 shadow-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100 text-sm font-medium">Total Posts</p>
                            <p className="text-4xl font-bold text-white mt-2">{postsEn.length + postsVi.length}</p>
                        </div>
                        <FileText className="w-12 h-12 text-green-200 opacity-50" />
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        href="/admin/blog/new"
                        className="flex items-center gap-3 p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-all group"
                    >
                        <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <div>
                            <p className="font-semibold">Create New Post</p>
                            <p className="text-sm text-blue-100">Write a new blog article</p>
                        </div>
                    </Link>

                    <Link
                        href="/admin/blog"
                        className="flex items-center gap-3 p-4 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-all group border border-slate-600"
                    >
                        <FileText className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <div>
                            <p className="font-semibold">Manage Posts</p>
                            <p className="text-sm text-slate-300">Edit or delete existing posts</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Recent Posts Preview */}
            <div className="mt-8 bg-slate-900 rounded-xl p-6 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-4">Recent Posts</h2>
                <div className="space-y-3">
                    {[...postsEn, ...postsVi]
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .slice(0, 5)
                        .map((post) => (
                            <div
                                key={post.id}
                                className="flex items-center justify-between p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors"
                            >
                                <div>
                                    <h3 className="text-white font-medium">{post.title}</h3>
                                    <p className="text-sm text-slate-400">{new Date(post.date).toLocaleDateString()}</p>
                                </div>
                                <Link
                                    href={`/admin/blog/edit/${post.id}`}
                                    className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                                >
                                    Edit →
                                </Link>
                            </div>
                        ))}
                </div>
            </div>

            {/* Account Settings */}
            <div className="mt-8">
                <ChangePasswordForm />
            </div>
        </div>
    );
}
