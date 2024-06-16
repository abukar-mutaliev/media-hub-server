const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

class AdPrice extends Model {}

AdPrice.init(
  {
    ad_price_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    repost: DataTypes.FLOAT,
    video_integration: DataTypes.FLOAT,
    video_ad_by_user: DataTypes.FLOAT,
    instagram_story_ad: DataTypes.FLOAT,
    instagram_reels_ad: DataTypes.FLOAT,
  },
  {
    sequelize,
    modelName: "AdPrice",
  }
);

module.exports = AdPrice;
