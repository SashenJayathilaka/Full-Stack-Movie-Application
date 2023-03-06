"use client";

import DetailsBanner from "@/components/DetailsBanner";
import EffectCardsSweeper from "@/components/EffectCards";
import Footer from "@/components/Footer";
import GlobalLoading from "@/components/GlobalLoading";
import Navbar from "@/components/Navbar";
import Row from "@/components/Row";
import Seasons from "@/components/Seasons";
import ToastContainerBar from "@/components/ToastContainer";
import Trailer from "@/components/Trailer";
import { Details, MovieCastCrew } from "@/typings";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

function DetailsPage({}: Props) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [movieDetails, setMovieDetails] = useState({
    movieVideo: [],
    movieCast: [],
    movieDetails: {},
    similar: [],
    images: [],
  });
  const [loading, setLoading] = useState(true);
  const [isTV, setIsTv] = useState(false);
  /*   console.log(
    "🚀 ~ file: page.tsx:8 ~ DetailsPage ~ pathname:",
    pathname.replace("/details/", "")
  ); */

  const fetchData = async (replaceName: string) => {
    if (!replaceName) return;

    try {
      const isInclude = replaceName.includes("movie");
      const movieID = replaceName.replace("movie", "");

      if (!isInclude) {
        setIsTv(true);
      }

      setLoading(true);

      const [movieVideo, movieCast, movieDetails, similar, images] =
        await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/${
              isInclude ? "movie" : "tv"
            }/${movieID}/videos?api_key=${
              process.env.NEXT_PUBLIC_API_KEY
            }&language=en-US`
          ).then((res) => res.json()),

          fetch(
            `https://api.themoviedb.org/3/${
              isInclude ? "movie" : "tv"
            }/${movieID}/credits?api_key=${
              process.env.NEXT_PUBLIC_API_KEY
            }&language=en-US`
          ).then((res) => res.json()),

          fetch(
            `https://api.themoviedb.org/3/${
              isInclude ? "movie" : "tv"
            }/${movieID}?api_key=${
              process.env.NEXT_PUBLIC_API_KEY
            }&language=en-US`
          ).then((res) => res.json()),

          fetch(
            `https://api.themoviedb.org/3/${
              isInclude ? "movie" : "tv"
            }/${movieID}/recommendations?api_key=${
              process.env.NEXT_PUBLIC_API_KEY
            }&language=en-US&page=1`
          ).then((res) => res.json()),

          fetch(
            `https://api.themoviedb.org/3/${
              isInclude ? "movie" : "tv"
            }/${movieID}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
          ).then((res) => res.json()),
        ]);

      setMovieDetails((prev) => ({
        ...prev,
        movieVideo: movieVideo.results,
        movieCast: movieCast,
        movieDetails: movieDetails,
        similar: similar.results,
        images: images.backdrops,
      }));

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error: any) {
      console.log("🚀 ~ file: page.tsx:25 ~ fetchData ~ error:", error);
    }
  };

  useEffect(() => {
    if (!pathname) return;

    const replaceName = pathname.replace("/details/", "");
    fetchData(replaceName.toString());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="overflow-x-hidden"
    >
      <ToastContainerBar />
      <Navbar />
      <GlobalLoading isLoading={loading} />
      <main>
        <DetailsBanner
          movieDetails={movieDetails.movieDetails as Details}
          movieCast={movieDetails.movieCast as unknown as MovieCastCrew}
          session={session}
        />
        <Trailer
          movieTrailer={movieDetails.movieVideo}
          movieDetails={movieDetails.movieDetails as Details}
        />
        <EffectCardsSweeper
          movieImage={movieDetails.images}
          movieDetails={movieDetails.movieDetails as Details}
        />
        {isTV && (
          <Seasons movieDetails={movieDetails.movieDetails as Details} />
        )}
        <Row
          movies={movieDetails.similar}
          title="YOU MAY ALSO LIKE"
          isMain={false}
        />
      </main>
      <Footer />
    </motion.div>
  );
}

export default DetailsPage;
