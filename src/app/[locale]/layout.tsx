import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/common/Header";
import Footer from "@/components/common/Footer";

// const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ locale }));
}

interface MetadataProps {
    params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
    params,
}: MetadataProps): Promise<Metadata> {
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
            icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.png`,
        },
    };
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
    const dictionary = await getDictionary(locale);
    return (
        <html lang={locale}>
            <body
            // className={inter.className}
            >
                <div className="flex min-h-screen flex-col">
                    <Header dictionary={dictionary.header} />
                    <main className="flex-1">{children}</main>
                    <Footer dictionary={dictionary.footer} />
                </div>
            </body>
        </html>
    );
} 