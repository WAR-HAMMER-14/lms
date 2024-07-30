import React, { useEffect, useState } from 'react'
import Sidebar from '../include/Sidebar'
import Header from '../include/Header'
import { Form, Link, useParams } from 'react-router-dom'
import axios from 'axios'
import * as config from '../../utilities/config'
import * as SessionMsg from '../SwalSessionExpire'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const CourseAddEdit = () => {

    const { course_id } = useParams();
    const [ courseDet, setCourseDet ] = useState([]);
    const [ courseTypes, setCourseTypes ] = useState([]);

    const [ courseHeroImage, setCourseHeroImage ] = useState('');


    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authKey')}`;
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';


    async function getCourseDetById(postData){
        try{
            const res = await axios.post(config.API_URL+'courseDetById',postData)

            if(res.data === "AUTH_KEY_NOT_PROVIDED" || res.data === "VALIDATION_TIME_ERROR" || res.data === "VALIDATION_ERROR")
            {
                SessionMsg.swalSessionExpire();
            }
            else
            {
                const data = res.data;
                console.log(res.data);
                
                setCourseDet(data);
                setCourseHeroImage(data.course_image); // initialize the hero image
            }

        }
        catch(error){
            console.log(error);
        }
    }

    async function getCourseTypes(){
        try{
            const res = await axios.post(config.API_URL+'courseTypes')
            console.log(res.data);

            if(res.data === "AUTH_KEY_NOT_PROVIDED" || res.data === "VALIDATION_TIME_ERROR" || res.data === "VALIDATION_ERROR")
            {
                SessionMsg.swalSessionExpire();
            }
            else
            {
                const resArr = res.data;
                setCourseTypes(resArr);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    async function uploadFileHandler(postData){
        try{
            const res = await axios.post(config.API_URL+'uploadFile',postData)
            console.log(res.data);

            if(res.data === "AUTH_KEY_NOT_PROVIDED" || res.data === "VALIDATION_TIME_ERROR" || res.data === "VALIDATION_ERROR")
            {
                SessionMsg.swalSessionExpire();
            }
            else
            {
				console.log(res.data);
                alertSuccess("File Uploaded");
                setCourseHeroImage(res.data);
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }


    const fileUploadHandler = (e) => {
        const fileData = e.target;

        const postData = new FormData();
        postData.append('file', fileData.files[0]);
        postData.append('file_path','uploads/course/course_images/');

		uploadFileHandler(postData);
        console.log(fileData);
    }




    const alertSuccess = (data) => toast.success(data, { 
        position: "top-center", 
        autoClose: 10000, 
        hideProgressBar: false, 
        closeOnClick: true, 
        pauseOnHover: true, 
        draggable: true, 
        progress: undefined, 
        theme: "light",
    });



    useEffect(()=>{
        const postData = new FormData();

        postData.append('course_id', course_id);
        getCourseDetById(postData);
        getCourseTypes();

        
    }, [])




  return (
    <>
        <Sidebar />
        <section id="content" className='contentcss'>
            <Header />
            <main>
            <nav className="classnav justify-content-center">
                <div className=" nav nav-tabs mb-3 border-0" id="nav-tab" role="tablist">
                    <button className="nav-link active fs-6 btn btn-sm" id="nav-Course-tab" data-bs-toggle="tab"
                        data-bs-target="#nav-Course" type="button" role="tab" aria-controls="nav-Course"
                        aria-selected="true">Course Details</button>
                    <button className="nav-link" id="nav-Curriculum-tab" data-bs-toggle="tab"
                        data-bs-target="#nav-Curriculum" type="button" role="tab" aria-controls="nav-Curriculum"
                        aria-selected="false">Curriculum Details</button>
                    <button className="nav-link" id="nav-Batches-tab" data-bs-toggle="tab" data-bs-target="#nav-Batches"
                        type="button" role="tab" aria-controls="nav-Batches" aria-selected="false">Batches</button>
                </div>
            </nav>
            <div className="tab-content p-1" id="nav-tabContent">
                <div className="tab-pane fade active show" id="nav-Course" role="tabpanel" aria-labelledby="nav-Course-tab">
                    <div className=" bg-light p-3 rounded">
                        <div className="row">
                            <div className="col-lg-12">
                                <ToastContainer position="top-center"
                                    autoClose={5000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme="light" 
                                />
                            </div>
                            <div className="col-lg-6">
                                <h4>Basic Details {course_id}</h4>
                            </div>
                            <div className="col-lg-6 text-end">
                                <a href="" className="btn addcoursesbtn"><i className="bi bi-pencil-square"></i></a>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group mt-2">
                                    <label className="mt-2 mb-2">Name</label>
                                    <input type="text" name='course_name' className="form-control" value={courseDet.course_name} />

                                    <label className="mt-3 mb-2">Description</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" name='course_desc' rows="3" value={courseDet.course_description}></textarea>

                                    <img src={config.API_BASE_URL+'uploads/course/course_images/'+courseDet.course_image} id="course_hero_image" alt="" />
                                    <label className="mt-3 mb-2">Example file input</label>
                                    <input type="file" className="form-control-file form-control-sm" name="course_image" id="course_image" onChange={fileUploadHandler} accept=".csv,.jpeg,.jpg,.JPEG,.JPG,.png,.PNG" />

                                    <input type="hidden" name="course_image_file" value={courseHeroImage} />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <label className="mt-3 mb-2">Course Type</label>
                                <select className="form-select form-select-sm" aria-label="Default select example" value={courseDet.course_topic}>
                                    <option value="">Select Course</option>
                                    {courseTypes.length > 0 && courseTypes.map((courseType) => (<option value={courseType.id}>{courseType.type_name}</option>))}
                                </select>
                                
                                <label className="mt-3 mb-2">Allow Content Access After Completion</label>
                                <input className="form-check-input" type="checkbox" name="allow_access" id="allow_access" checked={courseDet.allow_content_access_flag} />

                                <label className="mt-3 mb-2">Course Completion</label>
                                <input className="form-check-input" type="checkbox" name="course_complete" id="course_complete" checked={courseDet.course_done_flag === "1"} />

                            </div>
                        </div>
                        <Link to={'/adminCourses'} className="btn btn-danger btn-md rounded mt-3">Back</Link>
                        <a href="" type="submit" className="btn btn-success btn-md rounded mt-3">Submit</a>
                    </div>

                </div>
                <div className="tab-pane fade" id="nav-Curriculum" role="tabpanel" aria-labelledby="nav-Curriculum-tab">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="coursesdropdown bg-light rounded shadow-sm bg-body p-2 mt-1 hoverbox  mt-3">
                                <div className="row mb-3 mt-1">
                                    <div className="col-lg-6">
                                        <h5>Course Name</h5>
                                    </div>
                                    <div className="col-lg-6 text-end">
                                        <a href="" className="btn btn-outline-success btn-sm " data-bs-toggle="modal"
                                            data-bs-target="#myModal">Add Section <i className="bi bi-plus"></i></a>
                                    </div>
                                    <div className="modal fade" id="myModal">
                                        <div className="modal-dialog modal-dialog-centered text-center">
                                            <div className="modal-content p-3">
                                                <div className="modal-body">
                                                    <h5 className="fw-bold mt-3">Course Name</h5>
                                                    <div className="form-group mt-2">
                                                        <label className="mt-2 mb-2">Section Name</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                    <button type="submit" className="btn hoverbutton text-white mt-4 btn-sm" data-bs-dismiss="modal">Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ul>
                                    <li className='sub-menu'>
                                        <a href='#' className="font-size-md">Topic 1 - INTRODUCTION
                                            <span>
                                                <i className="bi bi-pencil-square text-secondary" data-bs-toggle="modal" data-bs-target="#myModal"></i>
                                                <i className="bi bi-trash text-danger"></i>
                                            </span>
                                        </a>
                                    </li>
                                    <li className='sub-menu'>
                                        <a href='#' className="font-size-md">Topic 2 - Learn Manufacturing
                                            <span>
                                                <i className="bi bi-pencil-square text-secondary" data-bs-toggle="modal" data-bs-target="#myModal"></i>
                                                <i className="bi bi-trash text-danger"></i>
                                            </span>
                                        </a>
                                    </li>
                                    <li className='sub-menu'>
                                        <a href='#' className="font-size-md">Topic 3 - 
                                            <span>Experience testing modules & investers!</span>
                                            <span>
                                                <i className="bi bi-pencil-square text-secondary" data-bs-toggle="modal" data-bs-target="#myModal"></i>
                                                <i className="bi bi-trash text-danger"></i>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-8 bg-light rounded shadow-sm bg-body p-2 mt-1 hoverbox  mt-3">
                            <div className="row mb-3 mt-1">
                                <div className="col-lg-6"></div>
                                <div className="col-lg-6 text-end">
                                    <a href="" className="btn btn-outline-success btn-sm " data-bs-toggle="modal" data-bs-target="#material">Add Teaching Meterial <i className="bi bi-plus"></i></a>
                                </div>
                                
                                <div className="modal fade " id="material">
                                    <div className="modal-dialog modal-dialog-centered ">
                                        <div className="modal-content p-3">
                                            <div className="modal-body">
                                                <h5 className="fw-bold mt-3">Course Name</h5>
                                                <div className="form-group mt-2">
                                                    <label className="mt-3 mb-2">Select Topic</label>
                                                    <select className="form-select" aria-label="Default select example">
                                                        <option >Name</option>
                                                    </select>
                                                    <label className="mt-3 mb-2">Add Subtopic Name</label>
                                                    <input type="text" className="form-control " />

                                                    <label className="mt-3 mb-2">File Type</label>
                                                    <select className="form-select" aria-label="Default select example">
                                                        <option >Course Material</option>
                                                        <option >Homework</option>
                                                        <option >Answer Key</option>
                                                    </select>

                                                    <label className="mt-3 mb-2">Material Type</label>
                                                    <select className="form-select" aria-label="Default select example">
                                                        <option >PDF</option>
                                                        <option >PPT</option>
                                                    </select>

                                                    <label className="mt-4 mb-2">Add File</label>
                                                    <input type="file" className="form-control-file form-control-sm" id="exampleFormControlFile1" />
                                                    <br />
                                                </div>
                                                <button type="submit" className="btn hoverbutton text-white mt-4 btn-sm" data-bs-dismiss="modal">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container mt-3">
                                    <table className="table table-responsive table-hover">
                                        <thead className=" table-warning ">
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Type</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th className="fw-normal font-size-md">Identify and pronounce common blends and digraphs.</th>
                                                <td className="fw-normal font-size-md">Course Name</td>
                                                <td>
                                                    <a href="#" data-bs-toggle="modal" data-bs-target="#myModal2" className="btn btn-primary btn-sm"><i className="bi bi-pencil-square"></i></a>
                                                    <a href="" className="btn btn-danger btn-sm text-white"><i className="bi bi-trash"></i></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="fw-normal font-size-md">Identify and pronounce common blends and digraphs.</th>
                                                <td className="fw-normal font-size-md">Course Name</td>
                                                <td>
                                                    <a href="#" data-bs-toggle="modal" data-bs-target="#myModal2" className="btn btn-primary btn-sm"><i className="bi bi-pencil-square"></i></a>
                                                    <a href="" className="btn btn-danger btn-sm text-white"><i className="bi bi-trash"></i></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="fw-normal font-size-md">Identify and pronounce common blends and digraphs.</th>
                                                <td className="fw-normal font-size-md">Course Name</td>
                                                <td> <a href="#" data-bs-toggle="modal" data-bs-target="#myModal2"
                                                        className="btn btn-primary btn-sm"><i
                                                            className="bi bi-pencil-square"></i></a>
                                                    <a href="" className="btn btn-danger btn-sm text-white"><i
                                                            className="bi bi-trash"></i></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="fw-normal font-size-md">Task1</th>
                                                <td className="fw-normal font-size-md">Filename</td>
                                                <td> <a href="#" data-bs-toggle="modal" data-bs-target="#myModal2"
                                                        className="btn btn-primary btn-sm"><i
                                                            className="bi bi-pencil-square"></i></a>
                                                    <a href="" className="btn btn-danger btn-sm text-white"><i
                                                            className="bi bi-trash"></i></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="fw-normal font-size-md">Task2</th>
                                                <td className="fw-normal font-size-md">Filename</td>
                                                <td> <a href="#" data-bs-toggle="modal" data-bs-target="#myModal2"
                                                        className="btn btn-primary btn-sm"><i
                                                            className="bi bi-pencil-square"></i></a>
                                                    <a href="" className="btn btn-danger btn-sm text-white"><i
                                                            className="bi bi-trash"></i></a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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

export default CourseAddEdit