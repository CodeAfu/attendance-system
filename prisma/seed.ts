import { hashPassword } from '../src/lib/account-utils';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  if (!process.env.ADMIN_PASSWORD) throw new Error('ADMIN_PASSWORD is not set');
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