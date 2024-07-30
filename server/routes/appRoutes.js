const express = require('express');
const router = express.Router();
const multer = require('multer');


const upload = multer();

const { login, adminLogin, courseList, getCourseTypeList, addCourse, deleteCourse, courseDet, uploadFile } = require('../controllers/mainController');

const validateToken = require('../middleware/validateTokenHandler');



router.route('/login').post(upload.none(),login);
router.route('/adminLogin').post(upload.none(),adminLogin);
router.route('/allCourseList').post(validateToken,upload.none(),courseList);
router.route('/courseTypes').post(validateToken,upload.none(),getCourseTypeList);
router.route('/deleteCourse').post(validateToken,upload.none(),deleteCourse);
router.route('/addCourse').post(validateToken,upload.fields([
    { name: 'course_image', maxCount: 1 },
]),addCourse);
router.route('/courseDetById').post(validateToken,upload.none(),courseDet);

router.route('/uploadFile').post(validateToken, upload.single('file'), uploadFile);


module.exports = router;
