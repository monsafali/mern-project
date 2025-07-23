import cloudinary from "../lib/cloudinary.js";
import { Album } from "../models/Album.model.js";
import { Song } from "../models/song.model.js";

// Helper funtion for cloudinary uploads
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in uploadtoCloudinary", error);
    throw new Error("Error uploadin to cloudinary");
  }
};
export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "please uplad all files" });
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFiles = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFiles);
    const song = new Song({
      title,
      artist,
      albumId: albumId || null,
      audioUrl,
      duration,
      imageUrl,
    });
    await song.save();

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }
    return res.status(400).json(song);
  } catch (error) {
    console.log("Something went wrong in admin controller", error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);
    // if song belong to an album's song arry

    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }
    await Song.findByIdAndDelete(id);

    res.status(200).json({ message: "Song Deletesd successfuly" });
  } catch (error) {
    console.log("Eror in deleting Song", error);
    next(error);
  }
};
