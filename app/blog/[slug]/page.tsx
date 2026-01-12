import React from 'react';
import { getPostBySlug, getAllPosts } from '@/src/lib/blog';
import { BlogDetail } from '@/components/BlogDetail';

interface Props {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: Props) {
    const post = getPostBySlug(params.slug, 'vi') || getPostBySlug(params.slug, 'en');

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} - WG Technology`,
        description: post.description,
    };
}

const BlogDetailPage = ({ params }: Props) => {
    // Fetch posts for both languages
    const postVi = getPostBySlug(params.slug, 'vi');
    const postEn = getPostBySlug(params.slug, 'en');

    // Fetch related posts for filtering
    const allVi = getAllPosts('vi');
    const allEn = getAllPosts('en');

    // Helper to filter related posts
    const filterRelated = (post: any, all: any[]) => {
        if (!post) return [];
        return all.filter(p => p.id !== post.id && p.tags.some((t: string) => post.tags.includes(t))).slice(0, 3);
    }

    const relatedVi = filterRelated(postVi, allVi);
    const relatedEn = filterRelated(postEn, allEn);

    return (
        <BlogDetail
            slug={params.slug}
            postVi={postVi}
            postEn={postEn}
            relatedVi={relatedVi}
            relatedEn={relatedEn}
        />
    );
};

export default BlogDetailPage;
