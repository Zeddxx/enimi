import { Request, Response } from "express";
import User from "../models/user.model";
import WatchLater from "../models/watch-later";

export const currentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "Unauthorized!" });
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
    if(!id) return;

    await WatchLater.findByIdAndDelete(id);

    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
