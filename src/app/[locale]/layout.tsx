import './globals.css';
import { Inter } from 'next/font/google';
import { i18n, Locale } from '../../i18n-config';
import { getDictionary } from '@/get-dictionary';

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

interface MetadataProps {
    params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: MetadataProps) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);
    const {
        seo: { title, description, keywords },
    } = dictionary;

    return {
        title: title,
        description: description,
        keywords: keywords,
        icons: {
            icon: '/logo.png',
        },
    };
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