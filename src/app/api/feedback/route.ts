import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { name, email, rating, subject, message } = await req.json();

    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required." }, { status: 400 });
    }

    // Fallback: if no Resend key, just log
    if (!process.env.RESEND_API_KEY) {
      console.log("Feedback received (no Resend key):", { name, email, rating, subject, message });
      return NextResponse.json({ success: true, fallback: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const stars = "⭐".repeat(rating || 5);
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #f0f0ff; padding: 32px; border-radius: 12px;">
        <h2 style="color: #a78bfa; margin-bottom: 4px;">📬 New Feedback — VoxMind AI</h2>
        <p style="color: #8892b0; margin-bottom: 24px; font-size: 14px;">A user submitted feedback</p>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #8892b0; font-size: 13px; width: 120px;">Name</td>
            <td style="padding: 10px 0; color: #f0f0ff; font-weight: bold;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #8892b0; font-size: 13px;">Email</td>
            <td style="padding: 10px 0; color: #f0f0ff;">${email || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #8892b0; font-size: 13px;">Rating</td>
            <td style="padding: 10px 0;">${stars} (${rating || 5}/5)</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #8892b0; font-size: 13px;">Subject</td>
            <td style="padding: 10px 0; color: #f0f0ff;">${subject || "General"}</td>
          </tr>
        </table>

        <div style="margin-top: 20px; padding: 20px; background: #16161f; border-radius: 10px; border-left: 3px solid #7c3aed;">
          <p style="color: #8892b0; font-size: 12px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
          <p style="color: #f0f0ff; line-height: 1.6;">${message}</p>
        </div>

        <p style="margin-top: 24px; font-size: 11px; color: #4a5568;">Sent from VoxMind AI feedback form · ${new Date().toISOString()}</p>
      </div>
    `;

    await resend.emails.send({
      from: "VoxMind AI <onboarding@resend.dev>",
      to: ["habubolahello123@gmail.com"],
      replyTo: email || undefined,
      subject: `[VoxMind Feedback] ${subject || "General"} — ${stars}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Feedback API error:", err);
    return NextResponse.json({ error: "Failed to send feedback" }, { status: 500 });
  }
}
