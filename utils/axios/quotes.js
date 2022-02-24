import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_QUOTES_URL;

const quoteRequest = axios.create({
 baseURL,
 headers:{
  "Content-Type": "application/json"
 },
});

export default quoteRequest;