import useCreate from "@/useApi/useCreate";
import useGetData from "@/useApi/useGetData";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";


export default function updateActivty(){
    const {getData} = useGetData()
    const [update, setUpdate] = useState([]);
    const [activityImage,setactivityImage] = useState(null);
    const [promp, setPromp] = useState('');
    const {postCreate} = useCreate();
    const route = useRouter()
    
    useEffect(()=>{
        getData(`activity/${route.query.id}`).then((resp)=>setUpdate(resp?.data?.data));
        getData(`categoryId/${route.query.id}`).then((resp)=>setUpdate(resp?.data?.data));
    }, [])

    const handleChange = async (e) => {
        const file = e.target.files[0];
        if (!file?.type?.startsWith('image/')) {
            setPromp('File should be .jpeg, .jpg or .png format');
            return;
        }
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await postCreate('upload-image', formData);
            setactivityImage(res.data.url);
        } catch (err) {
            setPromp(err);
        }
    console.log(setactivityImage);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const activityData ={
            categoryId:e.target.categoryID.value,
            title:e.target.name.value,  
            description:e.target.description.value,   
            imageUrls:activityImage,
            price: Number(e.target.price.value),
            price_discount: Number(e.target.discount.value),  
            rating: Number(e.target.rating.value),  
            total_reviews: Number(e.target.review.value),
            facilities:e.target.facilities.value,  
            address:e.target.address.value,  
            province:e.target.province.value,
            city:e.target.city.value,  
            location_maps:e.target.location.value,  
        }
        console.log(activityData);
        try {
            const res = await postCreate(`update-activity/${route.query.id}`, activityData);
            if (res?.status === 200) {
                setPromp(res?.data?.message);
            }
        } catch (err) {
            setPromp(err?.response?.data?.message);
        }
    };

    return(
        <div>
            <container className="m-5 d-flex tengah">
                <form  onSubmit={handleUpload} style={{width:"400px"}}>
                <p>{promp}</p>
                    <img src={activityImage} alt="image-upload" style={{width:"200px", height:"200px"}}/>
                        <Input type="text" placeholder="Enter categoryID activity" name="categoryID" defaultValue={update?.categoryId}/>
                        <Input type="text" placeholder="Enter title activity" name="title"defaultValue={update?.title}/>
                        <Input type="text" as="textarea" rows={3} placeholder="Enter description activity" name="description" defaultValue={update?.description}/>
                        <Input type="file" placeholder="Enter image file" name="image" onChange={handleChange} defaultValue={update?.imageUrls}/>
                        <Input type="number" placeholder="Enter price promo " name="price" defaultValue={update?.price}/>
                        <Input type="number" placeholder="Enter discount promo " name="discount" defaultValue={update?.price_discount}/>
                        <Input type="number" placeholder="Enter rating promo " name="rating" defaultValue={update?.rating}/>
                        <Input type="number" placeholder="Enter review promo " name="review" defaultValue={update?.total_reviews}/>
                        <Input type="text" placeholder="Enter facilities activity" name="facilities" defaultValue={update?.facilities}/>
                        <Input type="text" placeholder="Enter address activity" name="address" defaultValue={update?.address}/>
                        <Input type="text" placeholder="Enter province activity" name="province" defaultValue={update?.province}/>
                        <Input type="text" placeholder="Enter city activity" name="city" defaultValue={update?.city}/>
                        <Input as="textarea" rows={3} placeholder="Enter location activity" name="location" defaultValue={update?.location_maps}/>
                    <Button variant="primary" type="submit" className="w-100">
                        Submit
                    </Button>
                </form>
            </container>
        </div>
    )
}