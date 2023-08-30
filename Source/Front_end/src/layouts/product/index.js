

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import {Link} from 'react-router-dom';
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import DataTable from "../../examples/Tables/DataTable";
import React, {useState} from "react";
import sample from "./data/sample";
import {addProduct, searchProducts} from "../../api/productApi";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {FormControl, InputLabel} from "@mui/material";

function Cover() {
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");
	const {columns: pColumns, rows: pRows} = sample();
	const [tableData, setTableData] = useState({columns: pColumns, rows: pRows});
	const [openAddProduct, setOpenAddProduct] = useState(false);
	const [searchParams, setSearchParams] = useState({
		product_name: '',
		product_category: '',
		price_min: '',
		price_max: '',
	});

	const [productValues, setProductValues] = useState({
		product_name: '',
		product_category: '',
		product_description: '',
		product_unit: '',
		product_code: '',
		price: '',
		cost: '',
		inventory_quantity: '',
		sales_region: '',
	});

	const handleCloseForm = () => setOpenAddProduct(false);

	const handleChange = (e) => {
		setProductValues({
			...productValues,
			[e.target.name]: e.target.value,
		});
	};

	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Call the API
			await addProduct(productValues);
			// If successful, you can also set a success message
			setSnackbarMessage("Product successfully added.");
			setSnackbarSeverity("success");
		} catch (error) {
			console.error("Error while adding product: ", error);
			// If there's an error, update the snackbar message
			setSnackbarMessage("There was an error adding the product.");
			setSnackbarSeverity("error");
		} finally {
			// Open the snackbar whether it's a success or error
			setSnackbarOpen(true);
		}
		setOpenAddProduct(false);
	};
	const handleSearch = () => {
		searchProducts(searchParams)
			.then((result) => {
				// Update your table data here. This is just an example.
				const newRows = result.products.map((product) => ({
					...product,
					product_id: <Link to={`/product-detail?id=${product.product_id}`}>{product.product_id}</Link>,
					// add other necessary fields if needed
				}));
				setTableData({columns: pColumns, rows: newRows});
			})
			.catch((error) => {
				console.error(error);
			});
	};
	const handleOpenAddProduct = () => {
		const role = localStorage.getItem("role");
		if (role === "staff") {
			// replace this with your snackbar code or other UI for showing error messages
			alert("Staff do not have the permission to add products.");
		} else {
			setOpenAddProduct(true);
		}
	};
	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};
	return (
		<DashboardLayout>
			<DashboardNavbar/>
			<MDBox p={3}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Card>
							<MDBox p={3}>
								<MDBox display="flex" alignItems="center" mb={2}>
									<MDTypography
										style={{marginRight: "16px", fontSize: "14px", fontWeight: "bold"}}
									>
										Product Category:
									</MDTypography>
									<ToggleButtonGroup
										value={searchParams.product_category}
										exclusive
										onChange={(e, newValue) => setSearchParams({...searchParams, product_category: newValue})}
										aria-label="product category"
									>
										<ToggleButton
											value="Electronic"
											style={{
												fontSize: "12px",
												height: "30px",
												border: "none",
											}}
										>
											Electronic
										</ToggleButton>
										<ToggleButton
											value="Apparel"
											style={{
												fontSize: "12px",
												height: "30px",
												border: "none",
											}}
										>
											Apparel
										</ToggleButton>
										<ToggleButton
											value="Home Applications"
											style={{
												fontSize: "12px",
												height: "30px",
												border: "none",
											}}
										>
											Home Applications
										</ToggleButton>
										<ToggleButton
											value="Furniture"
											style={{
												fontSize: "12px",
												height: "30px",
												border: "none",
											}}
										>
											Furniture
										</ToggleButton>
									</ToggleButtonGroup>
								</MDBox>
								<MDBox>
									<MDInput
										value={searchParams.product_name}
										onChange={(e) => setSearchParams({...searchParams, product_name: e.target.value})}
										label="Product Name"
										variant="outlined"
										style={{marginRight: '16px'}}
									/>
									<MDInput
										value={searchParams.price_min}
										onChange={(e) => setSearchParams({...searchParams, price_min: e.target.value})}
										label="Minimum Price"
										variant="outlined"
										style={{marginRight: '16px'}}
									/>
									<MDInput
										value={searchParams.price_max}
										onChange={(e) => setSearchParams({...searchParams, price_max: e.target.value})}
										label="Maximum Price"
										variant="outlined"
										style={{marginRight: '16px'}}
									/>
									<MDButton variant="contained" color="info" onClick={handleSearch}>
										Search
									</MDButton>
								</MDBox>
							</MDBox>
						</Card>
					</Grid>
					<Grid item xs={12}>
						<Card>
							<MDBox display="flex" justifyContent="flex-end" p={3}>
								<MDButton variant="contained" color="info" onClick={handleOpenAddProduct}>
									Add Product
								</MDButton>
							</MDBox>
							<MDBox>
								<DataTable
									table={tableData}
									isSorted={false}
									entriesPerPage={false}
									showTotalEntries={false}
									noEndBorder
								/>
							</MDBox>
						</Card>
					</Grid>
				</Grid>
				<Dialog open={openAddProduct} onClose={handleCloseForm}>
					<DialogTitle>Add Product</DialogTitle>
					<DialogContent>
						<form onSubmit={handleSubmit}>
							<MDBox component="div" role="form">
								<MDBox mb={2}>
									<MDInput name="product_name" label="Product Name" fullWidth required onChange={handleChange}/>
								</MDBox>
								<MDBox mb={2}>
									<FormControl fullWidth required>
										<InputLabel>Product Category</InputLabel>
										<Select
											name="product_category"
											style={{ height: "45px" }}
											onChange={handleChange}
										>
											<MenuItem value="Electronic">Electronic</MenuItem>
											<MenuItem value="Apparel">Apparel</MenuItem>
											<MenuItem value="Home Applications">Home Applications</MenuItem>
											<MenuItem value="Furniture">Furniture</MenuItem>
										</Select>
									</FormControl>
								</MDBox>
								<MDBox mb={2}>
									<MDInput name="product_description" label="Product Description" fullWidth required
													 onChange={handleChange}/>
								</MDBox>
								<MDBox mb={2}>
									<MDInput name="product_unit" label="Product Unit" fullWidth required onChange={handleChange}/>
								</MDBox>
								<MDBox mb={2}>
									<MDInput name="product_code" label="Product Code" fullWidth required onChange={handleChange}/>
								</MDBox>
								<MDBox mb={2}>
									<MDInput name="price" label="Price" type="number" fullWidth required onChange={handleChange}/>
								</MDBox>
								<MDBox mb={2}>
									<MDInput name="cost" label="Cost" type="number" fullWidth required onChange={handleChange}/>
								</MDBox>
								<MDBox mb={2}>
									<MDInput name="inventory_quantity" label="Inventory Quantity" type="number" fullWidth required
													 onChange={handleChange}/>
								</MDBox>
								<MDBox mb={2}>
									<MDInput name="sales_region" label="Sales Region" fullWidth required onChange={handleChange}/>
								</MDBox>
							</MDBox>
							<DialogActions>
								<MDButton onClick={handleCloseForm}>Cancel</MDButton>
								<MDButton type="submit" color="primary">Submit</MDButton>
							</DialogActions>
						</form>
					</DialogContent>
				</Dialog>
			</MDBox>

			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={() => setSnackbarOpen(false)}
				message={snackbarMessage}
			/>

			<Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
				<Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
					{snackbarMessage}
				</Alert>
			</Snackbar>

			<Card/>
		</DashboardLayout>
	);
}

export default Cover;
