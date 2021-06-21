import http from "../http-common";

class StockPriceService {

  findAll() {
    return http.get(`/stockPrices`);
  }

  findById(id) {
    return http.get(`/stockPrices/${id}`);
  }

  create(data) {
    return http.post(`/stockPrices`, data);
  }

  update(data) {
    return http.put(`/stockPrices`, data);
  }

  delete(id) {
    return http.delete(`/stockPrices/${id}`);
  }
  
  company(data) {
    return http.post('/stockPricescomp',data);
  }

  sector(data) {
    return http.post('/stockPricesec',data);
  }
}

export default new StockPriceService();