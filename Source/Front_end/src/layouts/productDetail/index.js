import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProductDetailCard from "./ProductDetailCard";
import { getProductDetail } from "../../api/productApi";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import productData from "../product/data/sample";

function ProductDetailPage() {
  const [productDetails, setProductDetails] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductDetail(productId);
        if (productData) {
          console.log(productData);
          setProductDetails(productData);
        } else {
          console.log("No data received");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productId]);

  // useEffect(() => {
  //   // Mock product data
  //   const productData = {
  //     "product_id": 9,
  //     "product_name": "iPhone 13",
  //     "product_category": "Electronic",
  //     "product_description": "The latest flagship smartphone from Apple",
  //     "product_unit": "piece",
  //     "product_code": "ABC123",
  //     "price": 6999,
  //     "cost": 4500,
  //     "inventory_quantity": 500,
  //     "sales_region": "华东地区",
  //     "sales_records": [
  //       {
  //         "sales_id": 2,
  //         "sales_person": 1,
  //         "sales_quantity": "8",
  //         "sales_date": "2023-07-20T14:00:00Z"
  //       }
  //     ]
  //   }

  //   // Simulate a delay with setTimeout
  //   setTimeout(() => {
  //     setProductDetails(productData);
  //   }, 1000);
  // }, []);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={12}>
        {productDetails ? (
          <ProductDetailCard productDetails={productDetails} />
        ) : (
          "Loading..."
        )}
      </MDBox>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default ProductDetailPage;
