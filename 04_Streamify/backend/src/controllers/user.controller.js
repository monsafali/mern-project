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
