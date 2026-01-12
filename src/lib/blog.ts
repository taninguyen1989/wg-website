import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
    id: string;
    title: string;
    date: string;
    description: string;
    image: string;
    tags: string[];
    content: string;
}

export function getAllPosts(lang: 'vi' | 'en'): BlogPost[] {
    const langDirectory = path.join(contentDirectory, lang);

    if (!fs.existsSync(langDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(langDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(langDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
            content: matterResult.content,
        } as BlogPost;
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getPostBySlug(slug: string, lang: 'vi' | 'en'): BlogPost | null {
    const fullPath = path.join(contentDirectory, lang, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
        id: slug,
        ...matterResult.data,
        content: matterResult.content,
    } as BlogPost;
}
