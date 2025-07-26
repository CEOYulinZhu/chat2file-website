import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

interface FooterProps {
    dictionary: {
        title: string;
        subtitle: string;
        install_button: string;
        suggestion_text: string;
        suggestion_link: string;
    };
}

const Footer = ({ dictionary }: FooterProps) => {
    return (
        <footer className="bg-[#F9F9F9] dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 py-16 text-center">
                <h3 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white">{dictionary.title}</h3>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {dictionary.subtitle}
                </p>
                <div className="mt-8">
                    <a href="https://microsoftedge.microsoft.com/addons/detail/chat2filedeepseek/lhpfomlihfgoafkcppfljokecljilafi" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="cta-button brand text-lg px-20 py-4">{dictionary.install_button}</Button>
                    </a>
                </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
                    <div className="flex gap-4 order-2 md:order-1">
                        <p>&copy; {new Date().getFullYear()} Chat2File-deepseek. All Rights Reserved.</p>
                        <Link href="/en" className="hover:underline">English</Link>
                        <Link href="/zh" className="hover:underline">中文</Link>
                    </div>
                    <div className="order-1 md:order-2 text-center md:text-right">
                        <span>{dictionary.suggestion_text}</span>
                        <a
                            href="https://microsoftedge.microsoft.com/addons/detail/chat2filedeepseek/lhpfomlihfgoafkcppfljokecljilafi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            {dictionary.suggestion_link}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 