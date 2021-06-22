import React, { Component } from "react";
import CompanyService from "../../services/company.service";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";

export default class CompaniesList extends Component {
  constructor(props) {
    super(props);
    this.retrieveCompanies = this.retrieveCompanies.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCompany = this.setActiveCompany.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    const user = JSON.parse(localStorage.getItem('user'));
    this.state = {
      companies: [],
      searchTitle: "",
      currentCompany: null,
      currentIndex: -1,
      currentUser: AuthService.getCurrentUser(),
      showAdminBoard: user.role.includes("ADMIN")
    };
  }

  componentDidMount() {
    this.retrieveCompanies();
  }

  onChangeSearchTitle(e) {
    this.setState({
      searchTitle: e.target.value
    });
  }

  retrieveCompanies() {
    CompanyService.findAll()
      .then(response => {
        this.setState({
          companies: response.data
        });
      }).catch((e) => {
        console.log(e);
      });
      console.log(this.state.companies);
  }


  refreshList() {
    this.retrieveCompanies();
    this.setState({
      currentCompany: null,
      currentIndex: -1
    });
  }

  setActiveCompany(company, index) {
    this.setState({
      currentCompany: company,
      currentIndex: index
    });
  }

  searchTitle() {
    CompanyService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          companies: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });}

  render() {
    const { searchTitle,companies, currentCompany, currentIndex, showAdminBoard } = this.state;

    return (
      <div className="list row">
        <div className="col-sm-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
          {showAdminBoard && (
        <Link to={"/companyadd/"}>Add Company</Link>
        )}
          <ul className="list-group">
            {companies &&
              companies.map((company, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCompany(company, index)}
                  key={index}
                >
                  {company.companyName}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentCompany ? (
            <div>
              <h4>Company</h4>
              <div>
                <label>
                  <strong>Company:</strong>
                </label>{" "}
                {currentCompany.companyName}
              </div>
              <div>
                <label>
                  <strong>CEO:</strong>
                </label>{" "}
                {currentCompany.ceo}
              </div>
              <div>
                <label>
                  <strong>Board of Directors:</strong>
                </label>{" "}
                {currentCompany.boardOfDirectors}
              </div>
              <div>
                <label>
                  <strong>Turnover:</strong>
                </label>{" "}
                {currentCompany.turnover}
              </div>
              <div>
                <label>
                  <strong>Stock Exchange:</strong>
                </label>{" "}
                {currentCompany.stockExchangeName}
              </div>
              <div>
                <label>
                  <strong>Sector:</strong>
                </label>{" "}
                {currentCompany.sectorName}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentCompany.description}
              </div>
              {showAdminBoard && (
              <div>
              <Link
                to={"/companyedit/" + currentCompany.id}
                className="link-info px-3"
              >
                  Edit
              </Link>
              <Link
                to={"/companystockprice/" + currentCompany.id}
                className="link-info px-3"
              >
                  StockPrice
              </Link>
              </div>
              )}
              <Link
                to={"/companyipo/" + currentCompany.id}
                className="link-info px-3"
              >
                  IPOs
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Company...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}