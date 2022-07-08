const {InsertUserHistory} = require('../store/database')


const UserHistory = async(body) =>{

    const {id,descripcion} = body
    
    let now= new Date();
    
    const user = {
        iduser: id,
        descripcion,
        date:now
    }
   
    InsertUserHistory(user)
}

module.exports = {
    UserHistory
};