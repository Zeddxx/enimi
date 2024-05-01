import mongoose, { Schema } from "mongoose";

interface WatchLaterSchemaTypes {
    animeId: string;
    coverImage: string;
    title: string
    format: string
    bannerImage: string
    userId: string
}

const WatchLaterSchema = new Schema<WatchLaterSchemaTypes>({
    userId: { type: String, ref: "User", required: true },
    animeId: { type: String, required: true },
    coverImage: { type: String, required: true },
    bannerImage: { type: String, required: false },
    title: { type: String, required: true },
    format: { type: String, required: false },
})

const WatchLater = mongoose.model<WatchLaterSchemaTypes>("WatchLater", WatchLaterSchema)

export default WatchLater;