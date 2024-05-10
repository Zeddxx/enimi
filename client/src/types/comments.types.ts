export type IAuthor = {
    _id: string
    email: string
    username: string
    avatarUrl: string
}

export type IReply = {
    author: IAuthor
    comment: string
    createdAt: string
    _id: string
}

export type IComment = {
    _id: string
    animeId: string
    author: IAuthor
    comment: string
    createdAt: string
    likes: string[]
    replies: IReply[]
}