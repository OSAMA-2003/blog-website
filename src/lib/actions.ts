"use server";


import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { auth } from "../../auth";
import { revalidatePath } from "next/cache";


export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string,
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export async function deletePitch(id: string) {
  const session = await auth();
  if (!session?.id) {
    return parseServerActionResponse({ status: "ERROR", error: "Unauthorized" });
  }

  // We might want to check if the user is the owner of the pitch before deleting
  // For now, we'll assume the button is only shown to the owner.

  try {
    await writeClient.delete(id);
    revalidatePath(`/user/${session.id}`);
    revalidatePath("/");
    return parseServerActionResponse({ status: "SUCCESS" });
  } catch (error) {
    console.error("Failed to delete pitch:", error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Failed to delete startup.",
    });
  }
}