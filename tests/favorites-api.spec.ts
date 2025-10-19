import { test, expect, request } from "@playwright/test";
import { ApiClient } from "../utils/apiClient";

test("Необходимо создать любимое место с действительным токеном в течение 2 секунд", async () => {
  const title = "Тестовое место";
  const lat = 90;
  const lon = -180;

  const apiRequest = await request.newContext();
  const client = new ApiClient(apiRequest);

  const token = await client.getToken();

  const response = await client.createFavorite(token, {
    title: title,
    lat: lat,
    lon: lon,
  });

  console.log("Status:", response.status());
  console.log("Headers:", response.headers());
  console.log("Body:", await response.json());

  expect(response.status()).toBe(200);
  const json = await response.json();

  expect(json).toHaveProperty("id");
  expect(typeof json.id).toBe("number");
  expect(json.title).toBe(title);
  expect(json.lat).toBe(lat);
  expect(json.lon).toBe(lon);
  expect(json.color).toBe(null);
  expect(json).toHaveProperty("created_at");

  expect(json.created_at).toMatch(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/
  );
});
