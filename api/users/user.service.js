const pool = require("../../config/database");

module.exports = {
    create: (data,callBack) => {
        pool.query(
            'insert into registration (firstName, lastName, email, mobileNumber, password, designation, companyName, address) values (?,?,?,?,?,?,?,?)',
            [
                data.firstName,
                data.lastName,
                data.email,
                data.mobileNumber,
                data.password,
                data.designation,
                data.companyName,
                data.address,
                data.profile
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

    updateUser: (data, callBack) => {
        pool.query(
          'update registration set firstName=?, lastName=?, email=?, mobileNumber=?, password=?, designation=?, companyName=?, address=? where id = ?',
          [
            data.firstName,
            data.lastName,
            data.email,
            data.mobileNumber,
            data.password,
            data.designation,
            data.companyName,
            data.address,
            data.id
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
    },

    deleteUser: (data, callBack) => {
        pool.query(
          'delete from registration where id = ?',
          [data.id],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
    }

}