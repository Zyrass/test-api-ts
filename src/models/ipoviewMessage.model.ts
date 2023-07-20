import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const COLLECTION_NAME_MONGODB: string = String(
  process.env.MONGODB_COLLECTION_NAME
);

import {
  IMessage,
  IMessageDoc,
  IMessageModel,
} from "../interfaces/IMessage.interface";

const MessageSchema = new mongoose.Schema<IMessageDoc, IMessage>(
  {
    name: {
      type: String,
      required: [true, "Ce champ est obligatoire"],
    },
    description: {
      type: String,
      required: [true, "Ce champ est obligatoire"],
    },
  },
  {
    timestamps: true,
  }
);
// const MessageModel = mongoose.model<IMessageDoc, mongoose.Model<IMessageDoc>>("Message", MessageSchema);

const Message = mongoose.model<IMessageDoc, IMessageModel>(
  COLLECTION_NAME_MONGODB,
  MessageSchema
);

export default Message;
