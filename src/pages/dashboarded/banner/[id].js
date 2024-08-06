import useGetData from "@/useApi/useGetData";
import useCreate from "@/useApi/useCreate"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function updateBanner(){
    const {getData} = useGetData();
    const [update, setUpdate] = useState([]);
    const [bannerImage,setbannerImage] = useState("");
    const [promp, setPromp] = useState('');
    const {postCreate} = useCreate();
    const route = useRouter();

    useEffect(() => {
        getData(`banner/${route.query.id}`).then((resp)=>setUpdate(resp?.data?.data));
      }, []);

    const handleChange = async (e) => {
        const file = e.target.files[0];
        if (!file?.type?.startsWith('image/')) {
            setPromp('File should be .jpeg, .jpg or .png format');
            return;
        }
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await postCreate(`upload-image`, formData);
            setbannerImage(res.data.url);
        } catch (err) {
            setPromp(err);
        }
    console.log(setbannerImage);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const bannerData ={
            name:e.target.name.value,   
            imageUrl:bannerImage,
        }
        console.log(bannerData);
        try {
            const res = await postCreate(`update-banner/${route.query.id}`, bannerData);
            if (res?.status === 200) {
                setPromp(res?.data?.message);
            }
        } catch (err) {
            setPromp(err?.response?.data?.message);
        }
    };

    return(
        <div>
            <container className="d-flex m-5 tengah">
                <form  onSubmit={handleUpload} style={{width:"400px"}}>
                    <p>{promp}</p>
                    <img src={bannerImage} alt="image-upload" style={{width:"200px", height:"200px"}}/>
                    <Input type='text' id='name' name='name' defaultValue={update?.name}/>
                    <Input type='file' name='image' id='image' onChange={handleChange} defaultValue={update?.imageUrl}/>
                    <Button type="submit" className="btn btn-primary w-100">
                        Submit
                    </Button>
                </form>
            </container>
        </div>
    )
}