'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, FileText, LogOut } from 'lucide-react';

export default function AdminNav() {
    const pathname = usePathname();

    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/blog', label: 'Blog Posts', icon: FileText },
    ];

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/login' });
    };

    return (
        <nav className="bg-slate-900 border-r border-slate-700 w-64 min-h-screen p-6 flex flex-col">
            {/* Logo */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">WG Admin</h1>
                <p className="text-sm text-slate-400 mt-1">Content Management</p>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all mt-auto"
            >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
            </button>
        </nav>
    );
}
