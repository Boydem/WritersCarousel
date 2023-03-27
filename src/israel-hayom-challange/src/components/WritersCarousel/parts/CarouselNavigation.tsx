import { NextPage } from 'next'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import styles from '../WritersCarousel.module.scss'

interface Props {
    onScrollWriters: (direction: number) => void
}

const CarouselNavigation: NextPage<Props> = ({ onScrollWriters }) => {
    return (
        <div className={styles.navigation}>
            <button className={styles['arrow-right']} onClick={() => onScrollWriters(1)}>
                <FaArrowRight />
            </button>
            <button className={styles['arrow-left']} onClick={() => onScrollWriters(-1)}>
                <FaArrowLeft />
            </button>
        </div>
    )
}

export default CarouselNavigation
