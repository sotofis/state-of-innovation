import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const isSpeaker = body.type === "speaker";
    const subject = isSpeaker
      ? `🎤 Speaker Inquiry from ${body.name}`
      : `🎙️ Podcast Guest Application from ${body.name}`;

    const rows = Object.entries(body)
      .filter(([k]) => k !== "type")
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 12px;font-weight:600;color:#64748b;white-space:nowrap;">${k}</td><td style="padding:6px 12px;">${v}</td></tr>`
      )
      .join("");

    const html = `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;">
        <div style="background:#2563EB;padding:24px 32px;border-radius:12px 12px 0 0;">
          <h1 style="color:white;margin:0;font-size:20px;">${subject}</h1>
        </div>
        <div style="background:#f8fafc;padding:24px 32px;border-radius:0 0 12px 12px;">
          <table style="width:100%;border-collapse:collapse;">${rows}</table>
        </div>
        <p style="font-size:12px;color:#94a3b8;margin-top:16px;text-align:center;">
          Sent from state-of-innovation.com
        </p>
      </div>`;

    await resend.emails.send({
      from: "website@state-of-innovation.com",
      to: "office@myles-innovation.com",
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
