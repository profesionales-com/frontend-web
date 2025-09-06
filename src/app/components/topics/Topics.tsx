


'use client';
import TopicModal from "../../components/topics/TopicModal";
import { topics } from "../../data";
import { useState } from "react";

export default function Topics() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const getModalPositionClass = (index: number, total: number) => {
        if (index === 0) return "left-0";
        if (index === total - 1) return "right-0";
        return "left-1/2 -translate-x-1/2";
    };

    return (
        <div className="relative z-10 w-full hidden xl:flex flex-col items-center justify-center shadow-xl">
            <div className="w-full border-b-1 opacity-20" />
            <div className="flex gap-20 py-4">
                {topics.map((topic, index) => (
                    <div
                        key={index}
                        className="relative flex flex-col items-center cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* Título */}
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-lg">{topic.title}</span>
                            <svg
                                className={`w-[20px] h-[20px] transition-transform duration-200 ${hoveredIndex === index ? 'rotate-180' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M17.8726 5.84272L17.1573 5.12736C16.9875 4.95755 16.7129 4.95755 16.5431 5.12736L10 11.656L3.45693 5.12736C3.28712 4.95755 3.01253 4.95755 2.84272 5.12736L2.12736 5.84272C1.95755 6.01253 1.95755 6.28712 2.12736 6.45693L9.6929 14.0225C9.86271 14.1923 10.1373 14.1923 10.3071 14.0225L17.8726 6.45693C18.0425 6.28712 18.0425 6.01253 17.8726 5.84272Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>

                        {/* 🔥 Bridge invisible que rellena el espacio */}
                        {hoveredIndex === index && (
                            <div className="absolute top-full h-10 w-full z-10" />
                        )}

                        {/* Modal */}
                        {hoveredIndex === index && (
                            <div
                                className={`absolute top-full mt-7 z-10 px-4 ${getModalPositionClass(index, topics.length)}`}
                            >
                                <div className="border border-[var(--color-foreground)]/10 rounded shadow-md overflow-hidden">
                                    <TopicModal topic={topic} />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
