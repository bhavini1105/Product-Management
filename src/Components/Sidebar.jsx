import React from 'react'
import { Link } from 'react-router'

function Sidebar() {
    return (
        <>

           <div className="sidebar" data-background-color="dark">
          <div className="sidebar-logo">
            {/* Logo Header */}
            <div className="logo-header" data-background-color="dark">
              <Link to="index.html" className="logo">
                <img
                  src="assets/img/kaiadmin/logo_light.svg"
                  alt="navbar brand"
                  className="navbar-brand"
                  height={20}
                />
              </Link>
              <div className="nav-toggle">
                <button className="btn btn-toggle toggle-sidebar">
                  <i className="gg-menu-right" />
                </button>
                <button className="btn btn-toggle sidenav-toggler">
                  <i className="gg-menu-left" />
                </button>
              </div>
              <button className="topbar-toggler more">
                <i className="gg-more-vertical-alt" />
              </button>
            </div>
            {/* End Logo Header */}
          </div>
          <div className="sidebar-wrapper scrollbar scrollbar-inner">
            <div className="sidebar-content">
              <ul className="nav nav-secondary">
                <li className="nav-item active">
                  <Link
                    data-bs-toggle="collapse"
                    to="/"
                    className="collapsed"
                    aria-expanded="false"
                  >
                    <i className="fas fa-home" />
                    <p>Dashboard</p>
                  </Link>

                </li>
                <li className="nav-section">
                  <span className="sidebar-mini-icon">
                    <i className="fa fa-ellipsis-h" />
                  </span>
                  <h4 className="text-section">Components</h4>
                </li>


                <li className="nav-item">
                  <Link data-bs-toggle="collapse" to="#forms">
                    <i className="fas fa-pen-square" />
                    <p>Forms</p>
                    <span className="caret" />
                  </Link>
                  <div className="collapse" id="forms">
                    <ul className="nav nav-collapse">
                      <li>
                        <Link to="/form">
                          <span className="sub-item">Basic Form</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <Link data-bs-toggle="collapse" to="#tables">
                    <i className="fas fa-table" />
                    <p>Tables</p>
                    <span className="caret" />
                  </Link>
                  <div className="collapse" id="tables">
                    <ul className="nav nav-collapse">
                      <li>
                        <Link to="/table">
                          <span className="sub-item">Datatables</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        </>
    )
}

export default Sidebar
