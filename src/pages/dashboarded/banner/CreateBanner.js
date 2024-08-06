// CreateBanner.js
import useCreate from "../../../useApi/useCreate";
import { useState } from "react";
import styles from '../../../styles/CreateForm.module.css';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const CreateBanner = () => {
  const [bannerImage, setBannerImage] = useState("");
  const [promp, setPromp] = useState('');
  const { postCreate } = useCreate();

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
      setBannerImage(res.data.url);
    } catch (err) {
      setPromp(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const bannerData = {
      name: e.target.name.value,
      imageUrl: bannerImage,
    };
    try {
      const res = await postCreate('create-banner', bannerData);
      if (res?.status === 200) {
        setPromp(res?.data?.message);
      }
    } catch (err) {
      setPromp(err?.response?.data?.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>Create Banner</h1>
      <p>{promp}</p>
      <form onSubmit={handleUpload} className={styles.form}>
        <label htmlFor="name" className={styles.label}>Banner Name</label>
        <Input type="text" id="name" name='name' required className={styles.input} />

        <label htmlFor="image" className={styles.label}>Image File</label>
        <Input type="file" id="image" name='image' onChange={handleChange} required className={styles.input} />

        <div className={styles.buttonContainer}>
          <Button type="submit" className={styles.button}>Create Banner</Button>
          <Button type="button" className={`${styles.button} ${styles.buttonCancel}`}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBanner;
