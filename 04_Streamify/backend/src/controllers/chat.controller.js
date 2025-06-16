import { generateStreamToken } from "../config/stream.js";

export async function getStreamToken(req, res) {
  try {
    const token = generateStreamToken(req.user.id);
    res.status(200).json({ token });
  } catch (error) {
    console.log("Error in getStreamToekn controler", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
