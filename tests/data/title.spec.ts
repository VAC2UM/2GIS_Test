import { test, expect, request } from "@playwright/test";
import { ApiClient } from "../../utils/apiClient";

const LONG_TITLE = "A".repeat(999);
const KIRILL_TITLE = "Москва, ул. Тверская! (офис №12)";
const VERY_LONG_TITLE = "A".repeat(1001);
const EMPTY_TITLE = "";
const LAT = 90;
const LON = -180;

test.describe("Сценарии с title", () => {
  test("BACK-2: Успешное создание с максимальной длиной title (999 символов)", async () => {
    const response = await test.step("Создание запроса", async () => {
      const apiRequest = await request.newContext();
      const client = new ApiClient(apiRequest);
      const token = await client.getToken();

      const response = await client.createFavorite(token, {
        title: LONG_TITLE,
        lat: LAT,
        lon: LON,
      });

      return response;
    });

    test.step("Проверка результатов", async () => {
      expect(response.status()).toBe(200);
      const json = await response.json();
      expect(json.title).toBe(LONG_TITLE);
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

  test("BACK-3: Успешное создание с кириллицей и спецсимволами в title", async () => {
    const response = await test.step("Создание запроса", async () => {
      const apiRequest = await request.newContext();
      const client = new ApiClient(apiRequest);
      const token = await client.getToken();

      const response = await client.createFavorite(token, {
        title: KIRILL_TITLE,
        lat: LAT,
        lon: LON,
      });

      return response;
    });

    test.step("Проверка результатов", async () => {
      expect(response.status()).toBe(200);
      const json = await response.json();
      expect(json.title).toBe(KIRILL_TITLE);
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

  test("BACK-6: Попытка создания с пустым title", async () => {
    const response = await test.step("Создание запроса", async () => {
      const apiRequest = await request.newContext();
      const client = new ApiClient(apiRequest);
      const token = await client.getToken();

      const response = await client.createFavorite(token, {
        title: EMPTY_TITLE,
        lat: LAT,
        lon: LON,
      });

      return response;
    });

    test.step("Проверка результатов", async () => {
      expect(response.status()).toBe(400);

      const json = await response.json();
      expect(json).toHaveProperty("error");
      expect(json.error).toHaveProperty("id");
      expect(json.error).toHaveProperty("message");

      expect(json.error.message).toBe("Параметр 'title' является обзательным");

      expect(json).not.toHaveProperty("id");
      expect(json).not.toHaveProperty("title");
      expect(json).not.toHaveProperty("lat");
      expect(json).not.toHaveProperty("lon");
      expect(json).not.toHaveProperty("created_at");
    });
  });

  test.skip("BACK-7: Попытка создания с title длиной 1000 символов", async () => {
    const response = await test.step("Создание запроса", async () => {
      const apiRequest = await request.newContext();
      const client = new ApiClient(apiRequest);
      const token = await client.getToken();

      const response = await client.createFavorite(token, {
        title: VERY_LONG_TITLE,
        lat: LAT,
        lon: LON,
      });

      return response;
    });

    test.step("Проверка результатов", async () => {
      expect(response.status()).toBe(400);

      const json = await response.json();
      expect(json).toHaveProperty("error");
      expect(json.error).toHaveProperty("id");
      expect(json.error).toHaveProperty("message");

      expect(json.error.message).toBe(
        "Параметр 'title' должен содержать не более 999 символов"
      );

      expect(json).not.toHaveProperty("id");
      expect(json).not.toHaveProperty("title");
      expect(json).not.toHaveProperty("lat");
      expect(json).not.toHaveProperty("lon");
      expect(json).not.toHaveProperty("created_at");
    });
  });

  test("BACK-8: Попытка создания без обязательного параметра title", async () => {
    const response = await test.step("Создание запроса", async () => {
      const apiRequest = await request.newContext();
      const client = new ApiClient(apiRequest);
      const token = await client.getToken();

      const response = await client.createFavorite(token, {
        lat: LAT,
        lon: LON,
      });

      return response;
    });

    test.step("Проверка результатов", async () => {
      expect(response.status()).toBe(400);

      const json = await response.json();
      expect(json).toHaveProperty("error");
      expect(json.error).toHaveProperty("id");
      expect(json.error).toHaveProperty("message");

      expect(json.error.message).toBe("Параметр 'title' является обзательным");

      expect(json).not.toHaveProperty("id");
      expect(json).not.toHaveProperty("title");
      expect(json).not.toHaveProperty("lat");
      expect(json).not.toHaveProperty("lon");
      expect(json).not.toHaveProperty("created_at");
    });
  });
});
