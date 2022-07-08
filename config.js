module.exports = {

    api: {
        port: process.env.PORT || 5000
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'tyba2022',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'tyba-test1.cvsvbhaiqzc4.us-east-1.rds.amazonaws.com',
        user: process.env.MYSQL_USER || 'admin',
        password: process.env.MYSQL_PW || 'Pl&13hIP4mD5',
        database: process.env.MYSQL_DB || 'tyba',
       

    }
}