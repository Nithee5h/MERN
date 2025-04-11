import axios from "axios";

const API_URL = "https://crispy-carnival-5j6qjgrp5q729q6-5000.app.github.dev/api/todos";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers : {
        "Content-Type": "application/json",
    }
})

export const fetchTodo = async () => {
    try {
        const response = await axiosInstance.get("/");
        return response.data;
    } catch (err) {
        console.error("Error fetching: ", err)
        throw err
    }
}

export const createTodo = async (description) => {
    try {
        const response = await axiosInstance.post("/", {description});
        return response.data;
    } catch (err) {
        console.error("Error creating: ", err)
        throw err
    }
}

export default axiosInstance
