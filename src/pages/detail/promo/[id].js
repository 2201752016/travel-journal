"use client"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useGetData from "@/useApi/useGetData";
import Image from "next/image";
export default function promoDetail(){
    const [detail, setDetail] = useState([]);
    const route = useRouter();
    const {getData} = useGetData();

    useEffect(()=>{
        getData(`promo/${route.query.id}`).then((res)=>setDetail(res.data.data));
    }, [])


    return(
        <div>
            <div key={detail.id} className="container gap-5 p-5 m-5 mx-auto border tengah-detail border-dark" style={{width:"40%"}}>
                <Image src={detail.imageUrl} alt={detail.name} className="mx-auto img-detail" height={300} width={300}/>
                <div className="ps-4 text-start">
                    <p>Name: {detail.title}</p>
                    <p>description: {detail.description}</p>
                    <p>Term Condition: {detail.terms_condition}</p>
                    <p>Code: {detail.promo_code}</p>
                    <p>Promo Discroun Price: {detail.promo_discount_price}</p>
                    <p>Minimum Claim Price: {detail.minimum_claim_price}</p>
                    <p>Create at: {detail.createdAt}</p>
                    <p>Update at: {detail.updatedAt}</p>
                </div>
            </div>
        </div>
    )
}