import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
const DashboardPage = () => {
  return (
    <div style={{ position: "relative" }} className="m-3">
      <NavBar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Dashboard</h1>
              <div className="row">
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-warning text-white mb-4">
                    <div className="card-body">Pool Amount</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      <div className="small text-white stretched">
                        <b>$5000</b>
                      </div>
                      <div className="small text-white">
                        <i className="fas fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-success text-white mb-4">
                    <div className="card-body">Available Balance</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      <div className="small text-white stretched">
                        <b>$500</b>
                      </div>
                      <div className="small text-white">
                        <i className="fas fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-money-bill-wave me-1"></i>
                  Deposit to Pool Amount
                </div>
                <div className="card-body">
                  <h5 className="card-title bg-light p-3 rounded">$500</h5>
                  <button className="btn btn-success mt-3">Deposit</button>
                </div>
              </div>
              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-table me-1"></i>
                  Transaction History
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      className="table table-bordered"
                      id="datatablesSimple"
                    >
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Position</th>
                          <th>Office</th>
                          <th>Age</th>
                          <th>Start date</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Donna Snider</td>
                          <td>Customer Support</td>
                          <td>New York</td>
                          <td>27</td>
                          <td>2023/01/25</td>
                          <td>$12,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">&copy; TeamEverest 2023</div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;