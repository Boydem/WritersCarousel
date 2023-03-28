import { useEffect, useRef } from 'react'
import Slider from 'react-slick'
import WriterPreview from '../WritersCarousel/parts/WriterPreview'
import styles from './Carousel.module.scss'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

type Props = {
    slides: any[]
    onFetchMore: () => void // callback to fetch more data
}

const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    variableWidth: true,
    slidesToScroll: 1,
    swipeToSlide: true,
}

export const Carousel = ({ slides, onFetchMore }: Props) => {
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
        const threshold = 1 // set a threshold for when to fetch more data
        if (currentSlideIndex >= slides.length - threshold) {
            onFetchMore()
        }
    }

    return (
        <div className={styles.carousel}>
            <Slider className={styles.slider} {...settings} ref={sliderRef} afterChange={handleAfterChange}>
                {slides.map(slide => (
                    <div key={slide.id} className={styles['slider-item']}>
                        <WriterPreview writer={slide} />
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
