import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { NextResponse } from 'next/server';
import { deletePost } from '@/src/lib/blog';

export async function DELETE(request: Request) {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');
        const lang = searchParams.get('lang') as 'vi' | 'en' | null;

        // Validate required fields
        if (!slug || !lang) {
            return NextResponse.json(
                { error: 'Missing slug or language parameter' },
                { status: 400 }
            );
        }

        // Delete post
        const result = await deletePost(slug, lang);

        if (!result.success) {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: 'Post deleted successfully',
        });
    } catch (error) {
        console.error('Error in delete post API:', error);
        return NextResponse.json(
            { error: 'Failed to delete post' },
            { status: 500 }
        );
    }
}
