import { TStudent } from './student.interface'
import { Student } from './student.model'

const createStudentIntoDB = async (studentData: TStudent) => {
  //static method
  if(await Student.isUserExists(studentData.id)){
    throw new Error("User Already Exists!")
  }
  const result = await Student.create(studentData);




  return result
}

const getAllStudentsFromDb = async() => {
  const result = Student.find();
  return result;
}

const getSingleStudentFromDb = async( id: string) => {
  const result = Student.findOne({ id });
  return result;
}

export const StudentService = {
  createStudentIntoDB,
  getAllStudentsFromDb,
  getSingleStudentFromDb
}
