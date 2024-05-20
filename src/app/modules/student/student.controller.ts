import { Request, Response } from 'express'
import { StudentService } from './student.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body

    //will call service function to send data
    const result = await StudentService.createStudentIntoDB(student)
    //send response
    res.status(400).json({
      success: true,
      message: 'Student is created Successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

export const StudentControllers = {
  createStudent,
}
