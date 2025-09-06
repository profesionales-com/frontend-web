'use client';

import Image from 'next/image';

interface ImageTopCardProps {
    imageSrc: string;
    imageAlt?: string;
    title: string;
    description: string;
    buttonText: string;
    onButtonClick?: () => void;
    className?: string;
}

export default function ImageTopCard({
    imageSrc,
    imageAlt = '',
    title,
    description,
    buttonText,
    onButtonClick,
    className = '',
}: ImageTopCardProps) {
    return (
        <div className={`bg-[var(--color-foreground)] rounded-4xl shadow-lg overflow-hidden max-w-sm ${className}`}>
            <div className="w-full h-48 relative">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg text-left font-semibold text-[var(--color-background)]">{title}</h3>
                <p className="text-sm text-left text-[var(--color-background)]">{description}</p>
                <button onClick={onButtonClick} className="mt-2 self-end bg-[var(--color-background)] text-[var(--color-foreground)] px-4 py-2 rounded-full cursor-pointer">
                    {buttonText}
                </button>
            </div>
        </div>
    );
}
