import React from "react";
import {
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "react-bootstrap";
import IconifyIcon from "../../wrappers/IconifyIcon";

// Mock demo data
const contactsData = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://via.placeholder.com/100", // Placeholder image
    role: "Frontend Developer",
    website: "johndoe.dev",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://via.placeholder.com/100",
    role: "UI/UX Designer",
    website: "janesmith.design",
  },
  {
    id: 3,
    name: "Michael Johnson",
    avatar: "https://via.placeholder.com/100",
    role: "Backend Developer",
    website: "michaelj.dev",
  },
  {
    id: 4,
    name: "Emily White",
    avatar: "https://via.placeholder.com/100",
    role: "Project Manager",
    website: "emilywhite.com",
  },
];

const Contacts = () => {
  return (
    <Row>
      {contactsData.map((item, idx) => (
        <Col xl={3} sm={6} key={idx}>
          <Card className="text-center text-white">
            <CardBody
              className="text-white border-gray-900"
              style={{
                "--bs-heading-color": "#e6ecf0",
                "--bs-body-color": "#d3d7dc",
                "--bs-body-bg": "#0f1535",
                "--bs-body-bg-2": "#181f4a",
                "--bs-transparent-bg": "rgba(255, 255, 255, 0.10)",
                "--bs-border-color-translucent": "rgba(226, 232, 240, 0.15)",
                "--bs-border-color": "rgba(255, 255, 255, 0.15)",
                backgroundColor: "var(--bs-body-bg)",
              }}
            >
              {/* Dropdown */}
              <Dropdown align="end" className="float-end text-white">
                <DropdownToggle as="a" className="text-body content-none pb-1">
                  <IconifyIcon
                    icon="tabler:dots-vertical"
                    className="fs-22 text-white"
                  />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem>Delete</DropdownItem>
                  <DropdownItem>Update</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              {/* Profile Image */}
              <img
                src={item.avatar}
                className="rounded-circle img-thumbnail avatar-xl mt-1"
                alt="profile"
              />

              {/* Contact Name */}
              <h4 className="mt-3 mb-1">
                <a href="/users/profile" className="text-white">
                  {item.name}
                </a>
              </h4>

              {/* Contact Role and Website */}
              <p className="text-gray-800">
                @{item.role} <span> | </span>
                <a href="#" className="text-danger">
                  {item.website}
                </a>
              </p>

              {/* Social Media Links */}
              <ul className="list-inline mt-4 mb-2">
                <li className="list-inline-item">
                  <a
                    href="#"
                    className="border border-primary text-primary rounded-circle p-1 fs-16 d-flex justify-content-center align-items-center"
                  >
                    <IconifyIcon icon="tabler:brand-facebook" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="#"
                    className="border border-danger text-danger rounded-circle p-1 fs-16 d-flex justify-content-center align-items-center"
                  >
                    <IconifyIcon icon="tabler:brand-google" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="#"
                    className="border border-info text-info rounded-circle p-1 fs-16 d-flex justify-content-center align-items-center"
                  >
                    <IconifyIcon icon="tabler:brand-twitter" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="#"
                    className="border border-secondary text-secondary rounded-circle p-1 fs-16 d-flex justify-content-center align-items-center"
                  >
                    <IconifyIcon icon="tabler:brand-github" />
                  </a>
                </li>
              </ul>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Contacts;
