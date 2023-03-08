import tmdbConfigs from "@/config/tmdb.configs";
import uiConfigs from "@/config/ui.configs";
import { Details, personData } from "@/typings";
import { baseURL } from "@/utils/baseUrl";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { toast } from "react-toastify";
import CircularRate from "./CircularRate";

const pusher = new Pusher(`${process.env.NEXT_PUBLIC_PUSHER_KEY}`, {
  cluster: "eu",
});

type Props = {
  personData: personData;
  taggedImages: Details[];
};

function PersonBanner({ personData, taggedImages }: Props) {
  const { data: session } = useSession();
  const [movie, setMovie] = useState<Details | null>(null);
  const [isUserFavorite, setIsUserFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isFavorite = async (user: Session, personId: number) => {
    if (!user && !personId) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/find/person`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.user.uid,
            personId: personId,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "nonExits") {
        setIsUserFavorite(false);
      } else if (data.status === "exits") {
        setIsUserFavorite(true);
      } else return;
    } catch (error: any) {
      console.log("🚀 ~ file: DetailsBanner.tsx:29 ~ isLike ~ error:", error);
    }
  };

  const addFavorite = async () => {
    if (!session && !personData) return;

    try {
      setIsLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/save/person`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session?.user?.uid,
            personId: personData.id,
            gender: personData.gender,
            name: personData.name,
            popularity: personData.popularity,
            profile_path: personData.profile_path,
            known_for_department: "Action",
          }),
        }
      );

      const data = await response.json();

      if (data.status === "disLike" || data.status === "like") {
        const channel = pusher.subscribe("person-data");
        channel.bind("new-personData", function (data: any) {
          addFavorite();
        });
        isFavorite(session!, personData.id!);
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
    setMovie(taggedImages[Math.floor(Math.random() * taggedImages.length)]);
  }, [taggedImages]);

  useEffect(() => {
    isFavorite(session!, personData.id!);
  }, [session, personData.id]);

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
            movie?.backdrop_path || movie?.poster_path
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
                    tmdbConfigs.posterPath(personData.profile_path)
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
                  {personData.name}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CircularRate
                    value={personData.popularity / 100!}
                    isPoster={false}
                  />
                  <Divider orientation="vertical" />
                  {personData?.also_known_as
                    ?.slice(0, 4)
                    .map((genre, index) => (
                      <Chip
                        label={genre}
                        variant="filled"
                        color="error"
                        key={index}
                      />
                    ))}
                </Stack>
                <Stack direction="row" spacing={1}>
                  {session && (
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
                </Stack>
                <p className="text-white">{personData.biography}</p>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default PersonBanner;
