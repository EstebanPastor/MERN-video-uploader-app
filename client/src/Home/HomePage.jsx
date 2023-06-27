import { Link } from "react-router-dom";
import Videos from "../components/Videos";
import { useGlobalContext } from "../context/GlobalContext";
import { useState } from "react";
import Upload from "../components/Upload";

const HomePage = () => {
  const { loading } = useGlobalContext();
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-gray-900 text-white py-4">
          <div className="container mx-auto px-4">
            <Link to={"/"} className="text-3xl font-bold">
              Video Uploader
            </Link>
          </div>
        </header>
        <div className="flex justify-center">
          <button
            onClick={() => setModal(true)}
            className="bg-gray-500  mt-5 text-white  py-2 px-4 rounded focus:outline-none "
          >
            Upload video
          </button>
        </div>
        {modal && <div onClick={() => setModal(false)}></div>}
        <main className="container mx-auto px-4 py-8">
          {loading ? <p className="text-center">Loading...</p> : <Videos />}
        </main>
        {modal && <Upload />}
      </div>
    </>
  );
};

export default HomePage;
