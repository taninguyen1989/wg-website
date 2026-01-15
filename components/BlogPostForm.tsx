'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Loader2, Calendar } from 'lucide-react';

interface BlogPostFormProps {
    initialData?: {
        title: string;
        date: string;
        description: string;
        image: string;
        tags: string[];
        content: string;
        lang: 'en' | 'vi';
    };
    slug?: string;
    mode: 'create' | 'edit';
}

export default function BlogPostForm({ initialData, slug, mode }: BlogPostFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        date: initialData?.date || new Date().toISOString().split('T')[0],
        description: initialData?.description || '',
        image: initialData?.image || '',
        tags: initialData?.tags?.join(', ') || '',
        content: initialData?.content || '',
        lang: initialData?.lang || 'en' as 'en' | 'vi',
    });

    const [imagePreview, setImagePreview] = useState(initialData?.image || '');

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const endpoint = mode === 'create' ? '/api/blog/create' : '/api/blog/update';
            const payload = {
                ...(mode === 'edit' && { slug }),
                title: formData.title,
                date: formData.date,
                description: formData.description,
                image: formData.image || '/images/blog/default.png',
                tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
                content: formData.content,
                lang: formData.lang,
            };

            const response = await fetch(endpoint, {
                method: mode === 'create' ? 'POST' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.success) {
                alert(mode === 'create' ? 'Post created successfully!' : 'Post updated successfully!');
                router.push('/admin/blog');
                router.refresh();
            } else {
                alert(data.error || 'Failed to save post');
            }
        } catch (error) {
            console.error('Error saving post:', error);
            alert('Failed to save post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Language Selector */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                <label className="block text-sm font-medium text-slate-300 mb-3">
                    Language
                </label>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, lang: 'en' }))}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${formData.lang === 'en'
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                    >
                        🇬🇧 English
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, lang: 'vi' }))}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${formData.lang === 'vi'
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                    >
                        🇻🇳 Tiếng Việt
                    </button>
                </div>
            </div>

            {/* Title */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
                    Title *
                </label>
                <input
                    type="text"
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter post title..."
                />
            </div>

            {/* Date */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                <label htmlFor="date" className="block text-sm font-medium text-slate-300 mb-2">
                    Date *
                </label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="date"
                        id="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Description */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                    Description *
                </label>
                <textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of the post..."
                />
            </div>

            {/* Image Upload - URL Input (Vercel Compatible) */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                <label className="block text-sm font-medium text-slate-300 mb-3">
                    Featured Image
                </label>

                {imagePreview ? (
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setImagePreview('');
                                setFormData((prev) => ({ ...prev, image: '' }));
                            }}
                            className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <input
                            type="url"
                            value={formData.image}
                            onChange={(e) => {
                                const url = e.target.value;
                                setFormData((prev) => ({ ...prev, image: url }));
                                setImagePreview(url);
                            }}
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter image URL or path (e.g., /images/blog/my-image.png)"
                        />
                        <p className="text-sm text-slate-400">
                            💡 <strong>Tip:</strong> Add images to <code className="bg-slate-800 px-2 py-1 rounded">/public/images/blog/</code> via GitHub,
                            then use path: <code className="bg-slate-800 px-2 py-1 rounded">/images/blog/filename.png</code>
                        </p>
                        <p className="text-sm text-slate-400">
                            Or use external image URLs (imgur, cloudinary, etc.)
                        </p>
                    </div>
                )}
            </div>

            {/* Tags */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                <label htmlFor="tags" className="block text-sm font-medium text-slate-300 mb-2">
                    Tags
                </label>
                <input
                    type="text"
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Separate tags with commas: #ERP, #DocuWare, #Integration"
                />
                <p className="text-sm text-slate-400 mt-2">Separate multiple tags with commas</p>
            </div>

            {/* Content */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-2">
                    Content (Markdown) *
                </label>
                <textarea
                    id="content"
                    required
                    value={formData.content}
                    onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                    rows={15}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    placeholder="Write your post content in Markdown..."
                />
                <p className="text-sm text-slate-400 mt-2">
                    Supports Markdown formatting
                </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5" />
                            {mode === 'create' ? 'Create Post' : 'Update Post'}
                        </>
                    )}
                </button>
                <button
                    type="button"
                    onClick={() => router.push('/admin/blog')}
                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
