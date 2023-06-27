import UploadButton from "./UploadButton";
import { AiOutlineUpload } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useGlobalContext } from "../context/GlobalContext";
import { useState } from "react";

const Upload = () => {
  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("Upload your video");
  const [loading, setLoading] = useState(false);
  const { getAllVideos } = useGlobalContext();

  const handleTextChange = (name) => (e) => {
    if (name === "title") {
      setTitle(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  };

  const handleVideo = (e) => {
    e.preventDefault();
    const uploadedVideo = e.target.files[0];
    setVideo(uploadedVideo);
    setLabel("Your video: " + uploadedVideo.name);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (title) {
      const formData = new FormData();
      formData.append("title", e.target.title.value);
      formData.append("description", e.target.description.value);
      formData.append("video", e.target.video.files[0]);

      const res = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      });
      console.log(res);
    } else {
      toast.error("Please enter a title");
    }

    setLoading(false);
    getAllVideos();
    setTitle("");
    setDescription("");
    setVideo("");
    setLabel("Upload your video");
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Upload a video</h2>
      <form
        onSubmit={handleUpload}
        action="api/upload"
        method="POST"
        encType="multipart/form-data"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTextChange("title")}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="desc" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="6"
            placeholder="Enter a description"
            value={description}
            onChange={handleTextChange("description")}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="video" className="mr-2">
            Video upload
          </label>
          <label
            htmlFor="video"
            className={`text-sm font-semibold cursor-pointer ${
              video ? "text-green-600" : "text-gray-600"
            }`}
          >
            {label}
          </label>
          <input
            type="file"
            name="video"
            id="video"
            accept="video/*"
            hidden
            onChange={handleVideo}
          />
        </div>
        <div>
          <UploadButton
            name="Upload"
            icon={<AiOutlineUpload />}
            bg="#00b894"
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </>
  );
};

export default Upload;
