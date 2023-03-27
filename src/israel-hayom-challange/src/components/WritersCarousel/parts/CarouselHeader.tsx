import { NextPage } from 'next'
import styles from '../WritersCarousel.module.scss'
interface Props {}

const CarouselHeader: NextPage<Props> = ({}) => {
    return (
        <section className={`${styles['carousel-header']} flex align-center justify-between`}>
            <h1>
                <span className='font-light'>נבחרת</span>הכתבים
            </h1>
            <button>{'>>'}</button>
        </section>
    )
}

export default CarouselHeader
