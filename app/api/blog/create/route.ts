import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { NextResponse } from 'next/server';
import { createPost } from '@/src/lib/blog';

export async function POST(request: Request) {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await request.json();
        const { title, date, description, image, tags, content, lang } = data;

        // Validate required fields
        if (!title || !date || !description || !content || !lang) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create post
        const result = createPost(
            {
                title,
                date,
                description,
                image: image || '/images/blog/default.png',
                tags: tags || [],
                content,
            },
            lang
        );

        if (!result.success) {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            slug: result.slug,
            message: 'Post created successfully',
        });
    } catch (error) {
        console.error('Error in create post API:', error);
        return NextResponse.json(
            { error: 'Failed to create post' },
            { status: 500 }
        );
    }
}
