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
    return (
        <div className={styles['writers-carousel']}>
            <CarouselHeader />
            <Carousel slides={writers} />
        </div>
    )
}

export default WritersCarousel
