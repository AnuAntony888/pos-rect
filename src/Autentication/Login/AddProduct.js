import React, { useState } from "react";
import axios from "axios";
import { Singleproduct, useGetSingleProduct } from "../../API/APIproduct";
import { Toastsucess } from "../../Reusable";

const AddProduct = () => {
  // const [product, setProduct] = useState({
  //   name: '',
  //   description: '',
  //   price: '',
  //   images:'[]'
  // });
  // const [files, setFiles] = useState([]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setProduct({ ...product, [name]: value });
  // };

  // const handleFileChange = (e) => {
  //   console.log('Selected files:', e.target.files); // Debugging
  //   setFiles(e.target.files);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append('name', product.name);
  //   formData.append('description', product.description);
  //   formData.append('unit_price', product.price); // Note: Remove extra space before `unit_price`
  //   for (let i = 0; i < files.length; i++) {
  //     formData.append('images', files[i]);
  //   }

  //   try {
  //     const response = await axios.post('http://localhost:5000/api/products/addproduct', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         // 'Authorization': `Bearer ${token}` // Uncomment if using authentication
  //       }
  //     });
  //     console.log('Response:', response); // Debugging
  //     alert('Product added successfully');
  //   } catch (error) {
  //     console.error('Error adding product:', error.response ? error.response.data : error.message);
  //     alert('Error adding product');
  //   }
  // };

  // const [barcode, setBarcode] = useState("");
  // const [product, setProduct] = useState(null);
  // const [error, setError] = useState("");

  // const handleBarcodeChange = (e) => {
  //   setBarcode(e.target.value);
  // };

  // const handleSubmit123 = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setProduct(null);

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/products/getsingleproduct",
  //       { barcode }
  //     );
  //     setProduct(response.data);
  //   } catch (err) {
  //     setError(err.response ? err.response.data.error : "An error occurred");
  //   }
  // };

  const [barcode, setBarcode] = useState("");
  const {
    singleproduct,
    singleproducterror,
    singleproductisLoading,
  } = Singleproduct();

  const handleBarcodeChange = (e) => {
    setBarcode(e.target.value);
  };

  const handleApi = async () => {
    try {
      if (!barcode) {
        Toastsucess("Please enter a barcode.");
        return;
      }

      await singleproduct({ barcode });

      Toastsucess("Product fetched successfully!", "success", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  // const imge = `http://localhost:5000/${data?.images?.[0]
  //   .replace(/\\/g, "/")
  //   .replace("C:/Users/VBS/Desktop/POS TESTING/Backend/uploads", "uploads")
  //   .replace(" ", "%20")}`;

  // console.log(
  //   `http://localhost:5000/${data?.images?.[0]
  //     .replace(/\\/g, "/")
  //     .replace("C:/Users/VBS/Desktop/POS TESTING/Backend/uploads", "uploads")
  //     .replace(" ", "%20")}`,
  //   "images"
  // );
  return (
    <>
      {/* <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="description"
        placeholder="Product Description"
        value={product.description}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Product Price"
        value={product.price}
        onChange={handleInputChange}
        required
      />
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        required
      />
      <button type="submit">Add Product</button>
    </form> */}
      <div>
      <form onSubmit={(e) => { e.preventDefault(); handleApi(); }}>
      <input
        type="text"
        value={barcode}
        onChange={handleBarcodeChange}
        placeholder="Enter barcode"
      />
      <button type="submit" disabled={singleproductisLoading}>
        {singleproductisLoading ? "Loading..." : "Fetch Product"}
      </button>
      {singleproducterror && <div>{singleproducterror.message}</div>}
    </form>
{singleproduct.name}
        {/* {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <div>
            <h2>{data.name}</h2>
            <p>{data.description}</p>
            <p>Price: ${data.unit_price}</p>
            <img
              src={imge}
              alt={data.name}
              style={{ width: "200px" }}
            />
          </div>
        )} */}
      </div>
    </>
  );
};

export default AddProduct;
