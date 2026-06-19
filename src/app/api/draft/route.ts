import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { createClient } from "next-sanity";

const token = process.env.SANITY_API_TOKEN;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export async function GET(request: Request) {
  if (!token) {
    console.error("Missing SANITY_API_TOKEN environment variable");
    return new Response("Server misconfiguration", { status: 500 });
  }

  if (!projectId) {
    console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable");
    return new Response("Server misconfiguration", { status: 500 });
  }

  try {
    const client = createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: false,
      token,
    });

    const { isValid, redirectTo = "/" } = await validatePreviewUrl(
      client,
      request.url
    );

    if (!isValid) {
      console.error("Invalid preview secret. URL:", request.url);
      return new Response("Invalid secret", { status: 401 });
    }

    const draft = await draftMode();
    draft.enable();

    redirect(redirectTo);
  } catch (error) {
    console.error("Draft mode error:", error);
    return new Response("Internal error", { status: 500 });
  }
}
