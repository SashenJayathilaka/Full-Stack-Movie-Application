import { baseURL } from "@/utils/baseUrl";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FcSearch } from "react-icons/fc";

import CircularRate from "./CircularRate";

export interface SearchData {
  adult: boolean;
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  video: boolean;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  also_known_as: any[];
  biography: string;
  birthday: string;
  deathday: string | undefined;
  gender: number;
  homepage: any | undefined;
  imdb_id: string;
  known_for_department: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

const searchTopic = [
  "Want comedies from 1970 with at least 1000 votes and average rating of 7.5?",
  "Want women born between 1950 and 1990 who have been nominated for Oscars?",
  "Want a list of titles in which both Brad Pitt and George Clooney appeared?",
];

type Props = {};

function SearchComponent({}: Props) {
  const router = useRouter();
  const [option, setOption] = useState("movie");
  const [searchTerms, setSearchTerms] = useState("");
  const [userSearchData, setUserSearchData] = useState<SearchData[]>([]);
  const [isHover, setIsHover] = useState(true);
  const [searchTopTopic, setSearchTopic] = useState("");

  const fetchSearchData = async (type: string, search: string) => {
    if (!type && !search) return;

    try {
      const [searchData] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`
        ).then((res) => res.json()),
      ]);

      setUserSearchData(searchData.results);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchSearchData(option, searchTerms);
  }, [option, searchTerms]);

  useEffect(() => {
    setSearchTopic(searchTopic[Math.floor(Math.random() * searchTopic.length)]);
  }, [option]);

  return (
    <div className="px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
      <div className="hero-headline flex flex-col items-center justify-center pt-24 text-center">
        <h1 className="font-bold text-3xl text-gray-300">
          Search Within a Topic
        </h1>
        <p className=" font-base text-base text-gray-400">{searchTopTopic}</p>
      </div>
      <div className="box pt-6">
        <div className="box-wrapper">
          <div className=" bg-white rounded flex items-center w-full p-3 shadow-sm border border-gray-200">
            <button className="outline-none focus:outline-none">
              <svg
                className=" w-5 text-gray-600 h-5 cursor-pointer"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
            <input
              type="search"
              name=""
              id=""
              placeholder="search for images"
              x-model="q"
              className="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent text-black"
              value={searchTerms}
              onChange={(e) => setSearchTerms(e.target.value)}
            />
            <div className="select">
              <select
                name=""
                id=""
                x-model="image_type"
                className="text-sm outline-none focus:outline-none bg-transparent text-black"
                value={option}
                onChange={(e) => setOption(e.target.value)}
              >
                <option value="movie" selected>
                  Movie
                </option>
                <option value="tv">TV Shows</option>
                <option value="person">Person</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {userSearchData.length < 1 ? (
        <div className="h-[300px] flex justify-center items-center">
          <FcSearch className="text-9xl animate-bounce" />
        </div>
      ) : (
        <section
          id="photos"
          className="my-5 grid grid-cols-1 md:grid-cols-6 gap-4"
        >
          {userSearchData?.map((data) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative hover:opacity-75 cursor-pointer"
              key={data.id}
              onClick={() =>
                option === "movie"
                  ? router.push(`/details/movie${data.id}`)
                  : option === "tv"
                  ? router.push(`/details/${data.id}`)
                  : option === "person" && router.push(`/cast/${data.id}`)
              }
            >
              <img
                className="md:h-[300px] md:min-w-[200px] object-cover"
                src={`${baseURL}${data.poster_path || data.profile_path}`}
                loading="lazy"
              />
              {isHover && (
                <>
                  <motion.div
                    className="absolute top-[190px] z-50 items-center ml-6 w-[180px]"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                  >
                    <CircularRate
                      value={data.vote_average || data.popularity / 10}
                      isPoster={true}
                    />
                    <p className="text-sm font-medium truncate">
                      {data?.title || data?.name || data?.original_name!}
                    </p>
                  </motion.div>
                  <div className="absolute w-full h-[200px] bg-gradient-to-t from-black to-transparent bottom-0 z-20" />
                </>
              )}
            </motion.div>
          ))}
        </section>
      )}
    </div>
  );
}

export default SearchComponent;
