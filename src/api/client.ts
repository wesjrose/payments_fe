const baseUrl = import.meta.env.VITE_BE_API_URL;

if (!baseUrl) {
  throw new Error(
    "Missing VITE_BE_API_URL. Set it in payment_fe/.env (e.g. http://127.0.0.1:8000).",
  );
}

const API_URL = baseUrl.replace(/\/+$/, "");

export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, message: string, body: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init.body !== undefined && { "Content-Type": "application/json" }),
      ...init.headers,
    },
  });

  const text = await response.text();
  const body: unknown = text ? JSON.parse(text) : null;

  if (!response.ok) {
    // FastAPI puts error messages in `detail`.
    const detail =
      body && typeof body === "object" && "detail" in body
        ? String(body.detail)
        : response.statusText;
    throw new ApiError(response.status, detail, body);
  }

  return body as T;
}

export const api = {
  get: <T>(path: string, init?: RequestInit) =>
    request<T>(path, { ...init, method: "GET" }),
  post: <T>(path: string, data?: unknown, init?: RequestInit) =>
    request<T>(path, {
      ...init,
      method: "POST",
      body: data === undefined ? undefined : JSON.stringify(data),
    }),
};
