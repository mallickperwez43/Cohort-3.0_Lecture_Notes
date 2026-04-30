import type { Request, Response } from "express";
import { ContentModel } from "../models/Content.js";
import { UserModel } from "../models/User.js";
import { LinksModel } from "../models/Link.js";
import { TagsModel } from "../models/Tags.js";
import { createContentSchema, updateContentSchema, shareLinkSchema } from "../validators/contentValidators.js";
import { randomBytes } from "crypto";

export const createContent = async (req: Request, res: Response) => {
    console.log("Create Content hit. User ID:", req.userId);
    try {
        const parsed = createContentSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: parsed.error.issues
            });
        }

        // TypeScript now knows req.userId exists thanks to express.d.ts
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { title, link, type, tags: tagsStrings } = parsed.data;

        let tagIds: string[] = [];

        if (tagsStrings && tagsStrings.length > 0) {
            const tagsObject = await Promise.all(
                tagsStrings.map(async (t) => {
                    const tag = await TagsModel.findOneAndUpdate(
                        { title: t.toLowerCase().trim() },
                        { title: t.toLowerCase().trim() },
                        { upsert: true, new: true, setDefaultsOnInsert: true }
                    )
                    return tag;
                })
            );
            tagIds = tagsObject.filter((tag) => tag !== null).map((tag) => tag!._id.toString());
        }

        const content = await ContentModel.create({
            title,
            link,
            type,
            tags: tagIds,
            userId: req.userId
        });

        return res.status(201).json({
            message: "Content added successfully",
            content
        });
    } catch (error: any) {
        console.error("CREATE CONTENT ERROR:", error); // Check your VS Code terminal!
        return res.status(500).json({
            message: "Error adding content",
            details: error.message
        });
    }
};

export const getContent = async (req: Request, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const content = await ContentModel.find({
            userId: req.userId
        })
            .populate("userId", "username")
            .populate("tags", "title");

        if (!content) {
            console.log("No content")
            return res.status(200).json({
                content: []
            })
        }

        return res.status(200).json({ content });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            // message: "Error fetching content",
            error: error
        });
    }
};

export const updateContent = async (req: Request, res: Response) => {
    try {
        const parsed = updateContentSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: parsed.error.issues
            });
        }

        const contentId = req.params["contentId"] as string;
        if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

        const updatedContent = await ContentModel.findOneAndUpdate(
            {
                _id: contentId,
                userId: req.userId
            },
            { $set: parsed.data },
            { new: true }
        );

        if (!updatedContent) {
            return res.status(404).json({ message: "Content not found or unauthorized" });
        }

        return res.json({
            message: "Content updated successfully",
            content: updatedContent
        });
    } catch (error) {
        return res.status(500).json({ message: "Error updating content" });
    }
};

export const deleteContent = async (req: Request, res: Response) => {
    try {
        const contentId = req.params["contentId"] as string;
        if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

        const deleted = await ContentModel.findOneAndDelete({
            _id: contentId,
            userId: req.userId
        });

        if (!deleted) {
            return res.status(404).json({ message: "Content not found or unauthorized" });
        }

        return res.json({ message: "Content deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting content" });
    }
};

export const shareBrain = async (req: Request, res: Response) => {
    try {
        const parsed = shareLinkSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ message: "Invalid share state" });
        }

        if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

        const { share } = parsed.data;

        if (share) {
            const existingLink = await LinksModel.findOne({ userId: req.userId });

            if (existingLink) {
                return res.json({ hash: existingLink.hash });
            }

            const hash = randomBytes(10).toString("hex");
            await LinksModel.create({
                userId: req.userId,
                hash
            });

            return res.json({ hash });
        } else {
            await LinksModel.deleteOne({ userId: req.userId });
            return res.json({ message: "Share link disabled" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error toggling share" });
    }
};

export const getSharedBrain = async (req: Request, res: Response) => {
    try {
        const shareLink = req.params["shareLink"] as string;

        const linkEntry = await LinksModel.findOne({ hash: shareLink });

        if (!linkEntry) {
            return res.status(404).json({ message: "Shared link is invalid or disabled" });
        }

        const user = await UserModel.findById(linkEntry.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const content = await ContentModel.find({
            userId: linkEntry.userId
        }).populate("userId", "username").populate("tags", "title");

        // Use a clean map without ': any' by trusting your model structure
        const formattedContent = content.map(item => ({
            id: item._id,
            type: item.type,
            link: item.link,
            title: item.title,
            // Narrowing the type: assuming 'tags' contains objects with 'title'
            tags: (item.tags as unknown as { title: string }[]).map(t => t.title)
        }));

        return res.status(200).json({
            username: user.username,
            content: formattedContent
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching shared brain" });
    }
};