import request from "supertest";
import express from "express";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import bcrypt from "bcryptjs";

// Mock User model
jest.mock("./models/user", () => ({
  findOne: jest.fn(),
  findById: jest.fn(),
  prototype: {},
}));
import User from "./models/user";

// Import your server setup (refactor server.ts to export app for testing)
import { app } from "./server"; // You may need to export 'app' from server.ts

describe("Auth API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
	jest.spyOn(bcrypt, "hash").mockResolvedValue("hashedPassword");
  });

  test("GET /loginsuccess returns success message", async () => {
    const res = await request(app).get("/loginsuccess");
    expect(res.text).toBe("Login success");
    expect(res.status).toBe(200);
  });

  test("GET /loginfailure returns failure message", async () => {
    const res = await request(app).get("/loginfailure");
    expect(res.text).toBe("Login Failed");
    expect(res.status).toBe(200);
  });

  // test("POST /register creates a new user", async () => {
  //   (User.prototype.save as jest.Mock) = jest.fn().mockResolvedValue({});
  //   const res = await request(app)
  //     .post("/register")
  //     .send({ email: "test@example.com", password: "password123" });
  //   expect(res.status).toBe(201);
  //   expect(res.text).toBe("User registered");
  // });

  test("POST /register handles errors", async () => {
    (User.prototype.save as jest.Mock) = jest.fn().mockRejectedValue(new Error("fail"));
    const res = await request(app)
      .post("/register")
      .send({ email: "test@example.com", password: "password123" });
    expect(res.status).toBe(500);
    expect(res.text).toBe("Error registering user");
  });
});