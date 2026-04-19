export async function onRequest(context) {
  const requestUrl = new URL(context.request.url);
  const code = requestUrl.searchParams.get("code");

  // GitHub に送るパラメータ
  const params = new URLSearchParams();
  params.append("client_id", context.env.GITHUB_CLIENT_ID);
  params.append("client_secret", context.env.GITHUB_CLIENT_SECRET);
  params.append("code", code);

  // GitHub OAuth token エンドポイントへ POST
  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Accept": "application/json" },
    body: params
  });

  // GitHub が返してきた JSON をそのまま返す
  const tokenJson = await tokenRes.json();

  return new Response(JSON.stringify(tokenJson), {
    headers: { "Content-Type": "application/json" }
  });
}
