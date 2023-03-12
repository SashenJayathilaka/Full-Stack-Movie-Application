import { Episode } from "@/typings";
import { baseURL } from "@/utils/baseUrl";
import React from "react";
import CircularRate from "./CircularRate";

type Props = {
  seasons: Episode[];
};

function SeasonFeed({ seasons }: Props) {
  return (
    <div className="pt-36 mx-8 overflow-x-hidden space-y-8 items-center">
      {seasons.map((season) => (
        <div
          className="relative flex flex-col min-w-0 break-words shadow-soft-xl rounded-2xl bg-clip-border bg-gray-900"
          key={season.id}
        >
          <div className="flex-auto p-4">
            <div className="flex flex-wrap -mx-3">
              <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
                <div className="flex flex-col h-full space-y-8">
                  <p className="pt-2 mb-1 font-semibold">
                    Episode
                    {season.episode_number}
                  </p>
                  <h5 className="font-bold text-xl">{season.name}</h5>
                  <p className="mb-12">{season.overview}</p>
                  <a
                    className="mt-auto mb-0 font-semibold leading-normal text-sm group text-slate-500"
                    href="javascript:;"
                  >
                    <CircularRate value={season.vote_average} />
                    <i className="fas fa-arrow-right ease-bounce text-sm group-hover:translate-x-1.25 ml-1 leading-normal transition-all duration-200"></i>
                  </a>
                </div>
              </div>
              <div className="max-w-full px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-5/12 lg:flex-none">
                <div
                  className={`h-[300px] bg-gradient-to-tl from-purple-700 to-pink-500 rounded-xl !season.still_path && "animate-pulse"`}
                >
                  <img
                    src={`${baseURL}${season.still_path}`}
                    className={`absolute top-0 hidden w-1/2 h-full lg:block ${
                      !season.still_path && "animate-pulse"
                    }`}
                    alt="season"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SeasonFeed;
