"use client";

import Footer from "@/components/Footer";
import GlobalLoading from "@/components/GlobalLoading";
import MainProfile from "@/components/MainProfile";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Props = {};

function ProfilePage({}: Props) {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({
    movie: [],
    person: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async (userId: string) => {
    if (!userId) return;

    try {
      setLoading(true);

      const [favoriteMovie, favoritePerson] = await Promise.all([
        fetch(`http://localhost:3001/movie/${userId}`).then((res) =>
          res.json()
        ),
        fetch(`http://localhost:3001/person/${userId}`).then((res) =>
          res.json()
        ),
      ]);

      setUserData((prev) => ({
        ...prev,
        movie: favoriteMovie.quote,
        person: favoritePerson.quote,
      }));

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error: any) {
      console.log(
        "🚀 ~ file: DividerMovieLine.tsx:18 ~ fetchData ~ error:",
        error.message
      );
    }
  };

  useEffect(() => {
    fetchData(session?.user.uid!);
  }, [session]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="overflow-x-hidden"
    >
      <Navbar />
      <GlobalLoading isLoading={loading} />
      {session && (
        <main className="pb-24 lg:space-y-24">
          <MainProfile
            userMovieData={userData.movie}
            userPersonData={userData.person}
            session={session}
          />
        </main>
      )}
      <Footer />
    </motion.div>
  );
}

export default ProfilePage;
