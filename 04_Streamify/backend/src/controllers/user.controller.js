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

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({
        message: "Friend request not found",
      });
    }

    // Verifty the current user is the recipient
    if (friendRequest.recipient.toHexString()) {
      return res.status(403).json({
        message: "You are not authorized to accept this request",
      });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // Add each user to the other's friend array
    // ADDToset : ads elemetn to an array only if they do not already exists
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.log("Error in acceptFriend Request controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function getFriendRequest(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "Fullname, profile, nativeLanguage, learningLanguage"
    );

    const acceptedReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate("recipient", "Fullname, profile");
    res.status(200).json({
      incomingReqs,
      acceptedReqs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function getoutgoingFriendRequest(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      "Fullname, profile, nativeLanguage, learningLanguage"
    );
    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
