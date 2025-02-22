import axiosClient from "./axios"; // Import your Axios instance

export async function getRequest(URL) {
	try {
		const response = await axiosClient.get(URL);
		// console.log(response.data);
		return response.data;
	} catch (error) {
		throw error; // Rethrow the error for better handling in components
		console.log(error);
	}
}
