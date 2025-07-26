import React from 'react';
import { MessageSquare, FileUp, Settings } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

const icons = {
    MessageSquare: <MessageSquare size={36} className="text-blue-500" />,
    Settings: <Settings size={36} className="text-blue-500" />,
    FileUp: <FileUp size={36} className="text-blue-500" />,
};

interface FeaturesProps {
    dictionary: {
        section_header: {
            title_part1: string;
            title_part2: string;
            subtitle: string;
        };
        items: {
            title: string;
            description: string;
        }[];
    };
}

const Features = ({ dictionary }: FeaturesProps) => {
    const features = dictionary.items.map((item, index) => ({
        ...item,
        icon: Object.values(icons)[index],
    }));

    return (
        <section id="features" className="min-h-screen flex flex-col bg-white dark:bg-black">
            <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col flex-grow">
                <SectionHeader
                    title={<>{dictionary.section_header.title_part1}<span className="text-blue-500">{dictionary.section_header.title_part2}</span></>}
                    subtitle={dictionary.section_header.subtitle}
                />
                <div className="grid md:grid-cols-3 gap-x-12 gap-y-24 flex-grow items-start pt-16">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center flex flex-col items-center">
                            <div className="mb-6">
                                {React.cloneElement(feature.icon, { size: 48 })}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features; 