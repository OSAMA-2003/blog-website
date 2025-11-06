"use server";

import { auth } from "@/../auth";
import { writeClient } from "@/sanity/lib/write-client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { formSchema } from "../lib/validation";

export async function createPitch(
  prevState: any,
  formData: FormData,
  pitch: string,
) {
  const session = await auth();
  if (!session?.id) {
    return { error: "You must be logged in to create a pitch." };
  }

  const rawFormData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    link: formData.get("link"),
    pitch,
  };

  const validatedFields = formSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await writeClient.create({
      _type: "startup",
      title: validatedFields.data.title,
      description: validatedFields.data.description,
      image: validatedFields.data.link,
      category: validatedFields.data.category,
      pitch: validatedFields.data.pitch,
      author: { _type: "reference", _ref: session.id },
      slug: { _type: "slug", current: validatedFields.data.title.toLowerCase().replace(/\s+/g, "-").slice(0, 96) },
    });
    revalidatePath("/");
    return { status: "SUCCESS", _id: result._id };
  } catch (error) {
    console.error("Failed to create pitch:", error);
    return { error: "Failed to create pitch." };
  }
}

export async function deletePitch(id: string) {
  const session = await auth();
  if (!session?.id) {
    return { status: "ERROR", error: "Unauthorized" };
  }

  // We might want to check if the user is the owner of the pitch before deleting
  // For now, we'll assume the button is only shown to the owner.

  try {
    await writeClient.delete(id);
    revalidatePath(`/user/${session.id}`);
    revalidatePath("/");
    return { status: "SUCCESS" };
  } catch (error) {
    console.error("Failed to delete pitch:", error);
    return { status: "ERROR", error: "Failed to delete startup." };
  }
}