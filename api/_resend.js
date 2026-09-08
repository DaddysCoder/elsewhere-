const NOTIFY_TO = process.env.NOTIFY_TO_EMAIL || "hello@primitiveai.com.au";
const NOTIFY_FROM = process.env.NOTIFY_FROM_EMAIL || "onboarding@resend.dev";

export async function sendNotification({ subject, text }) {
  const apiKey = process.env.RESEND_API_KEY_ELSEWHERE;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY_ELSEWHERE is not set");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `else{where} <${NOTIFY_FROM}>`,
      to: [NOTIFY_TO],
      subject,
      text,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend API error ${res.status}: ${body}`);
  }
}

export function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}
