const data = require("./data")

const express = require ('express')
const basicAuth = require('express-basic-auth')
const app = express()
const port = 4131

app.set("views", "templates");
app.set("view engine", "pug");

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use("/static", express.static("resources"));

// var contacts = [{name: "Anna Gram", email: "hey@gmail.com", date: "2023-10-27", reason: "idk", subscribed: "Yes", id: 0}, {name: "Sir Andrew Witty", email: "yuh@gmail.com", date: "2023-10-31", reason: "fun", subscribed: "Yes", id: 1}, {name: "Mahmoud Elassir", email: "mahmoo@gmail.com", date: "2023-11-27", reason: "adopt", subscribed: "Yes", id: 2}, {name: "Jennie Cheng", email: "vinegar@gmail.com", date: "2023-12-12", reason: "idk", subscribed: "No", id: 3}];
// var nextID = 4;
// var sale = null;

app.get("/", (req, res) => {
    res.render("mainpage.pug")
})

app.get("/main", (req, res) => {
    res.render("mainpage.pug")
})

app.get("/contact", (req, res) => {
    res.render("contactform.pug")
})

app.post("/contact", async (req, res) => {
    subscribed = req.body.subscribed ?? 'No';
    if(subscribed == 'on'){
        subscribed = 'Yes';
    }
    contactName = req.body.name ?? null;
    contactEmail = req.body.email ?? null;
    contactDate = req.body.date ?? null;
    contactReason = req.body.reason ?? null;
    if(contactName === null || contactEmail === null || contactDate === null || contactReason === null){
        res.status(400).render("submitForm.pug", {message: "Invalid Form Submission"});
    }
    let val = await data.addContact({name: req.body.name, email: req.body.email, date: req.body.date, reason: req.body.reason, subscribed: subscribed})
    //console.log("value returned by post-contact promise: "+val);
    //nextID = parseInt(nextID) + 1;
    res.render("submitForm.pug", {message: "Thank you for scheduling a visit! Your response has been recorded."});
})

app.get("/testimonies", (req, res) => {
    res.render("testimonies.pug")
})

app.get("/admin/contactlog", basicAuth({users: { 'admin': 'password' }, challenge: true, realm: 'User Visible Realm'}), async (req, res) => {
    let contacts = await data.getContacts();
    for(contact of contacts){
        apptDate = new Date(Date.parse(contact.date));
        contact.date = apptDate.getFullYear() + '-' + (apptDate.getMonth()+1) + '-' + apptDate.getDate();
    }
    res.render("contactlog.pug", {contacts: contacts});
})

app.delete("/api/contact", basicAuth({users: { 'admin': 'password' }, challenge: true, realm: 'User Visible Realm'}), async (req, res) => {
    deleteID = req.body.id;
    let tf = await data.deleteContact(deleteID);
    if(tf){
        res.sendStatus(200);
    } else{
        res.sendStatus(404);
    }
    // for(const contact of contacts){
    //     if(contact.id == deleteID){
    //         indexOf = i;
    //     }
    //     i = parseInt(i) + 1;
    // }
    // if(indexOf == -1){
    //     res.sendStatus(404);
    // } else{
    //     contacts.splice(indexOf, 1);
    //     res.sendStatus(200);
    // }
})

app.get("/api/sale", async (req, res) => {
    sales = await data.getRecentSales();
    json =  { active: false};

    for(const sale of sales){
        if(sale.end == null){
            json = { active: true, message: sale.message};
        }
    }
    // if(sale === null){
    //     res.json({ active: false});
    // } else{
    //     res.json({ active: true, message: sale});
    // }
    res.json(json);
})

app.post("/api/sale", basicAuth({users: { 'admin': 'password' }, challenge: true, realm: 'User Visible Realm'}), async (req, res) => {
    sale = req.body.message ?? null;
    if(sale === null){
        res.sendStatus(400);
    }
    res.send(await data.addSale(sale));
})

app.delete("/api/sale", basicAuth({users: { 'admin': 'password' }, challenge: true, realm: 'User Visible Realm'}), async (req, res) => {
    res.send(await data.endSale());
})

app.get("/admin/salelog", basicAuth({users: { 'admin': 'password' }, challenge: true, realm: 'User Visible Realm'}), async (req, res) => {
    let recentSales = await data.getRecentSales();
    return recentSales;
})

app.use((req, res, next) => {
    res.status(404).render("404.pug")
})

app.listen(port , () => {
    console .log(`Example app listening on port ${port}`)
})




