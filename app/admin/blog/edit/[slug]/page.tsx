import { getPostBySlug } from '@/src/lib/blog';
import { notFound } from 'next/navigation';
import BlogPostForm from '@/components/BlogPostForm';

interface EditPostPageProps {
    params: {
        slug: string;
    };
    searchParams: {
        lang?: 'en' | 'vi';
    };
}

export async function generateMetadata({ params }: EditPostPageProps) {
    return {
        title: `Edit Post - ${params.slug} - WG Technology Admin`,
        description: 'Edit blog post',
    };
}

export default function EditPostPage({ params, searchParams }: EditPostPageProps) {
    const lang = searchParams.lang || 'en';
    const post = getPostBySlug(params.slug, lang);

    if (!post) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Edit Post</h1>
                <p className="text-slate-400">Update your blog article</p>
            </div>

            <BlogPostForm
                mode="edit"
                slug={params.slug}
                initialData={{
                    title: post.title,
                    date: post.date,
                    description: post.description,
                    image: post.image,
                    tags: post.tags,
                    content: post.content,
                    lang,
                }}
            />
        </div>
    );
}
