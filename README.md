# SCE-backend

Instructions to run the project

1) Clone the git repo
   
2) Navigate to the directory

3) install all dependencies -> npm install

4) run using command -> node index.js



APIs

1) Login: Use the /login endpoint to authenticate users.
2) Logout: Use the /logout endpoint to clear the session.
3) Signup: Use the POST /signup endpoint to register the user initially.
4) Course Data: GET /courseData?courseNameSection=<value>: Fetch course data by courseNameSection.
5) Course Access: GET /courseAccess: Fetch course access data by email.


To import course data into mongodb, check the importData.js file. You need to download the csv file and run this script so that data gets update in the MongoDB database.

To import course access data into mongodb, check the importCourseAccessData.js file and run the script.
