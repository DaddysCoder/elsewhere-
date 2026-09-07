export async function postNotification(url: string, body: unknown): Promise<void> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data: unknown = await res.json().catch(() => null);
  const ok = Boolean(data && typeof data === "object" && "ok" in data && data.ok === true);

  if (!res.ok || !ok) {
    throw new Error("request failed");
  }
}
