import useGetData from "@/useApi/useGetData"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";



export default function ActivityPage(){
    const [detail, setDetail] = useState([]);
    const {getData} = useGetData();
    const route = useRouter();

    useEffect(()=>{
        getData(`activities`).then((resp)=>setDetail(resp.data.data))
    })
    return(
        <container>
            <div className="container gap-3 px-4 my-5 tengah wrap">
                {detail.length > 0 && (
                    detail.map((res)=>(
                        <div key={res.id}>
                            <button onClick={()=>route.push(`/detail/activity/${res.id}`)}>
                                <Image src={res.imageUrls[0] || res.imageUrls[1]} alt={res.title} width={300} height={300} style={{height:"300px"}}/>
                                <div>
                                    <h6>{res.title}</h6>
                                </div>
                            </button>
                        </div>
                    ))
                )}
            </div>
        </container>
    )
}