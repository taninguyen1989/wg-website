import BlogPostForm from '@/components/BlogPostForm';

export const metadata = {
    title: 'Create New Post - WG Technology Admin',
    description: 'Create a new blog post',
};

export default function NewPostPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Create New Post</h1>
                <p className="text-slate-400">Write and publish a new blog article</p>
            </div>

            <BlogPostForm mode="create" />
        </div>
    );
}
