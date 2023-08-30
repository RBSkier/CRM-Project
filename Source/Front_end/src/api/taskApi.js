import axios from "axios";
import {BASE_URL, getToken} from "./apiConfig";

export const addTask = async (taskData) => {
	try {
		const url = `${BASE_URL}/api/tasks/`;
		console.log(taskData);
		const response = await axios.post(url, taskData, {
			headers: {
				Authorization: `Token ${getToken()}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error while adding task: ", error);
		throw error;
	}
};

export const deleteTask = async (taskId) => {
	try {
		const url = `${BASE_URL}/api/tasks/${taskId}/`;
		await axios.delete(url, {
			headers: {
				Authorization: `Token ${getToken()}`,
			},
		});
	} catch (error) {
		console.error("Error while deleting task: ", error);
		throw error;
	}
};

export const getTasks = async (filters) => {
	try {
		const url = `${BASE_URL}/api/tasks/`;

		// Add filters as query parameters
		let params = {};
		if (filters.principal) {
			params.principal = filters.principal;
		}
		if (filters.due_date) {
			params.due_date = filters.due_date;
		}
		if (filters.priority) {
			params.priority = filters.priority;
		}
		if (filters.task_title) {
			params.task_title = filters.task_title;
		}

		const response = await axios.get(url, {
			headers: {
				Authorization: `Token ${getToken()}`,
			},
			params: params, // Add params to the request
		});
		return response.data;
	} catch (error) {
		console.error("Error while getting tasks: ", error);
		throw error;
	}
};

export const getTaskDetails = async (taskId) => {
	try {
		const url = `${BASE_URL}/api/tasks/${taskId}/`;
		const response = await axios.get(url, {
			headers: {
				Authorization: `Token ${getToken()}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error while getting task details: ", error);
		throw error;
	}
};

export const updateTask = async (taskId, status) => {
	try {
		const url = `${BASE_URL}/api/tasks/${taskId}/`;
		const response = await axios.put(url, {status}, {
			headers: {
				Authorization: `Token ${getToken()}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error while updating task: ", error);
		throw error;
	}
};

export const updateSubTask = async (subTaskId, status) => {
	try {
		const url = `${BASE_URL}/api/tasks/sub_tasks/${subTaskId}/`;
		const response = await axios.put(url, {status}, {
			headers: {
				Authorization: `Token ${getToken()}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error while updating subtask: ", error);
		throw error;
	}
};