import { hashPassword } from '../src/lib/account-utils';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  if (!process.env.ADMIN_PASSWORD) throw new Error('ADMIN_PASSWORD is not set in the environment.');
  const password: string = process.env.ADMIN_PASSWORD;

  const user = await prisma.systemUser.upsert({
    where: { email: 'test@admin.com' },
    update: {},
    create: {
      email: 'test@admin.com',
      hashedPassword: await hashPassword(password),
      role: 'admin',
    }
  });
  
  // const course = await prisma.course.upsert({
  //   where: { courseId: "Data_Analytics_Pracitioner_" }
  // })
  console.log({ user });
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