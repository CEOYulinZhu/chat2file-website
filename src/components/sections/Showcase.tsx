"use client";
import React from 'react';
import Image from 'next/image';
import SectionHeader from '../common/SectionHeader';

const imageData = [
    {
        image: '/images/01.png',
        width: 1600,
        height: 900,
    },
    {
        image: '/images/02.png',
        width: 1200,
        height: 1920,
    },
    {
        image: '/images/03.png',
        width: 1200,
        height: 900,
    }
];

interface ShowcaseProps {
    dictionary: {
        section_header: {
            title_part1: string;
            title_part2: string;
            subtitle: string;
        };
        items: {
            name: string;
            description: string;
        }[];
    };
}

const Showcase = ({ dictionary }: ShowcaseProps) => {
    const showcaseData = dictionary.items.map((item, index) => ({
        ...item,
        ...imageData[index],
    }));

    return (
        <section id="showcase" className="py-20 md:py-32 bg-white dark:bg-black">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title={<>{dictionary.section_header.title_part1}<span className="text-blue-500">{dictionary.section_header.title_part2}</span></>}
                    subtitle={dictionary.section_header.subtitle}
                />
                <div className="mt-16 md:mt-24 space-y-24 md:space-y-32">
                    {showcaseData.map((item, index) => (
                        <div key={item.name} className="grid md:grid-cols-2 gap-20 md:gap-60 items-center">
                            <div className={` ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                                <div className={`max-w-md ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                                    <h3 className="text-3xl md:text-5xl font-bold mb-5 text-gray-900 dark:text-white">{item.name}</h3>
                                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                            <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                                <div className="w-full rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-800 transition-transform duration-500 ease-in-out hover:scale-[1.02] max-h-[520px]">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${item.image}`}
                                        alt={`${item.name} Showcase`}
                                        width={item.width}
                                        height={item.height}
                                        className="object-cover object-top w-full h-full"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Showcase; 