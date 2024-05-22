import { z } from 'zod';

// Define Zod schemas
const userNameSchemaZod = z.object({
  firstName: z
    .string()
    .trim()
    .min(1)
    .max(20)
    // .refine((value) => /^[A-Z]/.test(value), {
    //   message: 'First Name must start with a capital letter',
    // })
    .refine(
      (value) => {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return firstNameStr === value;
      },
      { message: 'First Name must be capitalized' },
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last Name is Required')
    .refine(
      (value) => {
        const lastNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return lastNameStr === value;
      },
      { message: 'Last Name must be capitalized' },
    ),
});

const guardianSchemaZod = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianSchemaZod = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const studentSchemaZod = z.object({
  id: z.string(),
  password: z.string().max(20),
  name: userNameSchemaZod,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianSchemaZod,
  localGuardian: localGuardianSchemaZod,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'block']).default('active'),
  isDeleted: z.boolean().optional(),
});

export default studentSchemaZod;