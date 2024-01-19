// this package behaves just like the mysql one, but uses async await instead of callbacks.
const mysql = require(`mysql-await`); // npm install mysql-await

// first -- I want a connection pool: https://www.npmjs.com/package/mysql#pooling-connections
// this is used a bit differently, but I think it's just better -- especially if server is doing heavy work.
var connPool = mysql.createPool({
  connectionLimit: 5, // it's a shared resource, let's not go nuts.
  host: "127.0.0.1",// this will work
  user: "C4131F23U45",
  database: "C4131F23U45",
  password: "2075", // we really shouldn't be saving this here long-term -- and I probably shouldn't be sharing it with you...
});

// later you can use connPool.awaitQuery(query, data) -- it will return a promise for the query results.

async function addContact(data){
  // you CAN change the parameters for this function. please do not change the parameters for any other function in this file.
  return await connPool.awaitQuery("insert into contact (name, email, date, reason, subscribed) values (?, ?, ?, ?, ?);", [data.name, data.email, data.date, data.reason, data.subscribed])
}

async function deleteContact(id){
  let promise = await connPool.awaitQuery("delete from contact where id=?;", [id]);
  let okpacket = await promise;
  if(okpacket.affectedRows > 0){
    return true;
  } else{
    return false;
  }
}

async function getContacts() {
  return await connPool.awaitQuery("select * from contact;")
}

async function addSale(message) {
  return await connPool.awaitQuery("insert into sale (message) values (?);", [message])
}

async function endSale() {
  return await connPool.awaitQuery("update sale set end=CURRENT_TIMESTAMP where end IS NULL;")
}

async function getRecentSales() {
  return await connPool.awaitQuery("select message, end from sale order by start desc limit 3;")
}

module.exports = {addContact, getContacts, deleteContact, addSale, endSale, getRecentSales}