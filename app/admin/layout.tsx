'use client';

import { usePathname } from 'next/navigation';
import AdminSidebar from '@/app/components/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <AdminSidebar />
            <main className="flex-1 w-full max-h-screen overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
