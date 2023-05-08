const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const festivalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    date: Date,

    ticketPrice: Number,

    info: {
      type: String,
      required: true,
    },

    festivalImg: {
      type: String,
      required: true,
    },
     // ref: Reference to artist model 
    lineup: [{ type: Schema.Types.ObjectId, ref: "ArtistModel" }], 
    // ref: Reference to user model 
    author: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const FestivalModel = model("festival", festivalSchema);

module.exports = FestivalModel;
