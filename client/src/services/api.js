import axios from "axios";

const API = axios.create({
  baseURL: "https://bookstore-mern-azil.onrender.com/api",
});

export default API;