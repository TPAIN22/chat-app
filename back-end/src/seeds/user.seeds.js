import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Female Users
  {
    email: "emma.thompson@example.com",
    name: "Emma Thompson",
    password: "123456",
    avatar: "",
  },
  {
    email: "olivia.miller@example.com",
    name: "Olivia Miller",
    password: "123456",
    avatar: "",
  },
  {
    email: "sophia.davis@example.com",
    name: "Sophia Davis",
    password: "123456",
    avatar: "",
  },
  {
    email: "ava.wilson@example.com",
    name: "Ava Wilson",
    password: "123456",
    avatar: "",
  },
  {
    email: "isabella.brown@example.com",
    name: "Isabella Brown",
    password: "123456",
    avatar: "",
  },
  {
    email: "mia.johnson@example.com",
    name: "Mia Johnson",
    password: "123456",
    avatar: "",
  },
  {
    email: "charlotte.williams@example.com",
    name: "Charlotte Williams",
    password: "123456",
    avatar: "",
  },
  {
    email: "amelia.garcia@example.com",
    name: "Amelia Garcia",
    password: "123456",
    avatar: "",
  },

  // Male Users
  {
    email: "james.anderson@example.com",
    name: "James Anderson",
    password: "123456",
    avatar: ""
  },
  {
    email: "william.clark@example.com",
    name: "William Clark",
    password: "123456",
    avatar: ""
  },
  {
    email: "benjamin.taylor@example.com",
    name: "Benjamin Taylor",
    password: "123456",
    avatar: ""
  },
  {
    email: "lucas.moore@example.com",
    name: "Lucas Moore",
    password: "123456",
    avatar: ""
  },
  {
    email: "henry.jackson@example.com",
    name: "Henry Jackson",
    password: "123456",
    avatar: ""
  },
  {
    email: "alexander.martin@example.com",
    name: "Alexander Martin",
    password: "123456",
    avatar: ""
  },
  {
    email: "daniel.rodriguez@example.com",
    name: "Daniel Rodriguez",
    password: "123456",
    avatar: ""
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();