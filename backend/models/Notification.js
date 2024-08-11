import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
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

export default mongoose.model("Notification", NotificationSchema);