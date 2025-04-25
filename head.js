//1.مروان....................................................................................
const express = require('express');

const app = express();
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://maro:00000000@cluster0.mdwgweu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>console.log("connect"))
    .catch((er)=>console.log(er));
//..........................................................................................


//2.عبدالمقصود..............................................................................
const studentSchema = new mongoose.Schema({
    name:String,

    age:Number,

    level:String,

    address:String

});

const Student = mongoose.model("Student",studentSchema);
//.........................................................................................



//3.خالد مرسي .............................................................................
const doctorSchema = new mongoose.Schema({
    name:String,

    age:Number,

    phone:String
});


const Doctor = mongoose.model("Doctor",doctorSchema);
//........................................................................................


//4.الحسيني..............................................................................
app.use(express.json());

let students = [];
let doctors = [];
//.......................................................................................


//5.مهاب......................................................................................
app.post("/student/hardcoded", (req, res) => {
    students.push({ name: "Ali", age: 20, level: "3rd", address: "Cairo" });
    res.send("Hardcoded student added");
});

app.post("/student", async(req, res) => {
    const student = req.body; 

    const m = new Student(student);   
    await m.save();
    students.push(student);
    res.send("Student added from body");
});
//.....................................................................................


//6.مينا......................................................................................
app.post("/doctor/add", (req, res) => {
    const { name, age, phone } = req.query;
    doctors.push({ name, age, phone });
    res.send("Doctor added from query");
});

app.get("/student", (req, res) => {
    res.json(students); 
});

app.get("/doctor" , (req , res) => {
    res.json(doctors);
})
//.....................................................................................


//7.محمد ايهاب .............................................................................
app.delete("/student", (req, res) => {
    const { name } = req.query;
    students = students.filter(s => s.name !== name); 
    res.send("Student deleted");
});

app.put("/doctor/update-name", (req, res) => {
    const { oldName, newName } = req.query;
    const doctor = doctors.find(d => d.name === oldName);
    if (doctor) {
        doctor.name = newName;
        res.send("Doctor name updated");
    } else {
        res.status(404).send("Doctor not found");
    }
});
//....................................................................................


//8.عبدالرحمن..............................................................................
app.get("/all", (req, res) => {
    res.json({ students, doctors });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
//....................................................................................