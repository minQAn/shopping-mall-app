import React, { useState } from 'react';
import { addNewProduct } from '../api/firebase';
import { uploadImage } from '../api/uploader';
import Button from '../components/ui/Button';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'file') {
      setFile(files && files[0]);
      // console.log(files);
      return;
    }

    setProduct((product) => ({
      ...product,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    // 1. upload a product image to Cloudinary and get URL
    // 2. add a product to Firebase
    uploadImage(file)
      .then((url) => {
        // console.log(url);
        addNewProduct(product, url).then(() => {
          setSuccess('Your product successfully registered.');
          setTimeout(() => {
            setSuccess(null);
          }, 4000);
        });
      })
      .finally(() => setIsUploading(false));
  };

  return (
    <section className='w-full text-center'>
      <h2 className='text-2xl font-bold my-4'>Register New Product</h2>
      {success && <p className='my-2'>✅ {success}</p>}
      {file && (
        <img
          className='w-96 mx-auto mb-2'
          src={URL.createObjectURL(file)}
          alt='local file'
        />
      )}
      <form className='flex flex-col px-12' onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          name='file'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='title'
          value={product.title ?? ''}
          placeholder='Product Name'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='price'
          value={product.price ?? ''}
          placeholder='Price'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='description'
          value={product.description ?? ''}
          placeholder='Product Description'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='options'
          value={product.options ?? ''}
          placeholder='Options(categorized by commas(,))'
          required
          onChange={handleChange}
        />
        <Button
          text={isUploading ? 'Uploading...' : 'Register'}
          disabled={isUploading}
        />
      </form>
    </section>
  );
}
