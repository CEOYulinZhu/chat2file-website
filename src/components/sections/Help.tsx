import React from 'react';
import { HelpCircle, CheckCircle, Settings } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

const icons = {
    HelpCircle: <HelpCircle size={36} className="text-blue-500" />,
    CheckCircle: <CheckCircle size={36} className="text-blue-500" />,
    Settings: <Settings size={36} className="text-blue-500" />,
};

interface HelpProps {
    dictionary: {
        section_header: {
            title_part1: string;
            title_part2: string;
            subtitle: string;
        };
        items: {
            question: string;
            answer: string;
        }[];
    };
}

const Help = ({ dictionary }: HelpProps) => {
    return (
        <section id="help" className="py-24 md:py-40 bg-white dark:bg-black">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title={<>{dictionary.section_header.title_part1}<span className="text-blue-500">{dictionary.section_header.title_part2}</span></>}
                    subtitle={dictionary.section_header.subtitle}
                />
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-12">
                        {dictionary.items.map((item, index) => (
                            <div key={index} className="flex flex-col items-center text-center">
                                <div className="flex-shrink-0 mb-5">
                                    {React.cloneElement(Object.values(icons)[index % 3], { size: 48, className: "text-blue-500" })}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    {item.question}
                                </h3>
                                <p className="text-md text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {item.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Help; 