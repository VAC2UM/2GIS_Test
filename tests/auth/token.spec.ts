import { test, expect, request } from "@playwright/test";
import { ApiClient } from "../../utils/apiClient";

const TITLE = "Title";
const LAT = 90;
const LON = -180;
const MOCK_TOKEN = "1234567890";

test.describe("Сценарии с title", () => {
  test("BACK-10: Попытка создания без обязательного параметра title", async () => {
    const response = await test.step("Создание запроса", async () => {
      const apiRequest = await request.newContext();
      const client = new ApiClient(apiRequest);

      const response = await client.createFavorite(MOCK_TOKEN, {
        title: TITLE,
        lat: LAT,
        lon: LON,
      });

      return response;
    });

    test.step("Проверка результатов", async () => {
      expect(response.status()).toBe(401);

      const json = await response.json();
      expect(json).toHaveProperty("error");
      expect(json.error).toHaveProperty("id");
      expect(json.error).toHaveProperty("message");

      expect(json.error.message).toBe(
        "Передан несуществующий или «протухший» 'token'"
      );

      expect(json).not.toHaveProperty("id");
      expect(json).not.toHaveProperty("title");
      expect(json).not.toHaveProperty("lat");
      expect(json).not.toHaveProperty("lon");
      expect(json).not.toHaveProperty("created_at");
    });
  });
});
