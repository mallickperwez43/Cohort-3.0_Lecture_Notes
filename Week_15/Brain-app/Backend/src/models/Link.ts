import { model, Schema, Document, Types } from "mongoose";


export interface ILink extends Document {
    hash: string;
    userId: Types.ObjectId;
};

const ObjectId = Schema.Types.ObjectId;

const LinkSchema = new Schema({
    hash: {
        type: String,
        required: true,
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true,
    }
});

export const LinksModel = model<ILink>('Link', LinkSchema);