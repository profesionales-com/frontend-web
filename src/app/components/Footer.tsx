'use client'

import Link from 'next/link';
import { useState } from 'react';
import Branding from './Branding';

interface FooterLinkTopicInterface {
    title: string;
    links: {
        name: string;
        href?: string;
        phone_number?: string;
    }[];
}

export default function Footer() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const footerLinks: FooterLinkTopicInterface[] = [
        {
            title: 'Nosotros',
            links: [
                { name: 'Acerca de', href: '/about' },
                { name: 'Contacto', href: '/contact' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { name: 'Política de privacidad', href: '/privacy-policy' },
                { name: 'Términos de servicio', href: '/terms-of-service' },
            ],
        },
        {
            title: 'Donde estamos',
            links: [
                { name: 'Clínicas', href: '/clinics' },
                { name: 'Centros médicos', href: '/medical-centers' },
                { name: 'Tomas de muestras', href: '/sample-collection' },
            ],
        },
        {
            title: 'Te ayudamos',
            links: [
                { name: 'Mesa central', phone_number: '+56 2 1234 5678' },
                { name: 'Reserva de horas', phone_number: '+56 2 2345 6789' },
                { name: 'Urgencia', phone_number: '+56 2 3456 7890' },
            ],
        }
    ];

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <footer className="w-full bg-[var(--color-foreground)]/20 text-[var(--color-foreground)] py-10">
            <div className="w-full px-6 md:px-20">
                {/* Mobile Accordion */}
                <div className="md:hidden flex flex-col gap-6">
                    {footerLinks.map((topic, index) => (
                        <div key={index} className="border-b border-[var(--color-foreground)]/30 pb-2">
                            <button
                                onClick={() => toggleIndex(index)}
                                className="w-full flex items-center justify-between cursor-pointer"
                                aria-expanded={openIndex === index}
                            >
                                <span className="font-medium text-lg">{topic.title}</span>
                                <svg
                                    className={`w-[20px] h-[20px] transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
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
                            {openIndex === index && (
                                <ul className="mt-3 flex flex-col gap-2 pl-2">
                                    {topic.links.map((link, i) => (
                                        <li key={i}>
                                            {link.phone_number ? (
                                                <div>
                                                    <p>{link.name}</p>
                                                    <p>{link.phone_number}</p>
                                                </div>
                                            ) : (
                                                <Link href={link.href!} className="hover:underline">
                                                    {link.name}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                {/* Desktop View */}
                <div className="hidden md:flex justify-center gap-30 mt-6">
                    {footerLinks.map((topic, index) => (
                        <div key={index} className="flex flex-col items-start">
                            <h1 className="text-lg font-semibold mb-2">{topic.title}</h1>
                            <ul className="flex flex-col gap-2">
                                {topic.links.map((link, i) => (
                                    <li key={i}>
                                        {link.phone_number ? (
                                            <div>
                                                <p>{link.name}</p>
                                                <p>{link.phone_number}</p>
                                            </div>
                                        ) : (
                                            <Link href={link.href!} className="hover:underline">
                                                {link.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="w-full border-b-1 opacity-20 my-6" />
            <div className="flex flex-col md:flex-row justify-between w-full px-6 md:px-20 items-center gap-5">
                <Branding className='hidden md:flex' />
                <div className="flex flex-row gap-5 items-center">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <button className="p-2 rounded-full bg-[var(--color-foreground)] cursor-pointer">
                            <span className="text-2xl">📘</span>
                        </button>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <button className="p-2 rounded-full bg-[var(--color-foreground)] cursor-pointer">
                            <span className="text-2xl">📷</span>
                        </button>
                    </a>
                    <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                        <button className="p-2 rounded-full bg-[var(--color-foreground)] cursor-pointer">
                            <span className="text-2xl">🐦</span>
                        </button>
                    </a>
                </div>
                <div className="flex items-center gap-2 text-sm ">
                    &copy; {new Date().getFullYear()}, <span>Nombre empresa</span>
                </div>
            </div>
        </footer>
    );
}
