import { useState, useEffect } from 'react';
import useCreate from '../../../api/useCreate';
import styles from '../../../styles/CreateForm.module.css';
import { useRouter } from 'next/router';

const CreateActivity = () => {
  const [activityImage,setactivityImage] = useState(null);
  const [promp, setPromp] = useState('');
  const {postCreate} = useCreate();

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
  };

  const handleUpload = async (e) => {
      e.preventDefault();
      const activityData ={
          categoryId:e.target.categoryID.value,
          title:e.target.title.value,  
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
      try {
          const res = await postCreate('create-activity', activityData);
          if (res?.status === 200) {
              setPromp(res?.data?.message);
          }
      } catch (err) {
          setPromp(err?.response?.data?.message);
        }
    };

  return (
    <div className={styles.formContainer}>
      <h1>Create Activity</h1>
      <p className={styles.promp}>{promp}</p>
      <form onSubmit={handleUpload}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name='title' required />

        <label htmlFor="category">Category</label>
        <select id="category" name='category' required>
          <option value="">Select</option>
          {Array.isArray(categories) && categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" required />

        <label htmlFor="price">Price</label>
        <input type="number" id="price" name='price' required />

        <label htmlFor="priceDiscount">Price Discount</label>
        <input type="number" id="priceDiscount" name='priceDiscount' required />

        <label htmlFor="rating">Rating</label>
        <input type="number" id="rating" name='rating'required />

        <label htmlFor="totalReview">Total Review</label>
        <input type="number" id="totalReview" name='totalReview' required />

        <label htmlFor="facilities">Facilities</label>
        <input type="text" id="facilities" name='facilities' required />

        <label htmlFor="address">Address</label>
        <input type="text" id="address" name='address' required />

        <label htmlFor="city">City</label>
        <input type="text" id="city" name='city' required />

        <label htmlFor="province">Province</label>
        <input type="text" id="province" name='province' required />

        <label htmlFor="locationMaps">Location Maps</label>
        <input type="text" id="locationMaps" name='locationMaps' required />

        <label htmlFor="image">Image Files</label>
        <input type="file" id="image" name='image' multiple onChange={handleChange} required />

        <button type="submit">Create Activity</button>
      </form>
    </div>
  );
};

export default CreateActivity;
