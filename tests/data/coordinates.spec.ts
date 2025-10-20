import { test, expect, request } from "@playwright/test";
import { ApiClient } from "../../utils/apiClient";

const TITLE = "Test";

test.describe("Сценарии с lat и lon", () => {
  test("BACK-4: Успешное создание с граничными координатами lat 90 и lon 180", async () => {
    const response = await test.step("Создание запроса", async () => {
      const apiRequest = await request.newContext();
      const client = new ApiClient(apiRequest);
      const token = await client.getToken();

      const response = await client.createFavorite(token, {
        title: TITLE,
        lat: 90,
        lon: 180,
      });

      return response;
    });

    test.step("Проверка результатов", async () => {
      expect(response.status()).toBe(200);
      const json = await response.json();
      expect(json.title).toBe(TITLE);
      expect(json.lat).toBe(90);
      expect(json.lon).toBe(180);
      expect(json.color).toBeNull();
      expect(json).toHaveProperty("id");
      expect(typeof json.id).toBe("number");
      expect(json.created_at).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/
      );
    });
  });

  test("BACK-4: Успешное создание с граничными координатами lat -90 и lon -180", async () => {
    const response = await test.step("Создание запроса", async () => {
      const apiRequest = await request.newContext();
      const client = new ApiClient(apiRequest);
      const token = await client.getToken();

      const response = await client.createFavorite(token, {
        title: TITLE,
        lat: -90,
        lon: -180,
      });

      return response;
    });

    test.step("Проверка результатов", async () => {
      expect(response.status()).toBe(200);
      const json = await response.json();
      expect(json.title).toBe(TITLE);
      expect(json.lat).toBe(-90);
      expect(json.lon).toBe(-180);
      expect(json.color).toBeNull();
      expect(json).toHaveProperty("id");
      expect(typeof json.id).toBe("number");
      expect(json.created_at).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/
      );
    });
  });

  test("BACK-8: Попытка создания без обязательного параметра lat", async () => {
    const response = await test.step("Создание запроса", async () => {
      const apiRequest = await request.newContext();
      const client = new ApiClient(apiRequest);
      const token = await client.getToken();

      const response = await client.createFavorite(token, {
        title: TITLE,
        lon: 0,
      });

      return response;
    });

    test.step("Проверка результатов", async () => {
      expect(response.status()).toBe(400);

      const json = await response.json();
      expect(json).toHaveProperty("error");
      expect(json.error).toHaveProperty("id");
      expect(json.error).toHaveProperty("message");

      expect(json.error.message).toBe("Параметр 'lat' является обязательным");

      expect(json).not.toHaveProperty("id");
      expect(json).not.toHaveProperty("title");
      expect(json).not.toHaveProperty("lat");
      expect(json).not.toHaveProperty("lon");
      expect(json).not.toHaveProperty("created_at");
    });
  });

  test("BACK-8: Попытка создания без обязательного параметра lon", async () => {
    const response = await test.step("Создание запроса", async () => {
      const apiRequest = await request.newContext();
      const client = new ApiClient(apiRequest);
      const token = await client.getToken();

      const response = await client.createFavorite(token, {
        title: TITLE,
        lat: 0,
      });

      return response;
    });

    test.step("Проверка результатов", async () => {
      expect(response.status()).toBe(400);

      const json = await response.json();
      expect(json).toHaveProperty("error");
      expect(json.error).toHaveProperty("id");
      expect(json.error).toHaveProperty("message");

      expect(json.error.message).toBe("Параметр 'lon' является обязательным");

      expect(json).not.toHaveProperty("id");
      expect(json).not.toHaveProperty("title");
      expect(json).not.toHaveProperty("lat");
      expect(json).not.toHaveProperty("lon");
      expect(json).not.toHaveProperty("created_at");
    });
  });

  test("BACK-9: Попытка создания со значением координат за пределами граничных значений lat 90.1", async () => {
    const response = await test.step("Создание запроса", async () => {
      const apiRequest = await request.newContext();
      const client = new ApiClient(apiRequest);
      const token = await client.getToken();

      const response = await client.createFavorite(token, {
        title: TITLE,
        lat: 90.1,
        lon: 180,
      });

      return response;
    });

    test.step("Проверка результатов", async () => {
      expect(response.status()).toBe(400);

      const json = await response.json();
      expect(json).toHaveProperty("error");
      expect(json.error).toHaveProperty("id");
      expect(json.error).toHaveProperty("message");

      expect(json.error.message).toBe("Параметр 'lat' должен быть не более 90");

      expect(json).not.toHaveProperty("id");
      expect(json).not.toHaveProperty("title");
      expect(json).not.toHaveProperty("lat");
      expect(json).not.toHaveProperty("lon");
      expect(json).not.toHaveProperty("created_at");
    });
  });

  test("BACK-9: Попытка создания со значением координат за пределами граничных значений lat -90.1", async () => {
    const response = await test.step("Создание запроса", async () => {
      const apiRequest = await request.newContext();
      const client = new ApiClient(apiRequest);
      const token = await client.getToken();

      const response = await client.createFavorite(token, {
        title: TITLE,
        lat: -90.1,
        lon: 180,
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
        "Параметр 'lat' должен быть не менее -90"
      );

      expect(json).not.toHaveProperty("id");
      expect(json).not.toHaveProperty("title");
      expect(json).not.toHaveProperty("lat");
      expect(json).not.toHaveProperty("lon");
      expect(json).not.toHaveProperty("created_at");
    });
  });

  test("BACK-9: Попытка создания со значением координат за пределами граничных значений lon 180.1", async () => {
    const response = await test.step("Создание запроса", async () => {
      const apiRequest = await request.newContext();
      const client = new ApiClient(apiRequest);
      const token = await client.getToken();

      const response = await client.createFavorite(token, {
        title: TITLE,
        lat: 90,
        lon: 180.1,
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
        "Параметр 'lon' должен быть не более 180"
      );

      expect(json).not.toHaveProperty("id");
      expect(json).not.toHaveProperty("title");
      expect(json).not.toHaveProperty("lat");
      expect(json).not.toHaveProperty("lon");
      expect(json).not.toHaveProperty("created_at");
    });
  });

  test("BACK-9: Попытка создания со значением координат за пределами граничных значений lon -180.1", async () => {
    const response = await test.step("Создание запроса", async () => {
      const apiRequest = await request.newContext();
      const client = new ApiClient(apiRequest);
      const token = await client.getToken();

      const response = await client.createFavorite(token, {
        title: TITLE,
        lat: -90.1,
        lon: 180,
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
        "Параметр 'lon' должен быть не менее -180"
      );

      expect(json).not.toHaveProperty("id");
      expect(json).not.toHaveProperty("title");
      expect(json).not.toHaveProperty("lat");
      expect(json).not.toHaveProperty("lon");
      expect(json).not.toHaveProperty("created_at");
    });
  });
});
