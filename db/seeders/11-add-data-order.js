"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("order", [
      {
        id: "4de0d5c5-2deb-46ef-abf0-038ddd9f10c0",
        user_id: "d96e2f15-52ef-40ec-932c-1003d9249869",
        laundry_id: "8d1a2361-0989-4ac2-8ab2-34f60c994fb8",
        ordertype_id: 1,
        servicelist_id: 1,
        servicelevel_id: 1,
        weight: null,
        item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
        estimateFinish: "2021-10-05",
        estimatePrice: 11000,
        pickUpChoice: 'Delivery',
        pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
        deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
        delivery_fee: 5000,
        totalPrice: 22000,
        paymentStatus: 'Paid',
        paymentImage: null,
        paymentType: 'Debit/credit card',
        orderstatus_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4de0d5c5-2deb-46ef-abf0-038ddd9f10c1",
        user_id: "d96e2f15-52ef-40ec-932c-1003d9249870",
        laundry_id: "8d1a2361-0989-4ac2-8ab2-34f60c994fb8",
        ordertype_id: 1,
        servicelist_id: 1,
        servicelevel_id: 1,
        weight: null,
        item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
        estimateFinish: '2021-10-05',
        estimatePrice: 11000,
        pickUpChoice: 'Delivery',
        pickUpAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
        deliveryAddress: `{"address": "Gang buntu", "note": "depan gang"}`,
        delivery_fee: 5000,
        totalPrice: 22000,
        paymentStatus: 'Unpaid',
        paymentImage: null,
        paymentType: "Cash",
        orderstatus_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4de0d5c5-2deb-46ef-abf0-038ddd9f10c2",
        user_id: "d96e2f15-52ef-40ec-932c-1003d9249870",
        laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
        ordertype_id: 1,
        servicelist_id: 2,
        servicelevel_id: 2,
        weight: null,
        item: `[{"id": 1, "quantity": 5}, {"id": 3, "quantity": 3}]`,
        estimateFinish: "2021-10-05",
        estimatePrice: 11000,
        pickUpChoice: "Delivery",
        pickUpAddress: `{"type": "Point", "coordinates": [-2.8999946,104.6978113], "formattedAddress": "Sukarami, Kota Palembang, Sumatera Selatan", "street": "Jl. Masjid Al Gazali", "city": "Kota Palembang", "province": "Sumatera Selatan", "zipcode": "30128", "country": "Indonesia"}`,
        deliveryAddress: `{"type": "Point", "coordinates": [-2.8999946,104.6978113], "formattedAddress": "Sukarami, Kota Palembang, Sumatera Selatan", "street": "Jl. Masjid Al Gazali", "city": "Kota Palembang", "province": "Sumatera Selatan", "zipcode": "30129", "country": "Indonesia"}`,
        delivery_fee: 5000,
        totalPrice: 22000,
        paymentStatus: "Unpaid",
        paymentImage: null,
        paymentType: "Debit/credit card",
        orderstatus_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
