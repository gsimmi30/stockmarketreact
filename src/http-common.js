import axios from "axios";

export default axios.create({
  method:'OPTIONS, PUT, POST, GET, DELETE',
  baseURL: "http://reactappstock.herokuapp.com",
  headers: { 'Content-Type': 'application/json',
  'Access-Control-Allow-Origin' : '*',
  'Accept': 'application/json',
  'Vary':'Origin'
 }
});