type HandleSearchType = (query: string | null) => void

type JsonPlaceholderComment = {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

export type { HandleSearchType, JsonPlaceholderComment }
