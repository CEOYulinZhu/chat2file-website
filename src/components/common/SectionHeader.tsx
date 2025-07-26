import React from 'react';

interface SectionHeaderProps {
    title: React.ReactNode;
    subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
    return (
        <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white">
                {title}
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 mt-6 font-light">
                {subtitle}
            </p>
            <div className="mt-8 h-px w-64 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>
    );
};

export default SectionHeader; 