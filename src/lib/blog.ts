import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import slugify from 'slugify';

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

// Create a new blog post
export function createPost(
    data: Omit<BlogPost, 'id'>,
    lang: 'vi' | 'en'
): { success: boolean; slug?: string; error?: string } {
    try {
        const langDirectory = path.join(contentDirectory, lang);

        // Ensure directory exists
        if (!fs.existsSync(langDirectory)) {
            fs.mkdirSync(langDirectory, { recursive: true });
        }

        // Generate slug from title
        const slug = slugify(data.title, { lower: true, strict: true });
        const filePath = path.join(langDirectory, `${slug}.md`);

        // Check if file already exists
        if (fs.existsSync(filePath)) {
            return { success: false, error: 'A post with this title already exists' };
        }

        // Create frontmatter
        const frontmatter = {
            title: data.title,
            date: data.date,
            description: data.description,
            image: data.image,
            tags: data.tags,
        };

        // Generate markdown content with frontmatter
        const fileContent = matter.stringify(data.content, frontmatter);

        // Write file
        fs.writeFileSync(filePath, fileContent, 'utf8');

        return { success: true, slug };
    } catch (error) {
        console.error('Error creating post:', error);
        return { success: false, error: 'Failed to create post' };
    }
}

// Update an existing blog post
export function updatePost(
    slug: string,
    data: Omit<BlogPost, 'id'>,
    lang: 'vi' | 'en'
): { success: boolean; newSlug?: string; error?: string } {
    try {
        const langDirectory = path.join(contentDirectory, lang);
        const oldFilePath = path.join(langDirectory, `${slug}.md`);

        // Check if file exists
        if (!fs.existsSync(oldFilePath)) {
            return { success: false, error: 'Post not found' };
        }

        // Generate new slug from title
        const newSlug = slugify(data.title, { lower: true, strict: true });
        const newFilePath = path.join(langDirectory, `${newSlug}.md`);

        // If slug changed, check if new slug already exists
        if (newSlug !== slug && fs.existsSync(newFilePath)) {
            return { success: false, error: 'A post with this title already exists' };
        }

        // Create frontmatter
        const frontmatter = {
            title: data.title,
            date: data.date,
            description: data.description,
            image: data.image,
            tags: data.tags,
        };

        // Generate markdown content with frontmatter
        const fileContent = matter.stringify(data.content, frontmatter);

        // Write file
        fs.writeFileSync(newFilePath, fileContent, 'utf8');

        // If slug changed, delete old file
        if (newSlug !== slug) {
            fs.unlinkSync(oldFilePath);
        }

        return { success: true, newSlug };
    } catch (error) {
        console.error('Error updating post:', error);
        return { success: false, error: 'Failed to update post' };
    }
}

// Delete a blog post
export function deletePost(
    slug: string,
    lang: 'vi' | 'en'
): { success: boolean; error?: string } {
    try {
        const langDirectory = path.join(contentDirectory, lang);
        const filePath = path.join(langDirectory, `${slug}.md`);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return { success: false, error: 'Post not found' };
        }

        // Delete file
        fs.unlinkSync(filePath);

        return { success: true };
    } catch (error) {
        console.error('Error deleting post:', error);
        return { success: false, error: 'Failed to delete post' };
    }
}
