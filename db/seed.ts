import { db } from "./index";
import * as schema from "@shared/schema";

async function seed() {
  try {
    console.log("Starting database seed...");

    // Check if we already have users, if not create a demo admin user
    const existingUsers = await db.query.users.findMany();
    if (existingUsers.length === 0) {
      console.log("Seeding admin user...");
      await db.insert(schema.users).values({
        username: "admin",
        password: "$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm", // Password: "password" (hashed)
      });
    } else {
      console.log("Users already exist, skipping user seed");
    }

    // You could add sample contact submissions for testing, but generally not needed in production
    // We'll leave this commented out as it's not typically needed in a production app
    /*
    const existingSubmissions = await db.query.contactSubmissions.findMany();
    if (existingSubmissions.length === 0) {
      console.log("Seeding sample contact submissions...");
      await db.insert(schema.contactSubmissions).values([
        {
          name: "محمد أحمد",
          email: "mohammed@example.com",
          phone: "+966501234567",
          service: "personal-planning",
          message: "أرغب في الحصول على استشارة حول التخطيط المالي الشخصي."
        },
        {
          name: "سارة عبدالله",
          email: "sara@example.com",
          phone: "+966559876543",
          service: "investment-consulting",
          message: "أبحث عن استشارة في مجال الاستثمار."
        }
      ]);
    }
    */

    console.log("Database seed completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
