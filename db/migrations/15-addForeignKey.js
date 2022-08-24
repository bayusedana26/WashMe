"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("laundry", {
      fields: ["courier_id"],
      type: "foreign key",
      name: "fkey_courier_laundry",
      references: {
        table: "courier",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("order", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fkey_user_order",
      references: {
        table: "user",
        field: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    });
    await queryInterface.addConstraint("order", {
      fields: ["laundry_id"],
      type: "foreign key",
      name: "fkey_laundry_order",
      references: {
        table: "laundry",
        field: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    });
    await queryInterface.addConstraint("order", {
      fields: ["servicelist_id"],
      type: "foreign key",
      name: "fkey_servicelist_order",
      references: {
        table: "servicelist",
        field: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    });
    await queryInterface.addConstraint("order", {
      fields: ["orderstatus_id"],
      type: "foreign key",
      name: "fkey_orderstatus_order",
      references: {
        table: "orderstatus",
        field: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    });
    await queryInterface.addConstraint("order", {
      fields: ["ordertype_id"],
      type: "foreign key",
      name: "fkey_ordertype_order",
      references: {
        table: "ordertype",
        field: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    });
    await queryInterface.addConstraint("order", {
      fields: ["servicelevel_id"],
      type: "foreign key",
      name: "fkey_servicelevel_order",
      references: {
        table: "servicelevel",
        field: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    });
    // await queryInterface.addConstraint("order", {
    //   fields: ["item_id"],
    //   type: "foreign key",
    //   name: "fkey_item_order",
    //   references: {
    //     table: "item",
    //     field: "id",
    //   },
    //   onUpdate: "cascade",
    //   onDelete: "cascade",
    // });
    await queryInterface.addConstraint("weightprice", {
      fields: ["laundry_id"],
      type: "foreign key",
      name: "fkey_laundry_weightprice",
      references: {
        table: "laundry",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("weightprice", {
      fields: ["servicelist_id"],
      type: "foreign key",
      name: "fkey_servicelist_weightprice",
      references: {
        table: "servicelist",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("weightprice", {
      fields: ["servicelevel_id"],
      type: "foreign key",
      name: "fkey_servicelevel_weightprice",
      references: {
        table: "servicelevel",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("itemprice", {
      fields: ["laundry_id"],
      type: "foreign key",
      name: "fkey_laundry_itemprice",
      references: {
        table: "laundry",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("itemprice", {
      fields: ["servicelist_id"],
      type: "foreign key",
      name: "fkey_servicelist_itemprice",
      references: {
        table: "servicelist",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("itemprice", {
      fields: ["servicelevel_id"],
      type: "foreign key",
      name: "fkey_servicelevel_itemprice",
      references: {
        table: "servicelevel",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("itemprice", {
      fields: ["item_id"],
      type: "foreign key",
      name: "fkey_item_itemprice",
      references: {
        table: "item",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("cart", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fkey_user_cart",
      references: {
        table: "user",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("cart", {
      fields: ["laundry_id"],
      type: "foreign key",
      name: "fkey_laundry_cart",
      references: {
        table: "laundry",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("cart", {
      fields: ["servicelist_id"],
      type: "foreign key",
      name: "fkey_servicelist_cart",
      references: {
        table: "servicelist",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("cart", {
      fields: ["ordertype_id"],
      type: "foreign key",
      name: "fkey_ordertype_cart",
      references: {
        table: "ordertype",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("cart", {
      fields: ["servicelevel_id"],
      type: "foreign key",
      name: "fkey_servicelevel_cart",
      references: {
        table: "servicelevel",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("review", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fkey_user_review",
      references: {
        table: "user",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("review", {
      fields: ["laundry_id"],
      type: "foreign key",
      name: "fkey_laundry_review",
      references: {
        table: "laundry",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("favorite", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fkey_user_favorite",
      references: {
        table: "user",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("favorite", {
      fields: ["laundry_id"],
      type: "foreign key",
      name: "fkey_laundry_favorite",
      references: {
        table: "laundry",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
