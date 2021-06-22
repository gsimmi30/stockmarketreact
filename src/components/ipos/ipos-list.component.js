import React, { Component } from "react";
import IpoService from "../../services/ipo.service";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";

export default class IposList extends Component {
  constructor(props) {
    super(props);
    this.retrieveIpos = this.retrieveIpos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveIpo = this.setActiveIpo.bind(this);

    this.state = {
      ipos: [],
      currentIpo: null,
      currentIndex: -1,
      currentUser: AuthService.getCurrentUser(),
      showAdminBoard: AuthService.getCurrentUser().role.includes("ADMIN"),
    };
  }

  componentDidMount() {
    this.retrieveIpos();
  }

  retrieveIpos() {
    IpoService.findAll()
      .then(response => {
        this.setState({
          ipos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  refreshList() {
    this.retrieveIpos();
    this.setState({
      currentIpo: null,
      currentIndex: -1
    });
  }

  setActiveIpo(ipo, index) {
    this.setState({
      currentIpo: ipo,
      currentIndex: index
    });
  }

  render() {
    const { ipos, currentIpo, currentIndex, showAdminBoard } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
        {showAdminBoard && (
        <Link to={"/iposadd/"}>Add IPO</Link>
        )}

          <ul className="list-group">
            {ipos &&
              ipos.map((ipo, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveIpo(ipo, index)}
                  key={index}
                >
                  {ipo.companyName}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentIpo ? (
            <div>
              <h4>Ipo</h4>
              <div>
                <label>
                  <strong>ID:</strong>
                </label>{" "}
                {currentIpo.id}
              </div>
              <div>
                <label>
                  <strong>Ipo:</strong>
                </label>{" "}
                {currentIpo.companyName}
              </div>
              <div>
                <label>
                  <strong>Stock Exchange:</strong>
                </label>{" "}
                {currentIpo.stockExchangeName}
              </div>
              <div>
                <label>
                  <strong>Remarks:</strong>
                </label>{" "}
                {currentIpo.remarks}
              </div>
              <div>
                <label>
                  <strong>Open Date Time:</strong>
                </label>{" "}
                {currentIpo.openDateTime}
              </div>
              <div>
                <label>
                  <strong>shares:</strong>
                </label>{" "}
                {currentIpo.shares}
              </div>
              <div>
                <label>
                  <strong>price:</strong>
                </label>{" "}
                {currentIpo.price}
              </div>
              {showAdminBoard && (
              <Link
                to={"/ipoedit/" + currentIpo.id}
                className="link-info px-3"
              >
                  Edit
              </Link>
              )}
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Ipo...</p>
            </div>
          )}
        </div>
      </div>
      
    );
  }
}