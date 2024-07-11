import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AddToCart from "./AddToCart";
import { useZxing } from 'react-zxing';

import {
  setProducts,
  setSelectedProduct,  calculateCartTotal,  removeProductFromCart,
  increaseProduct,
  decreaseProduct,

} from '../Redux/Caruislice';
import { Grid } from "@mui/material";
const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cartUi.products);
  const selectedProduct = useSelector((state) => state.cartUi.selectedProduct);
  const  cartTotalAmount  = useSelector((state) => state.cartUi.cartTotalAmount);
  const cartItems = useSelector((state) => state.cartUi.cart_items);
  const [searchBarcode, setSearchBarcode] = useState("");
  const [result, setResult] = useState('');
  const [showVideoFeed, setShowVideoFeed] = useState(true);
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
      setShowVideoFeed(false);
      setSearchBarcode(result.getText()); // Automatically search when barcode is scanned
    },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        dispatch(setProducts(response.data.products));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    if (searchBarcode) {
      const product = products.find(
        (product) => product.meta.barcode === searchBarcode
      );
      dispatch(setSelectedProduct(product ? product.id : null));
    } else if (result) {
      const product = products.find(
        (product) => product.meta.barcode === result
      );
      dispatch(setSelectedProduct(product ? product.id : null));
    }
  }, [searchBarcode, products, result, dispatch]);

  const handleSearch = () => {
    const product = products.find(
      (product) =>
        product.meta.barcode.toLowerCase() ===
        searchBarcode.trim().toLowerCase()
    );
    dispatch(setSelectedProduct(product ? product.id : null));
  };
  useEffect(() => {
    dispatch(calculateCartTotal());
  }, [dispatch, cartItems]);
  const selectedProductDetails = selectedProduct ? products.find(product => product.id === selectedProduct) : null;

  console.log(selectedProductDetails, "selectedProductDetails");
  const handleRemove = (id) => {
    dispatch(removeProductFromCart({ id }));
    dispatch(calculateCartTotal());
  };

  const handleIncrease = (id) => {
    dispatch(increaseProduct({ id }));
    dispatch(calculateCartTotal());
  };

  const handleDecrease = (id) => {
    dispatch(decreaseProduct({ id }));
    dispatch(calculateCartTotal());
  };
  return (
    <div>
            <Grid container spacing={2}>
            <Grid item xs={6}>
      <h3>Product List</h3>
      {showVideoFeed && (
        <video
          ref={ref}
          style={{ width: '100%', maxWidth: '380px', height: 'auto' }}
          autoPlay
          playsInline
        />
      )}
      {!showVideoFeed && (
        <div>
          <p>Scanned Result:</p>
          <p>{result}</p>
        </div>
      )}

      <div>
        <h4>Search by Barcode</h4>
        <input
          type="text"
          placeholder="Enter Barcode"
          value={searchBarcode}
          onChange={(e) => setSearchBarcode(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {selectedProductDetails && (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px 0' }}>
          <h4>Scanned Product Details</h4>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Image</th>
                <th>Barcode</th>
                <th>QR Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr key={selectedProductDetails.id}>
                <td>{selectedProductDetails.id}</td>
                <td>{selectedProductDetails.title}</td>
                <td>{selectedProductDetails.price}</td>
                <td>
                  <img
                    src={selectedProductDetails.thumbnail}
                    width={"100px"}
                    alt={selectedProductDetails.title}
                  />
                </td>
                <td>{selectedProductDetails.meta.barcode}</td>
                <td>
                  <img
                    src={selectedProductDetails.meta.qrCode}
                    width={"100px"}
                    alt="QR Code"
                  />
                </td>
                <td>
                  <AddToCart productId={selectedProductDetails.id} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <h4>All Products</h4>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Image</th>
            <th>Barcode</th>
         
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>
                <img
                  src={product.thumbnail}
                  width={"100px"}
                  alt={product.title}
                />
              </td>
              <td>{product.meta.barcode}</td>
              {/* <td>
                <img src={product.meta.qrCode} width={"100px"} alt="QR Code" />
              </td> */}
              <td>
                <AddToCart productId={product.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      <h2>Cart Total: ${cartTotalAmount.toFixed(2)}</h2>
          </div>
        </Grid>
        <Grid item xs={6}>
        <h2>Product in cart</h2>
        <h2>Cart Total: ${cartTotalAmount.toFixed(2)}</h2>
          <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Image</th>
            <th>increaseProductqutity</th>
            <th>decreaseProductqutity</th>
            <th>Removeproduct</th>
          </tr>
        </thead>
        <tbody>
              {cartItems.map((item) => (
          <tr>
          <td key={item.id}></td>
            <td>{item.title}</td>
            <td>Price: ${item.price.toFixed(2)}</td>
            <td>Quantity: {item.cartCount}</td>
          <td><button onClick={() => handleIncrease(item.id)}>+</button></td>  
          <td> <button onClick={() => handleDecrease(item.id)}>-</button></td> 
         <td><button onClick={() => handleRemove(item.id)}>Remove</button></td>   
         </tr>
        ))}
              </tbody>
            </table>
        </Grid>
        </Grid>
    </div>
  );
};

export default ProductList;
