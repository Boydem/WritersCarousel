import { ComponentType, useEffect, useRef } from 'react'
import Slider, { Settings } from 'react-slick'
import styles from './Carousel.module.scss'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

interface Props<T> {
    slides: T[]
    onFetchMore: () => void
    renderSlide: (slide: T, index: number) => React.ReactNode
    settings: Settings
}

export const Carousel = <T extends {}>({ slides, onFetchMore, renderSlide, settings }: Props<T>) => {
    const sliderRef = useRef<Slider>(null)

    const handleNextPrev = (direction: 'next' | 'prev') => {
        if (sliderRef.current) {
            if (direction === 'next') {
                sliderRef.current.slickNext()
            } else {
                sliderRef.current.slickPrev()
            }
        }
    }

    const handleAfterChange = (currentSlideIndex: number) => {
        const threshold = 1
        console.log('currentSlideIndex:', currentSlideIndex)
        if (currentSlideIndex === slides.length - threshold) {
            onFetchMore()
        }
    }

    return (
        <div className={styles.carousel}>
            <Slider className={styles.slider} {...settings} ref={sliderRef} afterChange={handleAfterChange}>
                {slides.map((slide, index) => (
                    <div key={index} className={styles['slider-item']}>
                        {renderSlide(slide, index)}
                    </div>
                ))}
            </Slider>
            <div className={styles.navigation}>
                <button onClick={() => handleNextPrev('next')}>
                    <FaArrowRight />
                </button>
                <button onClick={() => handleNextPrev('prev')}>
                    <FaArrowLeft />
                </button>
            </div>
        </div>
    )
}
