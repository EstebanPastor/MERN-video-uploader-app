import React, { createContext, useContext, useEffect, useReducer } from "react";

const GlobalContext = createContext();

// actions
const LOADING = "LOADING";
const SET_VIDEOS = "SET_VIDEOS";
const SET_SELECTED_VIDEO = "SET_SELECTED_VIDEO";

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case SET_VIDEOS:
      return {
        ...state,
        loading: false,
        videos: action.payload.map((video) => ({
          ...video,
          videoUrl: `http://localhost:3000/public/videos/${video.filename}`,
        })),
      };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const initialState = {
    videos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAllVideos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/videos");
      const data = await res.json();

      dispatch({ type: SET_VIDEOS, payload: data.videos });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  return (
    <GlobalContext.Provider value={{...state,
      getAllVideos}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
