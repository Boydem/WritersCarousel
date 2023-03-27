import { Writer } from '@/pages'
import { NextPage } from 'next'
import { UIEventHandler, useRef, useState, useEffect } from 'react'
import styles from './WritersCarousel.module.scss'

import WriterPreview from './parts/WriterPreview'
import CarouselHeader from './parts/CarouselHeader'
import CarouselNavigation from './parts/CarouselNavigation'

interface Props {
    writers: Writer[]
}

export const WritersCarousel: NextPage<Props> = ({ writers }) => {
    const containerRef = useRef<HTMLUListElement>(null)
    const [currentSlide, setCurrentSlide] = useState(0)

    const handleScroll: UIEventHandler<HTMLUListElement> = ev => {
        const container = ev.currentTarget
        const { scrollLeft, clientWidth, scrollWidth } = container
        const marginOfError = 1

        if (scrollLeft <= marginOfError) {
            setCurrentSlide(0)
            container.style.transform = `translateX(0)`
        } else if (scrollWidth - scrollLeft - clientWidth <= marginOfError) {
            setCurrentSlide(writers.length - 1)
            container.style.transform = `translateX(-${currentSlide * (clientWidth + 10)}px)`
        } else {
            const slide = Math.round(scrollLeft / (clientWidth + 10))
            setCurrentSlide(slide)
            container.style.transform = `translateX(-${slide * (clientWidth + 10)}px)`
        }
    }

    const onScrollWriters = (direction: number) => {
        const container = containerRef.current
        if (container) {
            const { clientWidth } = container
            if (direction < 0 && currentSlide === writers.length - 1) {
                setCurrentSlide(0)
                container.style.transform = `translateX(0)`
            } else if (direction > 0 && currentSlide === 0) {
                setCurrentSlide(writers.length - 1)
                container.style.transform = `translateX(-${currentSlide * (clientWidth + 10)}px)`
            } else {
                const slide = currentSlide + direction
                setCurrentSlide(slide)
                container.style.transform = `translateX(-${slide * (clientWidth + 10)}px)`
            }
        }
    }

    useEffect(() => {
        const container = containerRef.current
        if (container) {
            container.style.transform = `translateX(-${currentSlide * (container.clientWidth + 10)}px)`
        }
    }, [currentSlide])

    return (
        <div className={styles['writers-carousel']}>
            <CarouselHeader />
            <main className={styles.main}>
                <ul className={`${styles['writers-list']} clean-list`} onScroll={handleScroll} ref={containerRef}>
                    {writers.map(writer => (
                        <WriterPreview key={writer.id} writer={writer} />
                    ))}
                </ul>
                <CarouselNavigation onScrollWriters={onScrollWriters} />
            </main>
        </div>
    )
}

export default WritersCarousel
