import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByUsername, verifyPassword } from '@/src/lib/users';

// Validate required environment variables
if (!process.env.NEXTAUTH_SECRET) {
    throw new Error(
        'NEXTAUTH_SECRET is not defined. Please add it to your environment variables.\n' +
        'Generate one using: openssl rand -base64 32'
    );
}


export const authOptions: AuthOptions = {
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                // Verify user credentials from users.json
                const isValid = verifyPassword(credentials.username, credentials.password);

                if (isValid) {
                    const user = getUserByUsername(credentials.username);
                    if (user) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                        };
                    }
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
