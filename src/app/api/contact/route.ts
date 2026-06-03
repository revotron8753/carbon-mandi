import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact-schema";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "carbonmandi@gmail.com";
// Resend's shared sender works with no domain setup; swap for a verified
// domain address (e.g. "Carbon Mandi <hello@carbonmandi.com>") once available.
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Carbon Mandi Website <onboarding@resend.dev>";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, organisation, designation, email, message, source } = parsed.data;
  const subject = `New enquiry${source ? ` — ${source}` : ""} from ${name}`;

  const lines = [
    `Name: ${name}`,
    `Organisation: ${organisation}`,
    designation ? `Designation: ${designation}` : null,
    `Email: ${email}`,
    source ? `Source: ${source}` : null,
    "",
    "Message:",
    message,
  ].filter(Boolean);
  const text = lines.join("\n");

  const apiKey = process.env.RESEND_API_KEY;

  // No key configured yet — don't lose the submission; log it so it's visible
  // in the server console while email delivery is being set up.
  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY not set — submission not emailed:\n" + text
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      text,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "Could not send message" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Could not send message" }, { status: 500 });
  }
}
