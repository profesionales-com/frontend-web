'use client';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import Branding from './Branding';
import { topics } from '../data';

export default function Header() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [openTopic, setOpenTopic] = useState<number>(-1);
    const [openSubtitle, setOpenSubtitle] = useState<number>(-1);

    // ref for mobile menu to detect outside clicks
    const menuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const handleTopicClick = (idx: number) => {
        if (openTopic === idx) {
            setOpenTopic(-1);
            setOpenSubtitle(-1);
        } else {
            setOpenTopic(idx);
            setOpenSubtitle(-1);
        }
    };

    const handleSubtitleClick = (idx: number) => {
        if (openSubtitle === idx) {
            setOpenSubtitle(-1);
        } else {
            setOpenSubtitle(idx);
        }
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (storedTheme) {
            setIsDarkMode(storedTheme === 'dark');
        } else {
            setIsDarkMode(systemPrefersDark);
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    // Close mobile menu on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && 
                !menuRef.current.contains(event.target as Node)&&
                !menuButtonRef.current?.contains(event.target as Node)
            ) {
                setMobileMenuOpen(false);
            }
        };
        if (mobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileMenuOpen]);

    return (
        <header className="flex content-between w-full justify-between px-4 md:px-20 py-5 shadow-xl xl:shadow-none relative">
            {/* Logo y nombre */}
            <Branding />

            {/* Navegación y botones */}
            <nav className="flex items-center justify-between gap-2 md:gap-10">
                <ul className="flex gap-6 items-center">
                    <li className='hidden xl:flex'>
                        <Link href="/">Inicio</Link>
                    </li>
                    <li className='hidden xl:flex'>
                        <Link href="/help">Centro de ayuda</Link>
                    </li>
                    {/* <li>
                        <Link href="/account">Cuenta</Link>
                    </li> */}
                    <li className='flex items-center'>
                        <Link href="/appointment">
                            <button className="rounded-full md:rounded-l-full md:rounded-r-none cursor-pointer transition-colors flex items-center justify-center bg-foreground text-background gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                                <p> Reservar</p>
                                <p className='hidden md:flex'>hora</p>
                            </button>
                        </Link>
                        <Link href="/cancel-appointment" className='hidden md:flex'>
                            <button className="rounded-r-full border cursor-pointer h-10 sm:h-12 px-2 w-15 text-xs text-start">
                                Anular hora
                            </button>
                        </Link>
                    </li>
                </ul>
                {/* Dentro de tu botón de mobile menu: */}
                <button
                    ref={menuButtonRef}
                    className="xl:hidden p-2 ml-4 cursor-pointer"
                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                >
                    {mobileMenuOpen ? (
                        // Icono “X” (cerrar)
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        // Icono “hamburguesa”
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>


                <button
                    onClick={() => setIsDarkMode((prev) => !prev)}
                    className="p-2 border-2 border-[var(--color-foreground)]/50 rounded-full cursor-pointer hidden xl:flex"
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div
                    ref={menuRef}
                    className="xl:hidden absolute top-full left-0 w-full bg-[var(--color-background)] shadow-lg rounded-b-3xl z-50 overflow-hidden border-t border-[var(--color-foreground)]/20"
                >
                    <nav className="flex flex-col space-y-2 p-4">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)}>Inicio</Link>
                        <Link href="/help" onClick={() => setMobileMenuOpen(false)}>Centro de ayuda</Link>
                        <Link href="/cancel-appointment" className="md:hidden flex" onClick={() => setMobileMenuOpen(false)}>Anular hora</Link>
                        <div className="border-t border-[var(--color-foreground)]/20 my-2" />

                        {topics.map((topic, ti) => (
                            <div key={ti} className="mb-2">
                                <button
                                    className="w-full text-left py-2 rounded flex justify-between items-center cursor-pointer"
                                    onClick={() => handleTopicClick(ti)}
                                >
                                    <span className="font-medium">{topic.title}</span>
                                    <svg
                                        className={`w-5 h-5 transform transition-transform duration-200 origin-center ${openTopic === ti ? 'rotate-180' : ''} ml-2`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M17.8726 5.84272L17.1573 5.12736C16.9875 4.95755 16.7129 4.95755 16.5431 5.12736L10 11.656L3.45693 5.12736C3.28712 4.95755 3.01253 4.95755 2.84272 5.12736L2.12736 5.84272C1.95755 6.01253 1.95755 6.28712 2.12736 6.45693L9.6929 14.0225C9.86271 14.1923 10.1373 14.1923 10.3071 14.0225L17.8726 6.45693C18.0425 6.28712 18.0425 6.01253 17.8726 5.84272Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>

                                {openTopic === ti && (
                                    <div className="mt-1 ml-4">
                                        {topic.content.length > 1 ? (
                                            topic.content.map((sub, si) => (
                                                <div key={si} className="mb-1">
                                                    <button
                                                        className="w-full text-left py-1 rounded flex justify-between items-center cursor-pointer"
                                                        onClick={() => handleSubtitleClick(si)}
                                                    >
                                                        <span>{sub.subtitle}</span>
                                                        <svg
                                                            className={`w-5 h-5 transform transition-transform duration-200 origin-center ${openSubtitle === si ? 'rotate-180' : ''} ml-2`}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                d="M17.8726 5.84272L17.1573 5.12736C16.9875 4.95755 16.7129 4.95755 16.5431 5.12736L10 11.656L3.45693 5.12736C3.28712 4.95755 3.01253 4.95755 2.84272 5.12736L2.12736 5.84272C1.95755 6.01253 1.95755 6.28712 2.12736 6.45693L9.6929 14.0225C9.86271 14.1923 10.1373 14.1923 10.3071 14.0225L17.8726 6.45693C18.0425 6.28712 18.0425 6.01253 17.8726 5.84272Z"
                                                                fill="currentColor"
                                                            />
                                                        </svg>
                                                    </button>

                                                    {openSubtitle === si && (
                                                        <ul className="mt-1 pl-4 space-y-1">
                                                            {sub.items.map((item, ii) => (
                                                                <li key={ii}>
                                                                    <button className="w-full text-left py-1 px-2 rounded cursor-pointer">
                                                                        {item.name}
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <ul className="space-y-1">
                                                {topic.content[0].items.map((item, ii) => (
                                                    <li key={ii}>
                                                        <button className="w-full text-left py-1 px-2 rounded cursor-pointer">
                                                            {item.name}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="border-t border-[var(--color-foreground)]/20 my-2" />
                        <button
                            onClick={() => setIsDarkMode(prev => !prev)}
                            className="flex items-center pt-2 cursor-pointer"
                        >
                            {isDarkMode ? '☀️ Claro' : '🌙 Oscuro'}
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}
