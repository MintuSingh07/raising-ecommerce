import crypto from "crypto";
import dbConnect from "./mongoose";
import UserModel from "../models/User";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, hash] = storedHash.split(":");
    const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
    return hash === verifyHash;
  } catch {
    return false;
  }
}

function mapUser(u: any): User {
  return {
    id: u._id.toString(),
    name: u.name,
    email: u.email,
    passwordHash: u.passwordHash,
    createdAt: u.createdAt.toISOString(),
  };
}

export async function getUsers(): Promise<User[]> {
  await dbConnect();
  try {
    const users = await UserModel.find({});
    return users.map(mapUser);
  } catch {
    return [];
  }
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  await dbConnect();
  try {
    const u = await UserModel.findOne({ email: email.toLowerCase() });
    return u ? mapUser(u) : undefined;
  } catch {
    return undefined;
  }
}

export async function findUserById(id: string): Promise<User | undefined> {
  await dbConnect();
  try {
    const u = await UserModel.findById(id);
    return u ? mapUser(u) : undefined;
  } catch {
    return undefined;
  }
}

export async function createUser(name: string, email: string, passwordSecret: string): Promise<User> {
  await dbConnect();
  const passwordHash = hashPassword(passwordSecret);
  const u = await UserModel.create({
    name,
    email: email.toLowerCase(),
    passwordHash,
  });
  return mapUser(u);
}
