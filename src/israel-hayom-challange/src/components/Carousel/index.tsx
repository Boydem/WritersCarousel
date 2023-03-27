import { useRef } from 'react'
import Slider from 'react-slick'
import WriterPreview from '../WritersCarousel/parts/WriterPreview'
import styles from './Carousel.module.scss'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

type Props = {
    slides: any[]
}

const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    variableWidth: true,
}

export const Carousel = ({ slides }: Props) => {
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

    return (
        <div className={styles.carousel}>
            <Slider className={styles.slider} {...settings} ref={sliderRef}>
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
