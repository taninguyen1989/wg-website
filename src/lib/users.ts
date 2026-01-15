import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

export interface User {
    id: string;
    username: string;
    password: string; // Hashed password
    email: string;
    name: string;
}

// Read all users from file
export function getUsers(): User[] {
    try {
        const fileContents = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error('Error reading users file:', error);
        return [];
    }
}

// Get user by username
export function getUserByUsername(username: string): User | null {
    const users = getUsers();
    return users.find(u => u.username === username) || null;
}

// Get user by ID
export function getUserById(id: string): User | null {
    const users = getUsers();
    return users.find(u => u.id === id) || null;
}

// Update user password
export function updateUserPassword(
    userId: string,
    newPassword: string
): { success: boolean; error?: string } {
    try {
        const users = getUsers();
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return { success: false, error: 'User not found' };
        }

        // Hash the new password
        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        // Update user
        users[userIndex].password = hashedPassword;

        // Write back to file
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');

        return { success: true };
    } catch (error) {
        console.error('Error updating password:', error);
        return { success: false, error: 'Failed to update password' };
    }
}

// Verify user password
export function verifyPassword(username: string, password: string): boolean {
    console.log('[USERS] Verifying password for:', username);
    const user = getUserByUsername(username);
    if (!user) {
        console.log('[USERS] User not found:', username);
        return false;
    }
    console.log('[USERS] User found, comparing password hash');
    const result = bcrypt.compareSync(password, user.password);
    console.log('[USERS] Password comparison result:', result);
    return result;
}
