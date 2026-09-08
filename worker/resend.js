export async function sendNotification(env, { subject, text }) {
  const apiKey = env.RESEND_API_KEY_ELSEWHERE;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY_ELSEWHERE is not set");
  }

  const to = env.NOTIFY_TO_EMAIL || "hello@primitiveai.com.au";
  const from = env.NOTIFY_FROM_EMAIL || "onboarding@resend.dev";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `else{where} <${from}>`,
      to: [to],
      subject,
      text,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend API error ${res.status}: ${body}`);
  }
}

export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
