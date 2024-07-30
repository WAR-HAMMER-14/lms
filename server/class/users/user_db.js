const express = require('express');
const asyncHandler = require('express-async-handler');

const db = require('../../config/dbConnection');
const { promises } = require('nodemailer/lib/xoauth2');



const doLogin = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

const checkExistingEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
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


module.exports = { doLogin, checkExistingEmail };