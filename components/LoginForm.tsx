'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { LogIn, Loader2 } from 'lucide-react';

interface LoginFormProps {
    lang: 'en' | 'vi';
}

const translations = {
    en: {
        title: 'Admin Login',
        subtitle: 'Sign in to manage your content',
        username: 'Username',
        password: 'Password',
        signIn: 'Sign In',
        signingIn: 'Signing in...',
        error: 'Invalid username or password',
        required: 'This field is required',
    },
    vi: {
        title: 'Đăng nhập Quản trị',
        subtitle: 'Đăng nhập để quản lý nội dung',
        username: 'Tên đăng nhập',
        password: 'Mật khẩu',
        signIn: 'Đăng nhập',
        signingIn: 'Đang đăng nhập...',
        error: 'Tên đăng nhập hoặc mật khẩu không đúng',
        required: 'Trường này là bắt buộc',
    },
};

function SubmitButton({ lang }: { lang: 'en' | 'vi' }) {
    const { pending } = useFormStatus();
    const t = translations[lang];

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-gradient-to-r from-[#0054a6] to-[#003d7a] text-white py-3 rounded-lg font-medium hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
            {pending ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t.signingIn}
                </>
            ) : (
                <>
                    <LogIn className="w-5 h-5" />
                    {t.signIn}
                </>
            )}
        </button>
    );
}

export default function LoginForm({ lang }: LoginFormProps) {
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const t = translations[lang];

    async function handleSubmit(formData: FormData) {
        setError('');

        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        if (!username || !password) {
            setError(t.required);
            return;
        }

        try {
            const result = await signIn('credentials', {
                username,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError(t.error);
            } else {
                router.push('/admin');
                router.refresh();
            }
        } catch (err) {
            setError(t.error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
            <div className="w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">WG Technology</h1>
                    <p className="text-blue-200">{t.subtitle}</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
                    <h2 className="text-2xl font-bold text-white mb-6">{t.title}</h2>

                    <form action={handleSubmit} className="space-y-5">
                        {/* Username Input */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-blue-100 mb-2">
                                {t.username}
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                placeholder={t.username}
                                autoComplete="username"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-blue-100 mb-2">
                                {t.password}
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                placeholder={t.password}
                                autoComplete="current-password"
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <SubmitButton lang={lang} />
                    </form>

                    {/* Language Toggle */}
                    <div className="mt-6 text-center">
                        <a
                            href={lang === 'en' ? '/login?lang=vi' : '/login?lang=en'}
                            className="text-sm text-blue-200 hover:text-white transition-colors"
                        >
                            {lang === 'en' ? '🇻🇳 Tiếng Việt' : '🇬🇧 English'}
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-blue-200/60 text-sm mt-6">
                    © 2026 WG Technology. All rights reserved.
                </p>
            </div>
        </div>
    );
}
