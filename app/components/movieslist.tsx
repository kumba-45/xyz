"use client";
import React, { useEffect, useState, MouseEvent } from "react";
import { MoviesData } from "./moviesdata";
import VideoPlay from "./videoplay";

type Movie = {
  title: string;
  year: string;
  genres: string[];
  ratings: number[];
  poster: string;
  contentRating: string;
  duration: string;
  releaseDate: string;
  averageRating: number;
  originalTitle: string;
  storyline: string;
  actors: string[];
  imdbRating: number;
  posterurl: string;
  videoUrl?: string;
};

const NoResults: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <p className="text-red-500 text-center font-bold text-lg">
        No results found
      </p>
    </div>
  );
};

const MoviesList = (props: { value: string }) => {
  const [list, setList] = useState<Movie[]>(MoviesData);
  const [videoUrl, setVideoUrl] = useState<string>(
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  );
  const { value } = props;
  useEffect(() => {
    console.log(value);
    if (value) {
      const filteredItems: any[] = list.filter((item) =>
        item.title.toLowerCase().includes(value?.toLowerCase() || "")
      );
      setList(filteredItems);
    } else {
      setList(MoviesData);
    }
  }, [value]);

  const openModal = (e: React.MouseEvent<HTMLButtonElement>, url?: string) => {
    if (url) {
      setVideoUrl(url);
    }
    setTimeout(() => {
      setVideoUrl(
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
      );
    }, 30000);
  };
  return (
    <>
      {list.length !== 0 ? (
        <div>
          <div className="flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 shadow-lg bg-gray-600">
            <VideoPlay url={videoUrl} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5 pl-2 pr-2">
            {list.map((item) => (
              <div key={item.posterurl}>
                <div className="shadow-lg hover:-translate-y-1 hover:scale-110 duration-300">
                  <img
                    className="object-fill h-48 w-full md:w-96"
                    src={item.posterurl}
                    alt={item.title}
                  />
                  <div className="p-1">
                    <p className="break-normal font-serif">{item.title}</p>
                    <p>{item.year}</p>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={(e) => openModal(e, item.videoUrl)}
                    >
                      Watch trailer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="col-span-full">
          <NoResults />
        </div>
      )}
    </>
  );
};
export default MoviesList;
