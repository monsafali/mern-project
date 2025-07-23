import User from "../models/user.model.js";

export const AuthCallBack = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    // check if user already exist

    const user = await User.findOne({ clerkId: id });

    if (!user) {
      // Signup
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
    }

    res.status(200).json({
      success: true,
      message: "New user Created successfuly",
    });
  } catch (error) {
    console.log("Error in auth callback", error);
    next(error);
  }
};
