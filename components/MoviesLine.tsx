"use client";

import { Movie } from "@/typings";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

import CircularRate from "./CircularRate";

type Props = {
  movie: Movie;
};

function MoviesLine({ movie }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isHover, setIsHover] = useState(false);

  const navigatePage = async () => {
    if (session) {
      if (movie.title) {
        router.push(`/details/movie${movie.id}`);
      } else {
        router.push(`/details/${movie.id}`);
      }
    } else {
      toast.error(
        "You Need to Sign In to Look Up More Information About This Movie"
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      onClick={() => navigatePage()}
      className="relative h-28 min-w-[180px] cursor-pointer transition-transform duration-200 ease-out md:h-[300px] md:min-w-[200px] md:hover:scale-105"
    >
      {movie.backdrop_path || movie.poster_path ? (
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie?.title || movie?.name || movie?.original_name!}
            width={500}
            height={500}
            className="rounded-md"
            loading="lazy"
          />
          {isHover && (
            <>
              <motion.div
                className="absolute top-[190px] z-50 items-center ml-6 w-[180px]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <CircularRate value={movie.vote_average} isPoster={true} />
                <p className="text-xs">
                  {movie.release_date || movie.first_air_date}
                </p>
                <p className="text-sm font-medium truncate">
                  {movie?.title || movie?.name || movie?.original_name!}
                </p>
              </motion.div>
              <div className="absolute w-full h-[200px] bg-gradient-to-t from-black to-transparent bottom-0 z-20" />
            </>
          )}
        </div>
      ) : (
        <div
          role="status"
          className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
        >
          <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 md:h-[300px] dark:bg-gray-700">
            <svg
              className="w-12 h-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default MoviesLine;
