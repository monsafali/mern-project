import { StreamChat } from "stream-chat";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error("API key or secret not found");
}

const streamclient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamclient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.log("Upsert user error", error);
    return null;
  }
};
export const generateStreamToken = (userId) => {
  try {
    // ensure userid is a string
    const userIdStr = userId.toString();
    const token = streamclient.createToken(userIdStr);
    return token;
  } catch (error) {
    console.log("Error generatintg stream token", error);
  }
};
