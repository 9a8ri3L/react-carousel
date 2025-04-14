import React, { useCallback, useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import './carousel.css';
import '../assets/css/prism-okaidia.css';

interface CarouselProps {
    timeInterval?: number;
    autoplay?: boolean;
    cycle?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
    timeInterval,
    autoplay,
    cycle,
}) => {
    const slides = [...(Array(6) as undefined[])];
    const [slideIndex, setSlideIndex] = useState<number>(0);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const presentationRef = useRef<HTMLDivElement>(null);

    const toggleFullscreen = async () => {
        if (!presentationRef?.current) return;

        try {
            if (!document.fullscreenElement) {
                await presentationRef.current.requestFullscreen();
                setIsFullscreen(true);
            } else {
                await document.exitFullscreen();
                setIsFullscreen(false);
            }
        } catch (err) {
            console.error('Fullscreen error:', err);
        }
    };

    const nextSlide = useCallback(
        function () {
            if (slideIndex === slides.length - 1 && cycle) {
                setSlideIndex(0);
            } else if (slideIndex === slides.length - 1 && !cycle) {
                setSlideIndex(slides.length - 1);
            } else {
                setSlideIndex((prev) => prev + 1);
            }
        },
        [cycle, slideIndex, slides.length],
    );

    const prevSlide = useCallback(
        function () {
            if (slideIndex === 0 && cycle) {
                setSlideIndex(slides.length - 1);
                return;
            } else if (slideIndex === 0 && !cycle) {
                setSlideIndex(0);
            } else {
                setSlideIndex((prev) => prev - 1);
            }
        },
        [cycle, slideIndex, slides.length],
    );

    function handleSlideIndicatorClick(i: number) {
        setSlideIndex(i);
    }

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (autoplay) {
            interval = setInterval(
                () => {
                    nextSlide();
                },
                timeInterval && timeInterval >= 1000 ? timeInterval : 1000,
            );
        }
        return () => {
            if (typeof interval === 'number') {
                clearInterval(interval);
            }
        };
    }, [autoplay, nextSlide, timeInterval]);

    useEffect(() => {
        Prism.highlightAll();
    }, [autoplay, timeInterval, cycle]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isFullscreen) return;

            switch (e.key) {
                case 'ArrowRight':
                    nextSlide();
                    break;
                case 'ArrowLeft':
                    prevSlide();
                    break;
                case 'Escape':
                    toggleFullscreen();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isFullscreen, nextSlide, prevSlide]);

    return (
        <>
            <pre className='language-javascript'>
                <code>
                    {JSON.stringify({ autoplay, cycle, timeInterval }, null, 2)}
                </code>
            </pre>
            <div className='controls'>
                <span>
                    Slide {slideIndex + 1} of {slides.length}
                </span>
                <button
                    onClick={prevSlide}
                    disabled={slideIndex === 0 && !cycle}
                >
                    ⮜
                </button>
                <button title='Start Presentation' onClick={toggleFullscreen}>
                    🖵
                </button>
                <button
                    onClick={nextSlide}
                    disabled={slideIndex === slides.length - 1 && !cycle}
                >
                    ⮞
                </button>
            </div>
            <div ref={presentationRef} className='container'>
                {slides.map((_, index) => {
                    return (
                        <div
                            className='slide flex-center'
                            key={index} // For demo purpose only index is used.
                            style={{
                                transform: `translate(-${slideIndex * 100}%)`,
                            }}
                        >
                            <img
                                src={`/img/${index + 1}.jpg`}
                                alt={`Slide ${index + 1}`}
                            />
                        </div>
                    );
                })}
            </div>
            <div className='indicator-container flex-center'>
                {slides.map((_, i) => {
                    return (
                        <div
                            key={i} // For demo purpose only index is used.
                            className={
                                slideIndex === i
                                    ? 'active indicator'
                                    : 'indicator'
                            }
                            onClick={() => handleSlideIndicatorClick(i)}
                        />
                    );
                })}
            </div>
        </>
    );
};
export default Carousel;
