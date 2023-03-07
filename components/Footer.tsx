import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Props = {};

function Footer({}: Props) {
  const { data: session } = useSession();
  const [country, setCountry] = useState("United States");

  const createDbUser = async (user: Session) => {
    if (!user) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.user.uid,
            name: user.user.name,
            email: user.user.email,
            userPhotoUrl: user.user.image,
            country: country,
          }),
        }
      );

      const data = await response.json();
      if (data.status === "ok") {
        console.log("user Create Successfully");
      } else if (data.status === "exits") {
        console.log("user Already Created");
      }
    } catch (error: any) {
      console.log("🚀 ~ file: Footer.tsx:14 ~ createDbUser ~ error:", error);
    }
  };

  useEffect(() => {
    createDbUser(session!);
  }, [session]);

  useEffect(() => {
    fetch(
      `https://extreme-ip-lookup.com/json/?key=${process.env.NEXT_PUBLIC_LOOKUP_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setCountry(data.country));
  }, []);

  return (
    <div>
      <div className="flex flex-col text-[#737373] px-14 md:px-28 lg:px-40 xl:px-64 mt-14">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 my-4">
          <li className="my-1 md:mr-4 hover:underline cursor-pointer text-sm font-medium">
            FAQ
          </li>
          <li className="my-1 md:mr-4 hover:underline cursor-pointer text-sm font-medium">
            Investor Relations
          </li>
          <li className="my-1 md:mr-4 hover:underline cursor-pointer text-sm font-medium">
            Privacy
          </li>
          <li className="my-1 md:mr-4 hover:underline cursor-pointer text-sm font-medium">
            Speed Test
          </li>
          <li className="my-1 md:mr-4 hover:underline cursor-pointer text-xs font-medium">
            Help Centre
          </li>
          <li className="my-1 md:mr-4 hover:underline cursor-pointer text-xs font-medium">
            Jobs
          </li>
          <li className="my-1 md:mr-4 hover:underline cursor-pointer text-xs font-medium">
            Cookie Preferences
          </li>
          <li className="my-1 md:mr-4 hover:underline cursor-pointer text-xs font-medium">
            Legal Notices
          </li>
          <li className="my-1 md:mr-4 hover:underline cursor-pointer text-xs font-medium">
            Account
          </li>
          <li className="my-1 md:mr-4 hover:underline cursor-pointer text-xs font-medium">
            Ways to Watch
          </li>
          <li className="my-1 md:mr-4 hover:underline cursor-pointer text-xs font-medium">
            Corporate Information
          </li>
          <li className="my-1 md:mr-4 hover:underline cursor-pointer text-xs font-medium">
            Only on <span className="text-white">Movie</span>
            <span className="text-red-500">APP</span>
          </li>
          <li className="my-1 md:mr-4 hover:underline cursor-pointer text-xs font-medium">
            Media Centre
          </li>
          <li className="my-1 md:mr-4 hover:underline cursor-pointer text-xs font-medium">
            Terms of Use
          </li>
          <li className="my-1 md:mr-4 hover:underline cursor-pointer text-xs font-medium">
            {" "}
            <a href="https://www.linkedin.com/in/naveen-polasa/">
              Contact Us
            </a>{" "}
          </li>
        </ul>
        <button className="flex justify-center items-center font-medium h-12 w-36 border border-[#737373]">
          <img
            className="w-4 m-3  "
            src="https://drive.google.com/uc?export=download&id=1XZOSXtzEIp_7qhCN3vVnFEXroUaR-qfr"
            alt="globe"
          />
          English
        </button>
        <p className="my-4 text-xs font-medium">
          <span className="text-white">Movie</span>
          <span className="text-red-500">APP</span>
        </p>
        <p className="my-4 text-xs font-medium">{country}</p>
      </div>

      <div className="h-9 py-1 text-white text-center bg-[#333333]">
        For Educational Purposes Only
      </div>
    </div>
  );
}

export default Footer;
