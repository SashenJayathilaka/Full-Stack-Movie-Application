import { PopularTyping } from "@/typings";
import React from "react";
import Container from "./Container";
import PersonMapping from "./PersonMapping";

type Props = {
  people: PopularTyping[];
};

function PeoplePopular({ people }: Props) {
  return (
    <div className="pt-36 overflow-x-hidden">
      <Container header="Popular">
        <div className="inline-block md:grid grid-cols-5 gap-x-5 space-y-8 pt-8 px-8 items-center">
          {people?.map((person) => (
            <PersonMapping key={person.id} person={person} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default PeoplePopular;
