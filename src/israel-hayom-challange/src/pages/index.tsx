import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import { GetServerSideProps } from 'next'
import WritersCarousel from '@/components/WritersCarousel'

const inter = Inter({ subsets: ['latin'] })

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
    return (
        <>
            <Head>
                <title>WritersCarousel</title>
                <meta name='description' content='A Challange given by Israel-Hayom' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className={styles.main}>
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
            writers: data,
        },
    }
}
