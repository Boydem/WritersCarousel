import Head from 'next/head'
import { GetServerSideProps } from 'next'
import WritersCarousel from '@/components/WritersCarousel'
import { httpService } from '@/services/http.service'
import { Writer } from '@/interfaces/writer.model'
import { writerService } from '@/services/writer.service'

interface Props {
    writers: Writer[]
    totalPages: number
    currentPage: number
}

export default function Home(props: Props) {
    return (
        <>
            <Head>
                <title>WritersCarousel</title>
                <meta name='description' content='A Challange given by Israel-Hayom' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>
                <WritersCarousel writers={props.writers} totalPages={props.totalPages} currPage={props.currentPage} />
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const data = await writerService.loadWriters()
        return {
            props: {
                writers: data.writers || [],
                totalPages: data.totalPages || 0,
                currentPage: data.currentPage || 0,
            },
        }
    } catch (err) {
        return {
            props: {
                writers: [],
                totalPages: 0,
                currentPage: 0,
            },
        }
    }
}
