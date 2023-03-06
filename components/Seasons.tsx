import { Details } from "@/typings";
import { baseURL } from "@/utils/baseUrl";
import { motion } from "framer-motion";
import React from "react";
import Container from "./Container";

type Props = {
  movieDetails: Details;
};

function Seasons({ movieDetails }: Props) {
  return (
    <div className="px-4 pb-36">
      <Container header="Seasons">
        <div className="flex items-center scrollbar-hide space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2 overflow-y-hidden">
          {movieDetails?.seasons?.map((season) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              //onClick={handleNavigatePage}
              className="relative h-28 min-w-[180px] cursor-pointer transition-transform duration-200 ease-out md:h-[400px] md:min-w-[200px] items-center hover:shadow-2xl"
            >
              <p
                className={`text-lg py-2.5 text-gray-400 ${
                  !season.poster_path && "animate-pulse"
                }`}
              >
                {season.name}
              </p>
              {season.poster_path ? (
                <img
                  src={`${baseURL}${season.poster_path}`}
                  alt={season.name}
                  className="rounded-sm object-cover md:rounded w-[180px]"
                />
              ) : (
                <img
                  src="https://i0.wp.com/authormarystone.com/wp-content/uploads/2019/01/comingsoon.jpg?resize=576%2C864"
                  alt="img/no"
                  className="rounded-sm object-cover md:rounded w-[180px] animate-pulse"
                />
              )}

              <p
                className={`text-sm font-medium text-gray-400 text-start ${
                  !season.poster_path && "animate-pulse"
                }`}
              >
                Season Number:{" "}
                <span className="text-white">
                  {season.season_number ? season.season_number : "Not Yet"}
                </span>
              </p>
              <p
                className={`text-sm font-medium text-gray-400 text-start ${
                  !season.poster_path && "animate-pulse"
                }`}
              >
                Episode Count:{" "}
                <span className="text-white">
                  {season.episode_count ? season.episode_count : "Not Yet"}
                </span>
              </p>
              <p
                className={`text-sm font-medium text-gray-400 text-start ${
                  !season.poster_path && "animate-pulse"
                }`}
              >
                Air Date:{" "}
                <span className="text-white">
                  {season.air_date ? season.air_date : "Not Yet"}
                </span>
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Seasons;
