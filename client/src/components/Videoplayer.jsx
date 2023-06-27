import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { useRef } from "react";
import { VideoJS } from "./Video";
import videojs from "video.js";

const Videoplayer = () => {
  const { id } = useParams();
  const { videos } = useGlobalContext();
  const video = videos.find((vid) => vid._id === id);

  const videoConRef = useRef(null);
  const playerRef = useRef(null);

  const videosOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    alwaysShowControls: false,
    sources: [
      {
        src: video?.videoUrl,
        type: "video/mp4",
      },
    ],
    controlBar: {
      children: [
        "playToggle",
        "volumePanel",
        "progressControl",
        "currentTimeDisplay",
        "timeDivider",
        "durationDisplay",
        "pictureInPictureToggle",
        "qualitySelector",
        "fullscreenToggle",
      ],
      durationDisplay: {
        timeToShow: ["duration"],
        countDown: false,
      },
    },
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on("waiting", () => {
      videojs.log("Player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("Player is disposed");
    });
  };

  return (
    <div className="bg-gradient-to-r from-blue-300 to-purple-400 min-h-screen">
      <Link
        to={"/"}
        className="flex items-center rounded bg-black text-white px-4 py-2"
      >
        Go back home
      </Link>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-2xl">
          <div className="aspect-w-16 aspect-h-9">
            <div ref={videoConRef} className="aspect-content">
              <VideoJS options={videosOptions} onReady={handlePlayerReady} />
              <div className="text-center mt-4">
                <h4 className="text-xl font-bold mb-2">{video?.title}</h4>
                <p className="text-gray-600">{video?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videoplayer;