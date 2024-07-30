const express = require('express');
const asyncHandler = require('express-async-handler');

const db = require('../../config/dbConnection');
const { promises } = require('nodemailer/lib/xoauth2');



const getAllCourseList = ( course_type = '', paginate = '', currPage = '') => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM courses WHERE \`delflag\` = 'N' `;

        if( course_type !== '' )
        {
            sql += `AND course_topic = '${course_type}' `;
        }

        sql += ` ORDER BY id DESC`;

        db.query(sql, (err, result) => {
            if(err){
                reject(err);
            }
            else
            {
                if(paginate === "N")
                {
                    resolve(result);
                }
                else
                {
                    // console.log(sql);
                    
                    const list = parseInt(process.env.ROW_PER_PAGE,10)
                    const num_rows = result.length;
                    const num_pages = Math.ceil(num_rows / list);
                    const start = list * (parseInt(currPage,10) - 1) ;

                    const dataSet = result.slice(start, start + list);

                    // console.log(dataSet);

                    // console.log(typeof(list));
                    // console.log(typeof(num_rows));
                    // console.log(typeof(num_pages));
                    // console.log(typeof(start));
                    // console.log(typeof(currPage));
                    // console.log(typeof(start + list));
                    // console.log((start + list));


                    resolve({dataSet, num_pages, currPage});

                }
            }
        });


    });
}


const getAllCourseTypes = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM course_type WHERE \`delflag\` = 'N' `;

        db.query(sql, (err, result) => {
            if(err){
                reject(err);
            }
            else
            {
                resolve(result);
            }
        });
    });
}

const addCourse = (name,desc,type,image,aca_flag,cd_flag) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO courses SET 
                    course_name = ?,
                    course_description = ?,
                    course_topic = ?,
                    course_image = ?,
                    allow_content_access_flag = ?,
                    course_done_flag = ?,
                    created = NOW(),
                    modified = NOW(),
                    delflag = 'N' `;

        const postData = [name, desc, type, image, aca_flag, cd_flag];

        db.query(sql, postData, (err, result) => {
            if(err){
                reject(err);
            }
            else
            {
                resolve(result);
            }
        });
    });
}

const deleteCourse = (id) => {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE courses SET delflag = 'Y', modified = NOW() WHERE id = ?`;

        const postData = [id];

        db.query(sql, postData, (err, result) => {
            if(err){
                reject(err);
            }
            else
            {
                resolve(result);
            }
        });
    });
}

const getCourseDet = (course_id) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM courses WHERE id = ? AND delflag = 'N' `;

        const postData = [course_id];

        db.query(sql, postData, (err, result) => {
            if(err){
                reject(err);
            }
            else
            {
                resolve(result);
            }
        });
    });
}




module.exports = { getAllCourseList, getAllCourseTypes, addCourse, deleteCourse, getCourseDet };