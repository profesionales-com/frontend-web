'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

interface CarouselProps {
    images: string[]
    intervalMs?: number // autoplay interval (default 5000ms)
}

export default function Carousel({ images, intervalMs = 5000 }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerHeight, setContainerHeight] = useState<number>(0)
    const imageRatios = useRef<(number | null)[]>(images.map(() => null))
    const touchStartX = useRef<number>(0)
    const touchEndX = useRef<number>(0)
    const swipeThreshold = 50 // px needed to qualify as swipe

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    // Autoplay
    useEffect(() => {
        startAutoplay()
        return stopAutoplay
    }, [intervalMs])

    const startAutoplay = () => {
        stopAutoplay()
        intervalRef.current = setInterval(goToNext, intervalMs)
    }

    const stopAutoplay = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    // Update container height when currentIndex or ratio changes
    useEffect(() => {
        const ratio = imageRatios.current[currentIndex]
        const width = containerRef.current?.offsetWidth || 0
        if (ratio && width) {
            setContainerHeight(width * ratio)
        }
    }, [currentIndex])

    // Handlers for touch/swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        stopAutoplay()
        touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX
    }

    const handleTouchEnd = () => {
        const distance = touchStartX.current - touchEndX.current
        if (distance > swipeThreshold) {
            goToNext()
        } else if (distance < -swipeThreshold) {
            goToPrev()
        }
        startAutoplay()
    }

    // Called when Next/Image finishes loading
    const handleImageLoad = (idx: number, naturalWidth: number, naturalHeight: number) => {
        const ratio = naturalHeight / naturalWidth
        imageRatios.current[idx] = ratio
        if (idx === currentIndex && containerRef.current) {
            const width = containerRef.current.offsetWidth
            setContainerHeight(width * ratio)
        }
    }

    const ArrowSVG = ({ rotate }: { rotate: number }) => (
        <svg
            className="w-[40px] h-[40px] transition-transform duration-200"
            style={{ transform: `rotate(${rotate}deg)` }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
        >
            <path
                d="M17.8726 5.84272L17.1573 5.12736C16.9875 4.95755 16.7129 4.95755 16.5431 5.12736L10 11.656L3.45693 5.12736C3.28712 4.95755 3.01253 4.95755 2.84272 5.12736L2.12736 5.84272C1.95755 6.01253 1.95755 6.28712 2.12736 6.45693L9.6929 14.0225C9.86271 14.1923 10.1373 14.1923 10.3071 14.0225L17.8726 6.45693C18.0425 6.28712 18.0425 6.01253 17.8726 5.84272Z"
                fill="currentColor"
            />
        </svg>
    )

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden"
            style={{ height: containerHeight ? `${containerHeight}px` : 'auto' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Image Container */}
            <div className="w-full h-full flex items-center justify-center bg-[var(--color-background)] relative">
                <div className="w-full h-full overflow-hidden relative">
                    <div
                        className="flex w-full h-full transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {images.map((src, idx) => (
                            <div key={idx} className="w-full h-full flex-shrink-0 relative">
                                <Image
                                    src={src}
                                    alt={`Slide ${idx + 1}`}
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                    onLoad={e => {
                                        const img = e.currentTarget as HTMLImageElement
                                        handleImageLoad(idx, img.naturalWidth, img.naturalHeight)
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Prev Button */}
            <button
                onClick={() => { stopAutoplay(); goToPrev(); startAutoplay() }}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-[var(--color-foreground)] p-2 cursor-pointer"
                aria-label="Previous"
            >
                <ArrowSVG rotate={90} />
            </button>

            {/* Next Button */}
            <button
                onClick={() => { stopAutoplay(); goToNext(); startAutoplay() }}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-[var(--color-foreground)] rounded-full p-2 cursor-pointer"
                aria-label="Next"
            >
                <ArrowSVG rotate={-90} />
            </button>
        </div>
    )
}
