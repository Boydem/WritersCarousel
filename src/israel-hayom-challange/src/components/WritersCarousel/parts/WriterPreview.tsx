import { Writer } from '@/pages'
import { NextPage } from 'next'
import Image from 'next/image'
import styles from '../WritersCarousel.module.scss'

interface Props {
    writer: Writer
}

const WriterPreview: NextPage<Props> = ({ writer }) => {
    return (
        <article>
            <div className={styles['writer-preview']}>
                <Image width={184} height={223} className={styles['writer-img']} src={writer.img_url} alt='writer' />
                <h2>{writer.name}</h2>
            </div>
            <ul className={`${styles['posts-list']} flex column clean-list`}>
                {writer.posts.map(post => (
                    <li key={post.id}>לורם איפסום דולור סיט אמט, קנסטרקטר עלית גל'</li>
                ))}
            </ul>
        </article>
    )
}

export default WriterPreview
