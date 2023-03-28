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

    const handleNext = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext()
        }
    }

    const handlePrev = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev()
        }
    }

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(0)
        }
    }, [])

    const handleAfterChange = (currentSlideIndex: number) => {
        const threshold = 2
        if (currentSlideIndex >= slides.length - threshold) {
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
                <button onClick={handleNext}>
                    <FaArrowRight />
                </button>
                <button onClick={handlePrev}>
                    <FaArrowLeft />
                </button>
            </div>
        </div>
    )
}
