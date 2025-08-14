// 服务器端代理：将前端的 /api/proxy/feedback 请求转发到实际后端（可使用 HTTP）
export async function POST(req: Request) {
    // 优先使用专用的服务器端环境变量（不暴露给客户端）
    const backendBase = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://115.190.37.151';
    const targetUrl = `${backendBase.replace(/\/$/, '')}/api/feedback`;

    const contentType = req.headers.get('content-type') || 'application/json';
    const bodyText = await req.text();

    const res = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'content-type': contentType },
        body: bodyText,
    });

    const respText = await res.text();
    const respHeaders: Record<string, string> = {};
    const ct = res.headers.get('content-type');
    if (ct) respHeaders['content-type'] = ct;

    return new Response(respText, { status: res.status, headers: respHeaders });
}




