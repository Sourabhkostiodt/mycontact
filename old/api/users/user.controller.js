const { create,getUsers,getUsersByUserId } = require("./user.service");

const { genSaltSync,hashSync  } = require("bcrypt");

module.exports = { 
// ragister user with require values in /localhost:port/api/users/
    createUser: (req, res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        create(body,(err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database connection errro !"
                })         
               }
               return res.status(200).json({
                success:1,
                data:   results
               });
        });

    },

// all users show when hiting it /localhost:port/api/users/
  getUsers: (req,res) => {
    getUsers((err, results) =>  {
        if(err){
            console.log(err);
            return;
        }
        return res.json({
            success:1,
            data:results
        });        
    });
  },


  // single  users show w   hen hiting it with id  /localhost:port/api/users/id 
  getUsersByUserId: (req,res) => {
    const id =  req.params.id;
    getUsersByUserId(id,(err, results) =>  {
        if(err){
            console.log(id);
            return;     
        }
        if(!results){
            return res.json({
                success:0,
                data:'invalid Users Id'
            });        
        }
        return res.json({
            success:1,
            data:results
        });        
    });
  },

};

// update data using in update commnad in node js for u