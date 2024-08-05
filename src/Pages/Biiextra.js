 // const products = useSelector((state) => state.cartUi.products);
  // const selectedProduct = useSelector((state) => state.cartUi.selectedProduct);

  // const cartItems = useSelector((state) => state.cartUi.cart_items);
  // const [searchBarcode, setSearchBarcode] = useState("");
  // const [result, setResult] = useState("");
  // const [showVideoFeed, setShowVideoFeed] = useState(true);
  // const { ref } = useZxing({
  //   onDecodeResult(result) {
  //     setResult(result.getText());
  //     setShowVideoFeed(false);
  //     setSearchBarcode(result.getText()); // Automatically search when barcode is scanned
  //   },
  // });

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get("https://dummyjson.com/products");
  //       dispatch(setProducts(response.data.products));
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, [dispatch]);
  // useEffect(() => {
  //   if (searchBarcode) {
  //     const product = products.find(
  //       (product) => product.meta.barcode === searchBarcode
  //     );
  //     dispatch(setSelectedProduct(product ? product.id : null));
  //   } else if (result) {
  //     const product = products.find(
  //       (product) => product.meta.barcode === result
  //     );
  //     dispatch(setSelectedProduct(product ? product.id : null));
  //   }
  // }, [searchBarcode, products, result, dispatch]);

  // const handleSearch = () => {
  //   const product = products.find(
  //     (product) =>
  //       product.meta.barcode.toLowerCase() ===
  //       searchBarcode.trim().toLowerCase()
  //   );
  //   dispatch(setSelectedProduct(product ? product.id : null));
  // };
  // useEffect(() => {
  //   dispatch(calculateCartTotal());
  // }, [dispatch, cartItems]);
  // const selectedProductDetails = selectedProduct
  //   ? products.find((product) => product.id === selectedProduct)
  //   : null;

// console.log(selectedProductDetails, "selectedProductDetails");
         {/* <Grid item lg={1.5} md={1.5} sm={9} xs={9}>
            <TypographyText
              Typography={"Item Code"}
              textAlign="left"
              fontSize=".8rem"
            />

            <input
              type="text"
              //   placeholder="Enter Barcode"
              value={searchBarcode}
              onChange={(e) => setSearchBarcode(e.target.value)}
              required
              style={{
                height: "35px",
                width: "100%",
                border: "none",
                backgroundColor: "#F7F7F7",
              }}
            />
          </Grid>
          <Grid item lg={1} md={1} sm={3} xs={3}>
            <p></p>{" "}
            <Button
              variant="contained"
              type="submit"
              sx={{
                bgcolor: "darkgreen",
                color: "#fff",
                textAlign: "left",
                width: "100%",
                textTransform: "capitalize",
                margin: "auto",
              }}
              onClick={handleSearch}
            >
              check
            </Button>
          </Grid>
          {ite.map((data, index) => (
            <>
              <Grid item lg={index === 0 ? 1.5 : 1} md={1.5} sm={9} xs={9}>
                <TypographyText
                  Typography={data.txt}
                  textAlign="left"
                  fontSize=".8rem"
                />

                <input
                  //   type={data.type}
                  //   name={data.name}
                  //   value={data.value}
                  //   onChange={data.onChange}
                  required
                  style={{
                    height: "35px",
                    width: "100%",
                    border: "none",
                    backgroundColor: "#F7F7F7",
                  }}
                />
              </Grid>
            </>
          ))}

          <Grid item lg={1} md={1} sm={3} xs={3}>
            <p></p>{" "}
            <Button
              variant="contained"
              type="submit"
              sx={{
                bgcolor: "darkgreen",
                color: "#fff",
                textAlign: "left",
                width: "100%",
                textTransform: "capitalize",
                margin: "auto",
              }}
              onClick={handleSearch}
            >
              check
            </Button>
          </Grid>

          <Grid item lg={1} md={1} sm={3} xs={3}>
            <p></p>{" "}
            <Button
              variant="contained"
              type="submit"
              sx={{
                bgcolor: "darkred",
                color: "#fff",
                textAlign: "left",
                width: "100%",
                textTransform: "capitalize",
                margin: "auto",
              }}
              onClick={handleSearch}
            >
              check
            </Button>
          </Grid>
   
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <TableHead>
                  <TableRow>
                    {selec.map((data, index) => (
                      <TableCell
                        className="shadow-checkoutCardheading"
                        key={index}
                      >
                        {data.txt}
                      </TableCell>
                    ))}{" "}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
             sssssssssss
                    </TableCell>
      
           
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid> */}
          {/***********************/}