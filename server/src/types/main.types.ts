import { Schema } from "mongoose";

export interface IUser {
    _id: string
    username: string;
    email: string;
    password: string;
    avatarUrl: string;
    verified: boolean
    watchlist: WatchLaterSchemaTypes[]
}

export interface WatchLaterSchemaTypes {
    animeId: string;
    coverImage: string;
    title: string
    format: string
    bannerImage: string
    userId: Schema.Types.ObjectId
}