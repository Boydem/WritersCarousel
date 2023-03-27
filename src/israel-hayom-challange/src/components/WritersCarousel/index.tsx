import { Writer } from '@/pages'
import { NextPage } from 'next'
import { UIEventHandler, useRef, useState, useEffect } from 'react'
import styles from './WritersCarousel.module.scss'

import WriterPreview from './parts/WriterPreview'
import CarouselHeader from './parts/CarouselHeader'
import CarouselNavigation from './parts/CarouselNavigation'
import { Carousel } from '../Carousel'

interface Props {
    writers: Writer[]
}

export const WritersCarousel: NextPage<Props> = ({ writers }) => {
    return (
        <div className={styles['writers-carousel']}>
            <CarouselHeader />
            <main className={styles.main}>
                <Carousel slides={writers} />
            </main>
        </div>
    )
}

export default WritersCarousel
