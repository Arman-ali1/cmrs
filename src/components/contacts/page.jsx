import React from 'react';
import Contacts from './components/Contacts';
import IconifyIcon from '../wrappers/IconifyIcon';
import { Card, CardHeader, Col, Row } from 'react-bootstrap';
import PageBreadcrumb from '../PageBreadcrumb';
import { useNavigate } from 'react-router-dom';

// 

const ContactPage = () => {

  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate('/add-user');
  }
  return <>
      <PageBreadcrumb title='Contact' />
      <Row >
        <Col xs={12}>
          <Card style={{ "--bs-heading-color": "#e6ecf0",
        "--bs-body-color": "#d3d7dc",
        "--bs-body-bg": "#0f1535",
        "--bs-body-bg-2": "#181f4a",
        "--bs-transparent-bg": "rgba(255, 255, 255, 0.10)",
        "--bs-border-color-translucent": "rgba(226, 232, 240, 0.15)",
        "--bs-border-color": "rgba(255, 255, 255, 0.15)",
        backgroundColor: "var(--bs-body-bg)", placeholderColor: "gray" }}>
            <CardHeader className="justify-content-between d-flex gap-2" style={{ "--bs-heading-color": "#e6ecf0",
        "--bs-body-color": "#d3d7dc",
        "--bs-body-bg": "#0f1535",
        "--bs-body-bg-2": "#181f4a",
        "--bs-transparent-bg": "rgba(255, 255, 255, 0.10)",
        "--bs-border-color-translucent": "rgba(226, 232, 240, 0.15)",
        "--bs-border-color": "rgba(255, 255, 255, 0.15)",
        backgroundColor: "var(--bs-body-bg)", placeholderColor: "gray" }}>
              <button  onClick={handleAddUser} className="flex flex-row items-center  btn btn-primary">
                {/* <IconifyIcon icon='tabler:circle-plus' className="" /> */}
                  Add New
              </button>
              <form className="d-flex align-items-start flex-wrap justify-content-sm-end gap-2">
                <div className="d-flex align-items-start flex-wrap">
                  <label htmlFor="membersearch-input" className="visually-hidden">Search</label>
                  <input type="search" className="form-control" id="membersearch-input" placeholder="Search..." />
                </div>
                <button type="button" className="btn btn-success">
                  <IconifyIcon icon='tabler:settings' className="fs-20" />
                </button>
              </form>
            </CardHeader>
          </Card>
        </Col>
      </Row>
      <Contacts />
      <Row className=" align-items-center mb-3">
        <Col sm={6}>
          <div>
            <p className="fs-14 m-0 text-gray-500">Showing <span className="text-white fw-semibold">12</span> Of <span className=" fw-semibold">229</span> members</p>
          </div>
        </Col>
        <Col sm={6}>
          <div className="float-sm-end">
            <ul className="pagination pagination-rounded mb-sm-0">
              <li className="page-item disabled">
                <a href="#" className="page-link"><IconifyIcon icon='tabler:chevron-left' /></a>
              </li>
              <div className="d-flex ">

              <li className="page-item">
                <a href="#" className=" page-link">1</a>
              </li>
              <li className="page-item active">
                <a href="#" className="page-link">2</a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link">3</a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link">4</a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link">5</a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link"><IconifyIcon icon='tabler:chevron-right' /></a>
              </li>
              </div>
            </ul>
          </div>
        </Col>
      </Row>
    </>;
};
export default ContactPage;