import { Details, MovieImage } from "@/typings";
import { baseURL } from "@/utils/baseUrl";
import { Typography } from "@mui/material";
import Container from "./Container";
import ImageSwiper from "./ImageSwiper";

type Props = {
  movieImage: MovieImage[];
  movieDetails: Details;
};

function EffectCardsSweeper({ movieImage, movieDetails }: Props) {
  return (
    <div className="h-[70h] px-4">
      <Container header="Related Image & production companies">
        <div className="group relative md:-ml-2">
          <div className="inline-block md:flex justify-center py-4">
            <ImageSwiper movieImage={movieImage} />
            <div className="h-[60vh] w-[90vh] items-center space-y-8">
              {movieDetails.production_companies
                ?.slice(0, 4)
                .map((companies, index) => (
                  <div
                    key={companies.id}
                    className="flex justify-start space-x-10 items-center"
                  >
                    <p className="text-lg font-medium">
                      {index + 1}. {companies.name}
                    </p>
                    {companies.logo_path && (
                      <img
                        src={`${baseURL}${companies.logo_path}`}
                        className="w-24"
                        alt={companies.name}
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default EffectCardsSweeper;
