import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Programming",
        "Business",
        "Self Help",
        "Fiction",
        "Biography",
        "Science",
        "History",
      ],
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },
    format:{
type:String,
enum:["Physical","E-Book"],
default:"Physical",
},

    image: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 4.5,
    },
    featured: {
    type: Boolean,
    default: false,
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", bookSchema);