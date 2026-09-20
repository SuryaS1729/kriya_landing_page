import { headers } from "next/headers";
import { redirect } from "next/navigation";

const IOS_URL = "https://apps.apple.com/us/app/kriya-spiritual-productivity/id6752873883";
const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.surya7314.kriya";

export async function GET() {
  const userAgent = (await headers()).get("user-agent") ?? "";

  if (/iPad|iPhone|iPod/i.test(userAgent)) {
    redirect(IOS_URL);
  }

  if (/Android/i.test(userAgent)) {
    redirect(ANDROID_URL);
  }

  redirect("/");
}
