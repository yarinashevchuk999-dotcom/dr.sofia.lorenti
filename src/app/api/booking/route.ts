type BookingPayload = {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  source?: string;
  lang?: string;
};

function readPayload(body: unknown): BookingPayload | null {
  if (typeof body !== "object" || body === null) return null;
  const { name, phone, email, message, source, lang } = body as Record<
    string,
    unknown
  >;
  if (typeof name !== "string" || !name.trim()) return null;
  if (typeof phone !== "string" || !phone.trim()) return null;
  return {
    name: name.trim(),
    phone: phone.trim(),
    email: typeof email === "string" ? email.trim() : "",
    message: typeof message === "string" ? message.trim() : "",
    source: typeof source === "string" ? source.trim() : "",
    lang: typeof lang === "string" ? lang.trim() : "",
  };
}

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("GOOGLE_SHEETS_WEBHOOK_URL is not set");
    return Response.json(
      { ok: false, error: "not_configured" },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const payload = readPayload(body);
  if (!payload) {
    return Response.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
    });
    if (!upstream.ok) {
      throw new Error(`Upstream responded ${upstream.status}`);
    }
  } catch (err) {
    console.error("Failed to forward booking to Google Sheets", err);
    return Response.json({ ok: false, error: "upstream_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
