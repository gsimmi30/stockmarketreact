import axios from "axios";
const API_URL = 'https://ancient-shore-52392.herokuapp.com';
const URL_R = 'https://reactappstock.herokuapp.com';
const user = JSON.parse(localStorage.getItem('user'));

class IpoService {

  findAll() {
    return axios.get(API_URL + '/ipos', { headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token }});
  }

  findById(id) {
    return axios.get(API_URL + '/ipos/'+id, { headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }

  create(data) {
    return axios.post(API_URL + '/ipos',data,{ headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }

  update(data) {
    return axios.put(API_URL + '/ipos',data,{ headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }

  delete(id) {
    return axios.delete(API_URL + '/ipos/'+id, { headers: {'Access-Control-Allow-Origin': URL_R,'Content-Type': 'application/json',"Authorization": "Bearer " + user.token } });
  }
}

export default new IpoService();