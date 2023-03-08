"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SearchComponent from "@/components/SearchComponent";
import { motion } from "framer-motion";
import React from "react";

type Props = {};

function searchPage({}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="overflow-x-hidden"
    >
      <Navbar />
      <main>
        <SearchComponent />
      </main>
      <Footer />
    </motion.div>
  );
}

export default searchPage;
