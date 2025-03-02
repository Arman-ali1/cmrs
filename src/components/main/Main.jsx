import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import Avatar from "../../assets/images/avatars/01.png";
import WelcomeImage from "../../assets/images/gallery/welcome-back-3.png";
import AddUserForm from "../userManagement/AddUserForm";
import ListUsers from "../userManagement/ListUsers";
import { useSelector, useDispatch } from "react-redux";

function Main() {
	const userdata = useSelector((state) => state);

	// Use destructuring for readability
	const { user_id, first_name, last_name } = userdata.userAuth.user ?? {};

	// State for user ID
	const [userId, setUserId] = useState(user_id);

	// State for admin's full name (first + last)
	const [adminName, setAdminName] = useState(`${first_name} ${last_name}`);

	const navigate = useNavigate();
	const [showAddUser, setShowAddUser] = useState(false);
	const [showListUsers, setShowListUsers] = useState(false);
	const handleAddUser = () => {
		navigate("/dashboard/add-user");
		// setShowAddUser(!showAddUser);
		// setShowListUsers(!showListUsers);
	};

	return (
		<main className=" w-3/4  ml-64">
			{/* Toggle Button */}
			<div className="text-end m-3">
				<button
					className="btn btn-primary"
					// onClick={() => setShowAddUser(!showAddUser)}
					onClick={handleAddUser}
				>
					{showAddUser ? "Back to Dashboard" : "Add User"}
				</button>
			</div>

			{/* Conditional Rendering */}

			<div className="main-content">
				{/* Breadcrumb Section */}
				<div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
					<div className="breadcrumb-title pe-3 text-white font-bold">
						Dashboard
					</div>
					<div className="ps-3">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb mb-0 p-0">
								<li className="breadcrumb-item">
									<a
										href="#"
										onClick={(e) => e.preventDefault()}
									>
										<i className="bx bx-home-alt"></i>
									</a>
								</li>
								<li
									className="breadcrumb-item active text-white font-bold"
									aria-current="page"
								>
									Analysis
								</li>
							</ol>
						</nav>
					</div>
				</div>

				{/* Welcome Card */}
				<div className="row ">
					<div className="col-xxl-8 d-flex align-items-stretch">
						<div
							className="card w-100 overflow-hidden rounded-4 welcome-card"
							style={{
								"--bs-body-bg": "#0f1535",
								"--bs-body-bg-2": "#181f4a",
								"--bs-border-color":
									"rgba(255, 255, 255, 0.15)",
							}}
						>
							<div className="card-body position-relative p-4">
								<div className="d-flex justify-between align-items-center">
									{/* Left Section: User Info & Stats */}
									<div className="user-info w-60">
										<div className="d-flex align-items-center gap-3 mb-4">
											<img
												src={Avatar}
												className="rounded-circle bg-grd-info p-1"
												width="60"
												height="60"
												alt="User"
											/>
											<div className="text-gray-500">
												<p className="mb-0 fw-semibold">
													Welcome back
												</p>
												<h4 className="fw-semibold mb-0 fs-4">
													{/* Jhon Anderson! */}
													{adminName}
												</h4>
											</div>
										</div>

										{/* Stats Section */}
										{/* <div className="d-flex align-items-center gap-5">
                        <div>
                          <h4 className="mb-1 fw-semibold d-flex align-items-center">
                            $65.4K
                            <i className="ti ti-arrow-up-right fs-5 lh-base text-success ms-2"></i>
                          </h4>
                          <p className="mb-3">Today's Sales</p>
                          <div
                            className="progress mb-0"
                            style={{ height: "5px" }}
                          >
                            <div
                              className="progress-bar bg-success"
                              role="progressbar"
                              style={{ width: "60%" }}
                            ></div>
                          </div>
                        </div>
                        <div className="vr"></div>
                        <div>
                          <h4 className="mb-1 fw-semibold d-flex align-items-center">
                            78.4%
                            <i className="ti ti-arrow-up-right fs-5 lh-base text-success ms-2"></i>
                          </h4>
                          <p className="mb-3">Growth Rate</p>
                          <div
                            className="progress mb-0"
                            style={{ height: "5px" }}
                          >
                            <div
                              className="progress-bar bg-danger"
                              role="progressbar"
                              style={{ width: "78%" }}
                            ></div>
                          </div>
                        </div>
                      </div> */}
									</div>
									{/* Right Section: Welcome Illustration */}
									<div className="w-60 text-end">
										<img
											src={WelcomeImage}
											className="img-fluid"
											alt="Welcome"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* List Users Component */}
				<ListUsers />
			</div>
		</main>
	);
}

export default Main;
