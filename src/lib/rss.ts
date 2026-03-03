import { XMLParser } from "fast-xml-parser";
import type { Episode, Guest } from "@/types/episode";

const RSS_URL = "https://anchor.fm/s/f1c4583c/podcast/rss";
const SHOW_SLUG = "state-of-innovation";

/** Extract LinkedIn links from episode HTML description */
function extractGuests(htmlDescription: string): Guest[] {
  const guests: Guest[] = [];
  const linkRegex = /<a\s+[^>]*href="(https?:\/\/(?:www\.)?linkedin\.com\/in\/[^"]+)"[^>]*>([^<]+)<\/a>/gi;
  let match;
  while ((match = linkRegex.exec(htmlDescription)) !== null) {
    const url = match[1];
    const name = match[2].replace(/\u00a0/g, " ").trim();
    // Skip Martin's own profile if present
    if (!url.includes("martinpattera")) {
      guests.push({ name, linkedinUrl: url });
    }
  }
  return guests;
}

/** Derive episode slug from Spotify/Anchor episode URL */
function extractSlug(linkUrl: string): string {
  // Link: https://podcasters.spotify.com/pod/show/state-of-innovation/episodes/{slug}
  const match = linkUrl.match(/\/episodes\/([^/?#]+)/);
  return match ? match[1] : "";
}

/** Build Anchor embed iframe URL from episode slug */
function buildEmbedUrl(slug: string): string {
  return `https://anchor.fm/${SHOW_SLUG}/embed/episodes/${slug}`;
}

export async function fetchEpisodes(): Promise<Episode[]> {
  const res = await fetch(RSS_URL, {
    next: { revalidate: 3600 }, // cache 1 hour
  });
  if (!res.ok) throw new Error(`Failed to fetch RSS: ${res.status}`);

  const xml = await res.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    cdataPropName: "__cdata",
    allowBooleanAttributes: true,
  });

  const parsed = parser.parse(xml);
  const items = parsed?.rss?.channel?.item;
  if (!items) return [];

  const rawItems = Array.isArray(items) ? items : [items];

  return rawItems.map((item: Record<string, unknown>): Episode => {
    const title =
      typeof item.title === "object" && item.title !== null
        ? String((item.title as { __cdata?: unknown }).__cdata ?? "")
        : String(item.title ?? "");

    const description =
      typeof item.description === "object" && item.description !== null
        ? String((item.description as { __cdata?: unknown }).__cdata ?? "")
        : String(item.description ?? "");

    const linkUrl =
      typeof item.link === "string" ? item.link : String(item.link ?? "");

    const slug = extractSlug(linkUrl);

    const image =
      (item["itunes:image"] as { "@_href"?: string } | undefined)?.["@_href"] ??
      "";

    const enclosure = item.enclosure as
      | { "@_url"?: string }
      | undefined;
    const audioUrl = enclosure?.["@_url"] ?? "";

    const episodeNum = Number(item["itunes:episode"] ?? 0);
    const duration = String(item["itunes:duration"] ?? "");
    const pubDate = String(item.pubDate ?? "");
    const guid =
      typeof item.guid === "object" && item.guid !== null
        ? String(
            (item.guid as { __cdata?: unknown; "#text"?: unknown })
              .__cdata ??
              (item.guid as { "#text"?: unknown })["#text"] ??
              ""
          )
        : String(item.guid ?? "");

    return {
      title,
      slug,
      description,
      image,
      pubDate,
      duration,
      episodeNumber: episodeNum,
      guid,
      embedUrl: buildEmbedUrl(slug),
      spotifyUrl: linkUrl,
      audioUrl,
      guests: extractGuests(description),
    };
  });
}

export async function fetchEpisodeBySlug(
  slug: string
): Promise<Episode | null> {
  const episodes = await fetchEpisodes();
  return episodes.find((e) => e.slug === slug) ?? null;
}
