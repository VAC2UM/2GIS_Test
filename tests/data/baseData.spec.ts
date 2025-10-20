import { test, expect, request } from "@playwright/test";
import { ApiClient } from "../../utils/apiClient";

const TITLE = "Тестовое место";
const LAT = 90;
const LON = -180;

test.describe("Сценарии создания избранного места", () => {
  test("BACK-1: Успешное создание с минимальными валидными данными без color", async () => {
    const response = await test.step("Создание запроса", async () => {
      const apiRequest = await request.newContext();
      const client = new ApiClient(apiRequest);
      const token = await client.getToken();

      const response = await client.createFavorite(token, {
        title: TITLE,
        lat: LAT,
        lon: LON,
      });

      return response;
    });

    test.step("Проверка результатов", async () => {
      expect(response.status()).toBe(200);
      const json = await response.json();
      expect(json.title).toBe(TITLE);
      expect(json.lat).toBe(LAT);
      expect(json.lon).toBe(LON);
      expect(json.color).toBeNull();
      expect(json).toHaveProperty("id");
      expect(typeof json.id).toBe("number");
      expect(json.created_at).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/
      );
    });
  });
});
