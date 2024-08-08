import useGetData from "@/useApi/useGetData";
import useCreate from "@/useApi/useCreate";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import styles from "@/styles/UpdateForm.module.css";

export default function updateActivity() {
  const { getData } = useGetData();
  const [update, setUpdate] = useState({});
  const [activityImage, setActivityImage] = useState([]);
  const [promp, setPromp] = useState('');
  const { postCreate } = useCreate();
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      getData(`activity/${router.query.id}`).then((resp) => {
        setUpdate(resp?.data?.data);
        setActivityImage(resp?.data?.data?.imageUrls || []);
      });
    }
  }, [router.query.id]);

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
      setActivityImage([res.data.url]);
    } catch (err) {
      setPromp(err.message);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const activityData = {
      categoryId: e.target.categoryId.value,
      title: e.target.title.value,
      description: e.target.description.value,
      imageUrls: activityImage.length ? activityImage : update.imageUrls,
      price: Number(e.target.price.value),
      price_discount: Number(e.target.price_discount.value),
      rating: Number(e.target.rating.value),
      total_reviews: Number(e.target.total_reviews.value),
      facilities: e.target.facilities.value,
      address: e.target.address.value,
      province: e.target.province.value,
      city: e.target.city.value,
      location_maps: e.target.location_maps.value,
    };
    console.log('activityData:', activityData); // Debugging log

    try {
      const res = await postCreate(`update-activity/${router.query.id}`, activityData);
      if (res?.status === 200) {
        setPromp(res?.data?.message);
        router.push('/dashboarded/activity');
      }
    } catch (err) {
      console.error('Error updating activity:', err.response ? err.response.data : err.message);
      setPromp(err?.response?.data?.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>Update Activity</h1>
      <p className={styles.promp}>{promp}</p>
      <form onSubmit={handleUpload} className={styles.form}>
        {activityImage.length > 0 || update.imageUrls?.length > 0 ? (
          <img src={activityImage[0] || update.imageUrls[0]} alt="image-upload" style={{ width: "200px", height: "200px" }} />
        ) : (
          <p>No image available</p>
        )}
        <label htmlFor="categoryId" className={styles.label}>Category ID</label>
        <Input type='text' id='categoryId' name='categoryId' defaultValue={update?.categoryId} className={styles.input} />

        <label htmlFor="title" className={styles.label}>Title</label>
        <Input type='text' id='title' name='title' defaultValue={update?.title} className={styles.input} />

        <label htmlFor="description" className={styles.label}>Description</label>
        <textarea id="description" name="description" defaultValue={update?.description} className={styles.textarea} />

        <label htmlFor="image" className={styles.label}>Image File</label>
        <Input type='file' name='image' id='image' onChange={handleChange} className={styles.input} />

        <label htmlFor="price" className={styles.label}>Price</label>
        <Input type="number" id="price" name="price" defaultValue={update?.price} className={styles.input} />

        <label htmlFor="price_discount" className={styles.label}>Price Discount</label>
        <Input type="number" id="price_discount" name="price_discount" defaultValue={update?.price_discount} className={styles.input} />

        <label htmlFor="rating" className={styles.label}>Rating</label>
        <Input type="number" id="rating" name="rating" defaultValue={update?.rating} className={styles.input} />

        <label htmlFor="total_reviews" className={styles.label}>Total Reviews</label>
        <Input type="number" id="total_reviews" name="total_reviews" defaultValue={update?.total_reviews} className={styles.input} />

        <label htmlFor="facilities" className={styles.label}>Facilities</label>
        <Input type="text" id="facilities" name="facilities" defaultValue={update?.facilities} className={styles.input} />

        <label htmlFor="address" className={styles.label}>Address</label>
        <Input type="text" id="address" name="address" defaultValue={update?.address} className={styles.input} />

        <label htmlFor="province" className={styles.label}>Province</label>
        <Input type="text" id="province" name="province" defaultValue={update?.province} className={styles.input} />

        <label htmlFor="city" className={styles.label}>City</label>
        <Input type="text" id="city" name="city" defaultValue={update?.city} className={styles.input} />

        <label htmlFor="location_maps" className={styles.label}>Location Maps</label>
        <textarea id="location_maps" name="location_maps" defaultValue={update?.location_maps} className={styles.textarea} />

        <div className={styles.buttonContainer}>
          <Button type="submit" className={styles.button}>Submit</Button>
          <Button
            type="button"
            onClick={() => router.back()}
            className={`${styles.button} ${styles.buttonCancel}`}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
