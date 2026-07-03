import { NextRequest, NextResponse } from "next/server";

function renderCallbackHtml(status: "success" | "error", payload: unknown) {
  const message = JSON.stringify({ ...(payload as object) });
  return `<!doctype html>
<html><body>
<script>
(function() {
  function receiveMessage(message) {
    window.opener.postMessage(
      'authorization:github:${status}:${message}',
      '*'
    );
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
<p>認証処理中です。このウィンドウは自動的に閉じます。</p>
</body></html>`;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = request.cookies.get("decap_oauth_state")?.value;

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "GitHub OAuth env vars are not set" },
      { status: 500 }
    );
  }
  if (!code || !state || state !== storedState) {
    return new NextResponse(
      renderCallbackHtml("error", { message: "invalid state or missing code" }),
      { headers: { "Content-Type": "text/html" } }
    );
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });
  const tokenData = await tokenResponse.json();

  if (!tokenData.access_token) {
    return new NextResponse(
      renderCallbackHtml("error", { message: tokenData.error ?? "token exchange failed" }),
      { headers: { "Content-Type": "text/html" } }
    );
  }

  return new NextResponse(
    renderCallbackHtml("success", { token: tokenData.access_token, provider: "github" }),
    { headers: { "Content-Type": "text/html" } }
  );
}
