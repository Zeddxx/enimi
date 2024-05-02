import mongoose, { Schema } from "mongoose";
import { WatchLaterSchemaTypes } from "../types/main.types";

const WatchLaterSchema = new Schema<WatchLaterSchemaTypes>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    animeId: { type: String, required: true },
    coverImage: { type: String, required: true },
    bannerImage: { type: String, required: false },
    title: { type: String, required: true },
    format: { type: String, required: false },
})

const WatchLater = mongoose.model<WatchLaterSchemaTypes>("WatchLater", WatchLaterSchema)

export default WatchLater;