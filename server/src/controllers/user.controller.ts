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
    const { animeId } = req.body;
    const userId = req.userId;

    if (!userId) return;

    await WatchLater.findOneAndDelete({ animeId, userId });

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
