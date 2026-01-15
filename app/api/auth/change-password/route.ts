import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { NextResponse } from 'next/server';
import { getUserById, updateUserPassword, verifyPassword, getUserByUsername } from '@/src/lib/users';

export async function POST(request: Request) {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { currentPassword, newPassword } = await request.json();

        // Validate required fields
        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { error: 'Current password and new password are required' },
                { status: 400 }
            );
        }

        // Validate new password length
        if (newPassword.length < 8) {
            return NextResponse.json(
                { error: 'New password must be at least 8 characters long' },
                { status: 400 }
            );
        }

        // Verify current password
        const user = getUserById(session.user.id);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const isCurrentPasswordValid = verifyPassword(user.username, currentPassword);
        if (!isCurrentPasswordValid) {
            return NextResponse.json(
                { error: 'Current password is incorrect' },
                { status: 400 }
            );
        }

        // Check if new password is different from current
        const isSamePassword = verifyPassword(user.username, newPassword);
        if (isSamePassword) {
            return NextResponse.json(
                { error: 'New password must be different from current password' },
                { status: 400 }
            );
        }

        // Update password
        const result = updateUserPassword(session.user.id, newPassword);

        if (!result.success) {
            return NextResponse.json({ error: result.error }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'Password changed successfully',
        });
    } catch (error) {
        console.error('Error in change password API:', error);
        return NextResponse.json(
            { error: 'Failed to change password' },
            { status: 500 }
        );
    }
}
