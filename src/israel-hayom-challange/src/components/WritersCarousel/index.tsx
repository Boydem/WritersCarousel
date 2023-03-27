import { Writer } from '@/pages'
import { NextPage } from 'next'
import { UIEventHandler, useRef, useState, useEffect } from 'react'
import styles from './WritersCarousel.module.scss'

import CarouselHeader from './parts/CarouselHeader'
import { Carousel } from '../Carousel'

interface Props {
    writers: Writer[]
}

export const WritersCarousel: NextPage<Props> = ({ writers }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [loadedWriters, setLoadedWriters] = useState(writers)

    const onFetchMore = async () => {
        const res = await fetch(`http://localhost/api/writers?page=${currentPage + 1}`)
        const data = await res.json()

        setCurrentPage(currentPage + 1)
        setLoadedWriters([...loadedWriters, ...data])
    }

    return (
        <div className={styles['writers-carousel']}>
            <CarouselHeader />
            <Carousel onFetchMore={onFetchMore} slides={writers} />
        </div>
    )
}

export default WritersCarousel
