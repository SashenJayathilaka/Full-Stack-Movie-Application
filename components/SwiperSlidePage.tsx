"use client";

import { Movie } from "@/typings";
import { motion } from "framer-motion";
import Image from "next/image";
import { BsPlayFill } from "react-icons/bs";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CircularRate from "./CircularRate";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {
  movies: Movie[];
  baseUrl: string;
};

function SwiperSlidePage({ movies, baseUrl }: Props) {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      // navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper h-[60vh] w-[100vh]"
    >
      {movies?.map((movie) => (
        <SwiperSlide key={movie.id}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            //onClick={handleChangePage}
            className="relative h-[60vh] w-[100vh] min-w-[180px] cursor-pointer transition-transform duration-200 ease-out  md:hover:scale-105"
          >
            {movie.backdrop_path || movie.poster_path ? (
              <div>
                <Image
                  src={`${baseUrl}/${
                    movie?.backdrop_path || movie?.poster_path
                  }`}
                  alt={movie.name}
                  layout="fill"
                  className="rounded-md"
                />

                <>
                  <motion.div
                    className="absolute top-[90px] z-30 items-center px-10 w-auto space-y-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                  >
                    <p className="text-[30px] font-medium">
                      {movie?.title || movie?.name || movie?.original_name!}
                    </p>

                    <CircularRate value={movie.vote_average} isPoster={true} />

                    <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl line-clamp-1 pb-8">
                      {movie?.overview}
                    </p>
                    <button className="flex gap-3 bg-red-600 px-2.5 py-2.5 rounded-md items-center">
                      <BsPlayFill />
                      WATCH NOW
                    </button>
                  </motion.div>
                  <div className="absolute w-full h-[60vh] bg-gradient-to-r from-black to-transparent bottom-0 z-20" />
                </>
              </div>
            ) : (
              <div
                role="status"
                className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
              >
                <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwiperSlidePage;
