import mongoose, { Schema } from "mongoose";
import { WatchingSchemaTypes } from "../types/main.types";

const WatchingSchema = new Schema<WatchingSchemaTypes>({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  episodeId: { type: String, required: true, unique: false },
  title: { type: String, required: true, unique: false },
  poster: { type: String, required: true, unique: false },
  episodeNumber: { type: String, required: true, unique: false },
});

const Watching = mongoose.model("Watching", WatchingSchema);

export default Watching;
