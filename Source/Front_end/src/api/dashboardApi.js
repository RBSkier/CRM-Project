import axios from "axios";
import { BASE_URL, getToken } from "./apiConfig";

export const getSalesBrief = async () => {
	try {
		const url = `${BASE_URL}/api/dashboard/salesbrief/`;
		const response = await axios.get(url, {
			headers: {
				Authorization: `Token ${getToken()}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error while getting sales brief: ", error);
		throw error;
	}
};

export const setKPI = async (kpiData) => {
	try {
		const url = `${BASE_URL}/api/dashboard/kpi/`;
		const response = await axios.post(url, kpiData, {
			headers: {
				Authorization: `Token ${getToken()}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error while setting KPI: ", error);
		throw error;
	}
};

export const getKPI = async () => {
	try {
		const url = `${BASE_URL}/api/dashboard/kpi/`;
		const response = await axios.get(url, {
			headers: {
				Authorization: `Token ${getToken()}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error while getting KPI: ", error);
		throw error;
	}
};

export const getSalesAmount = async () => {
	try {
		const url = `${BASE_URL}/api/dashboard/amount/`;
		const response = await axios.get(url, {
			headers: {
				Authorization: `Token ${getToken()}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error while getting sales amount: ", error);
		throw error;
	}
};

export const getCustomerReminder = async () => {
	try {
		const url = `${BASE_URL}/api/dashboard/reminder/`;
		const response = await axios.get(url, {
			headers: {
				Authorization: `Token ${getToken()}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error while getting customer reminder: ", error);
		throw error;
	}
};

export const getCustomerStatisticsByFollowUp = async () => {
	try {
		const url = `${BASE_URL}/api/dashboard/customerstatistic/follow_up_status`;
		const response = await axios.get(url, {
			headers: {
				Authorization: `Token ${getToken()}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error while getting customer statistics by follow up: ", error);
		throw error;
	}
};

export const getCustomerStatisticsByType = async () => {
	try {
		const url = `${BASE_URL}/api/dashboard/customerstatistic/customer_type`;
		const response = await axios.get(url, {
			headers: {
				Authorization: `Token ${getToken()}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error while getting customer statistics by type: ", error);
		throw error;
	}
};

export const getCustomerStatisticsBySource = async () => {
	try {
		const url = `${BASE_URL}/api/dashboard/customerstatistic/lead_source`;
		const response = await axios.get(url, {
			headers: {
				Authorization: `Token ${getToken()}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error while getting customer statistics by source: ", error);
		throw error;
	}
};

export const getCustomerStatisticsByIndustry = async () => {
	try {
		const url = `${BASE_URL}/api/dashboard/customerstatistic/customer_industry`;
		const response = await axios.get(url, {
			headers: {
				Authorization: `Token ${getToken()}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error while getting customer statistics by industry: ", error);
		throw error;
	}
};

export const getRank = async () => {
	try {
		const url = `${BASE_URL}/api/rank/`;

		const response = await axios.get(url, {
			headers: {
				Authorization: `Token ${getToken()}`,
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.error("Error while getting rank: ", error);
		throw error;
	}
};

export const getMyselfRank = async () => {
	try {
		const url = `${BASE_URL}/api/rank/myself/`;

		const response = await axios.get(url, {
			headers: {
				Authorization: `Token ${getToken()}`,
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.error("Error while getting myself rank: ", error);
		throw error;
	}
};
