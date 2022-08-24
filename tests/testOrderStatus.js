const request = require("supertest");
const app = require("../index");
const {
  cart,
  courier,
  item,
  itemprice,
  laundry,
  order,
  orderstatus,
  ordertype,
  review,
  servicelevel,
  servicelist,
  user,
  weightprice,
} = require("../db/models");

describe("Get status test", () => {
  describe("order/status GET", () => {
    it("It should success", async () => {
      const res = await request(app).get(
        `/order/status/?order_id=4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`
      );

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Success");
    });
    
    it("It should error", async () => {
      const res = await request(app).get(`/order/status/?order_id=1234567`);
      expect(res.statusCode).toEqual(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Order Not Found");
    });
  });

  describe("order/statusfinish GET", () => {
    it("It should success", async () => {
      const res = await request(app).get(
        `/order/statusfinish/?order_id=4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`
      );

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Your Laundry Is Finished");
    });
    it("It should error", async () => {
      const res = await request(app).get(
        `/order/statusfinish/?order_id=4de0d5c5-2deb-46ef-abf0-038ddd9f10c1`
      );

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Laundry not finished");
    });
    it("It should error", async () => {
      const res = await request(app).get(
        `/order/statusfinish/?order_id=1234567`
      );

      expect(res.statusCode).toEqual(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Order Not Found");
    });
  });
});
