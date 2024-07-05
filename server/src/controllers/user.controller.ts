import { Request, Response } from "express";
import User from "../models/user.model";
import WatchLater from "../models/watch-later";
import Watching from "../models/currently-watching";
import mongoose from "mongoose";

export const currentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId)
      .populate("watching")
      .select("-password");

    if (!user) {
      res.status(400).json({ message: "Unauthorized!" });
      return;
    }

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong!" });
  }
};

export const addWatchLater = async (req: Request, res: Response) => {
  try {
    const { animeId, bannerImage, coverImage, format, title } = req.body;
    const userId = req.userId;

    if (!animeId || !bannerImage || !coverImage || !format || !title) {
      return res.status(400).json({ message: "Invalid fields." });
    }

    // check if anime is already exists
    const anime = await WatchLater.find({ userId, animeId });

    if (anime.length > 0) {
      // if animeId already exists i have to remove it.
      await WatchLater.findOneAndDelete({ userId, animeId });
      return res.status(200).json({ message: "success" });
    }

    const watchLater = await WatchLater.create({
      animeId,
      bannerImage,
      coverImage,
      format,
      title,
      userId,
    });

    if (!watchLater) {
      return res.status(400).json({ message: "something went wrong!" });
    }

    return res.status(201).json({ message: "success!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong." });
  }
};

export const getWatchLater = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) return;

    const watchLater = await WatchLater.find({ userId });

    if (!watchLater) return;

    return res.status(200).send(watchLater);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export const deleteWatchLater = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const userId = req.userId;

    if (!userId) return;
    if (!id) return;

    await WatchLater.findByIdAndDelete(id);

    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const addCurrentlyWatching = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { episodeId, title, poster, episodeNumber } = req.body;

    if (!userId) return res.status(404).end();

    if (!episodeId || !title || !poster || !episodeNumber) {
      return res.status(400).json({ message: "invalid functionality!" });
    }

    const existingWatchingNumber = await Watching.findOne({
      owner: userId,
      episodeNumber,
    });

    const existingWatchingId = await Watching.findOne({
      owner: userId,
      episodeId,
    });

    if (existingWatchingId) {
      return res.status(304).end();
    }

    if (existingWatchingNumber) {
      return res.status(200).json({ message: "Already" }).end();
    }

    let watching = await Watching.findOne({ owner: userId, title });

    if (!watching) {
      // If the user is not already watching an episode with the same title,
      // create a new Watching document
      watching = await Watching.create({
        owner: userId,
        episodeId,
        title,
        poster,
        episodeNumber,
      });
    } else {
      // If the user is already watching an episode with the same title,
      // update the episodeId with the new one
      watching = await Watching.findOneAndUpdate(
        { owner: userId, title },
        { episodeId, episodeNumber, poster },
        { new: true }
      );
    }

    // Update the user document to include the ID of the watching document
    await User.findByIdAndUpdate(userId, {
      $addToSet: { watching: watching?._id },
    });

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong!" });
  }
};

export const getCurrentlyWatching = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) return res.status(404).end();

    const currentlyWatching = await Watching.find({ owner: userId });

    return res.status(200).json(currentlyWatching);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong!" });
  }
};

export const deleteCurrentlyWatching = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { episodeId } = req.body;

    if(!episodeId) {
      return res.status(404).json({ message: "missing episode"})
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    const result = await Watching.findOneAndDelete({
      owner: userId,
      episodeId: episodeId,
    });

    if (!result) {
      return res.status(404).json({ message: "Anime not found." });
    }

    return res.status(200).json({ message: "anime finded!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong!" });
  }
};
