"use client";

import tmdbConfigs from "@/config/tmdb.configs";
import uiConfigs from "@/config/ui.configs";
import { Cast } from "@/typings";
import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
  casts: Cast[];
};

function CastSlide({ casts }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const navigatePage = async (castID: number) => {
    if (!castID) return;

    if (session) {
      router.push(`/cast/${castID}`);
    } else {
      toast.error(
        "You Need to Sign In to Look Up More Information About This Person"
      );
    }
  };

  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: { xs: "50%", md: "25%", lg: "20.5%" },
          color: "primary.contrastText",
        },
      }}
    >
      <Swiper
        spaceBetween={10}
        slidesPerView={"auto"}
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
        className="overflow-x-scroll overflow-y-hidden scrollbar-hide"
      >
        {casts.map((cast, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                paddingTop: "120%",
                color: "text.primary",
                ...uiConfigs.style.backgroundImage(
                  tmdbConfigs.posterPath(cast.profile_path)
                ),
                cursor: "pointer",
              }}
              onClick={() => navigatePage(cast.id)}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "max-content",
                  bottom: 0,
                  padding: "10px",
                  backgroundColor: "rgba(0,0,0,0.6)",
                }}
              >
                <Typography
                  sx={{ ...uiConfigs.style.typoLines(1, "left") }}
                  color="#fff"
                >
                  {cast.name}
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default CastSlide;
