import { NextResponse } from "next/server";
import { fetchEpisodes } from "@/lib/rss";

export const revalidate = 3600;

export async function GET() {
  try {
    const episodes = await fetchEpisodes();
    return NextResponse.json(episodes);
  } catch (err) {
    console.error("RSS fetch error:", err);
    return NextResponse.json([], { status: 500 });
  }
}
