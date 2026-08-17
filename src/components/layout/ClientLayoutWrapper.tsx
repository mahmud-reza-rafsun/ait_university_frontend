'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAuthPage =
        pathname.includes('/sign-up') ||
        pathname.includes('/sign-in') ||
        pathname.includes('(auth)')

    return (
        <>
            {!isAuthPage && <Navbar />}
            <main className="flex-1">{children}</main>
            {!isAuthPage && <Footer />}
        </>
    )
}
