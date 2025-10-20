import { test, expect, request } from "@playwright/test";
import { ApiClient } from "../../utils/apiClient";

const TITLE = "Test";
const LAT = 90;
const LON = -180;
const COLOR_BLUE = "BLUE";
const COLOR_GREEN = "GREEN";
const COLOR_YELLOW = "YELLOW";
const COLOR_RED = "RED";

test.describe("Сценарии с color", () => {
  test("BACK-5: Успешное создание с color: BLUE", async () => {
    const response = await test.step("Создание запроса", async () => {
      const apiRequest = await request.newContext();
      const client = new ApiClient(apiRequest);
      const token = await client.getToken();

      const response = await client.createFavorite(token, {
        title: TITLE,
        lat: LAT,
        lon: LON,
        color: COLOR_BLUE,
      });

      return response;
    });

    test.step("Проверка результатов", async () => {
      expect(response.status()).toBe(200);
      const json = await response.json();
      expect(json.title).toBe(TITLE);
      expect(json.lat).toBe(LAT);
      expect(json.lon).toBe(LON);
      expect(json.color).toBe(COLOR_BLUE);
      expect(json).toHaveProperty("id");
      expect(typeof json.id).toBe("number");
      expect(json.created_at).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/
      );
    });
  });

  test("BACK-5: Успешное создание с color: GREEN", async () => {
    const response = await test.step("Создание запроса", async () => {
      const apiRequest = await request.newContext();
      const client = new ApiClient(apiRequest);
      const token = await client.getToken();

      const response = await client.createFavorite(token, {
        title: TITLE,
        lat: LAT,
        lon: LON,
        color: COLOR_GREEN,
      });

      return response;
    });

    test.step("Проверка результатов", async () => {
      expect(response.status()).toBe(200);
      const json = await response.json();
      expect(json.title).toBe(TITLE);
      expect(json.lat).toBe(LAT);
      expect(json.lon).toBe(LON);
      expect(json.color).toBe(COLOR_GREEN);
      expect(json).toHaveProperty("id");
      expect(typeof json.id).toBe("number");
      expect(json.created_at).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/
      );
    });
  });

  test("BACK-5: Успешное создание с color: YELLOW", async () => {
    const response = await test.step("Создание запроса", async () => {
      const apiRequest = await request.newContext();
      const client = new ApiClient(apiRequest);
      const token = await client.getToken();

      const response = await client.createFavorite(token, {
        title: TITLE,
        lat: LAT,
        lon: LON,
        color: COLOR_YELLOW,
      });

      return response;
    });

    test.step("Проверка результатов", async () => {
      expect(response.status()).toBe(200);
      const json = await response.json();
      expect(json.title).toBe(TITLE);
      expect(json.lat).toBe(LAT);
      expect(json.lon).toBe(LON);
      expect(json.color).toBe(COLOR_YELLOW);
      expect(json).toHaveProperty("id");
      expect(typeof json.id).toBe("number");
      expect(json.created_at).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/
      );
    });
  });

  test("BACK-5: Успешное создание с color: RED", async () => {
    const response = await test.step("Создание запроса", async () => {
      const apiRequest = await request.newContext();
      const client = new ApiClient(apiRequest);
      const token = await client.getToken();

      const response = await client.createFavorite(token, {
        title: TITLE,
        lat: LAT,
        lon: LON,
        color: COLOR_RED,
      });

      return response;
    });

    test.step("Проверка результатов", async () => {
      expect(response.status()).toBe(200);
      const json = await response.json();
      expect(json.title).toBe(TITLE);
      expect(json.lat).toBe(LAT);
      expect(json.lon).toBe(LON);
      expect(json.color).toBe(COLOR_RED);
      expect(json).toHaveProperty("id");
      expect(typeof json.id).toBe("number");
      expect(json.created_at).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/
      );
    });
  });
});
