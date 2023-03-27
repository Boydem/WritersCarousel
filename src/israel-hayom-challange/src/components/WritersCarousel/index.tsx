import { Writer } from '@/pages'
import { NextPage, GetServerSideProps } from 'next'

interface Props {
    writers: Writer[]
}

const WritersCarousel: NextPage<Props> = ({ writers }) => {
    console.log('writers:', writers)

    return (
        <div className='writers-carousel'>
            <section className='header'>
                <h1>נבחרת הכתבים</h1>
                <button className='btn-next-page'>{'<<'}</button>
            </section>
            <section className='carousel-body'>
                <ul className='writers-list clean-list'>
                    {writers.map(writer => (
                        <li key={writer.id} className='writer-preview'>
                            <div className='writer'>
                                {writer.img_url}
                                <div className='name'>{writer.name}</div>
                            </div>
                            <ul className='posts-list-preview clean-list'>
                                {writer.posts.map(post => (
                                    <li key={post.id}>{post.content}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default WritersCarousel
