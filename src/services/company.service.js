import axios from "axios";
const API_URL = 'https://ancient-shore-52392.herokuapp.com';
const URL_R = 'https://reactappstock.herokuapp.com';
const user = JSON.parse(localStorage.getItem('user'));

class CompanyService {

  findAll() {
    return axios.get(API_URL + '/companies', { headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token }});
  }

  findById(id) {
    return axios.get(API_URL + '/companies/'+id, { headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }

  create(data) {
    return axios.post(API_URL + '/companies',data,{ headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }

  update(data) {
    return axios.put(API_URL + '/companies',data,{ headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }

  delete(id) {
    return axios.delete(API_URL + '/companies/'+id, { headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }

  findIpos(id) {
    return axios.get(API_URL + '/companyipos/'+id, { headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }

  findStockPrices(id) {
    return axios.get(API_URL +'/companystockprices/'+id,{ headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }

  findByTitle(pattern){
    return axios.get(API_URL+'/companiesmatch/'+pattern,{ headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }

}

export default new CompanyService();