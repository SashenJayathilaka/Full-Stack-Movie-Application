"use client";

import tmdbConfigs from "@/config/tmdb.configs";
import uiConfigs from "@/config/ui.configs";
import { Details, MovieCastCrew } from "@/typings";
import { baseURL } from "@/utils/baseUrl";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Session } from "next-auth";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";
import { toast } from "react-toastify";

import CastSlide from "./CastSlide";
import CircularRate from "./CircularRate";
import Container from "./Container";

const pusher = new Pusher(`${process.env.NEXT_PUBLIC_PUSHER_KEY}`, {
  cluster: "eu",
});

type Props = {
  movieDetails: Details;
  movieCast: MovieCastCrew;
  session: Session | null;
};

function DetailsBanner({ movieDetails, movieCast, session }: Props) {
  const [isUserFavorite, setIsUserFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validation, setValidation] = useState<boolean>(false);

  const isFavorite = async (user: Session, movieId: number) => {
    if (!user) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/find/movie`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.user.uid,
            movieId: movieId,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "nonExits") {
        setIsUserFavorite(false);
      } else if (data.status === "exits") {
        setIsUserFavorite(true);
      } else return;

      setValidation(true);
    } catch (error: any) {
      console.log("🚀 ~ file: DetailsBanner.tsx:29 ~ isLike ~ error:", error);
    }
  };

  const addFavorite = async () => {
    if (!session && !movieDetails) return;

    try {
      setIsLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/save/movie`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session?.user?.uid,
            movieId: movieDetails.id,
            title: movieDetails.title,
            overview: movieDetails.overview,
            name: movieDetails.name,
            backdrop_path: movieDetails.backdrop_path,
            poster_path: movieDetails.poster_path,
            original_name: movieDetails.original_name,
            vote_average: movieDetails.vote_average,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "disLike" || data.status === "like") {
        const channel = pusher.subscribe("movie-data");
        channel.bind("new-movieData", function (data: any) {
          addFavorite();
        });
        isFavorite(session!, movieDetails.id!);
        setIsLoading(false);

        if (data.status === "disLike") {
          toast.warn("Remove Favorite");
        } else if (data.status === "like") {
          toast.success("Added Favorite");
        }
      } else return;
    } catch (error: any) {
      console.log(
        "🚀 ~ file: DetailsBanner.tsx:60 ~ addFavorite ~ error:",
        error
      );
    }
  };

  useEffect(() => {
    isFavorite(session!, movieDetails.id!);
  }, [session, movieDetails.id]);

  return (
    <>
      <Box
        sx={{
          zIndex: "-1",
          position: "relative",
          paddingTop: { xs: "60%", sm: "40%", md: "35%" },
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundImage: `url(${baseURL}${
            movieDetails?.backdrop_path || movieDetails?.poster_path
          })`,
          backgroundAttachment: "fixed",
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            ...uiConfigs.style.gradientBgImage.dark,
          },
        }}
      />
      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
        }}
      >
        <Box
          sx={{
            marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
            }}
          >
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
              }}
            >
              <Box
                sx={{
                  paddingTop: "140%",
                  ...uiConfigs.style.backgroundImage(
                    tmdbConfigs.posterPath(
                      movieDetails.poster_path || movieDetails.backdrop_path
                    )
                  ),
                }}
              />
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                color: "#fff",
              }}
            >
              <Stack spacing={5}>
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                  fontWeight="700"
                  sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                  color="#fff"
                >
                  {movieDetails.title || movieDetails.name}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CircularRate
                    value={movieDetails.vote_average!}
                    isPoster={false}
                  />
                  <Divider orientation="vertical" />
                  {movieDetails?.genres?.map((genre, index) => (
                    <Chip
                      label={genre.name}
                      variant="filled"
                      color="error"
                      key={index}
                    />
                  ))}
                </Stack>
                <p className="text-white">{movieDetails.overview}</p>
                <Stack direction="row" spacing={1}>
                  {session && validation && (
                    <>
                      {isLoading ? (
                        <div className="flex justify-center items-center text-3xl text-red-600 px-4 animate-spin">
                          <AiOutlineLoading3Quarters />
                        </div>
                      ) : (
                        <>
                          {isUserFavorite ? (
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 1.5 }}
                              className="flex justify-center items-center text-3xl text-red-600 px-4 cursor-pointer"
                              onClick={() => addFavorite()}
                            >
                              <AiFillHeart />
                            </motion.div>
                          ) : (
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 1.5 }}
                              className="flex justify-center items-center text-3xl text-red-600 px-4 cursor-pointer"
                              onClick={() => addFavorite()}
                            >
                              <AiOutlineHeart />
                            </motion.div>
                          )}
                        </>
                      )}
                    </>
                  )}
                  <button
                    className="flex gap-3 bg-red-600 px-2.5 py-2.5 rounded-md items-center"
                    onClick={() => addFavorite()}
                  >
                    <BsPlayFill />
                    WATCH NOW
                  </button>
                </Stack>
                {movieCast.cast && (
                  <Container header="cast">
                    <CastSlide casts={movieCast.cast} />
                  </Container>
                )}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DetailsBanner;
