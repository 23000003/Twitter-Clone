import mongoose, { Schema, Document, Types }  from "mongoose";
import { NotificationType } from "../types/modelTypes";

export type NotificationModelType = NotificationType & Document;

const NotificationSchema: Schema = new mongoose.Schema({
    notifiedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    notifiedFrom: {
        type: String,
        required: true,
        maxLength: 100,
    },
    date_notified: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    link: {
        type: String //passing the ObjectID of the specific notifcation here and fetching it instead of creating many references (through params)
    }
});

export default mongoose.model<NotificationModelType>(
    "Notification", 
    NotificationSchema
);