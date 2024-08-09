"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useGetData from "@/useApi/useGetData";
import Image from "next/image";

const API_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const response = await fetch(`${API_URL}/api/v1/activity/${id}`, {
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

export default function ActivityDetail({ initialDetailData }) {
  const [detail, setDetail] = useState(initialDetailData);
  const route = useRouter();
  const { getData } = useGetData();

  useEffect(() => {
    if (!detail.id) {
      getData(`activity/${route.query.id}`).then((res) => {
        console.log('Fetched activity detail:', res.data.data);
        setDetail(res.data.data);
      }).catch(error => console.error('Error fetching activity detail:', error));
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
            src={Array.isArray(detail.imageUrls) ? detail.imageUrls[0] : detail.imageUrls}
            alt={detail.title}
            height={300}
            width={300}
            className="mx-auto img-detail"
          />
          <div className="ps-5 text-start">
            <p>Name: {detail.title}</p>
            <p>Description: {detail.description}</p>
            <p>Price: {detail.price}</p>
            <p>Price Discount: {detail.price_discount}</p>
            <p>Rating: {detail.rating}</p>
            <p>Total Review: {detail.total_reviews}</p>
            <p>Facilities: {detail.facilities}</p>
            <p>Address: {detail.address}</p>
            <p>Province: {detail.province}</p>
            <p>City: {detail.city}</p>
            {detail.location_maps && (
              <div
                dangerouslySetInnerHTML={{ __html: detail.location_maps }}
              />
            )}
            <p>Create at: {detail.createdAt}</p>
            <p>Update at: {detail.updatedAt}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
