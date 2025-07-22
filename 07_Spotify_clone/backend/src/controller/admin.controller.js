import { Album } from "../models/Album.model.js";
import { Song } from "../models/song.model.js";

export const createSong = async (req, res) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "please uplad all files" });
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFiles = req.files.imageFile;

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
    return res.status(500).json({ message: "Internal server error" });
  }
};
