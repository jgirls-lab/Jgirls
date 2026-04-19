export async function onRequest(context) {
  return new Response(JSON.stringify(context.env), {
    headers: { "Content-Type": "application/json" }
  });
}
