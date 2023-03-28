import { Writer } from '@/pages'
import { NextPage } from 'next'
import Image from 'next/image'
import styles from '../WritersCarousel.module.scss'

interface Props {
    writer: Writer
}
const IMG_MAX_WIDTH = 184,
    IMG_MAX_HEIGHT = 223

const WriterPreview: NextPage<Props> = ({ writer }) => {
    return (
        <article>
            <div className={styles['writer-preview']}>
                <Image
                    width={IMG_MAX_WIDTH}
                    height={IMG_MAX_HEIGHT}
                    className={styles['writer-img']}
                    src={writer.img_url}
                    alt='writer'
                />
                <h2>{writer.name}</h2>
            </div>
            <ul className={`${styles['posts-list']} flex column clean-list`}>
                {writer.posts.map(post => (
                    <li key={post.id}>{post.content}</li>
                ))}
            </ul>
        </article>
    )
}

export default WriterPreview
