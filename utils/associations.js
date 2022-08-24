const {
  user,
  laundry,
  item,
  itemprice,
  order,
  orderstatus,
  ordertype,
  servicelevel,
  servicelist,
  weightprice,
  cart,
  favorite,
  courier,
} = require("../db/models");

// relasi
laundry.hasMany(itemprice, { foreignKey: "laundry_id" });
itemprice.belongsTo(laundry, { foreignKey: "laundry_id" });

laundry.hasMany(weightprice, { foreignKey: "laundry_id" });
weightprice.belongsTo(laundry, { foreignKey: "laundry_id" });

servicelist.hasMany(itemprice, { foreignKey: "servicelist_id" });
itemprice.belongsTo(servicelist, { foreignKey: "servicelist_id" });

servicelist.hasMany(weightprice, { foreignKey: "servicelist_id" });
weightprice.belongsTo(servicelist, { foreignKey: "servicelist_id" });

servicelevel.hasMany(itemprice, { foreignKey: "servicelevel_id" });
itemprice.belongsTo(servicelevel, { foreignKey: "servicelevel_id" });

servicelevel.hasMany(weightprice, { foreignKey: "servicelevel_id" });
weightprice.belongsTo(servicelevel, { foreignKey: "servicelevel_id" });

item.hasMany(itemprice, { foreignKey: "item_id" });
itemprice.belongsTo(item, { foreignKey: "item_id" });

user.hasMany(order, { foreignKey: "user_id" });
order.belongsTo(user, { foreignKey: "user_id" });

laundry.hasMany(order, { foreignKey: "laundry_id" });
order.belongsTo(laundry, { foreignKey: "laundry_id" });

ordertype.hasMany(order, { foreignKey: "ordertype_id" });
order.belongsTo(ordertype, { foreignKey: "ordertype_id" });

servicelist.hasMany(order, { foreignKey: "servicelist_id" });
order.belongsTo(servicelist, { foreignKey: "servicelist_id" });

servicelevel.hasMany(order, { foreignKey: "servicelevel_id" });
order.belongsTo(servicelevel, { foreignKey: "servicelevel_id" });

//item.hasMany(order, {foreignKey: `item`});
//order.belongsTo(item, {foreignKey: `item`});

orderstatus.hasMany(order, { foreignKey: "orderstatus_id" });
order.belongsTo(orderstatus, { foreignKey: "orderstatus_id" });

user.hasMany(cart, { foreignKey: "user_id" });
cart.belongsTo(user, { foreignKey: "user_id" });

user.hasMany(favorite, { foreignKey: "user_id" });
favorite.belongsTo(user, { foreignKey: "user_id" });

laundry.hasMany(cart, { foreignKey: "laundry_id" });
cart.belongsTo(laundry, { foreignKey: "laundry_id" });

laundry.hasMany(favorite, { foreignKey: "laundry_id" });
favorite.belongsTo(laundry, { foreignKey: "laundry_id" });

ordertype.hasMany(cart, { foreignKey: "ordertype_id" });
cart.belongsTo(ordertype, { foreignKey: "ordertype_id" });

servicelist.hasMany(cart, { foreignKey: "servicelist_id" });
cart.belongsTo(servicelist, { foreignKey: "servicelist_id" });

servicelevel.hasMany(cart, { foreignKey: "servicelevel_id" });
cart.belongsTo(servicelevel, { foreignKey: "servicelevel_id" });

courier.hasMany(laundry, { foreignKey: "courier_id" });
laundry.belongsTo(courier, { foreignKey: "courier_id" });
