import { Request, Response } from 'express';
import { StudentService } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {

    //creating a schema validation using Joi

    const { student: studentData } = req.body;

    //data validation using Joi

    // const { error, value } = studentValidationSchema.validate(studentData);

    //data validation using Zod

    const zodParsedData = studentValidationSchema.parse(studentData)

    //will call service function to send data
    const result = await StudentService.createStudentIntoDB(zodParsedData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'something went wrong......',
    //     error: error?.details,
    //   });
    // }

    //send response
    res.status(200).json({
      success: true,
      message: 'Student is created Successfully',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

//get all students

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromDb();

    res.status(200).json({
      success: true,
      message: 'Students are retrieve Successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

//get single student by id

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getSingleStudentFromDb(studentId);

    res.status(200).json({
      success: true,
      message: 'Single Student data loaded successfully',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};


//delete student

const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.deleteSingleStudentFromDb(studentId);

    res.status(200).json({
      success: true,
      message: 'Student data deleted successfully',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent
};
