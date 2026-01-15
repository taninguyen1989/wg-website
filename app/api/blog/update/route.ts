import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { NextResponse } from 'next/server';
import { updatePost } from '@/src/lib/blog';

export async function PUT(request: Request) {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await request.json();
        const { slug, title, date, description, image, tags, content, lang } = data;

        // Validate required fields
        if (!slug || !title || !date || !description || !content || !lang) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Update post
        const result = updatePost(
            slug,
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
            newSlug: result.newSlug,
            message: 'Post updated successfully',
        });
    } catch (error) {
        console.error('Error in update post API:', error);
        return NextResponse.json(
            { error: 'Failed to update post' },
            { status: 500 }
        );
    }
}
