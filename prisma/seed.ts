import { hashPassword } from '../src/lib/account-utils';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  if (!process.env.ADMIN_PASSWORD) throw new Error('ADMIN_PASSWORD is not set in the environment.');
  const password: string = process.env.ADMIN_PASSWORD;

  const systemUser = await prisma.systemUser.upsert({
    where: { email: 'test@admin.com' },
    update: {},
    create: {
      email: 'test@admin.com',
      hashedPassword: await hashPassword(password),
      role: 'admin',
    }
  });
  
  const course = await prisma.course.upsert({
    where: { courseId: "Data_Analytics_Pracitioner_20Oct2024_21Mar2025" },
    update: {},
    create: {
      courseName: "Data Analytics Practitioner",
      courseId: "Data_Analytics_Pracitioner_20Oct2024_21Mar2025",
      trainerName: "Mr Paul",
      startDate: new Date("2024-10-20T00:00:00+08:00"),
      endDate: new Date("2025-03-21T00:00:00+08:00"),
      venue: "A-06-04"
    }
  });
  
  const trainee = await prisma.trainee.upsert({
    where: { nric: "961321-32-5072" },
    update: {},
    create: {
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      dob: "1995-06-15",
      citizenship: "Malaysian",
      nric: "961321-32-5072",
      email: "john.doe@example.com",
      contactNo: "+65 9123 4567",
      employer: "Bank Islam Malaysia Berhad",
      courses: {
        connect: {
          courseId: course.courseId
        }
      }
    },
  });

  let attendanceRecord;

  const existingAttendance = await prisma.attendanceRecord.findFirst({
    where: {
      traineeId: trainee.id,
      courseId: course.id,
    },
  });

  if (!existingAttendance) {
    attendanceRecord = await prisma.attendanceRecord.create({
      data: {
        traineeId: trainee.id,
        courseId: course.id,
        base64Signature: "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",
      },
    });
  }

  console.log({
    message: "Database seeded successfully!",
    data: {
      systemUser, 
      course,
      trainee,
      attendanceRecord: {
        ...attendanceRecord,
        base64Signature: attendanceRecord?.base64Signature?.slice(0, 8) + "...",
      },
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })