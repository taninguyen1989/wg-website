import LoginForm from '@/components/LoginForm';

interface LoginPageProps {
    searchParams: {
        lang?: 'en' | 'vi';
    };
}

export const metadata = {
    title: 'Login - WG Technology Admin',
    description: 'Admin login portal for WG Technology',
};

export default function LoginPage({ searchParams }: LoginPageProps) {
    const lang = searchParams.lang || 'en';

    return <LoginForm lang={lang} />;
}
