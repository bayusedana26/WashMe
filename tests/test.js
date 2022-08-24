const request = require("supertest");
const jwt_decode = require("jwt-decode");
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
let token, decode;
let userId, order_id, order_id2;
let tokenCustomer, tokenCustomer2, tokenCustomer3, list_id;
let tokenLaundry;
let tokenAdmin;

//////////////////////////////////////////////////////////////// Customer Sign Up / Sign In //////////////////////////////////////////////////////////////////
// Auth test
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
      expect(res.body.message).toEqual(
        "Please check your email for verification"
      );
    });
  });

  describe("/signup POST", () => {
    it("It should make user and get the token", async () => {
      const res = await request(app).post("/register/customer").send({
        email: "bayu1234@gmail.com",
        password: "Bayusedana123!!",
        confirmpassword: "Bayusedana123!!",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual(
        "Please check your email for verification"
      );
    });
  });

  describe("/signup POST", () => {
    it("It should make user and get the token", async () => {
      const res = await request(app).post("/register/customer").send({
        email: "bayu12345@gmail.com",
        password: "Bayusedana123!!",
        confirmpassword: "Bayusedana123!!",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual(
        "Please check your email for verification"
      );
    });
  });

  describe("/signup POST", () => {
    it("It should error confirm password", async () => {
      const res = await request(app).post("/register/customer").send({
        email: "bayu123@gmail.com",
        password: "Bayusedana123!!",
        confirmpassword: "Bayusedana123",
      });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual(
        "Password confirmation must be the same with password"
      );
    });
  });

  describe("/signup POST", () => {
    it("It should make user and get the token", async () => {
      const res = await request(app).post("/register/laundry").send({
        email: "bayu123@gmail.com",
        password: "Bayusedana123!!",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Success");
    });
  });

  describe("/login POST", () => {
    it("Login without verify", async () => {
      const res = await request(app).post("/login/laundry").send({
        email: "bayu123@gmail.com",
        password: "Bayusedana123!!",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Success");
      expect(res.body).toHaveProperty("token");

      tokenLaundry = res.body.token;
    });
  });

  // Test the error for customer
  // Email already used
  describe("/signup POST", () => {
    it("Email already used", async () => {
      const res = await request(app).post("/register/customer").send({
        email: "bayu123@gmail.com",
        password: "Bayusedana123!!",
        confirmpassword: "Bayusedana123!!",
      });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Email has been used");
    });
  });

  // Wrong email format
  describe("/signup POST", () => {
    it("Wrong email format", async () => {
      const res = await request(app).post("/register/customer").send({
        email: "bayu123",
        password: "Bayusedana123!!",
        confirmpassword: "Bayusedana123!!",
        name: "Bayuedana",
        mobile_phone: "085159055491",
        address: `{"type": "Point", "coordinates": [-2.983464, 104.735353], "formattedAddress": "Jl. Masjid Al Gazali, Bukit Lama, Kec. Ilir Bar. I, Kota Palembang, Sumatera Selatan", "street": "Jl. Masjid Al Gazali", "city": "Kota Palembang", "province": "Sumatera Selatan", "zipcode": "30128", "country": "Indonesia"}`,
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Please input valid email");
    });
  });

  // Wrong name format
  // describe("/signup POST", () => {
  //   it("Wrong name format", async () => {
  //     const res = await request(app).post("/register/customer").send({
  //       email: "bayu124@gmail.com",
  //       password: "Bayusedana123!!",
  //       confirmpassword: "Bayusedana123!!",
  //       name: "12321332323",
  //       mobile_phone: "085159055481",
  //       address: `{"type": "Point", "coordinates": [-2.983464, 104.735353], "formattedAddress": "Jl. Masjid Al Gazali, Bukit Lama, Kec. Ilir Bar. I, Kota Palembang, Sumatera Selatan", "street": "Jl. Masjid Al Gazali", "city": "Kota Palembang", "province": "Sumatera Selatan", "zipcode": "30128", "country": "Indonesia"}`,
  //     });

  //     expect(res.statusCode).toEqual(400);
  //     expect(res.body).toBeInstanceOf(Object);
  //     expect(res.body.message).toEqual("Please input valid letters");
  //   });
  // });

  // Wrong mobile_phone format
  // describe("/signup POST", () => {
  //   it("Wrong mobile_phone format", async () => {
  //     const res = await request(app).post("/register/customer").send({
  //       email: "bayu145@gmail.com",
  //       password: "Bayusedana123!!",
  //       confirmpassword: "Bayusedana123!!",
  //       name: "BayuSedaaaana",
  //       mobile_phone: "085159055sdsad",
  //       address: `{"type": "Point", "coordinates": [-2.983464, 104.735353], "formattedAddress": "Jl. Masjid Al Gazali, Bukit Lama, Kec. Ilir Bar. I, Kota Palembang, Sumatera Selatan", "street": "Jl. Masjid Al Gazali", "city": "Kota Palembang", "province": "Sumatera Selatan", "zipcode": "30128", "country": "Indonesia"}`,
  //     });

  //     expect(res.statusCode).toEqual(400);
  //     expect(res.body).toBeInstanceOf(Object);
  //     expect(res.body.message).toEqual("Please input valid phone number");
  //   });
  // });
  // Wrong password format
  describe("/signup POST", () => {
    it("Wrong password format", async () => {
      const res = await request(app).post("/register/customer").send({
        email: "bayu123344@gmail.com",
        password: "Bayusedana123",
        confirmpassword: "Bayusedana123",
        name: "BayuSeaaaawwdana",
        mobile_phone: "0851590553245",
        address: `{"type": "Point", "coordinates": [-2.983464, 104.735353], "formattedAddress": "Jl. Masjid Al Gazali, Bukit Lama, Kec. Ilir Bar. I, Kota Palembang, Sumatera Selatan", "street": "Jl. Masjid Al Gazali", "city": "Kota Palembang", "province": "Sumatera Selatan", "zipcode": "30128", "country": "Indonesia"}`,
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual(
        "Password must have minimum length of 8 characters with minimum 1 lowercase character, 1 uppercase character, 1 number and 1 symbol"
      );
    });
  });
  // Wrong password confirmation
  // describe("/signup POST", () => {
  //   it("Wrong password confirmation", async () => {
  //     const res = await request(app).post("/register/customer").send({
  //       email: "bayu13333223@gmail.com",
  //       password: "Bayusedana123!!",
  //       confirmpassword: "Bayusedana123",
  //       name: "BayuuuuuuSedana",
  //       mobile_phone: "0851590546",
  //       address: `{"type": "Point", "coordinates": [-2.983464, 104.735353], "formattedAddress": "Jl. Masjid Al Gazali, Bukit Lama, Kec. Ilir Bar. I, Kota Palembang, Sumatera Selatan", "street": "Jl. Masjid Al Gazali", "city": "Kota Palembang", "province": "Sumatera Selatan", "zipcode": "30128", "country": "Indonesia"}`,
  //     });

  //     expect(res.statusCode).toEqual(400);
  //     expect(res.body).toBeInstanceOf(Object);
  //     expect(res.body.message).toEqual(
  //       "Password confirmation must be the same with password"
  //     );
  //   });
  // });

  // Wrong address confirmation
  // describe("/signup POST", () => {
  //   it("Wrong address", async () => {
  //     const res = await request(app).post("/register/customer").send({
  //       email: "bayu13333@gmail.com",
  //       password: "Bayusedana123!!",
  //       confirmpassword: "Bayusedana123!!",
  //       name: "BayuuuuuassauSedana",
  //       mobile_phone: "0851590546",
  //       address: "asdas",
  //     });

  //     expect(res.statusCode).toEqual(400);
  //     expect(res.body).toBeInstanceOf(Object);
  //     expect(res.body.message).toEqual("Please input full address");
  //   });
  // });

  describe("/login POST", () => {
    it("Login without verify", async () => {
      const res = await request(app).post("/login/customer").send({
        email: "bayu123@gmail.com",
        password: "Bayusedana123!!",
      });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual(
        "Pending Account. Please Verify Your Email!"
      );
      // expect(res.body).toHaveProperty("token");

      // tokenCustomer = res.body.token;
    });
  

  it("Login without verify", async () => {
    const res = await request(app).post("/login/customer").send({
      email: "bayu1234@gmail.com",
      password: "Bayusedana123!!",
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual(
      "Pending Account. Please Verify Your Email!"
    );
    // expect(res.body).toHaveProperty("token");

    // tokenCustomer = res.body.token;
  });

  it("Login without verify", async () => {
    const res = await request(app).post("/login/customer").send({
      email: "bayu12345@gmail.com",
      password: "Bayusedana123!!",
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual(
      "Pending Account. Please Verify Your Email!"
    );
    // expect(res.body).toHaveProperty("token");

    // tokenCustomer = res.body.token;
  });
});

  describe("/login POST", () => {
    it("It should make user login and get authentication_key (jwt)", async () => {
      if (user.status == "Active") {
        const res = await request(app).post("/login/customer").send({
          email: "bayu123@gmail.com",
          password: "Bayusedana123!!",
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Success");
        expect(res.body).toHaveProperty("token");

        tokenCustomer = res.body.token;
      }
    });

    it("It should make user login and get authentication_key (jwt)", async () => {
      if (user.status == "Active") {
        const res = await request(app).post("/login/customer").send({
          email: "bayu1234@gmail.com",
          password: "Bayusedana123!!",
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Success");
        expect(res.body).toHaveProperty("token");

        tokenCustomer2 = res.body.token;
      }
    });

    it("It should make user login and get authentication_key (jwt)", async () => {
      if (user.status == "Active") {
        const res = await request(app).post("/login/customer").send({
          email: "bayu12345@gmail.com",
          password: "Bayusedana123!!",
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Success");
        expect(res.body).toHaveProperty("token");

        tokenCustomer3 = res.body.token;
      }
    });
  });

  // Wrong password
  describe("/login POST", () => {
    it("Wrong password", async () => {
      const res = await request(app).post("/login/customer").send({
        email: "bayu@example.com",
        password: "Bayucoba12",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual(
        "Password must have minimum length of 8 characters with minimum 1 lowercase character, 1 uppercase character, 1 number and 1 symbol"
      );
    });
  });

  // // User not existed
  // describe("/login POST", () => {
  //   it("User didn't exist", async () => {
  //     const res = await request(app).post("/login/customer").send({
  //       email: "bayu12345@gmail.com",
  //       password: "Bayusedana123!!",
  //     });

  //     expect(res.statusCode).toEqual(401);
  //     expect(res.body).toBeInstanceOf(Object);
  //     expect(res.body.message).toEqual("Email not found");
  //   });
  // });

  // Wrong email format
  describe("/login POST", () => {
    it("Wrong email format", async () => {
      const res = await request(app).post("/login/customer").send({
        email: "bayu123",
        password: "Bayusedana123!!",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Please input valid email");
    });
  });

  // Wrong password format
  describe("/login POST", () => {
    it("Wrong password", async () => {
      const res = await request(app).post("/login/customer").send({
        email: "bayu123@gmail.com",
        password: "Bayusedan",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual(
        "Password must have minimum length of 8 characters with minimum 1 lowercase character, 1 uppercase character, 1 number and 1 symbol"
      );
    });
  });
});

//////////////////////////////////////////////////////////////// See Profile and Update /////////////////////////////////////

describe("/get One", () => {
  it("See profile", async () => {
    if (user.status == "Active") {
      const res = await request(app)
        .get("/customer/d96e2f15-52ef-40ec-932c-1003d9249871")
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Success");
    }
  });
  it("Update profile", async () => {
    if (user.status == "Active") {
      const res = await request(app)
        .put("/customer/d96e2f15-52ef-40ec-932c-1003d9249871")
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        })
        .send({
          name: "Bayu Sedana",
          mobile_phone: "081355672102",
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Success");
    }
  });
});

//////////////////////////////////////////////////////////////// Laundry Sign Up / Sign In //////////////////////////////////////////////////////////////////

describe("Auth Test", () => {
  describe("/signup POST", () => {
    it("It should make laundry and get the token", async () => {
      const res = await request(app).post("/register/laundry").send({
        email: "bayuabc123@gmail.com",
        password: "Bayusedana123!!",
        confirmpassword: "Bayusedana123!!",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Success");
      expect(res.body).toHaveProperty("token");
    });
  });
});

describe("/login POST", () => {
  it("It should make laundry login and get authentication_key (jwt)", async () => {
    const res = await request(app).post("/login/laundry").send({
      email: "bayuabc123@gmail.com",
      password: "Bayusedana123!!",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("Success");
    expect(res.body).toHaveProperty("token");

    tokenLaundry = res.body.token;
  });
});

/////////////////////////////////////////////Laundry Test////////////////////////////////////////////////
describe("Laundry Test", () => {
  describe("GET /laundry", () => {
    it("Error: No auth token", async () => {
      const res = await request(app).get(`/laundry`);

      expect(res.statusCode).toEqual(403);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("No auth token");
    });
  });
  describe("GET /laundry", () => {
    it("Error: Parameter page must be a number", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/laundry?page=a&limit=5`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Parameter page must be a number");
      }
    });
  });
  describe("GET /laundry", () => {
    it("Error: Parameter page must be a number", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/laundry?page=1&limit=a`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Parameter limit must be a number");
      }
    });
  });
  describe("GET /laundry", () => {
    it("Message: Success", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/laundry`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Success");
      }
    });
  });
  describe("GET /details/:id", () => {
    it("Message: Laundry not found", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/details/1`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Laundry not found");
      }
    });
  });
  describe("GET /details/:id", () => {
    it("Error: Service list ID is not valid", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/details/8d1a2361-0989-4ac2-8ab2-34f60c994fb8?service=0`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Service list ID is not valid");
      }
    });
  });
  describe("GET /details/:id", () => {
    it("Message: Success", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/details/8d1a2361-0989-4ac2-8ab2-34f60c994fb8`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Success");
      }
    });
  });
  describe("GET /search", () => {
    it("Message: Laundry not found", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/search?name=restaurant`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Laundry not found");
      }
    });
  });
  describe("GET /search", () => {
    it("Message: Success", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/search?name=laundry`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Success");
      }
    });
  });
  describe("GET /search", () => {
    it("Error: Service List ID is not valid, Service Level ID is not valid, Order Type ID is not valid", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/search?service=0&level=0&type=0`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual(
          "Service List ID is not valid, Service Level ID is not valid, Order Type ID is not valid"
        );
      }
    });
  });
  describe("GET /search", () => {
    it("Message: Success", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/search?service=1&level=1&type=1`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Success");
      }
    });
  });
  describe("GET /search", () => {
    it("Message: Laundry not found", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/search?service=6&level=1&type=2`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Laundry not found");
      }
    });
  });
  describe("GET /search", () => {
    it("Message: Success", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/search?service=1&level=1&type=2`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Success");
      }
    });
  });
  describe("GET /search", () => {
    it("Message: Success", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/search?service=1&type=1,2`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Success");
      }
    });
  });
  describe("GET /search", () => {
    it("Message: Success", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/search?type=1,2`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Success");
      }
    });
  });
  describe("GET /search", () => {
    it("Message: Success", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/search?service=1`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Success");
      }
    });
  });
  describe("GET /search", () => {
    it("Message: Success", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/search?deliver=`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Success");
      }
    });
  });
  describe("GET /search", () => {
    it("Message: Success", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/search?service=1&level=1&type=2&deliver=`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Success");
      }
    });
  });
  describe("GET /search", () => {
    it("Message: Please Insert Parameter", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/search`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Please Insert Parameter");
      }
    });
  });
});



// create order test
describe("Create Order Test", () => {
  describe("order/create POST", () => {
    it("It should error 500", async () => {
      if (user.status == "Active") {
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
      }
    });

    it("It should success", async () => {
      if (user.status == "Active") {
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
          paymentType: "Debit/credit card",
        })
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Order created successfully");
      order_id = res.body.createOrder.id;
      }
      
    });

    it("It should success", async () => {
      if (user.status == "Active") {
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
          paymentType: "Debit/credit card",
        })
        .set({
          Authorization: `Bearer ${tokenCustomer2}`,
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Order created successfully");
      order_id2 = res.body.createOrder.id;
      }
      
    });

    // it("It should success", async () => {
    //   const res = await request(app)
    //     .post("/order/create/")
    //     .send({
    //       laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
    //       ordertype_id: "1",
    //       servicelist_id: "1",
    //       servicelevel_id: "1",
    //       weight: "50",
    //       item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
    //       estimatePrice: "50000",
    //       pickUpChoice: "Delivery",
    //       pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
    //       deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
    //       delivery_fee: "15000",
    //       admin_charge: "20000",
    //       totalPrice: "20000",
    //       paymentType: "Cash",
    //     })
    //     .set({
    //       Authorization: `Bearer ${tokenCustomer}`,
    //     });

    //   expect(res.statusCode).toEqual(201);
    //   expect(res.body).toBeInstanceOf(Object);
    //   expect(res.body.message).toEqual("Order created successfully");

    //   order_id2 = res.body.createOrder.id;
    // });

    it("It should error item ID", async () => {
      if (user.status == "Active") {
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
      }
    });

    it("It should error weight must be a number", async () => {
      if (user.status == "Active") {
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
      }
    });

    it("It should error laundry ID", async () => {
      if (user.status == "Active") {
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
      }
    });

    it("It should error ordertype ID", async () => {
      if (user.status == "Active") {
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
      }
    });

    it("It should error servicelist ID", async () => {
      if (user.status == "Active") {
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
      }
    });

    it("It should error servicelist ID", async () => {
      if (user.status == "Active") {
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
      }
    });

    it("It should error estimate price must be number", async () => {
      if (user.status == "Active") {
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
      }
    });

    it("It should error total price must be number", async () => {
      if (user.status == "Active") {
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
      }
    });

    it("It should error service list ID must be number", async () => {
      if (user.status == "Active") {
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
      }
    });

    it("It should error service level ID must be number", async () => {
      if (user.status == "Active") {
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
      }
    });

    it("It should error ordertype ID must be number", async () => {
      if (user.status == "Active") {
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
      }
    });

    it("It should error delivery fee must be number", async () => {
      if (user.status == "Active") {
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
      }
    });

    it("It should error admin charge must be number", async () => {
      if (user.status == "Active") {
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
      }
    });

    it("It should error Pickup Choice Is Not Valid", async () => {
      if (user.status == "Active") {
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
      }
    });

    it("It should error Pickup Choice Is Not Valid", async () => {
      if (user.status == "Active") {
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
      }
    });
  });
});

//Test update order
describe("Put Order Test", () => {
  describe("order/orderupdate PUT", () => {
    it("It should success", async () => {
      const res = await request(app)
        .put(`/order/orderupdate/4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`)
        .send({
          orderstatus_id: "8",
          weight: "55",
          totalPrice: "200000",
        })
        .set({
          Authorization: `Bearer ${tokenLaundry}`,
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
          orderstatus_id: "asdf",
          weight: "55",
          totalPrice: "200000",
        })
        .set({
          Authorization: `Bearer ${tokenLaundry}`,
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Orderstatus must be a number");
    });

    it("It should error order status", async () => {
      const res = await request(app)
        .put(`/order/orderupdate/${order_id}`)
        .send({
          orderstatus_id: 1,
          weight: 55,
          totalPrice: 200000,
        })
        .set({
          Authorization: `Bearer ${tokenLaundry}`,
        });
      expect(res.statusCode).toEqual(500);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Internal Server Error");
    });

    it("It should error order status ID", async () => {
      const res = await request(app)
        .put(`/order/orderupdate/4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`)
        .send({
          orderstatus_id: "9",
          weight: "55",
          totalPrice: "200000",
        })
        .set({
          Authorization: `Bearer ${tokenLaundry}`,
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
        })
        .set({
          Authorization: `Bearer ${tokenLaundry}`,
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Weight must be a number");
    });

    // it("It should error weight", async () => {
    //   const res = await request(app)
    //     .put(`/order/orderupdate/4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`)
    //     .send({
    //       orderstatus_id: "7",
    //       weight: "55asdf",
    //       totalPrice: "200000",
    //     })
    //     .set({
    //       Authorization: `Bearer ${tokenLaundry}`,
    //     });
    //   expect(res.statusCode).toEqual(400);
    //   expect(res.body).toBeInstanceOf(Object);
    //   expect(res.body).toHaveProperty("message");
    //   expect(res.body.message).toEqual("Weight must be a number");
    // });

    it("It should error price", async () => {
      const res = await request(app)
        .put(`/order/orderupdate/4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`)
        .send({
          orderstatus_id: "8",
          weight: "55",
          totalPrice: "200000asdf",
        })
        .set({
          Authorization: `Bearer ${tokenLaundry}`,
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
        })
        .set({
          Authorization: `Bearer ${tokenLaundry}`,
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Order Not found");
    });
  });
});

describe("Get status test", () => {
  describe("order/status GET", () => {
    it("It should success", async () => {
      if (user.status == "Active") {
      const res = await request(app)
        .get(`/order/status/`)
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Success");
      }
    });

    it("It should error", async () => {
      if (user.status == "Active") {
      const res = await request(app).get(`/order/status/`)
      .set({
        Authorization: `Bearer ${tokenCustomer3}`,
      });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("You don't have any order");
    }
    });
  });

  describe("order/statusfinish GET", () => {
    it("It should success", async () => {
      if (user.status == "Active") {
      const res = await request(app)
        .get(`/order/statusfinish/`)
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Your Laundry Is Finished");
      }
    });

    it("It should success", async () => {
      if (user.status == "Active") {
      const res = await request(app)
        .get(`/order/statusfinish/`)
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("You don't have finished laundry");
      }
    });
//     it("It should error", async () => {
//       const res = await request(app)
//         .get(`/order/statusfinish/`)
//         .set({
//           Authorization: `Bearer ${tokenCustomer}`,
//         });

//       expect(res.statusCode).toEqual(400);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.message).toEqual("Laundry not finished");
//     });
//     it("It should error", async () => {
//       const res = await request(app)
//         .get(`/order/statusfinish/?order_id=1234567`)
//         .set({
//           Authorization: `Bearer ${tokenCustomer}`,
//         });

//       expect(res.statusCode).toEqual(400);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.message).toEqual("Order Not Found");
//     });
  });
});

describe("List Test", () => {
  describe("GET /list", () => {
    it("Error: No auth token", async () => {
      const res = await request(app).get(`/list`);

      expect(res.statusCode).toEqual(403);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("No auth token");
    });
  });
  describe("GET /list", () => {
    it("Message: Your list is empty", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/list`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Your list is empty");
      }
    });
  });
  describe("POST /list/add", () => {
    it("Error", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .post("/list/add")
          .send({
            laundry: "1",
            type: 0,
            service: 0,
            level: 0,
            weight: "a",
            item: `[{ "id": 0, "name": "T-shirt", "quantity": 5 }]`,
            price: "abcd",
          })
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual(
          "Item ID is not valid, Weight must be a number, Laundry not found, Order type ID is not valid, Service list ID is not valid, Service level ID is not valid, Price must be a number"
        );
      }
    });
  });
  describe("POST /list/add", () => {
    it("Message: Success Add to list", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .post("/list/add")
          .send({
            laundry: "8d1a2361-0989-4ac2-8ab2-34f60c994fb8",
            type: 2,
            service: 1,
            level: 1,
            weight: "1",
            item: `[{"id": 1,  "name": "T-shirt", "quantity": 5}, {"id": 3,  "name": "Jacket", "quantity": 1}]`,
            price: "6000",
          })
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Success Add to List");

        list_id = res.body.data.id;
      }
    });
  });
  describe("GET /list", () => {
    it("Message: Success", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/list`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Success");
      }
    });
  });
  describe("DELETE /list/delete/:id", () => {
    it("Error: List not found", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .delete(`/list/delete/1`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("List not found");
      }
    });
  });
  describe("DELETE /list/delete/:id", () => {
    it("Message: Success", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .delete(`/list/delete/${list_id}`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Success");
      }
    });
  });
});

//Test On Process Status
// describe("Get Order Status Test", () => {
//   describe("order/status/ GET", () => {
//     it("It should success", async () => {
//       const res = await request(app)
//         .get(`/order/status/?order_id=4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`)
//         .set({
//           Authorization: `Bearer ${tokenCustomer}`,
//         });
//       expect(res.statusCode).toEqual(200);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.message).toEqual("Success");
//     });
//     it("It should error Order ID not found", async () => {
//       const res = await request(app)
//         .get(`/order/status/?order_id=4de0d5c5-2deb-46ef-abf0-038ddd9f10c`)
//         .set({
//           Authorization: `Bearer ${tokenCustomer}`,
//         });
//       expect(res.statusCode).toEqual(404);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.message).toEqual("Order Not Found");
//     });
//   });
// });

//Test Completed / Finish Order
// describe("Get Order Status Finish Test", () => {
//   describe("order/statusfinish/ GET", () => {
//     it("It should success", async () => {
//       const res = await request(app)
//         .get(
//           `/order/statusfinish/?order_id=4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`
//         )
//         .set({
//           Authorization: `Bearer ${tokenCustomer}`,
//         });
//       expect(res.statusCode).toEqual(200);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.message).toEqual("Your Laundry Is Finished");
//     });
//     it("It should error Order ID not found", async () => {
//       const res = await request(app)
//         .get(
//           `/order/statusfinish/?order_id=4de0d5c5-2deb-46ef-abf0-038ddd9f10c`
//         )
//         .set({
//           Authorization: `Bearer ${tokenCustomer}`,
//         });
//       expect(res.statusCode).toEqual(404);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.message).toEqual("Order Not Found");
//     });
//     it("It should error Laundry not finished", async () => {
//       const res = await request(app)
//         .get(
//           `/order/statusfinish/?order_id=4de0d5c5-2deb-46ef-abf0-038ddd9f10c1`
//         )
//         .set({
//           Authorization: `Bearer ${tokenCustomer}`,
//         });
//       expect(res.statusCode).toEqual(400);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.message).toEqual("Laundry not finished");
//     });
//   });
// });

// Test Get Order
describe("Get Order", () => {
  describe("order/GET", () => {
    it("It should success", async () => {
      if (user.status == "Active") {
      const res = await request(app)
        .get(`/order/4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`)
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Success");
      }
    });

    it("It should error Order ID not found", async () => {
      if (user.status == "Active") {
      const res = await request(app)
        .get(`/order/4de0d5c5-2deb-46ef-abf0-038ddd9f10c`)
        .set({
          Authorization: `Bearer ${tokenCustomer}`,
        });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Order Not Found");
      }
    });
  });
});

// Test Get Order all
// describe("Get Order all", () => {
//   describe("order/ GET", () => {
//     it("It should success", async () => {
//       const res = await request(app)
//         .get(`/order/`)
//         .set({
//           Authorization: `Bearer ${tokenCustomer}`,
//         });
//       expect(res.statusCode).toEqual(200);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.message).toEqual("Success");
//     });
//   });
// });



// //Test update order
// describe("Put Order Test", () => {
//   describe("order/orderupdate PUT", () => {
//     it("It should success", async () => {
//       const res = await request(app)
//         .put(`/order/orderupdate/4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`)
//         .send({
//           orderstatus_id: "7",
//           weight: "55",
//           totalPrice: "200000",
//         })
//         .set({
//           Authorization: `Bearer ${tokenLaundry}`,
//         });
//       expect(res.statusCode).toEqual(201);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.message).toEqual("Success");
//     });

//     it("It should error order status", async () => {
//       const res = await request(app)
//         .put(`/order/orderupdate/4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`)
//         .send({
//           orderstatus_id: "1asdf",
//           weight: "55",
//           totalPrice: "200000",
//         })
//         .set({
//           Authorization: `Bearer ${tokenLaundry}`,
//         });
//       expect(res.statusCode).toEqual(400);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.message).toEqual("Orderstatus must be a number");
//     });

//     it("It should error order status", async () => {
//       const res = await request(app)
//         .put(`/order/orderupdate/4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`)
//         .send({
//           orderstatus_id: 1,
//           weight: 55,
//           totalPrice: 200000,
//         })
//         .set({
//           Authorization: `Bearer ${tokenLaundry}`,
//         });
//       expect(res.statusCode).toEqual(500);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.message).toEqual("Internal Server Error");
//     });

//     it("It should error order status ID", async () => {
//       const res = await request(app)
//         .put(`/order/orderupdate/4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`)
//         .send({
//           orderstatus_id: "9",
//           weight: "55",
//           totalPrice: "200000",
//         })
//         .set({
//           Authorization: `Bearer ${tokenLaundry}`,
//         });
//       expect(res.statusCode).toEqual(400);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.message).toEqual("Orderstatus ID is not valid");
//     });

//     it("It should error weight", async () => {
//       const res = await request(app)
//         .put(`/order/orderupdate/4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`)
//         .send({
//           orderstatus_id: "7",
//           weight: "55asdf",
//           totalPrice: "200000",
//         })
//         .set({
//           Authorization: `Bearer ${tokenLaundry}`,
//         });
//       expect(res.statusCode).toEqual(400);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.message).toEqual("Weight must be a number");
//     });

//     it("It should error weight", async () => {
//       const res = await request(app)
//         .put(`/order/orderupdate/4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`)
//         .send({
//           orderstatus_id: "7",
//           weight: "55asdf",
//           totalPrice: "200000",
//         })
//         .set({
//           Authorization: `Bearer ${tokenLaundry}`,
//         });
//       expect(res.statusCode).toEqual(400);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.message).toEqual("Weight must be a number");
//     });

//     it("It should error price", async () => {
//       const res = await request(app)
//         .put(`/order/orderupdate/4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`)
//         .send({
//           orderstatus_id: "7",
//           weight: "55",
//           totalPrice: "200000asdf",
//         })
//         .set({
//           Authorization: `Bearer ${tokenLaundry}`,
//         });
//       expect(res.statusCode).toEqual(400);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.message).toEqual("Price must be a number");
//     });

//     it("It should error order ID not found", async () => {
//       const res = await request(app)
//         .put(`/order/orderupdate/4de0d5c5-2deb-46ef-abf0-038ddd9f10c`)
//         .send({
//           orderstatus_id: "7",
//           weight: "55",
//           totalPrice: "200000",
//         })
//         .set({
//           Authorization: `Bearer ${tokenLaundry}`,
//         });
//       expect(res.statusCode).toEqual(400);
//       expect(res.body).toBeInstanceOf(Object);
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.message).toEqual("Order Not found");
//     });
//   });
// });

//test delete order
describe("Delete Order Test", () => {
  describe("order/orderdelete DELETE", () => {
    it("It should success delete", async () => {
      const res = await request(app)
        .delete(`/order/orderdelete/4de0d5c5-2deb-46ef-abf0-038ddd9f10c0`)
        .set({
          Authorization: `Bearer ${tokenLaundry}`,
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Success delete order");
    });

    it("It should error", async () => {
      if (user.status == "Active") {
        const res = await request(app)
          .get(`/order/status/?order_id=1234567`)
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });
        expect(res.statusCode).toEqual(404);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Order Not Found");
      }
    });
  });

  it("It should success", async () => {
    const res = await request(app)
      .delete(`/order/orderdelete/4de0d5c5-2deb-46ef-abf0-038ddd9f10c`)
      .set({
        Authorization: `Bearer ${tokenLaundry}`,
      });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("Order Not Found");
  });
});

// // create order test
// describe("Create Order Test", () => {
//   describe("order/create POST", () => {
//     it("It should error 500", async () => {
//       if (user.status == "Active") {
//         const res = await request(app)
//           .post("/order/create/")
//           .send({
//             laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
//             ordertype_id: 1,
//             servicelist_id: 1,
//             servicelevel_id: 1,
//             weight: 50,
//             item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
//             estimatePrice: 50000,
//             pickUpChoice: "Delivery",
//             pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             delivery_fee: 15000,
//             admin_charge: 20000,
//             totalPrice: 20000,
//             paymentType: "Cash",
//           })
//           .set({
//             Authorization: `Bearer ${tokenCustomer}`,
//           });

//         expect(res.statusCode).toEqual(500);
//         expect(res.body).toBeInstanceOf(Object);
//         expect(res.body.message).toEqual("Internal Server Error");
//       }
//     });

//     it("It should success", async () => {
//       if (user.status == "Active") {
//         const res = await request(app)
//           .post("/order/create/")
//           .send({
//             laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
//             ordertype_id: "1",
//             servicelist_id: "1",
//             servicelevel_id: "1",
//             weight: "50",
//             item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
//             estimatePrice: "50000",
//             pickUpChoice: "Delivery",
//             pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             delivery_fee: "15000",
//             admin_charge: "20000",
//             totalPrice: "20000",
//             paymentType: "Cash",
//           })
//           .set({
//             Authorization: `Bearer ${tokenCustomer}`,
//           });

//         expect(res.statusCode).toEqual(201);
//         expect(res.body).toBeInstanceOf(Object);
//         expect(res.body.message).toEqual("Order created successfully");
//       }
//     });

//     it("It should error item ID", async () => {
//       if (user.status == "Active") {
//         const res = await request(app)
//           .post("/order/create/")
//           .send({
//             laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
//             ordertype_id: "1",
//             servicelist_id: "1",
//             servicelevel_id: "1",
//             weight: "50",
//             item: `[{"id": 15, "quantity": 5}, {"id": 3, "quantity": 3}]`,
//             estimatePrice: "50000",
//             pickUpChoice: "Delivery",
//             pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             delivery_fee: "15000",
//             admin_charge: "20000",
//             totalPrice: "20000",
//             paymentType: "Cash",
//           })
//           .set({
//             Authorization: `Bearer ${tokenCustomer}`,
//           });

//         expect(res.statusCode).toEqual(400);
//         expect(res.body).toBeInstanceOf(Object);
//         expect(res.body.message).toEqual("Item ID is not valid");
//       }
//     });

//     it("It should error weight must be a number", async () => {
//       if (user.status == "Active") {
//         const res = await request(app)
//           .post("/order/create/")
//           .send({
//             laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
//             ordertype_id: "1",
//             servicelist_id: "1",
//             servicelevel_id: "1",
//             weight: "50asdf",
//             item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
//             estimatePrice: "50000",
//             pickUpChoice: "Delivery",
//             pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             delivery_fee: "15000",
//             admin_charge: "20000",
//             totalPrice: "20000",
//             paymentType: "Cash",
//           })
//           .set({
//             Authorization: `Bearer ${tokenCustomer}`,
//           });

//         expect(res.statusCode).toEqual(400);
//         expect(res.body).toBeInstanceOf(Object);
//         expect(res.body.message).toEqual("Weight must be a number");
//       }
//     });

//     it("It should error laundry ID", async () => {
//       if (user.status == "Active") {
//         const res = await request(app)
//           .post("/order/create/")
//           .send({
//             laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac6",
//             ordertype_id: "1",
//             servicelist_id: "1",
//             servicelevel_id: "1",
//             weight: "50",
//             item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
//             estimatePrice: "50000",
//             pickUpChoice: "Delivery",
//             pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             delivery_fee: "15000",
//             admin_charge: "20000",
//             totalPrice: "20000",
//             paymentType: "Cash",
//           })
//           .set({
//             Authorization: `Bearer ${tokenCustomer}`,
//           });

//         expect(res.statusCode).toEqual(400);
//         expect(res.body).toBeInstanceOf(Object);
//         expect(res.body.message).toEqual("Laundry not found");
//       }
//     });

//     it("It should error ordertype ID", async () => {
//       if (user.status == "Active") {
//         const res = await request(app)
//           .post("/order/create/")
//           .send({
//             laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
//             ordertype_id: "12",
//             servicelist_id: "1",
//             servicelevel_id: "1",
//             weight: "50",
//             item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
//             estimatePrice: "50000",
//             pickUpChoice: "Delivery",
//             pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             delivery_fee: "15000",
//             admin_charge: "20000",
//             totalPrice: "20000",
//             paymentType: "Cash",
//           })
//           .set({
//             Authorization: `Bearer ${tokenCustomer}`,
//           });

//         expect(res.statusCode).toEqual(400);
//         expect(res.body).toBeInstanceOf(Object);
//         expect(res.body.message).toEqual("Order type ID is not valid");
//       }
//     });

//     it("It should error servicelist ID", async () => {
//       if (user.status == "Active") {
//         const res = await request(app)
//           .post("/order/create/")
//           .send({
//             laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
//             ordertype_id: "1",
//             servicelist_id: "7",
//             servicelevel_id: "1",
//             weight: "50",
//             item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
//             estimatePrice: "50000",
//             pickUpChoice: "Delivery",
//             pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             delivery_fee: "15000",
//             admin_charge: "20000",
//             totalPrice: "20000",
//             paymentType: "Cash",
//           })
//           .set({
//             Authorization: `Bearer ${tokenCustomer}`,
//           });

//         expect(res.statusCode).toEqual(400);
//         expect(res.body).toBeInstanceOf(Object);
//         expect(res.body.message).toEqual("Service list ID is not valid");
//       }
//     });

//     it("It should error servicelist ID", async () => {
//       if (user.status == "Active") {
//         const res = await request(app)
//           .post("/order/create/")
//           .send({
//             laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
//             ordertype_id: "1",
//             servicelist_id: "1",
//             servicelevel_id: "3",
//             weight: "50",
//             item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
//             estimatePrice: "50000",
//             pickUpChoice: "Delivery",
//             pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             delivery_fee: "15000",
//             admin_charge: "20000",
//             totalPrice: "20000",
//             paymentType: "Cash",
//           })
//           .set({
//             Authorization: `Bearer ${tokenCustomer}`,
//           });

//         expect(res.statusCode).toEqual(400);
//         expect(res.body).toBeInstanceOf(Object);
//         expect(res.body.message).toEqual("Service level ID is not valid");
//       }
//     });

//     it("It should error estimate price must be number", async () => {
//       if (user.status == "Active") {
//         const res = await request(app)
//           .post("/order/create/")
//           .send({
//             laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
//             ordertype_id: "1",
//             servicelist_id: "1",
//             servicelevel_id: "2",
//             weight: "50",
//             item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
//             estimatePrice: "50000asdf",
//             pickUpChoice: "Delivery",
//             pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             delivery_fee: "15000",
//             admin_charge: "20000",
//             totalPrice: "20000",
//             paymentType: "Cash",
//           })
//           .set({
//             Authorization: `Bearer ${tokenCustomer}`,
//           });

//         expect(res.statusCode).toEqual(400);
//         expect(res.body).toBeInstanceOf(Object);
//         expect(res.body.message).toEqual("Estimate Price must be a number");
//       }
//     });

//     it("It should error total price must be number", async () => {
//       if (user.status == "Active") {
//         const res = await request(app)
//           .post("/order/create/")
//           .send({
//             laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
//             ordertype_id: "1",
//             servicelist_id: "1",
//             servicelevel_id: "2",
//             weight: "50",
//             item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
//             estimatePrice: "50000",
//             pickUpChoice: "Delivery",
//             pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             delivery_fee: "15000",
//             admin_charge: "20000",
//             totalPrice: "20000asdf",
//             paymentType: "Cash",
//           })
//           .set({
//             Authorization: `Bearer ${tokenCustomer}`,
//           });

//         expect(res.statusCode).toEqual(400);
//         expect(res.body).toBeInstanceOf(Object);
//         expect(res.body.message).toEqual("Total Price must be a number");
//       }
//     });

//     it("It should error service list ID must be number", async () => {
//       if (user.status == "Active") {
//         const res = await request(app)
//           .post("/order/create/")
//           .send({
//             laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
//             ordertype_id: "1",
//             servicelist_id: "1asdf",
//             servicelevel_id: "2",
//             weight: "50",
//             item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
//             estimatePrice: "50000",
//             pickUpChoice: "Delivery",
//             pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             delivery_fee: "15000",
//             admin_charge: "20000",
//             totalPrice: "20000",
//             paymentType: "Cash",
//           })
//           .set({
//             Authorization: `Bearer ${tokenCustomer}`,
//           });

//         expect(res.statusCode).toEqual(400);
//         expect(res.body).toBeInstanceOf(Object);
//         expect(res.body.message).toEqual("Servicelist ID must be a number");
//       }
//     });

//     it("It should error service level ID must be number", async () => {
//       if (user.status == "Active") {
//         const res = await request(app)
//           .post("/order/create/")
//           .send({
//             laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
//             ordertype_id: "1",
//             servicelist_id: "1",
//             servicelevel_id: "1adfs",
//             weight: "50",
//             item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
//             estimatePrice: "50000",
//             pickUpChoice: "Delivery",
//             pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             delivery_fee: "15000",
//             admin_charge: "20000",
//             totalPrice: "20000",
//             paymentType: "Cash",
//           })
//           .set({
//             Authorization: `Bearer ${tokenCustomer}`,
//           });

//         expect(res.statusCode).toEqual(400);
//         expect(res.body).toBeInstanceOf(Object);
//         expect(res.body.message).toEqual("Servicelevel ID must be a number");
//       }
//     });

//     it("It should error ordertype ID must be number", async () => {
//       if (user.status == "Active") {
//         const res = await request(app)
//           .post("/order/create/")
//           .send({
//             laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
//             ordertype_id: "1asdf",
//             servicelist_id: "1",
//             servicelevel_id: "2",
//             weight: "50",
//             item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
//             estimatePrice: "50000",
//             pickUpChoice: "Delivery",
//             pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             delivery_fee: "15000",
//             admin_charge: "20000",
//             totalPrice: "20000",
//             paymentType: "Cash",
//           })
//           .set({
//             Authorization: `Bearer ${tokenCustomer}`,
//           });

//         expect(res.statusCode).toEqual(400);
//         expect(res.body).toBeInstanceOf(Object);
//         expect(res.body.message).toEqual("Ordertype ID must be a number");
//       }
//     });

//     it("It should error delivery fee must be number", async () => {
//       if (user.status == "Active") {
//         const res = await request(app)
//           .post("/order/create/")
//           .send({
//             laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
//             ordertype_id: "1",
//             servicelist_id: "1",
//             servicelevel_id: "2",
//             weight: "50",
//             item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
//             estimatePrice: "50000",
//             pickUpChoice: "Delivery",
//             pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             delivery_fee: "15000asdfa",
//             admin_charge: "20000",
//             totalPrice: "20000",
//             paymentType: "Cash",
//           })
//           .set({
//             Authorization: `Bearer ${tokenCustomer}`,
//           });

//         expect(res.statusCode).toEqual(400);
//         expect(res.body).toBeInstanceOf(Object);
//         expect(res.body.message).toEqual("Delivery fee must be a number");
//       }
//     });

//     it("It should error admin charge must be number", async () => {
//       if (user.status == "Active") {
//         const res = await request(app)
//           .post("/order/create/")
//           .send({
//             laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
//             ordertype_id: "1",
//             servicelist_id: "1",
//             servicelevel_id: "2",
//             weight: "50",
//             item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
//             estimatePrice: "50000",
//             pickUpChoice: "Delivery",
//             pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             delivery_fee: "15000",
//             admin_charge: "20000asdf",
//             totalPrice: "20000",
//             paymentType: "Cash",
//           })
//           .set({
//             Authorization: `Bearer ${tokenCustomer}`,
//           });

//         expect(res.statusCode).toEqual(400);
//         expect(res.body).toBeInstanceOf(Object);
//         expect(res.body.message).toEqual("Admin Charge must be a number");
//       }
//     });

//     it("It should error Pickup Choice Is Not Valid", async () => {
//       if (user.status == "Active") {
//         const res = await request(app)
//           .post("/order/create/")
//           .send({
//             laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
//             ordertype_id: "1",
//             servicelist_id: "1",
//             servicelevel_id: "2",
//             weight: "50",
//             item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
//             estimatePrice: "50000",
//             pickUpChoice: "Anter ke rumah",
//             pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             delivery_fee: "15000",
//             admin_charge: "20000",
//             totalPrice: "20000",
//             paymentType: "Cash",
//           })
//           .set({
//             Authorization: `Bearer ${tokenCustomer}`,
//           });

//         expect(res.statusCode).toEqual(400);
//         expect(res.body).toBeInstanceOf(Object);
//         expect(res.body.message).toEqual("Pickup Choice Is Not Valid");
//       }
//     });

//     it("It should error Pickup Choice Is Not Valid", async () => {
//       if (user.status == "Active") {
//         const res = await request(app)
//           .post("/order/create/")
//           .send({
//             laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
//             ordertype_id: "1",
//             servicelist_id: "1",
//             servicelevel_id: "2",
//             weight: "50",
//             item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
//             estimatePrice: "50000",
//             pickUpChoice: "Delivery",
//             pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
//             delivery_fee: "15000",
//             admin_charge: "20000",
//             totalPrice: "20000",
//             paymentType: "Duit keras",
//           })
//           .set({
//             Authorization: `Bearer ${tokenCustomer}`,
//           });

//         expect(res.statusCode).toEqual(400);
//         expect(res.body).toBeInstanceOf(Object);
//         expect(res.body.message).toEqual("Payment Type Is Not Valid");
//       }
//     });
//   });
// });
