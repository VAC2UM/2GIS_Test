import "dotenv/config";
import { chromium } from "@playwright/test";
import { ApiClient } from "../utils/apiClient";

async function main() {
  const title = "test";
  const lat = 50.2;
  const lon = 180;
  const color = "GREEN";

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const request = context.request;

  const client = new ApiClient(request);

  const token = await client.getToken();
  console.log("Токен:", token);

  console.log("Отправка запроса");
  const response = await client.createFavorite(token, {
    title: title,
    lat: lat,
    lon: lon,
    color: color,
  });

  console.log("\nОтвет сервера:");
  console.log("Статус:", response.status());
  console.log("Заголовки:", response.headers());
  try {
    const body = await response.json();
    console.log("Тело (JSON):", JSON.stringify(body, null, 2));
  } catch (e) {
    console.log("Тело (raw):", await response.text());
  }

  await browser.close();
}

main().catch(console.error);
