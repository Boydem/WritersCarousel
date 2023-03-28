import Head from 'next/head'
import { GetServerSideProps } from 'next'
import WritersCarousel from '@/components/WritersCarousel'

export type Writer = {
    id: string
    name: string
    img_url: string
    posts: {
        id: string
        title: string
        content: string
        created_at: Date
    }[]
}

export default function Home(props: { writers: Writer[] }) {
    console.log('props.writers:', props.writers)
    return (
        <>
            <Head>
                <title>WritersCarousel</title>
                <meta name='description' content='A Challange given by Israel-Hayom' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>
                <WritersCarousel writers={props.writers} />
            </main>
        </>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ctx => {
    const res = await fetch('http://localhost/api/writers')
    const data = await res.json()
    return {
        props: {
            writers: data.writers,
        },
    }
}
