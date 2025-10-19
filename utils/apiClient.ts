import { APIRequestContext } from "@playwright/test";

export class ApiClient {
  private readonly request: APIRequestContext;
  private readonly baseUrl: string;

  constructor(request: APIRequestContext, baseUrl?: string) {
    this.request = request;
    const url = baseUrl || process.env.BASE_URL;
    if (!url) {
      throw new Error(
        "BASE_URL must be defined in environment variables or passed explicitly"
      );
    }
    this.baseUrl = url;
  }

  async getToken(): Promise<string> {
    const response = await this.request.post(`${this.baseUrl}/v1/auth/tokens`);
    const setCookieHeader = response.headers()["set-cookie"];
    if (!setCookieHeader) {
      throw new Error("Token not received in Set-Cookie header");
    }
    const tokenMatch = setCookieHeader.match(/token=([a-f0-9]+)/);
    if (!tokenMatch) {
      throw new Error("Token not found in cookie");
    }
    return tokenMatch[1];
  }

  async createFavorite(
    token: string,
    data: { title: string; lat: number; lon: number; color?: string }
  ) {
    const form = new URLSearchParams();
    form.append("title", data.title);
    form.append("lat", data.lat.toString());
    form.append("lon", data.lon.toString());
    if (data.color) {
      form.append("color", data.color);
    }

    return await this.request.post(`${this.baseUrl}/v1/favorites`, {
      data: form.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: `token=${token}`,
      },
    });
  }
}
