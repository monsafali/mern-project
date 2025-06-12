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

// Todo it later
export const generateStreamToken = (userId) => {
  const token = streamclient.createToken(userId);
  return token;
};
