"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useGetData from "@/useApi/useGetData";
import Image from "next/image";

const API_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const response = await fetch(`${API_URL}/api/v1/promo/${id}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  const data = await response.json();

  return {
    props: {
      initialDetailData: data?.data || {},
    },
  };
}

export default function PromoDetail({ initialDetailData }) {
  const [detail, setDetail] = useState(initialDetailData);
  const route = useRouter();
  const { getData } = useGetData();

  useEffect(() => {
    if (!detail.id) {
      getData(`promo/${route.query.id}`).then((res) =>
        setDetail(res.data.data)
      );
    }
  }, []);

  return (
    <div>
      {detail.id ? (
        <div
          key={detail.id}
          className="container gap-5 p-5 m-5 mx-auto border tengah-detail border-dark"
          style={{ width: "40%" }}
        >
          <Image
            src={detail.imageUrl}
            alt={detail.name}
            className="mx-auto img-detail"
            height={300}
            width={300}
          />
          <div className="ps-4 text-start">
            <p>Name: {detail.title}</p>
            <p>Description: {detail.description}</p>
            <p>Term Condition: {detail.terms_condition}</p>
            <p>Code: {detail.promo_code}</p>
            <p>Promo Discount Price: {detail.promo_discount_price}</p>
            <p>Minimum Claim Price: {detail.minimum_claim_price}</p>
            <p>Created at: {detail.createdAt}</p>
            <p>Updated at: {detail.updatedAt}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
