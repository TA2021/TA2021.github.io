Description
Building a website (online clothes shop) for customers to explore, search and buy new clothes. The website will allow staff member to add/ remove items as well as allowing managers to edit prices and apply discounts.
How to run the application 
1.	Run the provided SQL script to create the database.
2.	Create an account on: https://mailtrap.io and replace:

"var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c16e97160a283c",
    pass: "b0744070dad435"
  }
});"
With the one provided from that website (copy and paste on the server.js file).
3.	open the IDE and execute the 'npm run dev' or 'npm start' command in the terminal of the IDE. Following this, the terminal should display a message saying, "Server is listening on port 7000," indicating the server is active.
4.	Then, by entering localhost:7000 in a web browser to access the homepage. 
5.	If everything is followed as described, you can navigate and use the application as normal website.

Support
For any question, please contact me on: zfac125@live.rhul.ac.uk 
Roadmap
This project can have more sophisticated features in which can be developed according to a potential users’ requirements in the next phase of this project if the decision is reached to deploy this application. 
License
Open licence.

 Project status
Done.
