"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("laundry", [
      {
        id: "8d1a2361-0989-4ac2-8ab2-34f60c994fb8",
        name: "Laundry Sayang",
        email: "laundrysayang@example.com",
        password: "laundrysayang",
        mobile_phone: "081212345678",
        address: `{"type": "Point", "coordinates": [-2.983464, 104.735353], "formattedAddress": "Jl. Masjid Al Gazali, Bukit Lama, Kec. Ilir Bar. I, Kota Palembang, Sumatera Selatan", "street": "Jl. Masjid Al Gazali", "city": "Kota Palembang", "province": "Sumatera Selatan", "zipcode": "30128", "country": "Indonesia"}`,
        pickUpAndDelivery: true,
        courier_id: 1,
        total_services: 14,
        by_item: true,
        by_weight: true,
        total_review: 54,
        average_rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
        name: "Laundry Cinta",
        email: "laundrycinta@example.com",
        password: "laundrycinta",
        mobile_phone: "081298765432",
        address: `{"type": "Point","coordinates": [-2.985333, 104.744691],"formattedAddress": "Lorong Batu Karang 1156, 26 Ilir, Kec. Bukit Kecil, Kota Palembang, Sumatera Selatan","street": "Lorong Batu Karang","city": "Kota Palembang","province": "Sumatera Selatan","zipcode": "30121","country": "Indonesia"}`,
        pickUpAndDelivery: true,
        courier_id: 2,
        total_services: 14,
        by_item: true,
        by_weight: true,
        total_review: 70,
        average_rating: 4.4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "8dd4bf56-bbfd-4e4d-a12b-24b02fe3c30c",
        name: "Laundry Kita",
        email: "laundrykita@example.com",
        password: "laundrykita",
        mobile_phone: "08129812763450",
        address: `{"type": "Point","coordinates": [-2.983161, 104.747016],"formattedAddress": "Gg. Santai, 26 Ilir, Kec. Bukit Kecil, Kota Palembang, Sumatera Selatan","street": "Gg. Santai","city": "Kota Palembang","province": "Sumatera Selatan","zipcode": "30127","country": "Indonesia"}`,
        pickUpAndDelivery: true,
        courier_id: 3,
        total_services: 14,
        by_item: true,
        by_weight: true,
        total_review: 37,
        average_rating: 4.8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "9cab2d08-908b-422c-a1dd-a530dc17eb56",
        name: "Laundry Kamu",
        email: "laundrykamu@example.com",
        password: "laundrykamu",
        mobile_phone: "081265418034",
        address: `{"type": "Point","coordinates": [-2.979175, 104.737317],"formattedAddress": "Jl. Puncak Sekuning 1043-48, Lorok Pakjo, Kec. Ilir Bar. I, Kota Palembang, Sumatera Selatan","street": "Jl. Puncak Sekuning","city": "Kota Palembang","province": "Sumatera Selatan","zipcode": "30126","country": "Indonesia"}`,
        pickUpAndDelivery: true,
        courier_id: 4,
        total_services: 14,
        by_item: true,
        by_weight: true,
        total_review: 62,
        average_rating: 4.7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3b2e44fc-6c69-405e-b740-890411e6b4a6",
        name: "Laundry Happy",
        email: "laundryhappy@example.com",
        password: "laundryhappy",
        mobile_phone: "081276142308",
        address: `{"type": "Point","coordinates": [-2.975527, 104.740445],"formattedAddress": "Jl. Cakram 6-3, Lorok Pakjo, Kec. Ilir Bar. I, Kota Palembang, Sumatera Selatan","street": "Jl. Cakram","city": "Kota Palembang","province": "Sumatera Selatan","zipcode": "30121","country": "Indonesia"}`,
        pickUpAndDelivery: true,
        courier_id: 5,
        total_services: 14,
        by_item: true,
        by_weight: true,
        total_review: 128,
        average_rating: 4.1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "19624f15-8efa-499f-a4ef-433e64b399e1",
        name: "Istana Sepatu",
        email: "istanasepatu@example.com",
        password: "istanasepatu",
        mobile_phone: "081276142308",
        address: `{"type": "Point","coordinates": [-2.975527, 104.740445],"formattedAddress": "Jl. Cakram 6-3, Lorok Pakjo, Kec. Ilir Bar. I, Kota Palembang, Sumatera Selatan","street": "Jl. Cakram","city": "Kota Palembang","province": "Sumatera Selatan","zipcode": "30121","country": "Indonesia"}`,
        pickUpAndDelivery: true,
        courier_id: 5,
        total_services: 1,
        by_item: true,
        by_weight: false,
        total_review: 18,
        average_rating: 4.3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "37790040-68b5-44b4-935f-cb2dd4a7f386",
        name: "Shoes Care",
        email: "shoescare@example.com",
        password: "shoescare",
        mobile_phone: "081276142308",
        address: `{"type": "Point","coordinates": [-2.975527, 104.740445],"formattedAddress": "Jl. Cakram 6-3, Lorok Pakjo, Kec. Ilir Bar. I, Kota Palembang, Sumatera Selatan","street": "Jl. Cakram","city": "Kota Palembang","province": "Sumatera Selatan","zipcode": "30121","country": "Indonesia"}`,
        pickUpAndDelivery: true,
        courier_id: 5,
        total_services: 1,
        by_item: true,
        by_weight: false,
        total_review: 12,
        average_rating: 4.0,
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
