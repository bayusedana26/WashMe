'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("user", {
      fields: ["email"],
      type: 'unique',
      name: "custom_unique_user_email",
    });
    // await queryInterface.addConstraint("user", {
    //   fields: ["mobile_phone"],
    //   type: 'unique',
    //   name: "custom_unique_user_mobile_phone",
    // });
    await queryInterface.addConstraint("laundry", {
      fields: ["email"],
      type: 'unique',
      name: "custom_unique_laundry_email",
    });
    // await queryInterface.addConstraint("laundry", {
    //   fields: ["mobile_phone"],
    //   type: 'unique',
    //   name: "custom_unique_laundry_mobile_phone",
    // });
    await queryInterface.addConstraint("courier", {
      fields: ["mobile_phone"],
      type: 'unique',
      name: "custom_unique_courier_mobile_phone",
    });
    await queryInterface.addConstraint("item", {
      fields: ["clothes"],
      type: 'unique',
      name: "custom_unique_item",
    });
    await queryInterface.addConstraint("servicelist", {
      fields: ["services"],
      type: 'unique',
      name: "custom_unique_servicelist",
    });
    await queryInterface.addConstraint("ordertype", {
      fields: ["types"],
      type: 'unique',
      name: "custom_unique_ordertype",
    });
    await queryInterface.addConstraint("orderstatus", {
      fields: ["status"],
      type: 'unique',
      name: "custom_unique_orderstatus",
    });
    await queryInterface.addConstraint("servicelevel", {
      fields: ["servicelevel"],
      type: 'unique',
      name: "custom_unique_servicelevel",
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
