import axios from "axios";

const instance = axios.create({
	baseURL: import.meta.env.VITE_PUBLIC_BASE_URL || "https://localhost:3001",
	timeout: 50000,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
		// Add any other headers as needed
	},
});

export default instance;
