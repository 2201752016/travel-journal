import useGetData from "@/useApi/useGetData";
import useCreate from "@/useApi/useCreate";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import styles from "@/styles/UpdateForm.module.css";

export default function updateCategory() {
  const { getData } = useGetData();
  const [update, setUpdate] = useState({});
  const [categoryImage, setCategoryImage] = useState("");
  const [promp, setPromp] = useState('');
  const { postCreate } = useCreate();
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      getData(`category/${router.query.id}`).then((resp) => setUpdate(resp?.data?.data));
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
      setCategoryImage(res.data.url);
    } catch (err) {
      setPromp(err.message);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const categoryData = {
      name: e.target.name.value,
      description: e.target.description.value,
      imageUrl: categoryImage || update.imageUrl,
    };
    try {
      const res = await postCreate(`update-category/${router.query.id}`, categoryData);
      if (res?.status === 200) {
        setPromp(res?.data?.message);
        router.push('/dashboarded/category');
      }
    } catch (err) {
      setPromp(err?.response?.data?.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>Update Category</h1>
      <p className={styles.promp}>{promp}</p>
      <form onSubmit={handleUpload} className={styles.form}>
        <img src={categoryImage || update.imageUrl} alt="image-upload" style={{ width: "200px", height: "200px" }} />
        <label htmlFor="name" className={styles.label}>Name</label>
        <Input type='text' id='name' name='name' defaultValue={update?.name} className={styles.input} />

        <label htmlFor="description" className={styles.label}>Description</label>
        <textarea id="description" name="description" defaultValue={update?.description} className={styles.textarea} />

        <label htmlFor="image" className={styles.label}>Image File</label>
        <Input type='file' name='image' id='image' onChange={handleChange} className={styles.input} />

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
