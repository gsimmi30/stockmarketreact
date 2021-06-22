import axios from "axios";
const API_URL = 'https://ancient-shore-52392.herokuapp.com';
const URL_R = 'https://reactappstock.herokuapp.com';
const user = JSON.parse(localStorage.getItem('user'));

class SectorService {

  findAll() {
    return axios.get(API_URL + '/sectors', { headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token }});
  }

  findById(id) {
    return axios.get(API_URL + '/sectors/'+id, { headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }

  create(data) {
    return axios.post(API_URL + '/sectors',data,{ headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }

  update(data) {
    return axios.put(API_URL + '/sectors',data,{ headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }

  delete(id) {
    return axios.delete(API_URL + '/sectors/'+id, { headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }

  findCompanies(id) {
    return axios.get(API_URL + '/sectorscomp/'+id, { headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }
}

export default new SectorService();