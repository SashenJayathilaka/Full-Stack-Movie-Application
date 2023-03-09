import { PopularTyping } from "@/typings";
import { baseURL } from "@/utils/baseUrl";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import CircularRate from "./CircularRate";

type Props = {
  person: PopularTyping;
};

function PersonMapping({ person }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isHover, setIsHover] = useState(false);

  const navigatePage = async () => {
    if (session) {
      router.push(`/cast/${person.id}`);
    } else {
      toast.error(
        "You Need to Sign In to Look Up More Information About This Person"
      );
    }
  };

  return (
    <motion.div
      className="bg-transparent relative cursor-pointer items-center px-2 py-2 rounded-md shadow-2xl hover:bg-gray-800"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      onClick={() => navigatePage()}
    >
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <img
          src={`${baseURL}${person.profile_path}`}
          alt=""
          className="w-56 m-auto"
        />
        {isHover && (
          <>
            <motion.div
              className="absolute top-[250px] z-50 items-center ml-6 w-[180px]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <CircularRate value={person.popularity / 10} isPoster={true} />

              <p className="text-sm font-medium truncate">{person.name}</p>
            </motion.div>
            <div className="absolute w-full h-[200px] bg-gradient-to-t from-black to-transparent bottom-0 z-20" />
          </>
        )}
      </div>
    </motion.div>
  );
}

export default PersonMapping;
