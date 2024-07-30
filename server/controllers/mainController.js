const asyncHandler = require('express-async-handler');
const user_db = require('../class/users/user_db');
const admin_db = require('../class/admin/admin_db');
const course_db = require('../class/courses/course_db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sharp = require('sharp');
const fs = require('fs');
const axios = require('axios');






const login = asyncHandler(async(req,res) => {
    const { email, password } = req.body;

    if( email !== '' && password !== '' )
    {
        const userDet = await user_db.doLogin(email);


        if(userDet.length > 0)
        {
            const checkUser = await bcrypt.compare(password, userDet[0].password);


            if(checkUser)
			{
				//generate access token string
				const accessToken = jwt.sign(
					{
						user: {
							username: userDet[0].username,
							email: userDet[0].email,
							role: userDet[0].type,
							id: userDet[0].id
						}
					},
					process.env.ACCESS_TOKEN,
					{expiresIn: '60m'}
				)

				//login success code goes here
				res.send("LOGIN_SUCCESS<@_@>"+userDet[0].id+"<@_@>"+accessToken+"<@_@>"+userDet[0].type)
			}
			else
			{
                // LOGIN FAILED code goes here
				res.send("LOGIN_FAILED:WRONG_PASSWORD");
			}
        }
		else
		{
			res.send("LOGIN_FAILED:WRONG_PASSWORD");
		}
    }
	else
	{
		res.send("LOGIN_FAILED:EMPTY_FIELDS");
	}

});


const adminLogin = asyncHandler(async(req, res) => {
	const { email, password } = req.body;

	if( email !== '' && password !== '')
	{
		const adminDet = await admin_db.adminLogin(email);

		if(adminDet.length > 0)
		{
			const checkAdmin = await bcrypt.compare(password, adminDet[0].password);

			if(checkAdmin)
			{
				// generate access token
				const accessToken = jwt.sign(
					{
						admin : {
							username: adminDet[0].username,
							email: adminDet[0].email,
							role: adminDet[0].super_admin,
							id: adminDet[0].id
						}
					},
					process.env.ACCESS_TOKEN,
					{expiresIn: '60m'}
				)

				//login success code goes here
				res.send("LOGIN_SUCCESS<@_@>"+adminDet[0].id+"<@_@>"+accessToken+"<@_@>"+adminDet[0].super_admin)
			}
			else
			{
				res.send("LOGIN_FAILED:WRONG_PASSWORD");
			}
		}
		else
		 {
			res.send("LOGIN_FAILED:WRONG_PASSWORD");
		 }
	}
	else
	{
		res.send("LOGIN_FAILED:EMPTY_FIELDS");
	}
});

const courseList = asyncHandler(async(req, res) => {

	const course_type = req.body.course_type ? req.body.course_type : ''; 
	const paginate = req.body.paginate ? req.body.paginate : '';
	const currPage = req.body.currPage ? req.body.currPage : 1;
	

	let courseList = await course_db.getAllCourseList(course_type, paginate, currPage);

	const jsonData = JSON.stringify(courseList.dataSet);

	const responseString = `${jsonData}<@_@>${courseList.num_pages}<@_@>${courseList.currPage}`;

	res.send(responseString);


});


const getCourseTypeList = asyncHandler(async(req, res) => {
	const courseTypeList = await course_db.getAllCourseTypes();

	const jsonData = JSON.stringify(courseTypeList);

	res.send(jsonData);
});


const addCourse = asyncHandler(async(req, res) => {
	//form data
	const { course_name, course_type, course_desc } = req.body;

	// Set default values for checkboxes
	let allow_access = req.body.allow_access ? 1 : 0;
	let course_complete = req.body.course_complete ? 1 : 0;

	// files
	const course_image = req.files.course_image;

	// new building image and pdf name
	let course_image_name = '';

	// for image upload
	if(req.files.course_image !== undefined)
	{
		// Define the destination folder for your files
		const destinationFolder = './'+process.env.COURSE_IMAGE_UPLOADING_PATH; // Replace with your desired destination folder
		const destinationFolderThumb = './'+process.env.COURSE_IMAGE_UPLOADING_PATH+'/thumbs'; // Replace with your desired destination folder

		// supported file types array
		const ext1Arr = ['jpg', 'JPG', 'JPEG', 'jpeg', 'png', 'PNG', 'gif', 'GIF'];

		// store the extension
		let fileNameArr1 = course_image[0].originalname.split('.');

		// store the extension
		let ext1 = fileNameArr1[fileNameArr1.length - 1];

		//image file name
		let imageFileName = '';
				
		// check if the file type is supported
		if (!ext1Arr.includes(ext1)) {
			res.send('FILE_TYPE_NOT_SUPPORTED');
			return false;
		}

		try{
				
			// Check if the destination folder exists, and create it if not
			if (!fs.existsSync(destinationFolder)) {
				fs.mkdirSync(destinationFolder, { recursive: true });
			}

			if(!fs.existsSync(destinationFolderThumb)) {
				fs.mkdirSync(destinationFolderThumb, { recursive: true });
			}


			// Save the image file
			imageFileName = `${Date.now()}-_-${course_image[0].originalname}`; // Rename the file if needed
			const imageFilePath = `${destinationFolder}/${imageFileName}`;
			const imageStream = fs.createWriteStream(imageFilePath);
			imageStream.write(course_image[0].buffer);
			imageStream.end();

			// Save the image thumb file
			const thumbnailFileName = `${Date.now()}-_-${course_image[0].originalname}`; // Rename the file if needed`
			const thumbnailFilePath = `${destinationFolderThumb}/${thumbnailFileName}`;
			sharp(course_image[0].buffer)
				.resize(134,134)
				.toFile(thumbnailFilePath, (err) => {
					if (err) {
						console.error('Error creating thumbnail:', err);
					}
			});

			
		}
		catch(err){
			console.error('Error uploading image files:', err);
			// Handle the error, send a response, or take appropriate action
			res.status(500).send('Error uploading files');
		}

		course_image_name = imageFileName;



	}

	let result = await course_db.addCourse(course_name, course_desc,course_type, course_image_name, allow_access, course_complete,)

	res.send("COURSE_ADDED_SUCCESSFULLY");
});

const uploadFile = asyncHandler(async (req, res) => {
    const file = req.file;
    const filePath = req.body.file_path;

    if (!file) {
        return res.status(400).send('No file uploaded');
    }

    try {
        // Define the destination folder for your files
        const destinationFolder = `./${filePath}`; // Use the file path from the request
        const destinationFolderThumb = `./${filePath}/thumbs`; // Thumbnail folder

        // Supported file types array
        const extArr = ['jpg', 'JPG', 'JPEG', 'jpeg', 'png', 'PNG', 'gif', 'GIF'];

        // Store the extension
        const fileNameArr = file.originalname.split('.');
        const ext = fileNameArr[fileNameArr.length - 1];

        // Check if the file type is supported
        if (!extArr.includes(ext)) {
            return res.status(400).send('FILE_TYPE_NOT_SUPPORTED');
        }

        // Ensure the destination folders exist
        if (!fs.existsSync(destinationFolder)) {
            fs.mkdirSync(destinationFolder, { recursive: true });
        }

        if (!fs.existsSync(destinationFolderThumb)) {
            fs.mkdirSync(destinationFolderThumb, { recursive: true });
        }

        // Save the image file
        const imageFileName = `${Date.now()}-_-${file.originalname}`; // Rename the file if needed
        const imageFilePath = `${destinationFolder}/${imageFileName}`;
        fs.writeFileSync(imageFilePath, file.buffer);

        // Save the image thumb file
        const thumbnailFileName = `${Date.now()}-_-${file.originalname}`;
        const thumbnailFilePath = `${destinationFolderThumb}/${thumbnailFileName}`;
        sharp(file.buffer)
            .resize(134, 134)
            .toFile(thumbnailFilePath, (err) => {
                if (err) {
                    console.error('Error creating thumbnail:', err);
                }
            });

        res.send(imageFileName);
    } catch (err) {
        console.error('Error uploading image files:', err);
        res.status(500).send('Error uploading files');
    }
});

const deleteCourse = asyncHandler(async(req, res) => {
	const course_id = req.body.course_id;

	let result = await course_db.deleteCourse(course_id);

	// console.log(result);
	if(result.affectedRows > 0)
	{
		res.send("COURSE_DELETED_SUCCESSFULLY");
	}
	
});

const courseDet = asyncHandler(async(req, res) => {
	const course_id = req.body.course_id;

	
	let courseDet = await course_db.getCourseDet(course_id);
	const jsonData = JSON.stringify(courseDet[0]);
	
	// console.log(jsonData);

	res.send(jsonData);
});



module.exports = { login, adminLogin, courseList, getCourseTypeList, addCourse, deleteCourse, courseDet, uploadFile };	