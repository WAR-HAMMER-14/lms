import React, { useEffect, useState } from 'react'
import Sidebar from '../include/Sidebar'
import Header from '../include/Header'
import CourseCardComponent from '../CourseCardComponent'
import axios from 'axios'
import * as config from '../../utilities/config'
import * as SessionMsg from '../SwalSessionExpire'
import Swal from 'sweetalert2'
import Pagination from '../Pagination'
import CourseTypeBubble from '../CourseTypeBubble'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminCourses = () => {
    document.title = "Admin | Courses"

    const [ courses, setCourses ] = useState([]);
    const [ courseTypes, setCourseTypes ] = useState([]);
    const [ activeCourseType, setActiveCourseType ] = useState("");
    const [paginationCount, setPaginationCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authKey')}`;
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';

    async function getCourses(postData){
        try{
            const res = await axios.post(config.API_URL+'allCourseList',postData)

            if(res.data === "AUTH_KEY_NOT_PROVIDED" || res.data === "VALIDATION_TIME_ERROR" || res.data === "VALIDATION_ERROR")
            {
                SessionMsg.swalSessionExpire();
            }
            else
            {
                const resArr = res.data;
                const dataArr = resArr.split('<@_@>');

                setCourses(JSON.parse(dataArr[0]));
                setPaginationCount(JSON.parse(dataArr[1]));
                setCurrentPage(JSON.parse(dataArr[2]));
            }
            console.log(res.data);
        }
        catch(err){
            console.log(err);
        }
    }

    async function addCourse(postData){
        try{
            const res = await axios.post(config.API_URL+'addCourse', postData)

            if(res.data === "AUTH_KEY_NOT_PROVIDED" || res.data === "VALIDATION_TIME_ERROR" || res.data === "VALIDATION_ERROR")
            {
                SessionMsg.swalSessionExpire();
            }
            else if(res.data === "FILE_TYPE_NOT_SUPPORTED")
            {
                toastError("File Type Not Supported");
            }
            else if(res.data === "COURSE_ADDED_SUCCESSFULLY")
            {
                // close the modal
                alertSuccess("Course Added Successfully");

                // Hide the modal using Bootstrap's modal method
                const materialModal = document.getElementById('material');
                const modalInstance = bootstrap.Modal.getInstance(materialModal);
                modalInstance.hide();

                // Reset the form
                document.getElementById('addCourseForm').reset();

                const postData = new FormData();
                getCourses(postData);

            }
            else
            {
                toastError("Unknown Error occured");
                console.log(res.data);
            }
        }
        catch(err){
            console.log(err);
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

    async function deleteCourse(postData){

        try{
            const res = await axios.post(config.API_URL+'deleteCourse', postData)

            if(res.data === "AUTH_KEY_NOT_PROVIDED" || res.data === "VALIDATION_TIME_ERROR" || res.data === "VALIDATION_ERROR")
            {
                SessionMsg.swalSessionExpire();
            }
            else if(res.data === "COURSE_DELETED_SUCCESSFULLY")
            {
                alertSuccess("Course Deleted Successfully");
                const postData = new FormData();
                // postData.append('course_type', activeCourseType);
                getCourses(postData);
            }
            else
            {
                toastError("Unknown Error occured");
                console.log(res.data);
            }
        }
        catch(err){
            console.log(err);
        }
    }






    const paginateHandler = (page) => {
        const postData = new FormData();

        postData.append('currPage',page);
        postData.append('course_type', activeCourseType);
        getCourses(postData);
    }


    const courseFormHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        if(formData.get('course_name') === "" || formData.get('course_description') === "" || formData.get('course_image') === "" || formData.get('course_type') === "")
        {
            toastError("Please fill all the fields");
            return;
        }

        console.log(formData);
        addCourse(formData);
        
    } 

    const courseDeleteHandler = (id,name) => {
       
        const formData = new FormData();
        formData.append('course_id', id);
        // deleteCourse(formData);
        swalConfirmAlert(name,() => deleteCourse(formData));

    }






    useEffect(() => {
        const postData = new FormData();
        postData.append('course_type', activeCourseType);

        getCourses(postData);
        getCourseTypes();

    },[activeCourseType])


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

    const toastError = (data) => {
        toast.error(data, {
            position: "top-center",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }

    // swal alert for deleting multiple Buildings
    const swalConfirmAlert = (msg,deleteCourse) => {
        Swal.fire({
            title: 'Are you sure ?',
            text: "Delete "+msg,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                'Deleted!',
                msg+" Course has been deleted.",
                'success'
                )
                deleteCourse();
            }
        })
    }


  return (
    <>
        <Sidebar />
        <section id="content" className='contentcss'>
            <Header />
            <main>
                <div className="">
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
                        </div>
                        <div className="col-lg-6 text-end">
                            <button className="btn addcoursesbtn" data-bs-toggle="modal" data-bs-target="#material"> Add New</button>
                        </div>

                    </div>
                </div>
                <nav className="classnav justify-content-center">
                    <div className=" nav nav-tabs mb-3 border-0" id="nav-tab" role="tablist">
                        <button key="ty14" className={"nav-link " + (activeCourseType === '' ? "active fs-6 btn btn-sm" : '' )} id="nav-programimg-tab" type="button" role="tab" onClick={()=> setActiveCourseType('')} aria-selected="true">All</button>
                        { courseTypes.length > 0 && courseTypes.map((courseType, index) => (<CourseTypeBubble key={index} id={courseType.id} type={courseType.type_name} isActive={activeCourseType === courseType.id}  setActiveCourseType={setActiveCourseType} />)) }
                    </div>
                </nav>
                <div className="tab-content p-1" id="nav-tabContent">
                    <div className="row">
                        {courses.length > 0 ?(courses.map((course,index) => (<CourseCardComponent key={index} id={course.id} name={course.course_name} description={course.course_description} image={course.course_image} deleteCourse={courseDeleteHandler}/>))):('<h4>No data available</hr>')}
                    </div>
                    <div className="row">
                        <div className="col-md-6"></div>
                        <div className="col-md-6">
                            <Pagination pageCount={paginationCount} currentPage={currentPage} onPageNav={paginateHandler} />               			
                        </div>
                    </div>
                </div>
                
            </main>
        </section>
        <div className="modal fade" id="material">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content p-3">
                    <div className="modal-body">
                        <form id='addCourseForm' onSubmit={courseFormHandler}>
                            <h5 className="fw-bold mt-3">Add New Course</h5>
                            <div className="mt-2">
                                <div className="form-group">
                                    <label className="mt-3 mb-2">Enter Course Name</label>
                                    <input type="text" className="form-control" name="course_name" />
                                </div>

                                <div className="form-group">
                                    <label className="mt-3 mb-2">Enter Course Description</label>
                                    <textarea className="form-control" name="course_desc" id="course_desc"></textarea>
                                </div>
                                
                                <div className="form-group">
                                    <label className="mt-4 mb-2">Upload Course Image</label> <br />
                                    <input type="file" name="course_image" className="form-control-file form-control-sm" id="course_image" accept=".csv,.jpeg,.jpg,.JPEG,.JPG,.png,.PNG" />
                                </div>

                                <div className="form-group">
                                    <label className="mt-3 mb-2">Select Course Topic</label>
                                    <select className="form-select" aria-label="Default select example" name="course_type">
                                        {courseTypes.length > 0 && courseTypes.map((courseType) => (<option value={courseType.id}>{courseType.type_name}</option>))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="mt-3 mb-2">Allow Content Access After Completion</label>
                                    <input className="form-check-input" type="checkbox" name="allow_access" id="allow_access" />
                                </div>

                                <div className="form-group">
                                    <label className="mt-3 mb-2">Course Completion</label>
                                    <input className="form-check-input" type="checkbox" name="course_complete" id="course_complete" />
                                </div>
                            </div>
                            <button type="submit" className="btn hoverbutton text-white mt-4 btn-sm" >Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default AdminCourses