"use client";

import Link from 'next/link';
import React, { MouseEvent } from 'react';

interface SmoothLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    passHref?: boolean;
}

const SmoothLink: React.FC<SmoothLinkProps> = ({ href, children, className, onClick, passHref }) => {
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = href.substring(1); 
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, 
                behavior: 'smooth',
            });
        }

        if (onClick) {
            onClick();
        }
    };

    return (
        <Link href={href} onClick={handleClick} className={className} passHref={passHref}>
            {children}
        </Link>
    );
};

export default SmoothLink; 