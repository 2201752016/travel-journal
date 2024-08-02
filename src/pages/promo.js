import useGetData from "@/useApi/useGetData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../components/ui/card";
import { formatRupiah } from "../utils/utils";
import Link from "next/link";

const API_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

export async function getServerSideProps() {
  const response = await fetch(`${API_URL}/api/v1/promos`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  const data = await response.json();

  return {
    props: {
      initialPromoData: data?.data || [],
    },
  };
}

export default function PromoPage({ initialPromoData }) {
  const [promo, setPromo] = useState(initialPromoData);
  const { getData } = useGetData();
  const route = useRouter();

  useEffect(() => {
    AOS.init({});
    if (promo.length === 0) {
      getData(`promos`).then((res) => setPromo(res?.data?.data));
    }
  }, []);

  return (
    <section
      className="flex flex-col items-center justify-center w-3/4 p-5 mx-auto mt-10 bg-gray-300 border rounded-xl backdrop-filter backdrop-blur-md bg-opacity-10"
      style={{ marginTop: '80px' }}
    >
      <h1 className="text-3xl font-bold max-sm:text-xl max-sm:text-center">
        Create Memories with Every Activity
      </h1>
      <p className="text-gray-500 max-sm:text-sm max-sm:text-center">
        "Suggest that each activity will lead to lasting and cherished memories."
      </p>
      <div className="w-11/12 mt-10 max-sm:hidden">
        <div className="flex flex-wrap">
          {promo.length > 0 ? (
            promo.map((item) => (
              <Link
                href={`/detail/promo/${item.id}`}
                key={item.id}
                passHref
                className="mx-auto basis-1/3"
              >
                <Card className="w-[250px] hover:scale-105 duration-300 hover:bg-blue-300 bg-slate-300 pt-5 m-4 cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center gap-2">
                    <CardTitle className="text-lg font-bold">
                      {item.title}
                    </CardTitle>
                    <Image
                      src={item.imageUrl}
                      alt="promoImg"
                      className="rounded-lg aspect-video"
                      width={250}
                      height={250}
                    />
                    <div className="flex gap-2">
                      <CardDescription className="line-through">
                        {formatRupiah(item.minimum_claim_price)}
                      </CardDescription>
                      <CardDescription>
                        {formatRupiah(item.promo_discount_price)}
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </section>
  );
}
