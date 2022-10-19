const { create,getUsers,getUsersByUserId,updateUser,deleteUser} = require("./user.service");

const { genSaltSync,hashSync } = require("bcrypt");

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads');
    },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

module.exports = { 

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
                data:"User Created successfully"
               });
        });

    },

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

  getUsersByUserId: (req,res) => {
    const id = req.params.id;
    getUsersByUserId(id,(err, results) =>  {
        if(err){
            console.log(err);
            return;
        }
        if (!results) {
            return res.json({
              success: 0,
              message: "Record not Found"
            });
        }
        return res.json({
            success:1,
            data:results
        });        
    });
  },

  updateUsers: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
     console.log(salt);
    console.log(body);
    body.password = hashSync(body.password, salt);
   
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },

  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "Record deleted successfully"
      });
    });
  }

};