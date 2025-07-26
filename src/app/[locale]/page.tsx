import { getDictionary } from "@/get-dictionary";
import { Header } from "@/components/common/Header";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Showcase from "@/components/sections/Showcase";
import Timeline from "@/components/sections/Timeline";
import Help from "@/components/sections/Help";
import Feedback from "@/components/sections/Feedback";
import { Locale } from "@/i18n-config";

interface HomeProps {
    params: Promise<{ locale: Locale }>;
}

export default async function Home({ params }: HomeProps) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);
    return (
        <div className="flex flex-col min-h-screen">
            <Header dictionary={dictionary.header} />
            <main className="flex-grow">
                <Hero dictionary={dictionary.hero} />
                <Features dictionary={dictionary.features} />
                <Showcase dictionary={dictionary.showcase} />
                <Timeline dictionary={dictionary.timeline} />
                <Help dictionary={dictionary.help} />
                <Feedback dictionary={dictionary.feedback} />
            </main>
        </div>
    );
} 