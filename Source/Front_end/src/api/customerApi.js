import axios from "axios";
import { BASE_URL } from "./apiConfig";

export const getCustomers = async (filters) => {
  try {
    const token = localStorage.getItem("token");
    const nonNullFilters = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => value !== null)
    );

    let url = `${BASE_URL}/api/customer/customers/`;
    const params = new URLSearchParams(nonNullFilters).toString();
    if (params) url += `?${params}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error while fetching customers: ", error);
  }
};

export const addCustomer = async (customerData) => {
  try {
    const token = localStorage.getItem("token");

    const url = `${BASE_URL}/api/customer/customers/`;
    const response = await axios.post(url, customerData, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while adding customer: ", error);
    throw error;
  }
};

export const getCustomerById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    // const token = "7668eab91bbb0e96716fa3b02ea345ebde79f67a";

    const url = `${BASE_URL}/api/customer/customers/detail/${id}/`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error while fetching customer by id: ", error);
  }
};

export const deleteCustomerById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const url = `${BASE_URL}/api/customer/customers/${id}/`;

    const response = await axios.delete(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while deleting customer: ", error);
    throw error;
  }
};

// api/customerApi.js

export const updateCustomer = async (customerData) => {
  try {
    const token = localStorage.getItem("token");
    // const token = "7668eab91bbb0e96716fa3b02ea345ebde79f67a";
    const url = `${BASE_URL}/api/customer/customers/update/`;

    const response = await axios.put(url, customerData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error while updating customer: ", error);
    throw error;
  }
};

export const addTimeline = async (timelineData) => {
  try {
    const token = localStorage.getItem("token");

    const url = `${BASE_URL}/api/customer/follow-up/`;
    const response = await axios.post(url, timelineData, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while adding timeline: ", error);
    throw error;
  }
};
