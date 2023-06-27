import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Videoplayer from "./components/VideopLayer";
import HomePage from "./Home/HomePage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
    <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/videos/:id" element={<Videoplayer />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
