import React from 'react';
import Button from '@/components/ui/Button';

interface HeroProps {
    dictionary: {
        title: string;
        subtitle: string;
        cta_button: string;
    };
}

const Hero = ({ dictionary }: HeroProps) => {
    return (
        <section
            className="flex items-center justify-center bg-white pt-16 h-screen"
        >
            <div className="container mx-auto max-w-screen-lg px-4 text-center">
                <div className="animate-fade-in-up space-y-4">
                    <h1 className="text-6xl font-bold tracking-tight text-gray-900 md:text-8xl">
                        {dictionary.title}
                    </h1>
                    <div className="mx-auto h-0.5 w-32 bg-[--brand-blue]"></div>
                    <p className="mx-auto max-w-3xl text-lg text-[--foreground-light] md:text-xl">
                        {dictionary.subtitle}
                    </p>
                    <div className="flex justify-center pt-4">
                        <a href="https://microsoftedge.microsoft.com/addons/detail/chat2filedeepseek/lhpfomlihfgoafkcppfljokecljilafi" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="cta-button brand text-lg px-20 py-4">
                                {dictionary.cta_button}
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero; 