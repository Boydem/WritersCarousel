import { Writer } from '@/pages'
import { NextPage } from 'next'
import { UIEventHandler, useRef, useState, useEffect } from 'react'
import styles from './WritersCarousel.module.scss'

import CarouselHeader from './parts/CarouselHeader'
import { Carousel } from '../Carousel'
import { httpService } from '@/services/httpsService.service'

interface Props {
    writers: Writer[]
    currPage: number
    totalPages: number
}

export const WritersCarousel: NextPage<Props> = ({ writers, currPage, totalPages }) => {
    const [currentPage, setCurrentPage] = useState(currPage || 0)
    const [loadedWriters, setLoadedWriters] = useState(writers)

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
            <Carousel onFetchMore={onFetchMore} slides={loadedWriters} />
        </div>
    )
}

export default WritersCarousel
