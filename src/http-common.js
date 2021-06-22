import axios from "axios";

export default axios.create({
  method:'OPTIONS, PUT, POST, GET, DELETE',
  baseURL: "http://localhost:8080",
  headers: { 'Content-Type': 'application/json',
  'Access-Control-Allow-Origin' : '*',
  'Accept': 'application/json',
  'Vary':'Origin'
 }
});