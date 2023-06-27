import React from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

const Videos = () => {
  const { videos } = useGlobalContext();

  return (
    <div className="bg-gray-100 p-4">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {videos.map((video) => {
          return (
            <Link key={video._id} to={`/videos/${video._id}`}>
              <div className="bg-white p-4 rounded-md shadow-md">
                <div className="aspect-w-16 aspect-h-9">
                  <video
                    src={video.videoUrl}
                    className="object-cover w-full h-full rounded-md"
                  ></video>
                </div>
                <h4 className="text-lg font-semibold mt-2">{video.title}</h4>
                <p className="text-gray-600">{video.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Videos;
