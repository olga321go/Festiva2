const ArtistModel = require("../models/Artist.model");

// first thing when seeding is to connect to the DB
require("../db");

// To insert in "seeds/movies.seed.js"

const artists = [
  {
    name: "Ariana Grande",
  },
  {
    name: "Lady Gaga",
  },
  {
    name: "Billie Eilish",
  },
  {
    name: "Rihanna",
  },
  {
    name: "Harry Styles",
  },
  {
    name: "Doja Cat",
  },
  {
    name: "Lorde",
  },
  {
    name: "Britney Spears",
  },
  {
    name: "Katy Perry",
  },
  {
    name: "Miley Cyrus",
  },
  {
    name: "Dua Lipa",
  },
  {
    name: "Charli XCX",
  },
  {
    name: "Madonna",
  },
  {
    name: "Olivia Rodrigo",
  },
  {
    name: "One Direction",
  },
  {
    name: "Justin Bieber",
  },
  {
    name: "Bruno Mars",
  },
  {
    name: "Halsey",
  },
  {
    name: "Selena Gomez",
  },
  {
    name: "Elton John",
  },
 
];

// Add here the script that will be run to actually seed the database (feel free to refer to the previous lesson)

// ... your code here

const seedDB = async () => {
  try {
    const seededArtists = await ArtistModel.insertMany(artists);
    console.log("Great job, the DB is now seeded", seededArtists);
  } catch (err) {
    console.log("there was a problem seeding", err);
  }
};
seedDB();