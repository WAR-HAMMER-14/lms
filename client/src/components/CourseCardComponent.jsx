import React from 'react'
import * as config from '../utilities/config'
import { Link } from 'react-router-dom';

const CourseCardComponent = ({id,name,description,image,deleteCourse}) => {

    // Function to truncate the description
    const truncateString = (str, num) => {
    if (str.length <= num) 
    {
        return str;
    }
    return str.substring(0, num) + '...';
  };

  return (
    <>
        <div className="col-lg-3 mt-4 ">
            <div className="bg-light shadow shadow-sm hoverbox rounded">
                <img src={config.API_BASE_URL+'uploads/course/course_images/'+image} alt="" className="coursesdiv rounded" />
                <div className="p-2">
                    <p className="coursesheading">{name}</p>
                    <h6 className="courses-p">{truncateString(description, 30)}</h6>
                    <hr />
                    <div className="d-flex justify-content-between text-end mt-3">
                        {/* <!-- <h6 className=" fw-bold orangetext ">$24.00</h6> --> */}
                        <a href="courseview.html" className="btn coursesbtn btn-sm text-white">View Details</a>
                        <div>
                            <Link to={'/courseEdit/'+id} className="btn btn-primary btn-sm me-2"><i className="bi bi-pencil-square"></i></Link>
                            <button className="btn btn-danger btn-sm text-white" onClick={()=>deleteCourse(id,name)}>
                                <i className="bi bi-trash"></i>
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CourseCardComponent