import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Revalidate homepage
  revalidatePath("/", "page");

  // Revalidate /service page
  revalidatePath("/service", "page");

  // Revalidate /aboutus page
  revalidatePath("/aboutus", "page");

  // Revalidate /brand page
  revalidatePath("/brand", "page");

  return new Response("OK", { status: 200 });
}
