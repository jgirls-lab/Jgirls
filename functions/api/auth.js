export async function onRequest(context) {
  const clientId = context.env.GITHUB_CLIENT_ID;

  // GitHub に返ってくる URL を自動で /api/callback に変換
  const redirectUri = `${context.request.url.replace('/api/auth', '/api/callback')}`;

  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", "repo,user");

  return Response.redirect(url.toString(), 302);
}
