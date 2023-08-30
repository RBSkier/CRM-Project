import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import {addSalesRecord, getProductDetail} from "../../api/productApi";
import Button from "@mui/material/Button";
import MDButton from "../../components/MDButton";
import ProductTimeline from "./ProductTimeline";
import {deleteTask} from "../../api/taskApi"; // Make sure to import the ProductTimeline component
import {useNavigate} from 'react-router-dom';
import {deleteProduct} from "../../api/productApi";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import MDInput from "../../components/MDInput";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

function ProductDetailCard({productDetails}) {
	const navigate = useNavigate();
	const [dialogOpen, setDialogOpen] = useState(false);
	const currentDate = new Date().toISOString().substring(0, 16);
	const [salesRecord, setSalesRecord] = useState({
		sales_person: '',
		sales_quantity: '',
		sales_date: currentDate,
	});
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const info = {
		"product id": productDetails.product_id,
		"product name": productDetails.product_name,
		"product category": productDetails.product_category,
		"product description": productDetails.product_description,
		"product unit": productDetails.product_unit,
		"product code": productDetails.product_code,
		"price": productDetails.price,
		"cost": productDetails.cost,
		"inventory quantity": productDetails.inventory_quantity,
		"sales region": productDetails.sales_region
	};

	const handleChange = (e) => {
		setSalesRecord({
			...salesRecord,
			[e.target.name]: e.target.value,
		});
	};

	const handleDialogOpen = () => {
		setDialogOpen(true);
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addSalesRecord(productDetails.product_id, salesRecord);
			setDialogOpen(false);
			setSnackbarMessage("Sales record successfully added.");
			setSnackbarOpen(true);
			setTimeout(() => {
				window.location.reload();
			});
		} catch (error) {
			console.error("Error while adding sales record: ", error);
			setSnackbarMessage("There was an error adding the sales record.");
			setSnackbarOpen(true);
		}
	};

	const handleDeleteProduct = async () => {
		try {
			await deleteProduct(productDetails.product_id);
			navigate('/product');
		} catch (error) {
			console.error("Error while deleting task:", error);
		}
	};
	const labels = Object.keys(info);
	const values = Object.values(info);

	const renderItems = labels.map((label, key) => (
		<MDBox key={label} display="flex" py={1} pr={2}>
			<MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
				{label}: &nbsp;
			</MDTypography>
			<MDTypography variant="button" fontWeight="regular" color="text">
				&nbsp;{values[key]}
			</MDTypography>
		</MDBox>
	));

	return (
		<Card sx={{height: "100%", boxShadow: "none"}}>
			<MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
				<MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
					Product Details
				</MDTypography>
				<MDBox>
					<MDButton variant="contained" color="error" onClick={handleDeleteProduct}>
						Delete
					</MDButton>
					<MDButton variant="contained" color="success" onClick={handleDialogOpen} style={{ marginLeft: "10px" }}>
						Add Records
					</MDButton>
				</MDBox>
			</MDBox>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<MDBox p={2}>
						{renderItems}
					</MDBox>
				</Grid>
				<Grid item xs={12} md={6}>
					<MDBox p={2}>
						<MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
							Sales Records
						</MDTypography>
						<ProductTimeline salesLog={productDetails.sales_records || []}/>
					</MDBox>
				</Grid>
			</Grid>
			<Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
				<Alert onClose={() => setSnackbarOpen(false)} severity="success">
					{snackbarMessage}
				</Alert>
			</Snackbar>
			<Dialog open={dialogOpen} onClose={handleDialogClose}>
				<DialogTitle>Add Sales Record</DialogTitle>
				<DialogContent>
					<MDInput
						autoFocus
						margin="dense"
						name="sales_person"
						label="Sales Person"
						type="text"
						fullWidth
						required
						onChange={handleChange}
					/>
					<MDInput
						margin="dense"
						name="sales_quantity"
						label="Sales Quantity"
						type="number"
						fullWidth
						required
						onChange={handleChange}
					/>
					<MDInput
						margin="dense"
						name="sales_date"
						label="Sales Date"
						type="datetime-local"
						defaultValue={salesRecord.sales_date}
						fullWidth
						required
						onChange={handleChange}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSubmit} color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</Card>
	);
}

ProductDetailCard.propTypes = {
	productDetails: PropTypes.shape({
		product_id: PropTypes.number,
		product_name: PropTypes.string,
		product_category: PropTypes.string,
		product_description: PropTypes.string,
		product_unit: PropTypes.string,
		product_code: PropTypes.string,
		price: PropTypes.number,
		cost: PropTypes.number,
		inventory_quantity: PropTypes.number,
		sales_region: PropTypes.string,
		sales_records: PropTypes.arrayOf(PropTypes.shape({
			sales_id: PropTypes.number,
			sales_person: PropTypes.string,
			sales_quantity: PropTypes.number,
			sales_date: PropTypes.string,
		})),
	}).isRequired,
};


export default ProductDetailCard;
