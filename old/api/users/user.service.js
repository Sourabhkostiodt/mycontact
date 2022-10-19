const pool = require("../../config/database");



module.exports = {
    create: (data,callBack) => {
        pool.query(
            'insert into registration (firstName, email, password) values (?,?,?)',
            [
                data.firstName,
                data.email,
                data.password
            ],
            (error,results,fields) =>{  
                if(error){
                  return callBack(error);
                }
                return callBack(null,results)
            }
        )
    },

    getUsers:callBack =>{
        pool.query(
            "select * from registration",
            [],
            (error,results,fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },

    getUsersByUserId:(id,callBack) => {
        pool.query(
            "select * from registration where id = ?",
            [id],
            (error,results,fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },

}
