import './globals.css';
import { Inter } from 'next/font/google';
import { i18n } from '../../i18n-config';
import { Locale } from '../../i18n-config';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
    return i18n.locales.map((locale: Locale) => ({ locale }));
}

interface RootLayoutProps {
    children: React.ReactNode;
    params: Promise<{
        locale: Locale;
    }>;
}

export default async function RootLayout({
    children,
    params,
}: RootLayoutProps) {
    const { locale } = await params;
    return (
        <html lang={locale}>
            <body className={inter.className}>{children}</body>
        </html>
    );
} 