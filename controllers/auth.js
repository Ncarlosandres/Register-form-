
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


exports.register = (req, res) => {
    console.log(req.body);

    const{name, email,address, password, passwordConfirm} = req.body;
         
       //make the query to th DB
     db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
              
        if (error) {
            console.log(error);
        } if (results.length > 0) {
            return res.render("register", {
                message: "Email already in use"
            });
        } else if (password !== passwordConfirm) {
            return res.render("register", {
                message: "Password do not mauch"
            });
        }


          let hashedPassword = await bcrypt.hash(password, 8);
           console.log(hashedPassword);

               //Insert data in table users DB
           db.query('INSERT INTO users SET ?', {name: name, email: email, address: address, password: hashedPassword}, (error, results) => {
                         
            if (error) {
                console.log(error);
           }else {
                res.render("register", {
                   message: "User regitered"
               });
           }

           });
        }
     )};
                  
     
                
    
     

             
            
       

   

