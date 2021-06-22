import axios from "axios";
const API_URL = 'https://ancient-shore-52392.herokuapp.com';
const URL_R = 'https://reactappstock.herokuapp.com';
const user = JSON.parse(localStorage.getItem('user'));

class StockExchangeService {

  findAll() {
    return axios.get(API_URL + '/stockExchanges', { headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token }});
  }

  findById(id) {
    return axios.get(API_URL + '/stockExchanges/'+id, { headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }

  create(data) {
    return axios.post(API_URL + '/stockExchanges',data,{ headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }

  update(data) {
    return axios.put(API_URL + '/stockExchanges',data,{ headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }

  delete(id) {
    return axios.delete(API_URL + '/stockExchanges/'+id, { headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }

  findCompanies(id) {
    return axios.get(API_URL + '/stockExchangescomp/'+id, { headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }
}

export default new StockExchangeService();