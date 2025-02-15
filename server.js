const app = require("./app");

const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONTACTS_DB)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, async () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
