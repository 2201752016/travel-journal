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
import styles from '../styles/PromoPage.module.css'; // Import the new CSS file

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
    <div className={styles.pageContainer}>
      <section className={styles.sectionContainer}>
        <h1 className="text-3xl font-bold text-center">
          Create Memories with Every Activity
        </h1>
        <p className="mb-4 text-center text-gray-500">
          "Suggest that each activity will lead to lasting and cherished memories."
        </p>
        <div className="w-full mt-10">
          <div className="flex flex-wrap justify-center">
            {promo.length > 0 ? (
              promo.map((item) => (
                <Link
                  href={`/detail/promo/${item.id}`}
                  key={item.id}
                  passHref
                  className={styles.card}
                >
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center gap-2">
                      <CardTitle className={styles.cardTitle}>
                        {item.title}
                      </CardTitle>
                      <Image
                        src={item.imageUrl}
                        alt="promoImg"
                        className="rounded-lg aspect-video"
                        width={250}
                        height={150}
                      />
                      <div className={styles.discountPrices}>
                        <CardDescription className={styles.lineThrough}>
                          {formatRupiah(item.minimum_claim_price)}
                        </CardDescription>
                        <CardDescription className={styles.cardDescription}>
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
    </div>
  );
}
