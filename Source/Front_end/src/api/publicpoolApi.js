import axios from "axios";
import {BASE_URL, getToken} from "./apiConfig";

export const moveToPublicPool = async (customerIds) => {
	try {
		const url = `${BASE_URL}/api/publicpool/`;

		await axios.post(url, {customer_id: customerIds}, {
			headers: {
				Authorization: `Token ${getToken()}`,
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error while moving to public pool: ", error);
		throw error;
	}
};
export const searchPublicPool = async (searchParams) => {
	try {
		const url = `${BASE_URL}/api/publicpool/`;

		const response = await axios.get(url, {
			headers: {
				Authorization: `Token ${getToken()}`,
				"Content-Type": "application/json",
			},
			params: searchParams,
		});

		return response.data;
	} catch (error) {
		console.error("Error while searching public pool: ", error);
		throw error;
	}
};
export const allocatePublicPoolCustomer = async (customerIds, principal) => {
	try {
		const url = `${BASE_URL}/api/publicpool/allocation`;

		await axios.put(url, {customer_id: customerIds, principal}, {
			headers: {
				Authorization: `Token ${getToken()}`,
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error while allocating public pool customer: ", error);
		throw error;
	}
};
export const pickupPublicPoolCustomer = async (customerIds) => {
	try {
		const url = `${BASE_URL}/api/publicpool/pickup`;

		await axios.put(url, {customer_id: customerIds}, {
			headers: {
				Authorization: `Token ${getToken()}`,
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error while picking up public pool customer: ", error);
		throw error;
	}
};
export const deletePublicPoolCustomer = async (customerIds) => {
	try {
		const url = `${BASE_URL}/api/publicpool/`;

		await axios.delete(url, {
			headers: {
				Authorization: `Token ${getToken()}`,
				"Content-Type": "application/json",
			},
			data: {customer_id: customerIds},
		});
	} catch (error) {
		console.error("Error while deleting public pool customer: ", error);
		throw error;
	}
};
