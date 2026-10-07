import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("contributors")
      .select("name, twitter_handle, created_at")
      .eq("display_consent", true)
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Supabase contributor lookup failed", error);
      return NextResponse.json({ error: "Unable to load contributors." }, { status: 500 });
    }

    return NextResponse.json({ contributors: data ?? [] });
  } catch (error) {
    console.error("Contributor service is not configured", error);
    return NextResponse.json({ error: "Contributor list is not configured." }, { status: 503 });
  }
}
