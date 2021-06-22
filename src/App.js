import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddSector from "./components/sectors/add-sector.component";
import Sector from "./components/sectors/sector.component";
import SectorsList from "./components/sectors/sectors-list.component";
import SectorCompany from "./components/sectors/sector-company.component";

import AddStockExchange from "./components/stockexchange/add-stockExchange.component";
import StockExchange from "./components/stockexchange/stockExchange.component";
import StockExchangesList from "./components/stockexchange/stockExchanges-list.component";
import StockExchangeCompany from "./components/stockexchange/stockExchange-company.component";

import AddIpo from "./components/ipos/add-ipo.component";
import Ipo from "./components/ipos/ipo.component";
import IposList from "./components/ipos/ipos-list.component";

import AddCompany from "./components/company/add-company.component";
import CompaniesList from "./components/company/companies-list.component";
import Company from "./components/company/company.component";
import CompanyIpos from "./components/company/company-ipos.component";
import CompanyStockPrice from "./components/company/company-stockprice.component";

import StockPrice from "./components/stockprice/stockprice.component";
import StockPriceImport from "./components/stockprice/importExcel.component";

import CompanyChart from "./components/comparisoncharts/company-chart.component";

import AuthService from "./services/auth.service";
import Login from "./components/user/login.component";
import Profile from "./components/user/user.component";
import Register from "./components/user/register.component";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showUserBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log(user);
    if (user) {
      this.setState({
        currentUser: user,
        showUserBoard: user.role.includes("USER"),
        showAdminBoard: user.role.includes("ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser, showUserBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
          Stock Market Charting
          </Link>
          
            {showUserBoard && (
              <div className="navbar-nav mr-auto">
              <li className="nav-item">
              <Link to={"/companies"} className="nav-link">
                Company
              </Link>
              </li>
              <li className="nav-item">
                <Link to={"/ipos"} className="nav-link">
                  IPO
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/comparecompany"} className="nav-link">
                  Compare Company
                </Link>
              </li>
            </div>
            )}

            {showAdminBoard && (
              <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/sectors"} className="nav-link">
                  Sectors
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/stockExchanges"} className="nav-link">
                  StockExchange
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/ipos"} className="nav-link">
                  IPO
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/companies"} className="nav-link">
                  Company
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/importstockprice"} className="nav-link">
                  Import Excel
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/comparecompany"} className="nav-link">
                  Compare Company
                </Link>
              </li>
            </div>
            )}
          

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  {currentUser.name}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>
            </div>
          )}
        </nav>
      
      
        <div className="container mt-3">
          <Switch>
            <Route exact path= "/sectors" component={SectorsList} />
            <Route exact path="/sectors/add" component={AddSector} />
            <Route path="/sectors/:id" component={Sector} />
            <Route path="/sectorscomp/:id" component={SectorCompany} />
            <Route path="/stockExchanges" component={StockExchangesList}/>
            <Route path="/stockExchangesadd" component={AddStockExchange} />
            <Route exact path="/stockExchangesedit/:id" component={StockExchange} />
            <Route path="/stockExchangescomp/:id" component={StockExchangeCompany} />
            <Route path="/ipos" component={IposList}/>
            <Route path="/iposadd" component={AddIpo} />
            <Route exact path="/ipoedit/:id" component={Ipo} />
            <Route path="/companies" component={CompaniesList}/>
            <Route path="/companyadd" component={AddCompany} />
            <Route exact path="/companyedit/:id" component={Company} />
            <Route path="/companyipo/:id" component={CompanyIpos} />
            <Route path="/companystockprice/:id" component={CompanyStockPrice} />
            <Route exact path="/stockpricedit/:id" component={StockPrice} />
            <Route path="/importstockprice" component={StockPriceImport} />
            <Route path="/comparecompany" component={CompanyChart}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/user" component={Profile} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
