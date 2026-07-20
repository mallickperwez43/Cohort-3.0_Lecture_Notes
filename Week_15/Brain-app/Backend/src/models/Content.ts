import { model, Schema, Document, Types } from "mongoose";


export interface IContent extends Document {
    title: string;
    link: string;
    type: string;
    tags: Types.ObjectId[];
    userId: Types.ObjectId;
};

const ObjectId = Schema.Types.ObjectId;
const contentTypes = ['image', 'video', 'article', 'audio', 'tweet'];

const contentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: contentTypes,
        required: true
    },
    tags: [{
        type: ObjectId,
        ref: 'Tag'
    }],
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
});

export const ContentModel = model<IContent>('Content', contentSchema);