const { z } = require("zod");
const Student = require("../Models/Student.model");
const fs = require("fs").promises;
//
const path = require("path");

const nameSchema = z.string();
const emailSchema = z.string();
const passwordSchema = z
  .string()
  .min(4, { message: "Password must be 4 characters long" })
  .max(10, { message: "Password is too long" });

exports.getAllStudents = async (req, res) => {
  try {
    const user = await Student.find();
    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "No data available",
    });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const user = await Student.findById({ _id: req.params.id });
    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "No data available",
    });
  }
};


exports.createStudent = async (req, res) => {
  //getting data from body
  const student_name = req.body.name;
  const student_email = req.body.email;
  const student_password = req.body.password;

  try {
    const existingStudent = await Student.findOne({ email: student_email });

    if (existingStudent) {
      return res.status(403).json({ message: "Already exists" });
    }

    //whatever data we got from body will check if its good with schema or not
    const nameResult = nameSchema.safeParse(student_name);
    const emailResult = emailSchema.safeParse(student_email);
    const passwordResult = passwordSchema.safeParse(student_password);

    //if the result is true then store it in backend
    if (nameResult.success && emailResult.success && passwordResult.success) {
      const student = new Student({
        name: nameResult.data,
        email: emailResult.data,
        password: passwordResult.data,
      });

      await student.save();
      return res.status(200).json({ message: student });
    } else {
      return res.status(400).json({
        //if validation failed then get the error from the result
        message: "Validation failed",
        errors: {
          name: nameResult.error?.errors,
          email: emailResult.error?.errors,
          password: passwordResult.error?.errors,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  console.log(req.params.id , "is it here--------------------1");
  try {
    console.log( "is it here--------------------2");

  const existUser = await Student.findOne({ _id: req.params.id });
    //check for user
    console.log(existUser, "is it here--------------------2");
    if (!existUser) {
      return res.status(403).json({
        message: "User not available",
      });
    }

    const nameResult = nameSchema.safeParse(req.body.name);
    const emailResult = emailSchema.safeParse(req.body.email);
    const passwordResult = passwordSchema.safeParse(req.body.password);

    if (nameResult.success && emailResult.success && passwordResult.success) {
      const nameNew = nameResult.data;
      const emailNew = emailResult.data;
      const passwordNew = passwordResult.data;
      console.log("is it here--------------------3");

      //Check if file is provided or not
      const updateData = {
        name: nameNew,
        email: emailNew,
        password: passwordNew,
      };
      console.log("is it here--------------------4");

      //update the user
      const updateStudent = await Student.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: updateData },
        { new: true }
      );
      console.log("is it here--------------------5");

      //If student update didnt worked properly
      if (!updateStudent) {
        return res.status(500).json({
          message: "Failed to update user",
        });
      }
    }
    console.log("is it here--------------------6");

    //return response
    return res.status(200).json({
      message: "Updated successfully",
      data: updateStudent,
    });
  } catch (error) {
    //if any other error occues
    return res.status(500).json({
      msg: "unable to reach",
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const existUser = await Student.findById({ _id: req.params.id });

    //check for user
    if (!existUser) {
      return res.status(403).json({
        message: "User not Available",
      });
    }

    const user = await Student.findByIdAndDelete({ _id: req.params.id });

    return res.status(200).json({
      message: `Successfully Deleted`,
      data: user,
      statusCode: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: "No data Available",
    });
  }
};


