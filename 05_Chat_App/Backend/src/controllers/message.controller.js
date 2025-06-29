import cloudinary from "../config/cloudinary.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

export const getUserSiderBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    // This filter all used excpet currently logged in user from database

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersFor SideBar", error.message);
    res.status(500).json({ error: "Internal Server Error  " });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: usertoChatId } = req.params;
    const MyId = req.user._id;

    const allmessage = await Message.find({
      $or: [
        {
          senderId: MyId,
          receiverId: usertoChatId,
        },
        {
          senderId: usertoChatId,
          receiverId: MyId,
        },
      ],
    });

    res.status(200).json(allmessage);
  } catch (error) {
    console.log("Error in getMessage controller", error.message);
    res.status(500).json({
      error: "internal Server Error in Getting messages",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadRespone = await cloudinary.uploader.upload(image);
      imageUrl = uploadRespone.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image,
      image: imageUrl,
    });

    await newMessage.save();
    // todo realtim e funtionality goes here => socket.io
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in getMessage controller", error.message);
    res.status(500).json({
      error: "internal Server Error in New messages",
    });
  }
};
