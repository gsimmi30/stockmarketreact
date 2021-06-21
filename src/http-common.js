import axios from "axios";

export default axios.create({
  baseURL: "http://reactappstock.herokuapp.com",
  headers: { 'Content-Type': 'application/json'
 }
});