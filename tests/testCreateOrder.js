const jwt = require("jsonwebtoken");
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

let tokenCustomer, list_id, order_id;

describe("Auth Test", () => {
  describe("/signup POST", () => {
    it("It should make user and get the token", async () => {
      const res = await request(app).post("/register/customer").send({
        email: "bayu123@gmail.com",
        password: "Bayusedana123!!",
        confirmpassword: "Bayusedana123!!",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      // expect(res.body.message).toEqual(
      //   "Please check your email for verification"
      // );
      // expect(res.body).toHaveProperty("token");
    });
  });
});

describe("/login POST", () => {
  it("It should make user login and get authentication_key (jwt)", async () => {
    const res = await request(app).post("/login/customer").send({
      email: "bayu123@gmail.com",
      password: "Bayusedana123!!",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual(
      "Please check your email for verification"
    );
    expect(res.body).toHaveProperty("token");

    tokenCustomer = res.body.token;
  });
});

// create order test
describe("Create Order Test", () => {
  describe("order/create POST", () => {
    it("It should error 500", async () => {
      const res = await request(app)
        .post("/order/create/")
        .send({
          laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
          ordertype_id: 1,
          servicelist_id: 1,
          servicelevel_id: 1,
          weight: 50,
          item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
          estimatePrice: 50000,
          pickUpChoice: "Delivery",
          pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          delivery_fee: 15000,
          admin_charge: 20000,
          totalPrice: 20000,
          paymentType: "Cash",
        })
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Internal Server Error");
    });

    it("It should success", async () => {
      const res = await request(app)
        .post("/order/create/")
        .send({
          laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
          ordertype_id: "1",
          servicelist_id: "1",
          servicelevel_id: "1",
          weight: "50",
          item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
          estimatePrice: "50000",
          pickUpChoice: "Delivery",
          pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          delivery_fee: "15000",
          admin_charge: "20000",
          totalPrice: "20000",
          paymentType: "Cash",
        })
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Order created successfully");
    });

    it("It should error item ID", async () => {
      const res = await request(app)
        .post("/order/create/")
        .send({
          laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
          ordertype_id: "1",
          servicelist_id: "1",
          servicelevel_id: "1",
          weight: "50",
          item: `[{"id": 15, "quantity": 5}, {"id": 3, "quantity": 3}]`,
          estimatePrice: "50000",
          pickUpChoice: "Delivery",
          pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          delivery_fee: "15000",
          admin_charge: "20000",
          totalPrice: "20000",
          paymentType: "Cash",
        })
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Item ID is not valid");
    });

    it("It should error weight must be a number", async () => {
      const res = await request(app)
        .post("/order/create/")
        .send({
          laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
          ordertype_id: "1",
          servicelist_id: "1",
          servicelevel_id: "1",
          weight: "50asdf",
          item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
          estimatePrice: "50000",
          pickUpChoice: "Delivery",
          pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          delivery_fee: "15000",
          admin_charge: "20000",
          totalPrice: "20000",
          paymentType: "Cash",
        })
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Weight must be a number");
    });

    it("It should error laundry ID", async () => {
      const res = await request(app)
        .post("/order/create/")
        .send({
          laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac6",
          ordertype_id: "1",
          servicelist_id: "1",
          servicelevel_id: "1",
          weight: "50",
          item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
          estimatePrice: "50000",
          pickUpChoice: "Delivery",
          pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          delivery_fee: "15000",
          admin_charge: "20000",
          totalPrice: "20000",
          paymentType: "Cash",
        })
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Laundry not found");
    });

    it("It should error ordertype ID", async () => {
      const res = await request(app)
        .post("/order/create/")
        .send({
          laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
          ordertype_id: "12",
          servicelist_id: "1",
          servicelevel_id: "1",
          weight: "50",
          item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
          estimatePrice: "50000",
          pickUpChoice: "Delivery",
          pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          delivery_fee: "15000",
          admin_charge: "20000",
          totalPrice: "20000",
          paymentType: "Cash",
        })
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Order type ID is not valid");
    });

    it("It should error servicelist ID", async () => {
      const res = await request(app)
        .post("/order/create/")
        .send({
          laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
          ordertype_id: "1",
          servicelist_id: "7",
          servicelevel_id: "1",
          weight: "50",
          item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
          estimatePrice: "50000",
          pickUpChoice: "Delivery",
          pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          delivery_fee: "15000",
          admin_charge: "20000",
          totalPrice: "20000",
          paymentType: "Cash",
        })
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Service list ID is not valid");
    });

    it("It should error servicelist ID", async () => {
      const res = await request(app)
        .post("/order/create/")
        .send({
          laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
          ordertype_id: "1",
          servicelist_id: "1",
          servicelevel_id: "3",
          weight: "50",
          item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
          estimatePrice: "50000",
          pickUpChoice: "Delivery",
          pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          delivery_fee: "15000",
          admin_charge: "20000",
          totalPrice: "20000",
          paymentType: "Cash",
        })
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Service level ID is not valid");
    });

    it("It should error estimate price must be number", async () => {
      const res = await request(app)
        .post("/order/create/")
        .send({
          laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
          ordertype_id: "1",
          servicelist_id: "1",
          servicelevel_id: "2",
          weight: "50",
          item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
          estimatePrice: "50000asdf",
          pickUpChoice: "Delivery",
          pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          delivery_fee: "15000",
          admin_charge: "20000",
          totalPrice: "20000",
          paymentType: "Cash",
        })
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Estimate Price must be a number");
    });

    it("It should error total price must be number", async () => {
      const res = await request(app)
        .post("/order/create/")
        .send({
          laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
          ordertype_id: "1",
          servicelist_id: "1",
          servicelevel_id: "2",
          weight: "50",
          item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
          estimatePrice: "50000",
          pickUpChoice: "Delivery",
          pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          delivery_fee: "15000",
          admin_charge: "20000",
          totalPrice: "20000asdf",
          paymentType: "Cash",
        })
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Total Price must be a number");
    });

    it("It should error service list ID must be number", async () => {
      const res = await request(app)
        .post("/order/create/")
        .send({
          laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
          ordertype_id: "1",
          servicelist_id: "1asdf",
          servicelevel_id: "2",
          weight: "50",
          item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
          estimatePrice: "50000",
          pickUpChoice: "Delivery",
          pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          delivery_fee: "15000",
          admin_charge: "20000",
          totalPrice: "20000",
          paymentType: "Cash",
        })
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Servicelist ID must be a number");
    });

    it("It should error service level ID must be number", async () => {
      const res = await request(app)
        .post("/order/create/")
        .send({
          laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
          ordertype_id: "1",
          servicelist_id: "1",
          servicelevel_id: "1adfs",
          weight: "50",
          item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
          estimatePrice: "50000",
          pickUpChoice: "Delivery",
          pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          delivery_fee: "15000",
          admin_charge: "20000",
          totalPrice: "20000",
          paymentType: "Cash",
        })
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Servicelevel ID must be a number");
    });

    it("It should error ordertype ID must be number", async () => {
      const res = await request(app)
        .post("/order/create/")
        .send({
          laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
          ordertype_id: "1asdf",
          servicelist_id: "1",
          servicelevel_id: "2",
          weight: "50",
          item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
          estimatePrice: "50000",
          pickUpChoice: "Delivery",
          pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          delivery_fee: "15000",
          admin_charge: "20000",
          totalPrice: "20000",
          paymentType: "Cash",
        })
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Ordertype ID must be a number");
    });

    it("It should error delivery fee must be number", async () => {
      const res = await request(app)
        .post("/order/create/")
        .send({
          laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
          ordertype_id: "1",
          servicelist_id: "1",
          servicelevel_id: "2",
          weight: "50",
          item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
          estimatePrice: "50000",
          pickUpChoice: "Delivery",
          pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          delivery_fee: "15000asdfa",
          admin_charge: "20000",
          totalPrice: "20000",
          paymentType: "Cash",
        })
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Delivery fee must be a number");
    });

    it("It should error admin charge must be number", async () => {
      const res = await request(app)
        .post("/order/create/")
        .send({
          laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
          ordertype_id: "1",
          servicelist_id: "1",
          servicelevel_id: "2",
          weight: "50",
          item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
          estimatePrice: "50000",
          pickUpChoice: "Delivery",
          pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          delivery_fee: "15000",
          admin_charge: "20000asdf",
          totalPrice: "20000",
          paymentType: "Cash",
        })
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Admin Charge must be a number");
    });

    it("It should error Pickup Choice Is Not Valid", async () => {
      const res = await request(app)
        .post("/order/create/")
        .send({
          laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
          ordertype_id: "1",
          servicelist_id: "1",
          servicelevel_id: "2",
          weight: "50",
          item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
          estimatePrice: "50000",
          pickUpChoice: "Anter ke rumah",
          pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          delivery_fee: "15000",
          admin_charge: "20000",
          totalPrice: "20000",
          paymentType: "Cash",
        })
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Pickup Choice Is Not Valid");
    });

    it("It should error Pickup Choice Is Not Valid", async () => {
      const res = await request(app)
        .post("/order/create/")
        .send({
          laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
          ordertype_id: "1",
          servicelist_id: "1",
          servicelevel_id: "2",
          weight: "50",
          item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
          estimatePrice: "50000",
          pickUpChoice: "Delivery",
          pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
          delivery_fee: "15000",
          admin_charge: "20000",
          totalPrice: "20000",
          paymentType: "Duit keras",
        })
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Payment Type Is Not Valid");
    });
  });
});
