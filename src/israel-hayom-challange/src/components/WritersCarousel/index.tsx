import { NextPage } from 'next'
import { useState } from 'react'
import styles from './WritersCarousel.module.scss'
import { httpService } from '@/services/httpsService.service'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import CarouselHeader from './parts/CarouselHeader'
import { Carousel } from '../Carousel'
import WriterPreview from './parts/WriterPreview'
import { Writer } from '@/interfaces/writer.model'

interface Props {
    writers?: Writer[]
    currPage: number
    totalPages: number
}

const CAROUSEL_SETTINGS = {
    dots: false,
    arrows: false,
    infinite: true,
    variableWidth: true,
    slidesToScroll: 1,
    swipeToSlide: true,
    rtl: true,
}

export const WritersCarousel: NextPage<Props> = ({ writers, currPage, totalPages }) => {
    const [currentPage, setCurrentPage] = useState(currPage || 0)
    const [loadedWriters, setLoadedWriters] = useState<Writer[] | []>(writers || [])
    console.log('loadedWriters:', loadedWriters)
    const onFetchMore = async () => {
        if (currentPage === totalPages) return
        try {
            const data = await httpService.get(`writers?page=${currentPage + 1}`)
            const { writers: moreWriters } = data
            setCurrentPage(currentPage + 1)
            setLoadedWriters(prevWriters => [...prevWriters, ...moreWriters])
        } catch (err) {
            console.log('Failed to fetch more data:', err)
        }
    }

    return (
        <div className={styles['writers-carousel']}>
            <CarouselHeader />
            {loadedWriters && loadedWriters.length ? (
                <Carousel
                    settings={CAROUSEL_SETTINGS}
                    renderSlide={(slide: Writer, index: number) => <WriterPreview key={index} writer={slide} />}
                    onFetchMore={onFetchMore}
                    slides={loadedWriters}
                />
            ) : (
                <p className={styles.error}>
                    <AiOutlineExclamationCircle size={'1.125rem'} /> לא נמצאו כותבים לתצוגה
                </p>
            )}
        </div>
    )
}

export default WritersCarousel
