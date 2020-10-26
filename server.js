// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// reservation data
const reservations = [];

// wait list
const waitlist = [];

// Routes
// Displays all reservations
app.get("/api/reservations", (req, res) => {
  return res.json(reservations);
});

// Displays all waitlists
app.get("/api/waitlist", (req, res) => {
  return res.json(waitlist);
});

// Create reservation
app.post("/api/reservations", (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.routeName = newReservation.name
    .replace(/\s+/g, "")
    .toLowerCase();

  console.log(newReservation);

  if (reservations.length < 5) {
    reservations.push(newReservation);
  } else {
    waitlist.push(newReservation);
  }

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
