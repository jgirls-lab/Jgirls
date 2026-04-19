export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const code = searchParams.get("code");

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      client_id: context.env.GITHUB_CLIENT_ID,
      client_secret: context.env.GITHUB_CLIENT_SECRET,
      code
    })
  });

  const data = await tokenRes.json();

  // ★ Decap CMS に token を返すための postMessage HTML ★
  return new Response(`
    <html>
      <body>
        <script>
          (function() {
            const token = ${JSON.stringify(data)};
            window.opener.postMessage(token, "*");
            window.close();
          })();
        </script>
      </body>
    </html>
  `, {
    headers: { "Content-Type": "text/html" }
  });
}
