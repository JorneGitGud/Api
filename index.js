const app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { HttpError } = require("./utils/utils");
const routes = require("./controllers");

const connectDB = async () => {
  try {
      await mongoose.connect("mongodb+srv://Jorne:JorneTest@cluster0.3ppye.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        //options?
      });
      console.log('MongoDB connected!!');
  } catch (err) {
      console.log('Failed to connect to MongoDB', err);
  }
};

connectDB();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(routes)

//error middelware
app.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      error: true,
      message: err.errMessage,
    });
  } else {
    {
      res.status(500).json({
        error: true,
        message: "Server error",
      });
    }
  }
});

app.listen(5000, () => {
  console.log("started listening on port 5000");
});