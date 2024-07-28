"use client"
import Layout from "@/components/Layout";
import useGetData from "@/useApi/useGetData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";


export default function ActivityDetail(){
    const [detail, setDetail] = useState([]);
    const route = useRouter();
    const {getData} = useGetData();

    useEffect(()=>{
        getData(`activity/${route.query.id}`).then((res)=>setDetail(res.data.data));
    }, [])

    console.log(detail);

    return(
        <div>
            <div key={detail.id} className="container gap-5 p-5 m-5 mx-auto border tengah-detail border-dark" style={{width:"40%"}}>
                <Image src={detail.imageUrls} alt={detail.title} height={300} width={300} className="mx-auto img-detail"/>
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
                    <div dangerouslySetInnerHTML={{__html:detail.location_maps}}/>
                    <p>Create at: {detail.createdAt}</p>
                    <p>Update at: {detail.updatedAt}</p>
                </div>
            </div>
        </div>
    )
}