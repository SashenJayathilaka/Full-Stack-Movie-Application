"use client";

import Footer from "@/components/Footer";
import GlobalLoading from "@/components/GlobalLoading";
import Navbar from "@/components/Navbar";
import PersonBanner from "@/components/PersonBanner";
import Row from "@/components/Row";
import ToastContainerBar from "@/components/ToastContainer";
import { personData } from "@/typings";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {};

function CastPage({}: Props) {
  const pathname = usePathname();
  const [castData, setCastData] = useState({
    personData: {},
    relatedMovies: [],
    taggedImages: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async (id: string) => {
    if (!id) return;

    try {
      setLoading(true);

      const [personData, relatedMovies, taggedImages] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
        ).then((res) => res.json()),

        fetch(
          `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
        ).then((res) => res.json()),

        fetch(
          `https://api.themoviedb.org/3/person/${id}/tagged_images?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
        ).then((res) => res.json()),
      ]);

      const mappingImages = taggedImages.results.map((img: any) => img.media);

      setCastData((prev) => ({
        ...prev,
        personData: personData,
        relatedMovies: relatedMovies.cast,
        taggedImages: mappingImages,
      }));

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!pathname) return;

    const replaceName = pathname.replace("/cast/", "");
    fetchData(replaceName);
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
      <main className="space-y-36 pb-36">
        <PersonBanner
          personData={castData.personData as personData}
          taggedImages={castData.taggedImages}
        />
        <Row
          movies={castData.relatedMovies}
          title="Related Movies"
          isMain={true}
        />
      </main>
      <Footer />
    </motion.div>
  );
}

export default CastPage;
