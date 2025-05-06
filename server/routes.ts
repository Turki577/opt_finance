import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import { z } from "zod";
import { insertContactSubmissionSchema, insertNewsletterSubscriberSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure email transport - for production, use actual SMTP service details
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.example.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER || "user@example.com",
      pass: process.env.SMTP_PASSWORD || "password",
    },
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      // Store in database
      const submission = await storage.createContactSubmission(validatedData);
      
      // Send email notification
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || '"Option Financial Consultancy" <info@optfinance.org>',
          to: process.env.EMAIL_TO || "info@optfinance.org",
          subject: `New Contact Form Submission: ${validatedData.service}`,
          text: `
            Name: ${validatedData.name}
            Email: ${validatedData.email}
            Phone: ${validatedData.phone || "Not provided"}
            Service: ${validatedData.service}
            Message: ${validatedData.message}
          `,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Phone:</strong> ${validatedData.phone || "Not provided"}</p>
            <p><strong>Service:</strong> ${validatedData.service}</p>
            <p><strong>Message:</strong> ${validatedData.message}</p>
          `
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // We still return success to the user since we stored the submission
      }
      
      return res.status(201).json({ 
        success: true, 
        message: "Contact form submitted successfully",
        data: { id: submission.id }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, errors: error.errors });
      }
      console.error("Error submitting contact form:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Newsletter subscription
  app.post("/api/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      const validatedData = insertNewsletterSubscriberSchema.parse({ email });
      
      try {
        // Store in database
        const subscriber = await storage.createNewsletterSubscriber(validatedData);
        
        // Send confirmation email
        try {
          await transporter.sendMail({
            from: process.env.EMAIL_FROM || '"Option Financial Consultancy" <info@optfinance.org>',
            to: email,
            subject: "Thank you for subscribing to our newsletter!",
            text: `
              Thank you for subscribing to our newsletter!
              
              You will now receive updates on our latest financial tips, services, and offers.
              
              If you did not subscribe to this newsletter, please contact us.
              
              Best regards,
              Option Financial Consultancy Team
            `,
            html: `
              <h3>Thank you for subscribing to our newsletter!</h3>
              <p>You will now receive updates on our latest financial tips, services, and offers.</p>
              <p>If you did not subscribe to this newsletter, please contact us.</p>
              <p>Best regards,<br>Option Financial Consultancy Team</p>
            `
          });
        } catch (emailError) {
          console.error("Failed to send subscription confirmation email:", emailError);
          // We still return success to the user since we stored the subscription
        }
        
        return res.status(201).json({ 
          success: true, 
          message: "Subscribed to newsletter successfully" 
        });
      } catch (storageError: any) {
        if (storageError.message === 'Email already subscribed') {
          return res.status(409).json({ 
            success: false, 
            message: "Email is already subscribed to the newsletter" 
          });
        }
        throw storageError;
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, errors: error.errors });
      }
      console.error("Error subscribing to newsletter:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
