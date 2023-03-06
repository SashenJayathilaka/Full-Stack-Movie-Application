"use client";

import { Movie } from "@/typings";
import { baseURL } from "@/utils/baseUrl";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import CircularRate from "./CircularRate";

type Props = {
  netflixOriginals: Movie[];
};

function HomeBanner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);

  // console.log("🚀 ~ file: HomeBanner.tsx:16 ~ HomeBanner ~ movie:", movie);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 lg:pl-24">
      <div className="absolute top-0 left-0 h-[95vh] w-screen -z-10">
        <Image
          src={`${baseURL}/${movie?.backdrop_path || movie?.poster_path}`}
          alt={movie?.title || movie?.name || movie?.original_name!}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute w-full h-[95vh] bg-gradient-to-r from-black to-transparent bottom-0 z-20" />
        <div className="absolute w-full h-14 bg-gradient-to-t from-[#141414] to-transparent bottom-0 z-20" />
      </div>
      <div className="space-y-5 relative top-24">
        <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {movie?.vote_average && (
          <div className="flex justify-start gap-8 items-center cursor-pointer">
            <CircularRate value={movie?.vote_average} />
            <p className="bg-red-600 rounded-full px-2.5 py-2.5 text-sm w-20 text-center">
              Action
            </p>
            <p className="bg-red-600 rounded-full px-2.5 py-2.5 text-sm w-20 text-center">
              Drama
            </p>
          </div>
        )}
        <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl line-clamp-5">
          {movie?.overview}
        </p>
        <button className="flex gap-3 bg-red-600 px-2.5 py-2.5 rounded-md items-center">
          <BsPlayFill />
          WATCH NOW
        </button>
      </div>
    </div>
  );
}

export default HomeBanner;
