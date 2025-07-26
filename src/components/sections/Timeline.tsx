"use client";

import React from 'react';
import SectionHeader from '../common/SectionHeader';
import { FileText, PenTool, Zap, CheckCircle, Eye, ExternalLink } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const icons = {
    Zap,
    PenTool,
    FileText,
};

const staticData = [
    {
        icon: 'Zap',
        link: 'https://blog.csdn.net/2301_79858914/article/details/149583799?spm=1011.2415.3001.5331',
    },
    {
        icon: 'PenTool',
        link: 'https://blog.csdn.net/2301_79858914/article/details/149368021?spm=1011.2415.3001.5331',
    },
    {
        icon: 'FileText',
        link: 'https://blog.csdn.net/2301_79858914/article/details/145890056?spm=1011.2415.3001.5331',
    },
];

interface TimelineItemProps {
    item: {
        version: string;
        date: string;
        title: string;
        description: string;
        features: string[];
        reads: string;
        link_text: string;
        icon: React.ElementType;
        link: string;
    };
}

const TimelineItem = ({ item }: TimelineItemProps) => {
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.6, 0.05, 0.01, 0.99]
            }
        }
    };

    const Icon = item.icon;

    return (
        <motion.li
            className="mb-32 md:mb-40"
            variants={itemVariants}
        >
            <div className="mx-auto max-w-4xl text-center">
                <div className="mb-8 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10 dark:bg-blue-400/10">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 dark:bg-blue-400 text-white">
                            <Icon className="h-8 w-8" />
                        </div>
                    </div>
                </div>

                <p className="text-base font-semibold text-blue-600 dark:text-blue-400">{item.version} &middot; {item.date}</p>
                <h3 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-neutral-50">{item.title}</h3>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-gray-600 dark:text-neutral-300">{item.description}</p>

                <ul className="mt-8 inline-flex flex-wrap justify-center gap-x-6 gap-y-4">
                    {item.features.map(feature => (
                        <li key={feature} className="flex items-center text-base text-gray-700 dark:text-neutral-300">
                            <CheckCircle className="mr-2 h-5 w-5 text-blue-500" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-10 flex items-center justify-center space-x-8">
                    <div className="flex items-center text-sm text-gray-500 dark:text-neutral-400">
                        <Eye className="mr-1.5 h-4 w-4" />
                        <span>{item.reads}</span>
                    </div>
                    <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 transition-colors"
                    >
                        <span>{item.link_text}</span>
                        <ExternalLink className="ml-1.5 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </motion.li>
    );
};

interface TimelineProps {
    dictionary: {
        section_header: {
            title_part1: string;
            title_part2: string;
            subtitle: string;
        };
        items: {
            version: string;
            date: string;
            title: string;
            description: string;
            features: string[];
            reads: string;
            link_text: string;
        }[];
    };
}

const Timeline = ({ dictionary }: TimelineProps) => {
    const timelineData = dictionary.items.map((item, index) => ({
        ...item,
        icon: icons[staticData[index].icon as keyof typeof icons],
        link: staticData[index].link,
    }));

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    return (
        <section id="timeline" className="bg-white dark:bg-black py-24 sm:py-32 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8">
                <SectionHeader
                    title={<>{dictionary.section_header.title_part1}<span className="text-blue-500">{dictionary.section_header.title_part2}</span></>}
                    subtitle={dictionary.section_header.subtitle}
                />
                <div className="mt-24 max-w-5xl mx-auto">
                    <motion.ul
                        className="list-none p-0"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={containerVariants}
                    >
                        {timelineData.map((item) => (
                            <TimelineItem key={item.version} item={item} />
                        ))}
                    </motion.ul>
                </div>
            </div>
        </section>
    );
};

export default Timeline; 