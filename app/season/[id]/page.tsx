"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname, useSearchParams } from "next/navigation";
import GlobalLoading from "@/components/GlobalLoading";
import SeasonFeed from "@/components/SeasonFeed";

type Props = {};

function SeasonPage({}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get("sessionNumber");

  const fetchData = async (seasonId: string, seasonNumber: string | null) => {
    if (!seasonId && !seasonNumber) return;

    try {
      setLoading(true);

      const seasonsData = await fetch(
        `https://api.themoviedb.org/3/tv/${seasonId}/season/${seasonNumber}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      ).then((res) => res.json());

      setSeasons(seasonsData.episodes);

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error: any) {
      console.log("🚀 ~ file: page.tsx:23 ~ fetchData ~ error:", error);
    }
  };

  useEffect(() => {
    if (!pathname) return;

    const replaceName = pathname.replace("/season/", "");
    fetchData(replaceName, search!);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Navbar />
      <GlobalLoading isLoading={loading} />
      <main>
        <SeasonFeed seasons={seasons} />
      </main>
      <Footer />
    </motion.div>
  );
}

export default SeasonPage;
