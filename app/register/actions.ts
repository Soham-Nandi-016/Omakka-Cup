"use server";

import { pool } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const RegistrationSchema = z.object({
  name:           z.string().min(2, "Full name must be at least 2 characters"),
  address:        z.string().min(10, "Please enter a complete address"),
  phone:          z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email:          z.string().email("Enter a valid email address"),
  gender:         z.enum(["MALE", "FEMALE"], { errorMap: () => ({ message: "Please select gender" }) }),
  dob:            z.string().min(1, "Date of birth is required"),
  state:          z.string().min(1, "Please select your state"),
  belt:           z.enum(["WHITE", "YELLOW", "ORANGE", "GREEN", "BLUE", "PURPLE", "BROWN", "BLACK"], {
                    errorMap: () => ({ message: "Please select belt/rank" }),
                  }),
  style:          z.string().min(1, "Please select your karate style"),
  instructorName: z.string().min(2, "Instructor name is required"),
  weight:         z.string().min(1, "Weight is required"),
  declarationAccepted: z.literal("true", {
    errorMap: () => ({ message: "You must accept the declaration" }),
  }),
});

export interface SubmitResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function submitRegistration(formData: FormData): Promise<SubmitResult> {
  const raw = Object.fromEntries(formData.entries());

  const parsed = RegistrationSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = parsed.data;
  const dobDate = new Date(data.dob);
  const today   = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();
  const m = today.getMonth() - dobDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) age--;

  const weightNum = parseFloat(data.weight);
  if (isNaN(weightNum) || weightNum < 10 || weightNum > 200) {
    return { success: false, message: "Please enter a valid weight between 10 and 200 kg." };
  }

  try {
    await pool.query(
      `INSERT INTO "Student"
         (name, address, phone, email, gender, dob, age, state, belt, style,
          "instructorName", weight, kata, kumite, "declarationAccepted", "createdAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW())`,
      [
        data.name.trim(),
        data.address.trim(),
        data.phone,
        data.email.toLowerCase().trim(),
        data.gender,
        dobDate,
        age,
        data.state,
        data.belt,
        data.style,
        data.instructorName.trim(),
        weightNum,
        true,
        true,
        true,
      ]
    );

    revalidatePath("/admin");

    return {
      success: true,
      message: `Registration successful! Welcome, ${data.name.trim()}. You are now registered for OMAKKA Cup 2026.`,
    };
  } catch (err) {
    console.error("[Registration Error]", err);
    return {
      success: false,
      message: "A database error occurred. Please try again or contact the organizers.",
    };
  }
}
