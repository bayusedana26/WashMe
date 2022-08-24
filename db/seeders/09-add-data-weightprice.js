'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("weightprice", [
      {
        laundry_id: "8d1a2361-0989-4ac2-8ab2-34f60c994fb8",
        servicelist_id: 1,
        servicelevel_id: 1,
        price: 7000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
        servicelist_id: 1,
        servicelevel_id: 1,
        price: 6000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundry_id: "8dd4bf56-bbfd-4e4d-a12b-24b02fe3c30c",
        servicelist_id: 1,
        servicelevel_id: 1,
        price: 6500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundry_id: "9cab2d08-908b-422c-a1dd-a530dc17eb56",
        servicelist_id: 1,
        servicelevel_id: 1,
        price: 8000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundry_id: "3b2e44fc-6c69-405e-b740-890411e6b4a6",
        servicelist_id: 1,
        servicelevel_id: 1,
        price: 7500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        laundry_id: "8d1a2361-0989-4ac2-8ab2-34f60c994fb8",
        servicelist_id: 1,
        servicelevel_id: 2,
        price: 10000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
        servicelist_id: 1,
        servicelevel_id: 2,
        price: 9000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundry_id: "8dd4bf56-bbfd-4e4d-a12b-24b02fe3c30c",
        servicelist_id: 1,
        servicelevel_id: 2,
        price: 9500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundry_id: "9cab2d08-908b-422c-a1dd-a530dc17eb56",
        servicelist_id: 1,
        servicelevel_id: 2,
        price: 11000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundry_id: "3b2e44fc-6c69-405e-b740-890411e6b4a6",
        servicelist_id: 1,
        servicelevel_id: 2,
        price: 10500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        laundry_id: "8d1a2361-0989-4ac2-8ab2-34f60c994fb8",
        servicelist_id: 2,
        servicelevel_id: 1,
        price: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundry_id: "8dd4bf56-bbfd-4e4d-a12b-24b02fe3c30c",
        servicelist_id: 2,
        servicelevel_id: 1,
        price: 4500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundry_id: "3b2e44fc-6c69-405e-b740-890411e6b4a6",
        servicelist_id: 2,
        servicelevel_id: 1,
        price: 5500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        laundry_id: "8d1a2361-0989-4ac2-8ab2-34f60c994fb8",
        servicelist_id: 2,
        servicelevel_id: 2,
        price: 9000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundry_id: "8dd4bf56-bbfd-4e4d-a12b-24b02fe3c30c",
        servicelist_id: 2,
        servicelevel_id: 2,
        price: 8500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundry_id: "3b2e44fc-6c69-405e-b740-890411e6b4a6",
        servicelist_id: 2,
        servicelevel_id: 2,
        price: 9500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
        servicelist_id: 3,
        servicelevel_id: 1,
        price: 3000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundry_id: "9cab2d08-908b-422c-a1dd-a530dc17eb56",
        servicelist_id: 3,
        servicelevel_id: 1,
        price: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundry_id: "3b2e44fc-6c69-405e-b740-890411e6b4a6",
        servicelist_id: 3,
        servicelevel_id: 1,
        price: 4500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        laundry_id: "5c4475c7-f2e2-4b44-bacb-02234a8eac65",
        servicelist_id: 3,
        servicelevel_id: 2,
        price: 7000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundry_id: "9cab2d08-908b-422c-a1dd-a530dc17eb56",
        servicelist_id: 3,
        servicelevel_id: 2,
        price: 9000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        laundry_id: "3b2e44fc-6c69-405e-b740-890411e6b4a6",
        servicelist_id: 3,
        servicelevel_id: 2,
        price: 8500,
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
  }
};
