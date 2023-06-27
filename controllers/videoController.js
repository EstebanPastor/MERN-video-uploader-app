const VideoSchema = require("../models/videoModel");

exports.addVideo = async (req, res) => {
  const { title, description, videoUrl, filename } = req.body;
  const videoPath = req.file.path;

  

  const video = new VideoSchema({
    title,
    description,
    filename: req.file.filename,
    videoUrl: videoPath,
  });

  try {
    await video.save();
    res.status(200).json({
      message: "Video uploaded successfully!",
      video,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error uploading video!",
      error,
    });
  }
};

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await VideoSchema.find({});
    res.status(200).json({
      message: "All videos fetched successfully!",
      videos,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching videos!",
    });
    error;
  }
};
