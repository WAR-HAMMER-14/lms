import React from 'react'

const CourseTypeBubble = ({id,type,isActive,setActiveCourseType}) => {

    const btnSelectHandler = () => {
        setActiveCourseType(id);
    }

  return (
    <>
        <button className={"nav-link " + (isActive ? "active fs-6 btn btn-sm" : '' )} id="nav-programimg-tab" type="button" role="tab" onClick={btnSelectHandler} aria-selected="true">{type}</button>
    </>
  )
}

export default CourseTypeBubble