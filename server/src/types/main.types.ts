import { Schema } from "mongoose";

export interface WatchingSchemaTypes {
    owner: IUser
    episodeId: string
    title: string
    poster: string
    episodeNumber: string
}

export interface IUser {
    _id: string
    username: string;
    email: string;
    password: string;
    avatarUrl: string;
    verified: boolean
    watching: WatchingSchemaTypes[]
}

export interface WatchLaterSchemaTypes {
    animeId: string;
    coverImage: string;
    title: string
    format: string
    bannerImage: string
    userId: Schema.Types.ObjectId
}