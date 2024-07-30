const express = require('express');
const asyncHandler = require('express-async-handler');

const db = require('../../config/dbConnection');
const { promises } = require('nodemailer/lib/xoauth2');




const adminLogin = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM admins WHERE username = ?', [email], (err, result) => {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(result);
            }
        });
    });
}


module.exports = { adminLogin } 
