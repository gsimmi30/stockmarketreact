import React, { Component } from "react";
import { Chart,LinearScale,LineElement, LineController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip, PointElement} from 'chart.js';
import StockPriceService from "../../services/stockprice.service";
//import { Link } from "react-router-dom";

export default class CompanyChart extends Component {
    constructor(props) {
        super(props);
        this.onChangeStockExchangeName = this.onChangeStockExchangeName.bind(this);
        this.onChangePeriodicity = this.onChangePeriodicity.bind(this);
        this.onChangeCompanyCode = this.onChangeCompanyCode.bind(this);
        this.onChangeFromPeriod = this.onChangeFromPeriod.bind(this);
        this.onChangeToPeriod = this.onChangeToPeriod.bind(this);
        this.chartRef = React.createRef();
        this.createChart = this.createChart.bind(this);
        Chart.register(LineElement,LinearScale,PointElement, LineController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip);
    
        this.state = {
          stockExchangeName: "",
          companyName: "",
          fromPeriod: "",
          toPeriod: "",
          periodicity: ""
        };
      }
      onChangeStockExchangeName(e) {
        this.setState({
          stockExchangeName: e.target.value
        });
      }
    
      onChangeCompanyCode(e) {
        this.setState({
          companyCode: e.target.value
        });
      }
    
      onChangePeriodicity(e) {
        this.setState({
          periodicity: e.target.value
        });
      }
    
      onChangeToPeriod(e) {
        this.setState({
          toPeriod: e.target.value
        });
      }
    
      onChangeFromPeriod(e) {
        this.setState({
          fromPeriod: e.target.value
        });
      }
    
      createChart(e){
        e.preventDefault();
        const prices = [];
        const dates = []; 
        var data = {
          stockExchangeName: this.state.stockExchangeName,
          companyCode: this.state.companyCode,
          fromPeriod: this.state.fromPeriod,
          toPeriod: this.state.toPeriod,
          periodicity: this.state.periodicity
        };
        StockPriceService.company(data)
          .then(response => {
            console.log(response.data);
            console.log(response.data.length);
            response.data.forEach(function (arrayItem) {
              prices.push(arrayItem.currentPrice);
              dates.push(arrayItem.date);
          });
          console.log("done");
          console.log(prices);
          console.log(dates);
      })
      .catch(e => {
        console.log(e);
      });
       new Chart(this.chartRef.current, {
          type: 'line',
          data: {
              labels: dates,
              datasets: [{
                  label: "Company Compare Chart",
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgb(255, 99, 132)',
                  data: prices,
                  fill: false,
              }],
          },
          options: {
              responsive: true,
              title: {
                  display: true,
                  text: "Company Compare Chart"
              },
              tooltips: {
                  mode: 'index',
                  intersect: false,
              },
              hover: {
                  mode: 'nearest',
                  intersect: true
              },
              scales: {
                  xAxes: [{
                      display: true,
                      scaleLabel: {
                          display: true,
                          labelString: 'Time'
                      }
                  }],
                  yAxes: [{
                      display: true,
                      scaleLabel: {
                          display: true,
                          labelString: 'Date'
                      }
                  }]
              },
              plugins: {
                  datalabels: {
                      display: true,
                      backgroundColor: '#ccc',
                      borderRadius: 3,
                      font: {
                          color: 'red',
                          weight: 'bold',
                      }
                  }
              }
          }
      });
    }

    render(){
        return(
            <div className="card">
            <div className="card-header">
              Comparison Charts
            </div>
            <div className="card-body">
            <div className="submit-form">
              <form>
                <div className="form-group">
                  <label htmlFor="stockExchangeName">Select Stock Exchange</label>
                  <select
                    type="text"
                    className="form-control"
                    value={this.state.stockExchangeName}
                    onChange={this.onChangeStockExchangeName}
                    name="stockExchangeName" required>
                    <option value="BSE">BSE</option>
                    <option value="NSE">NSE</option>
                  </select>
                </div>
          
                <div className="form-group">
                  <label htmlFor="code">Company Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="code"
                    value={this.state.companyCode}
                    onChange={this.onChangeCompanyCode}
                    required></input>
                  <div className="invalid-feedback">
                    Company Code required
                </div>
          
                <div className="form-group">
                  <label htmlFor="fromPeriod">From Period (dd-MM-YYYY)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fromPeriod"
                    value={this.state.fromPeriod}
                    onChange={this.onChangeFromPeriod}
                    required></input>
                  <div className="invalid-feedback">
                    From Period required
                  </div>
                </div>
          
                <div className="form-group">
                  <label htmlFor="toPeriod">To Period (dd-MM-YYYY)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.toPeriod}
                    onChange={this.onChangeToPeriod}
                    name="toPeriod"></input>
                   <div className="invalid-feedback">
                    To Period required
                  </div>
                </div>
                <button onClick={(e) => {this.createChart(e)}} className="btn btn-success">
                    Generate Map
                </button>
                    </div>
                  </form>
                    </div>
                    </div>
                    <div className="card-body">
                        <canvas ref={this.chartRef}></canvas>
                    </div>
            </div>
        );
    }
}