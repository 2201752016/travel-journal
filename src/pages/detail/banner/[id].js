"use client"
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useGetData from "@/useApi/useGetData";
import Image from "next/image";

export default function bannerDetail(){
    const [detail, setDetail] = useState([]);
    const {getData} = useGetData()
    const route = useRouter();

    useEffect(()=>{
        getData(`banner/${route.query.id}`).then((res)=>setDetail(res.data.data))
    }, [])

    return(
        <Layout>
            <div key={detail.id} className="container gap-5 p-5 m-5 mx-auto border  tengah-detail border-dark" style={{width:"40%"}}>
                <Image src={detail.imageUrl} alt={detail.name} className="mx-auto img-detail" height={300} width={300}/>
                <div>
                    <p className="text-start">Name: {detail.name}</p>
                </div>
            </div>
        </Layout>
    )
}