import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";

const GreyDashboard = () => {
  

  const handleLogout = () => {
    window.location.href = "http://localhost:3000/login";
  };

  

  return (
    <div style={{ position: "relative" }} className="m-3">
      <NavBar />
      <div
        id="layoutSidenav"
        style={{
          opacity: 0.5,
          pointerEvents: "none"
        }}
      >
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              {/* Information */}
              <div className="alert alert-warning mt-4">
                <strong>Please verify with WorldID to access the dashboard.</strong>
              </div>

              <h1 className="mt-4">Dashboard</h1>
              <div className="row">
                {/* Cards */}
              </div>
              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-table me-1"></i>
                  Transaction History
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered" id="datatablesSimple">
                      {/* Table content */}
                    </table>
                  </div>
                </div>
              </div>
              <footer className="py-4 bg-light mt-auto">
                <div className="container-fluid px-4">
                  <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">&copy; TeamEverest 2023</div>
                    <button
                      className="btn btn-link text-muted"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </footer>
            </div>
          </main>
        </div>
      </div>

      {/* Warning button */}
      <div className="warning-button">
        <button
          className="btn btn-warning"
          
        >
          Verify with WorldID to access the dashboard
        </button>
      </div>
    </div>
  );
};

export default GreyDashboard;
