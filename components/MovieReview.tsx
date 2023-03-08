import { MovieReviewData } from "@/typings";
import { baseURL } from "@/utils/baseUrl";
import moment from "moment";
import React from "react";

import Container from "./Container";

type Props = {
  movieReview: MovieReviewData[];
};

function MovieReview({ movieReview }: Props) {
  return (
    <div className="px-4 pb-20">
      <Container header="Review">
        <div className="w-full h-[300px] overflow-x-hidden overflow-y-scroll scrollbar-hide">
          {movieReview.map((review) => (
            <div
              key={review.id}
              className="h-auto w-full px-12 py-12 bg-gray-900 mb-6 mt-6 rounded-md shadow-md"
            >
              <div className="flex gap-8">
                {review.author_details.avatar_path ? (
                  <img
                    src={`${baseURL}${review.author_details.avatar_path}`}
                    alt="avatar"
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <img
                    src={`https://ui-avatars.com/api/?name=${
                      review.author_details.name || review.author
                    }`}
                    alt="avatar"
                    className="w-16 h-16 rounded-full"
                  />
                )}
                <div>
                  <p className="text-xl font-semibold">
                    A review by {review.author}
                  </p>
                  <p className="text-sm">
                    Written by {review.author} on{" "}
                    {moment(review.created_at).format("MMM Do YYYY")}
                  </p>
                  <div className="w-[80%] py-6">
                    <p>{review.content}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default MovieReview;
