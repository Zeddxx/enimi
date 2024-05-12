import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/user.model";
import { Comment, Reply } from "../models/comment.model";
import { ObjectId } from "mongodb";

export const comment = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { comment, animeId, isSpoiler } = req.body;

    if (!userId) {
      return res.status(403).json({ message: "Access Denied!" });
    }

    if (!comment || !animeId) {
      res.status(404).json({ message: "invalid fields!" });
      return;
    }

    const newComment = await Comment.create({
      author: userId,
      comment,
      animeId,
      isSpoiler,
    });

    await newComment.save();

    return res.status(201).json({ message: "Comment created successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error creating comment for user!" });
  }
};

export const getComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const comments = await Comment.find({ animeId: id })
      .populate("author", "-password")
      .populate({
        path: "replies",
        populate: {
          path: "author",
          select: "-password",
        },
      })
      .sort({ createdAt: -1 });
    return res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting comment for user!" });
  }
};

export const toggleLikeComment = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { commentId } = req.body;

    if (!commentId || !userId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const existingComment = await Comment.findById(commentId);

    if (!existingComment) {
      res.status(404).json({ error: "Comment not found" });
      return;
    }

    existingComment.toggleLike(userId);

    await existingComment.save();

    return res
      .status(200)
      .json({ message: "Like toggle successfully!", comment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error toggling like for user!" });
  }
};

export const addReply = async (req: Request, res: Response) => {
  try {
    const { commentId, reply } = req.body;
    const userId = req.userId;

    if (!commentId || !reply || !userId) {
      res.status(404).json({ message: "Missing required fields!" });
      return;
    }

    const existingComment = await Comment.findById(commentId);

    if (!existingComment) {
      res.status(404).json({ error: "Parent comment not found" });
      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(403).json({ message: "Unauthorized!" });
    }

    // Construct reply object with author and comment
    const newReply = await Reply.create({
      author: userId,
      comment: reply,
    });

    const savedReply = await newReply.save();

    existingComment.replies.push(savedReply._id);
    await existingComment.save();

    return res
      .status(201)
      .json({ message: "Reply added", reply: existingComment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const userId = new ObjectId(req.userId);
    const { commentId } = req.body;

    if (!userId) {
      res.status(403).json({ message: "Unauthorized!" });
      return;
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      res.status(404).json({ message: "comment doesn't exists!" });
      return;
    }
    // console.log({
    //   userId,
    //   commentAuthorId: comment.author._id,
    //   commentAuthor: userId.equals(comment.author._id)
    // });

    if (!userId.equals(comment.author._id)) {
      res.status(403).json({ message: "Access Denied!" });
      return;
    }

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "something went wrong!" });
  }
};
