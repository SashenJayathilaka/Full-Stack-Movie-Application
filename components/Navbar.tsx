"use client";

import { Menu, MenuItem } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

function Navbar({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`header ${isScrolled && "bg-[#141414]"} hover:bg-[#141414]`}
    >
      <div className="flex items-center space-x-2 md:space-x-10">
        <p className="font-bold text-3xl text-white">
          Movie<span className="text-red-500">App</span>
        </p>
        <ul className="hidden md:space-x-4 md:flex cursor-pointer items-center">
          <li
            className={`navBarComponents ${
              pathname === "/" && "bg-red-500 px-2.5 py-2.5 rounded-md"
            }`}
            onClick={() => router.push("/")}
          >
            Home
          </li>
          <li
            className={`navBarComponents ${
              pathname === "/tv" && "bg-red-500 px-2.5 py-2.5 rounded-md"
            }`}
            onClick={() => router.push("/tv")}
          >
            TV Shows
          </li>
          <li className="navBarComponents" onClick={() => router.push("/")}>
            Movies
          </li>
          <li
            className={`navBarComponents ${
              pathname === "/people" && "bg-red-500 px-2.5 py-2.5 rounded-md"
            }`}
            onClick={() => router.push("/people")}
          >
            People
          </li>
          <li
            className={`navBarComponents ${
              pathname === "/search" && "bg-red-500 px-2.5 py-2.5 rounded-md"
            }`}
            onClick={() => router.push("/search")}
          >
            Search
          </li>
          {session && (
            <li
              className={`navBarComponents ${
                pathname === "/profile" && "bg-red-500 px-2.5 py-2.5 rounded-md"
              }`}
              onClick={() => router.push("/profile")}
            >
              Profile
            </li>
          )}
        </ul>
      </div>
      <div className="font-light flex items-center space-x-4 text-sm mr-8">
        {session ? (
          <div>
            <button onClick={handleClick}>
              <img
                src={session.user.image!}
                alt={session.user.name!}
                className="w-8"
              />
            </button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => router.push("/profile")}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => router.push("/profile")}>
                My account
              </MenuItem>
              <MenuItem onClick={() => signOut()}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <button
            className="bg-red-500 px-2.5 py-2.5 rounded-md text-sm font-medium"
            onClick={() => signIn("google")}
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
