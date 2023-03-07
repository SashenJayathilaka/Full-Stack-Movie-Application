"use client";

import Footer from "@/components/Footer";
import GlobalLoading from "@/components/GlobalLoading";
import MainProfile, { UserData } from "@/components/MainProfile";
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
    user: {},
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async (userId: string) => {
    if (!userId) return;

    try {
      setLoading(true);

      const [favoriteMovie, favoritePerson, userDetails] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/movie/${userId}`).then(
          (res) => res.json()
        ),
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/person/${userId}`).then(
          (res) => res.json()
        ),
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${userId}`).then(
          (res) => res.json()
        ),
      ]);

      setUserData((prev) => ({
        ...prev,
        movie: favoriteMovie.quote,
        person: favoritePerson.quote,
        user: userDetails.quote,
      }));

      setLoading(false);
    } catch (error: any) {
      console.log(
        "🚀 ~ file: DividerMovieLine.tsx:18 ~ fetchData ~ error:",
        error.message
      );
    }
  };

  useEffect(() => {
    fetchData(session?.user.uid!);
  }, []);

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
            userData={userData.user as UserData}
          />
        </main>
      )}
      <Footer />
    </motion.div>
  );
}

export default ProfilePage;
