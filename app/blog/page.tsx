import React from 'react';
import { getAllPosts } from '@/src/lib/blog';
import { BlogList } from '@/components/BlogList';

export const metadata = {
    title: 'Blog - WG Technology',
    description: 'Latest insights and news from WG Technology.',
};

const BlogPage = () => {
    const postsVi = getAllPosts('vi');
    const postsEn = getAllPosts('en');

    return <BlogList postsVi={postsVi} postsEn={postsEn} />;
};

export default BlogPage;
