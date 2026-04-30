import { model, Schema, Document } from "mongoose";

export interface ITags extends Document {
    title: string;
};

const TagsSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
});

export const TagsModel = model<ITags>('Tag', TagsSchema);