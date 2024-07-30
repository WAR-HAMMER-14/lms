import React, { useContext } from 'react';
import Sidebar from './include/Sidebar';
import * as config from '../utilities/config';
import Header from './include/Header';
import { GlobalContext } from '../context/GlobalStateProvider';

const DashboardStudent = () => {

	const { userType } = useContext(GlobalContext)

    // console.log(localStorage);
  return (
    <>
		<Sidebar />
		<section id="content" className="contentcss">
			<Header />
			<main>
				<h1>{userType}</h1>
				<div className="row p-1 ">
					<div className="col-xl-8 col-lg-8">
						<div className="row mt-3 roundedcustom dash1sec1-stu shadow-sm bg-body hoverbox">
							<div className="col-lg-9 col-md-9 col-sm-9 p-3">
								<h3 className="fw-bold">Join Today's Live Class!</h3>
								<p>Join Today's Divya Math Session at 12:00 PM!</p>
								<a className="btn btn-danger btn-md rounded-pill mt-1">Join Now&nbsp;<i className="bi bi-bell-fill p-1 bg-light rounded-circle fw-bold text-black"></i></a>
								<a className="btn btn-outline-success greenbtn text-success btn-sm mt-1 rounded-pill p-2">Reschedule Now</a>
								<a className="btn gradientbtn btn-md text-white rounded-pill mt-1">Feedback</a>
							</div>
							<div className="col-lg-3 col-md-3 col-sm-3">
								<img src={config.API_BASE_URL+"images/dashboard/dashboard1.png"} alt="" className="img-fluid dashboardimg" />
							</div>
						</div>
						<div className="row dash1sec2-stu shadow-sm bg-body mt-3 hoverbox">
							<div className="col-xl-7 col-lg-7 col-md-7 col-sm-6 col-xs-6 p-3 ">
								<div className="roundedcustom dashbox mt-3 p-3">
									<div className="roundedcustom">
										<h4 className="fw-bold">PTM Report</h4>
										<a className="btn hoverbutton btn-sm rounded text-white">Download Now</a>
									</div>
								</div>
							</div>
							<div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
								<img src={config.API_BASE_URL+"images/dashboard/dashboard2.png"} alt="" className="" />
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-lg-4">
						<div className="p-3 bg-light roundedcustom mt-1 shadow-sm bg-body mt-3 hoverbox">
							<div className="d-flex text-center justify-content-center">
								<img src={config.API_BASE_URL+"images/dashboard/profilepic.jpg"} alt="" className="dashboardpic rounded-circle" />
							</div>
							<div className="p-1">
								<div className="row p-1 justify-content-center profilediv1 rounded">
									<div className="col-lg-6 col-ms-5 col-sm-5 col-xs-5">
										<h6 className="text-secondary">GRADE</h6>
									</div>
									<div className="col-lg-6 col-ms-5 col-sm-5 col-xs-5">
										<h6>2</h6>
									</div>
									<div className="col-lg-6 col-ms-5 col-sm-5 col-xs-5">
										<h6 className="text-secondary">POINTS</h6>
									</div>
									<div className="col-lg-6 col-ms-5 col-sm-5 col-xs-5">
										<h6>653</h6>
									</div>
									<div className="col-lg-6 col-ms-5 col-sm-5 col-xs-5">
										<h6 className="text-secondary">PROGRAM TIER</h6>
									</div>
									<div className="col-lg-6 col-ms-5 col-sm-5 col-xs-5">
										<h6>S1 Gold</h6>
									</div>
								</div>
								<div className="profilediv2 rounded mt-2 p-2 row">
									<h5 className="fw-bold">Class Remaining</h5>
									<div className="">
										<h6 className="text-secondary fw-normal mb-2">English Class</h6>
										<div className="progress mt-3">
											<div className="progress-bar bg-warning" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
										</div>
										<div className=" text-end mt-2">
											<a href="#" className="btn btn-sm text-white mt-2 btn-danger  me-2">View Details</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row ">
					<div className="col-xl-4 col-lg-4">
						<div className="mt-3">
							<div className="roundedcustom bg-light shadow-sm bg-body hoverbox">
								<div className="p-2  mt-1 ">
									<div className="p-3 d-flex justify-content-between">
										<h5 className="fw-bold ">Statistics</h5>
										<div className="dropdown">
											<button className="btn btn-outline-warning  btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
												Today
											</button>
											<ul className="dropdown-menu">
												<li><a className="dropdown-item" href="#">Action</a></li>
												<li><a className="dropdown-item" href="#">Another action</a></li>
												<li><a className="dropdown-item" href="#">Something else here</a></li>
											</ul>
										</div>
									</div>
									<div className="row justify-content-center mt-1">
										<div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-12">
											<div className=" d-flex ">
												<h4 className="m-2 pb-1 blueround"><i className="bi bi-person-fill"></i></h4>
												<div className="m-2">
													<h6 className="greyfont">Absence</h6>
													<h6>90%</h6>
												</div>
											</div>
											<div className="d-flex">
												<h4 className="m-2 pb-1 pinkround"><i className="bi bi-file-earmark-check"></i></h4>
												<div className="m-2">
													<h6 className="greyfont">Tasks & Exam</h6>
													<h6>70%</h6>
												</div>
											</div>
											<div className="d-flex">
												<h4 className="m-2 pb-1 greenround"><i className="bi bi-alarm-fill"></i></h4>
												<div className="m-2">
													<h6 className="greyfont">Quiz</h6>
													<h6>90%</h6>
												</div>
											</div>
										</div>
										<div
											className="col-xxl-5 col-xl-5 col-lg-12 col-md-4 col-sm-4 col-xs-4 text-center d-flex justify-content-center">
											<div className="circular-progress mt-5" data-inner-circle-color="white" data-percentage="80" data-progress-color="goldenrod" data-bg-color="white">
												<div className="inner-circle"></div>
												<p className="percentage">0%</p>
											</div>
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
					<div className="col-xl-4 col-lg-4">
						<div className="p-2 bg-light roundedcustom mt-1 shadow-sm bg-body mt-3 hoverbox">
							<div className="d-flex justify-content-between p-3">
								<h5 className="fw-bold ">Top Performing Student</h5>
							</div>
							<div className="dash-act ">
								<div className="bluerow d-flex ">
									<h5 className="m-2 blueround">JA</h5>
									<div className="m-1">
										<h6 className="fw-bold">Joshua Ashiru</h6>
										<h6 className="fw-normal greyfont">9.6/10 points</h6>
									</div>
								</div>
							</div>
							<div className="dash-act mt-2">
								<div className="pinkrow d-flex">
									<h5 className="m-2 pinkround">AA</h5>
									<div className="m-1">
										<h6 className="fw-bold">Adeola Ayo</h6>
										<h6 className="fw-normal greyfont">9.6/10 points.</h6>
									</div>
								</div>
							</div>
							<div className="dash-act mt-2">
								<div className="greenrow d-flex">
									<h5 className="m-2 greenround">OT</h5>
									<div className="m-1">
										<h6 className="fw-bold">Olawuyi Tobi</h6>
										<h6 className="fw-normal greyfont">9.6/10 points</h6>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-lg-4">
						<div className="p-3 bg-light roundedcustom mt-1 shadow-sm bg-body mt-3 hoverbox">
							<div className="d-flex justify-content-between p-1">
								<h5 className="fw-bold ">Upcoming Activities</h5>
								<h6 className="text-warning fs-6 fw-bold text-end yetext"> &nbsp;
									&nbsp; See All</h6>
							</div>
							<div className="customscroll p-1">
								<div className="dash-act mt-3">
									<div className="bluerow d-flex">
										<h3 className="m-3 blueround">8</h3>
										<div className="m-1">
											<h6 className="fw-bold">English Class By Faiza</h6>
											<h6 className="fw-normal greyfont">8th - 10th July 2021 <span className="dot"></span> 8
												A.M
												- 9 A.M </h6>
											<h6 className="fw-normal greyfont">Edulog Tutorial College, Blk 56, Lagos State.
											</h6>
										</div>
									</div>
								</div>
								<div className="dash-act mt-3">
									<div className="pinkrow d-flex">
										<h3 className="m-3 pinkround">12</h3>
										<div className="m-1">
											<h6 className="fw-bold">Math Class By Diviya</h6>
											<h6 className="fw-normal greyfont">8th - 10th July 2021 <span className="dot"></span> 8
												A.M
												- 9 A.M </h6>
											<h6 className="fw-normal greyfont">School Hall, University Road, Lagos State.</h6>
										</div>
									</div>
								</div>
								<div className="dash-act mt-3">
									<div className="greenrow d-flex">
										<h3 className="m-3 greenround">22</h3>
										<div className="m-1">
											<h6 className="fw-bold">Math Class By Diviya</h6>
											<h6 className="fw-normal greyfont">8th - 10th July 2021 <span className="dot"></span> 8
												A.M
												- 9 A.M </h6>
											<h6 className="fw-normal greyfont">School Hall, University Road, Lagos State.</h6>
										</div>
									</div>
								</div>
								<div className="dash-act mt-3">
									<div className="bluerow d-flex">
										<h3 className="m-3 blueround">8</h3>
										<div className="m-1">
											<h6 className="fw-bold">English Class By Faiza</h6>
											<h6 className="fw-normal greyfont">8th - 10th July 2021 <span className="dot"></span> 8
												A.M
												- 9 A.M </h6>
											<h6 className="fw-normal greyfont">Edulog Tutorial College, Blk 56, Lagos State.
											</h6>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</section>
	</>
  )
}

export default DashboardStudent