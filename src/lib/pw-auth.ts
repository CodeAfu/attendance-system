import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const salt = bcrypt.genSaltSync(13);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function checkPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}