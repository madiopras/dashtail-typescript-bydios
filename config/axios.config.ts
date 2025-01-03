import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SITE_URL + "/api"; 
//const baseURL = "http://localhost:8000"; 

export const api = axios.create({
  baseURL,
}); 
