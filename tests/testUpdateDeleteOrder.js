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

describe("Put Order Test", () => {
  describe("order/orderupdate PUT", () => {
    it("It should success", async () => {
      const res = await request(app)
        .put(`/order/orderupdate/4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`)
        .send({
          orderstatus_id: "1",
          weight: "55",
          totalPrice: "200000",
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Success");
    });

    it("It should error order status", async () => {
      const res = await request(app)
        .put(`/order/orderupdate/4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`)
        .send({
          orderstatus_id: "1asdf",
          weight: "55",
          totalPrice: "200000",
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Orderstatus must be a number");
    });

    it("It should error order status ID", async () => {
      const res = await request(app)
        .put(`/order/orderupdate/4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`)
        .send({
          orderstatus_id: "9",
          weight: "55",
          totalPrice: "200000",
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Orderstatus ID is not valid");
    });

    it("It should error weight", async () => {
      const res = await request(app)
        .put(`/order/orderupdate/4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`)
        .send({
          orderstatus_id: "7",
          weight: "55asdf",
          totalPrice: "200000",
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Weight must be a number");
    });

    it("It should error weight", async () => {
      const res = await request(app)
        .put(`/order/orderupdate/4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`)
        .send({
          orderstatus_id: "7",
          weight: "55asdf",
          totalPrice: "200000",
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Weight must be a number");
    });

    it("It should error price", async () => {
      const res = await request(app)
        .put(`/order/orderupdate/4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`)
        .send({
          orderstatus_id: "7",
          weight: "55",
          totalPrice: "200000asdf",
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Price must be a number");
    });

    it("It should error order ID not found", async () => {
      const res = await request(app)
        .put(`/order/orderupdate/4de0d5c5-2deb-46ef-abf0-038ddd9f10c`)
        .send({
          orderstatus_id: "7",
          weight: "55",
          totalPrice: "200000",
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Order Not found");
    });
  });
});

describe("Delete Order Test", () => {
  describe("order/orderdelete DELETE", () => {
    it("It should success delete", async () => {
      const res = await request(app).delete(
        `/order/orderdelete/4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`
      );

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Success delete order");
    });

    it("It should success", async () => {
      const res = await request(app).delete(
        `/order/orderdelete/4de0d5c5-2deb-46ef-abf0-038ddd9f10c`
      );

      expect(res.statusCode).toEqual(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Order Not Found");
    });
  });
});
