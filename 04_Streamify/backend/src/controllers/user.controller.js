import FriendRequest from "../models/FriendRequest.js";
import User from "../models/user.model.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserid = req.user.id;
    const currentUser = req.user;
    const recomendeduser = await User.find({
      $and: [
        {
          _id: { $ne: currentUserid },
        },
        {
          _id: { $nin: currentUser.friends },
        },
        { isOnboarded: true },
      ],
    });
    res.status(200).json(recomendeduser);
  } catch (error) {
    console.log("Error in getRecommendedUsers controllers", error.message);
    res.status(200).json({
      success: false,
      message: "interval server Error ",
    });
  }
}
export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "Fullname profilePic nativeLanguage, learningLanguage"
      );

    res.status(200).json(user.friends);
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "interval server Error ",
    });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;
    // Prevent sending request ot your self
    if (myId === recipientId) {
      return res.status(400).json({
        success: false,
        message: "You can't send friend request to yourself",
      });
      const recipient = await User.findById(recipientId);
      if (!recipient) {
        return res.status(404).json({
          success: false,
          message: "Recipient user not found",
        });
      }
      if (recipient.friends.includes(myId)) {
        return res.status(400).json({
          success: false,
          message: "You are already friends with this user",
        });
      }

      const existingRequest = await FriendRequest.findOne({
        $or: [
          { sender: myId, recipient: recipientId },
          { sender: recipientId, recipient: myId },
        ],
      });

      if (existingRequest) {
        return res.status(400).json({
          success: false,
          message: "A freiend request already exist between your and this user",
        });
      }

      const friendRequest = await FriendRequest.create({
        sender: myId,
        recipient: recipientId,
      });

      if (friendRequest) {
        res.status(200).json({
          success: true,
          message: "Friend request sent successfully",
        });
      }
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "interval server Error ",
    });
  }
}
