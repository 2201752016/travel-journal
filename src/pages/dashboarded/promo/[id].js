import useGetData from "@/useApi/useGetData";
import useCreate from "@/useApi/useCreate";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import styles from "@/styles/UpdateForm.module.css";

export default function updatePromo() {
  const { getData } = useGetData();
  const [update, setUpdate] = useState({});
  const [promoImage, setPromoImage] = useState("");
  const [promp, setPromp] = useState('');
  const { postCreate } = useCreate();
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      getData(`promo/${router.query.id}`).then((resp) => setUpdate(resp?.data?.data));
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
      setPromoImage(res.data.url);
    } catch (err) {
      setPromp(err.message);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const promoData = {
      title: e.target.title.value,
      description: e.target.description.value,
      imageUrl: promoImage || update.imageUrl,
      terms_condition: e.target.terms_condition.value,
      promo_code: e.target.promo_code.value,
      promo_discount_price: Number(e.target.promo_discount_price.value),
      minimum_claim_price: Number(e.target.minimum_claim_price.value),
    };
    try {
      const res = await postCreate(`update-promo/${router.query.id}`, promoData);
      if (res?.status === 200) {
        setPromp(res?.data?.message);
        router.push('/dashboarded/promo');
      }
    } catch (err) {
      setPromp(err?.response?.data?.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>Update Promo</h1>
      <p className={styles.promp}>{promp}</p>
      <form onSubmit={handleUpload} className={styles.form}>
        <img src={promoImage || update.imageUrl} alt="image-upload" style={{ width: "200px", height: "200px" }} />
        <label htmlFor="title" className={styles.label}>Title</label>
        <Input type='text' id='title' name='title' defaultValue={update?.title} className={styles.input} />

        <label htmlFor="description" className={styles.label}>Description</label>
        <textarea id="description" name="description" defaultValue={update?.description} className={styles.textarea} />

        <label htmlFor="image" className={styles.label}>Image File</label>
        <Input type='file' name='image' id='image' onChange={handleChange} className={styles.input} />

        <label htmlFor="terms_condition" className={styles.label}>Terms & Conditions</label>
        <Input type="text" id="terms_condition" name="terms_condition" defaultValue={update?.terms_condition} className={styles.input} />

        <label htmlFor="promo_code" className={styles.label}>Promo Code</label>
        <Input type="text" id="promo_code" name="promo_code" defaultValue={update?.promo_code} className={styles.input} />

        <label htmlFor="promo_discount_price" className={styles.label}>Promo Discount Price</label>
        <Input type="number" id="promo_discount_price" name="promo_discount_price" defaultValue={update?.promo_discount_price} className={styles.input} />

        <label htmlFor="minimum_claim_price" className={styles.label}>Minimum Claim Price</label>
        <Input type="number" id="minimum_claim_price" name="minimum_claim_price" defaultValue={update?.minimum_claim_price} className={styles.input} />

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
