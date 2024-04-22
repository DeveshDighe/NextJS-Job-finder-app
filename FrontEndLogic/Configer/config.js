import axios from "axios"
import Cookies from "js-cookie";


const jwt = Cookies.get("MyToken");

const NODE_ENV = 'production'

// Define base URLs for development and production
const devBaseUrl = 'http://localhost:3000/';
const prodBaseUrl = 'https://nextjs-online-learn-app.vercel.app/';


// Determine base URL based on environment
const BASE_URL = NODE_ENV === 'produactiohn' ? prodBaseUrl : devBaseUrl;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': jwt ? `Bearer ${jwt}` : null,
    'Content-Type': 'application/json'
  }
});
