import useGetData from "@/useApi/useGetData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { RiMapPin2Fill } from "react-icons/ri";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Link from "next/link";

export default function ActivityPage() {
  const [activity, setActivity] = useState([]);
  const { getData } = useGetData();
  const route = useRouter();

  useEffect(() => {
    getData(`activities`).then((resp) => setActivity(resp.data.data));
  }, []); // Include an empty dependency array to ensure it runs once

  return (
    <section className="flex flex-col items-center justify-center w-3/4 p-5 mx-auto mt-10 bg-gray-300 border rounded-xl backdrop-filter backdrop-blur-md bg-opacity-10">
      <h1 className="text-3xl font-bold max-sm:text-xl max-sm:text-center">
        Create Memories with Every Activity
      </h1>
      <p className="text-gray-500 max-sm:text-sm max-sm:text-center">
        "Suggest that each activity will lead to lasting and cherished memories."
      </p>
      <div className="w-11/12 mt-10 max-sm:hidden">
        <div>
          {activity.map((item) => (
            <div key={item.id} className="basis-1/3">
              <Link href="/activity" passHref>
                <Card className="w-[250px] hover:scale-95 duration-300 border-none bg-slate-300 pt-5">
                  <CardContent className="flex flex-col items-center justify-center gap-2">
                    <img
                      className="object-cover rounded-lg aspect-video"
                      src={item.imageUrls}
                      alt="imgActivity"
                    />
                    <div className="flex gap-1">
                      <CardTitle className="text-lg font-bold">
                        {item.title}
                      </CardTitle>
                      <div className="flex justify-center gap-1 px-2 py-1 bg-blue-500 rounded-lg w-fit">
                        <FaStar className="text-yellow-500" />
                        <CardDescription className="text-black">
                          {item.rating}
                        </CardDescription>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <RiMapPin2Fill className="text-yellow-500" />
                      <CardDescription className="text-sm">
                        {item.city}, {item.province}
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
        <div className="bg-blue-500" />
        <div className="bg-blue-500" />
      </div>

      <div className="w-9/12 mt-5 sm:hidden">
        <div>
          {activity.map((item) => (
            <div key={item.id}>
              <Link href="/activity" passHref>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center gap-2 mt-5">
                    <img
                      className="object-cover rounded-lg aspect-video"
                      src={item.imageUrls}
                      alt="imgActivity"
                    />
                    <div className="flex flex-col items-center justify-center gap-1">
                      <CardTitle className="text-xs font-bold">
                        {item.title}
                      </CardTitle>
                      <div className="flex justify-center p-1 bg-blue-500 rounded-full w-fit">
                        <FaStar className="w-1/2 text-yellow-500" />
                        <CardDescription className="text-xs text-black">
                          {item.rating}
                        </CardDescription>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <RiMapPin2Fill className="text-yellow-500" />
                      <CardDescription className="text-xs">
                        {item.city}, {item.province}
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
