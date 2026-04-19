export async function onRequest(context) {
  const requestUrl = new URL(context.request.url);
  const code = requestUrl.searchParams.get("code");

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({
      client_id: context.env.GITHUB_CLIENT_ID,
      client_secret: context.env.GITHUB_CLIENT_SECRET,
      code
    })
  });

  const tokenJson = await tokenRes.json();
  const token = tokenJson.access_token;

  return new Response(JSON.stringify({ token }), {
    headers: { "Content-Type": "application/json" }
  });
}
