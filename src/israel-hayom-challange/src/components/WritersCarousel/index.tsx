import { Writer } from '@/pages'
import { NextPage, GetServerSideProps } from 'next'
import Image from 'next/image'
import styles from './WritersCarousel.module.scss'

interface Props {
    writers: Writer[]
}

const WritersCarousel: NextPage<Props> = ({ writers }) => {
    console.log('writers:', writers)

    return (
        <div className={styles['writers-carousel']}>
            <section className={`${styles['carousel-header']} flex align-center justify-between`}>
                <h1>נבחרת הכתבים</h1>
                <button>{'>>'}</button>
            </section>
            <main>
                <ul className={`${styles['writers-list']} clean-list`}>
                    {writers.map(writer => (
                        <li key={writer.id} className={styles['writer-preview']}>
                            <div className={styles['writer']}>
                                <Image
                                    width={184}
                                    height={223}
                                    className={styles['writer-img']}
                                    src={writer.img_url}
                                    alt='writer'
                                />
                                <h2>{writer.name}</h2>
                            </div>
                            <ul className={`${styles['posts-list']} flex column clean-list`}>
                                {writer.posts.map(post => (
                                    <li key={post.id}>{'לורם איפסום דולור סיט אמט, קנסטרקטר עלית גל'}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    )
}

export default WritersCarousel
