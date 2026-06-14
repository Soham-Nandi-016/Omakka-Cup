"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export interface AdminStudent {
  id: number;
  name: string;
  dob: string;
  age: number;
  weight: number;
  belt: string;
  gender: string;
  instructorName: string;
  state: string;
  phone: string;
  email: string;
  style: string;
  kata: boolean;
  kumite: boolean;
  createdAt: string;
}

const _adminPassphrase = process.env.ADMIN_PASSWORD ?? "OssOkinawaCup2026!";
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(_adminPassphrase, 10);

export async function verifyAdminPassword(password: string): Promise<boolean> {
  return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

export async function getRegistrations() {
  const students = await prisma.student.findMany({
    orderBy: { createdAt: "desc" },
  });

  return students.map((s: any) => ({
    id: s.id,
    name: s.name,
    dob: s.dob ? s.dob.toISOString().split("T")[0] : "",
    age: s.age,
    weight: s.weight,
    belt: s.belt,
    gender: s.gender,
    instructorName: s.instructorName,
    state: s.state,
    phone: s.phone ?? "",
    email: s.email ?? "",
    style: s.style ?? "",
    kata: s.kata ?? false,
    kumite: s.kumite ?? false,
    createdAt: s.createdAt ? s.createdAt.toISOString() : "",
  }));
}
