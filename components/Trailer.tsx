import { Details, MovieTrailer } from "@/typings";
import { motion } from "framer-motion";
import React from "react";
import ReactPlayer from "react-player";
import { trailerUrl } from "../utils/baseUrl";
import Container from "./Container";

type Props = {
  movieTrailer: MovieTrailer[];
  movieDetails: Details;
};

function Trailer({ movieTrailer, movieDetails }: Props) {
  return (
    <div className="px-4 pb-12">
      <Container
        isTop={true}
        header={`Videos |${" "}${
          movieDetails?.title ||
          movieDetails?.name ||
          movieDetails?.original_name
        }`}
      >
        <div className="flex items-center scrollbar-hide space-x-0.5 overflow-x-scroll md:space-x-1.0 md:p-2 h-[310px] overflow-y-hidden">
          <>
            {movieTrailer?.map((trailer) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                key={trailer.id}
                className="w-[300px] h-[200px] relative min-w-[180px] cursor-pointer items-center ease-out md:h-[300px] md:min-w-[500px] px-2 py-2 rounded-md hover:shadow-lg"
              >
                <ReactPlayer
                  url={`${trailerUrl}${trailer.key}`}
                  width="100%"
                  height="100%"
                  playing={false}
                  muted={false}
                />
              </motion.div>
            ))}
          </>
        </div>
      </Container>
    </div>
  );
}

export default Trailer;
