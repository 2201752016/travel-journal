"use client"
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useGetData from "@/useApi/useGetData";
import Image from "next/image";

export default function categoryDetail(){
    const [detail, setDetail] = useState([]);
    const route = useRouter();
    const {getData} = useGetData();

    useEffect(()=>{
        getData(`category/${route.query.id}`).then((res)=>setDetail(res.data.data));
    }, [])

    return(
        <Layout>
            <div key={detail.id} className="container gap-5 p-5 m-5 mx-auto border tengah-detail border-dark" style={{width:"40%"}}>
                <Image src={detail.imageUrl} alt={detail.name} className="mx-auto img-detail" height={300} width={300}/>
                <div className="ps-5 text-start">
                    <p>Name: {detail.name}</p>
                    <p>Create at: {detail.createdAt}</p>
                    <p>Update at: {detail.updatedAt}</p>
                </div>
            </div>
        </Layout>
    )
}