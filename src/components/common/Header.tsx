"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useState } from "react";
import SmoothLink from "./SmoothLink"; // Import the new component

const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);

interface HeaderProps {
    dictionary: {
        features: string;
        showcase: string;
        timeline: string;
        help: string;
        feedback: string;
    };
}

export function Header({ dictionary }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const navLinks = (
        <>
            <SmoothLink
                href="#features"
                onClick={closeMenu}
                className="nav-link text-lg font-normal text-[--foreground-light] hover:text-[--brand-blue] md:text-sm"
            >
                {dictionary.features}
            </SmoothLink>
            <SmoothLink
                href="#showcase"
                onClick={closeMenu}
                className="nav-link text-lg font-normal text-[--foreground-light] hover:text-[--brand-blue] md:text-sm"
            >
                {dictionary.showcase}
            </SmoothLink>
            <SmoothLink
                href="#timeline"
                onClick={closeMenu}
                className="nav-link text-lg font-normal text-[--foreground-light] hover:text-[--brand-blue] md:text-sm"
            >
                {dictionary.timeline}
            </SmoothLink>
            <SmoothLink
                href="#help"
                onClick={closeMenu}
                className="nav-link text-lg font-normal text-[--foreground-light] hover:text-[--brand-blue] md:text-sm"
            >
                {dictionary.help}
            </SmoothLink>
            <SmoothLink
                href="#feedback"
                onClick={closeMenu}
                className="nav-link text-lg font-normal text-[--foreground-light] hover:text-[--brand-blue] md:text-sm"
            >
                {dictionary.feedback}
            </SmoothLink>
        </>
    );

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
            <div className="container mx-auto flex h-16 max-w-screen-lg items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
                    <Image
                        src="/logo.png"
                        alt="Chat2File-deepseek Logo"
                        width={36}
                        height={36}
                    />
                    <span className="text-xl font-semibold text-[--brand-blue]">
                        Chat2File-deepseek
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {navLinks}
                </nav>

                <button
                    className="md:hidden"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-sm">
                    <nav className="flex flex-col items-center gap-8 py-8">
                        {navLinks}
                    </nav>
                </div>
            )}
        </header>
    );
} 