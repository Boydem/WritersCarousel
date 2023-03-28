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
