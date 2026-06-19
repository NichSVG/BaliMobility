import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { client } from "@/lib/sanity";

const { SANITY_API_TOKEN } = process.env;

export async function GET(request: Request) {
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    client.withConfig({ token: SANITY_API_TOKEN }),
    request.url
  );

  if (!isValid) {
    return new Response("Invalid secret", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(redirectTo);
}
