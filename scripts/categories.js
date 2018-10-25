var categories = [
  {
    name: "concierto",
    level: 1,
    defaultImages: [],
    defaultEventTitle: "",
    subCategory: [
      {
        name: "jazz",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      },
      {
        name: "blues",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      },
      {
        name: "rap",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      },
      {
        name: "pop",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      },
      {
        name: "rock",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      },
      {
        name: "metal",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      },
      {
        name: "funk",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      },
      {
        name: "electronica",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      },
      {
        name: "latino",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      },
      {
        name: "otro",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      }
    ]
  },
  {
    name: "musica en vivo",
    level: 1,
    defaultImages: [],
    defaultEventTitle: "",
    subCategory: [
      {
        name: "latino",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      },
      {
        name: "jazz",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      },
      {
        name: "blues",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      },
      {
        name: "rap",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      },
      {
        name: "pop",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      },
      {
        name: "rock",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      },
      {
        name: "metal",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      },
      {
        name: "funk",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      },
      {
        name: "electronica",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      },
      {
        name: "otro",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      }
    ]
  },
  {
    name: "comedia",
    level: 1,
    defaultImages: [],
    defaultEventTitle: "",
    subCategory: [
      {
        name: "stand up",
        level: 2,
        defaultImages: [],
        defaultEventTitle: "",
        subCategory: [{}]
      }
    ]
  },
  {
    name: "arte",
    level: 1,
    defaultImages: [],
    defaultEventTitle: "",
    subCategory: []
  },
  {
    name: "bebidas",
    level: 1,
    defaultImages: [],
    defaultEventTitle: "",
    subCategory: []
  },
  {
    name: "deporte",
    level: 1,
    defaultImages: [],
    defaultEventTitle: "",
    subCategory: []
  },
  {
    name: "juegos",
    level: 1,
    defaultImages: [],
    defaultEventTitle: "",
    subCategory: []
  },
  {
    name: "religion",
    level: 1,
    defaultImages: [],
    defaultEventTitle: "",
    subCategory: []
  },
  {
    name: "enseñanza",
    level: 1,
    defaultImages: [],
    defaultEventTitle: "",
    subCategory: []
  },
  {
    name: "salud",
    level: 1,
    defaultImages: [],
    defaultEventTitle: "",
    subCategory: []
  },
  {
    name: "tecnologia",
    level: 1,
    defaultImages: [],
    defaultEventTitle: "",
    subCategory: []
  },
  {
    name: "cultural",
    level: 1,
    defaultImages: [],
    defaultEventTitle: "",
    subCategory: []
  },
  {
    name: "festivales",
    level: 1,
    defaultImages: [],
    defaultEventTitle: "",
    subCategory: []
  }
];
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbConfig = require("../config/database");

const url = dbConfig.host;

const dbName = dbConfig.dbName;

const client = new MongoClient(url);


(async () => {
  client.connect(async function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection('categories');
    try{
      var response = await collection.insertMany(categories);
      console.log("Success inserting categories", response);
    } catch (err){
      console.log("Error inserting categories");
    }
    client.close();
  });  
})();