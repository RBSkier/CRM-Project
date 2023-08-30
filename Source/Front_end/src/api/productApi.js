import axios from "axios";
import { BASE_URL } from "./apiConfig";

export const addProduct = async (productData) => {
	try {
		const token = localStorage.getItem("token");
		const url = `${BASE_URL}/api/products/`;

		const response = await axios.post(url, productData, {
			headers: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error while adding product: ", error);
		throw error;
	}
};

export const searchProducts = async (searchParams) => {
	try {
		const token = localStorage.getItem("token");
		const url = `${BASE_URL}/api/products/`;

		const response = await axios.get(url, {
			headers: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json",
			},
			params: searchParams,
		});
		console.log(response.data);
		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'CNY',
		});

		// Format cost and price for each product
		response.data.products.forEach(product => {
			product.cost = formatter.format(product.cost);
			product.price = formatter.format(product.price);
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Error while searching products: ", error);
		throw error;
	}
};

export const getProductDetail = async (productId) => {
	try {
		const token = localStorage.getItem("token");
		const url = `${BASE_URL}/api/products/${productId}/`;

		const response = await axios.get(url, {
			headers: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json",
			},
		});

		// Create an instance of Intl.NumberFormat for US locale and USD currency
		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		});

		// Format cost and price
		response.data.cost = formatter.format(response.data.cost);
		response.data.price = formatter.format(response.data.price);

		return response.data;
	} catch (error) {
		console.error("Error while getting product details: ", error);
		throw error;
	}
};

export const deleteProduct = async (productId) => {
	try {
		const token = localStorage.getItem("token");
		const url = `${BASE_URL}/api/products/${productId}/`;

		const response = await axios.delete(url, {
			headers: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.error("Error while deleting product: ", error);
		throw error;
	}
};

export const addSalesRecord = async (productId, salesData) => {
	try {
		const token = localStorage.getItem("token");
		const url = `${BASE_URL}/api/products/${productId}/`;

		const response = await axios.post(url, salesData, {
			headers: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.error("Error while adding sales record: ", error);
		throw error;
	}
};
