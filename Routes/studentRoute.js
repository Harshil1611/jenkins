const express = require("express");
const {
  getAllStudents,
  getSingle,
  createStudent,
  updateStudent,
  deleteStudent,
  
} = require("../controller/studentController.js");
const router = express.Router();
const Student = require("../Models/Student.model.js");



router.get("/getAll", getAllStudents);
router.get("/getSingle/:id", getSingle);
router.post("/create", createStudent);
router.put("/updateStudent/:id", updateStudent);
router.delete("/deleteStudent/:id", deleteStudent);
// router.get("/search", searchList);
// router.put("/statusUpdate/:id", statusCheck);


module.exports = router;
