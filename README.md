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


MongoDB database schema:

1) users: contains username(has to be charlotte.edu account compulsory) and hashed password

2) course_accesses: contains username and list of courses that professor has access to

3) course_datas: contains details of each course with data required for graph visualization
