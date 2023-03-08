"use client";

import DividerMovieLine from "@/components/DividerMovieLine";
import Footer from "@/components/Footer";
import GlobalLoading from "@/components/GlobalLoading";
import HomeBanner from "@/components/HomeBanner";
import Navbar from "@/components/Navbar";
import Row from "@/components/Row";
import ToastContainerBar from "@/components/ToastContainer";
import tvRequests from "@/utils/tvSeasonRequest";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {};

function TvSession({}: Props) {
  const [movie, setMovie] = useState({
    topRated: [],
    onTheAirTv: [],
    popularTv: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const [topRated, onTheAirTv, popularTv] = await Promise.all([
        fetch(tvRequests.fetchTopRated).then((res) => res.json()),
        fetch(tvRequests.fetchOnTheAir).then((res) => res.json()),
        fetch(tvRequests.fetchPopular).then((res) => res.json()),
      ]);

      setMovie((prev) => ({
        ...prev,
        topRated: topRated.results,
        onTheAirTv: onTheAirTv.results,
        popularTv: popularTv.results,
      }));

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error: any) {
      console.log("🚀 ~ file: page.tsx:64 ~ fetchData ~ error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <ToastContainerBar />
      <Navbar />
      <GlobalLoading isLoading={isLoading} />
      {movie && (
        <main className="relative pl-4 pb-24 lg:space-y-24">
          <HomeBanner netflixOriginals={movie.topRated} />
          <section className="md:space-y-24 pt-20">
            <Row
              movies={movie.topRated.slice(0, 10)}
              title="Trending Now"
              isMain={true}
            />
            <Row
              movies={movie.topRated.slice(10, movie.topRated.length)}
              title="Top Rated"
              isMain={true}
            />
            <div className="pb-14">
              <Row
                movies={movie.popularTv.slice(0, 10)}
                title="Action Thrillers"
                isMain={true}
              />
            </div>
            <DividerMovieLine
              netflixOriginals={movie.popularTv}
              horrorMovies={movie.topRated}
            />
            <Row
              movies={movie.onTheAirTv.slice(0, 10)}
              title="Comedies"
              isMain={true}
            />
            <Row
              movies={movie.onTheAirTv.slice(10, movie.onTheAirTv.length)}
              title="Scary Movies"
              isMain={true}
            />
            <Row
              movies={movie.popularTv.slice(0, movie.popularTv.length)}
              title="Romance Movies"
              isMain={true}
            />
          </section>
        </main>
      )}
      <Footer />
    </motion.div>
  );
}

export default TvSession;
