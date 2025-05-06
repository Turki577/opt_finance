import { db } from '@db';
import { eq } from 'drizzle-orm';
import { contactSubmissions, insertContactSubmissionSchema, newsletterSubscribers, insertNewsletterSubscriberSchema } from '@shared/schema';
import { InsertContactSubmission, InsertNewsletterSubscriber } from '@shared/schema';

export const storage = {
  // Contact submission methods
  async createContactSubmission(data: InsertContactSubmission) {
    const validatedData = insertContactSubmissionSchema.parse(data);
    const [submission] = await db.insert(contactSubmissions).values(validatedData).returning();
    return submission;
  },
  
  async getContactSubmissionById(id: number) {
    const submission = await db.query.contactSubmissions.findFirst({
      where: eq(contactSubmissions.id, id)
    });
    return submission;
  },
  
  async getAllContactSubmissions() {
    const submissions = await db.query.contactSubmissions.findMany({
      orderBy: (contactSubmissions, { desc }) => [desc(contactSubmissions.createdAt)]
    });
    return submissions;
  },

  // Newsletter subscriber methods
  async createNewsletterSubscriber(data: InsertNewsletterSubscriber) {
    try {
      const validatedData = insertNewsletterSubscriberSchema.parse(data);
      const [subscriber] = await db.insert(newsletterSubscribers).values(validatedData).returning();
      return subscriber;
    } catch (error: any) {
      // Handle unique constraint violation
      if (error.message.includes('duplicate key value')) {
        throw new Error('Email already subscribed');
      }
      throw error;
    }
  },
  
  async getNewsletterSubscriberByEmail(email: string) {
    const subscriber = await db.query.newsletterSubscribers.findFirst({
      where: eq(newsletterSubscribers.email, email)
    });
    return subscriber;
  },
  
  async getAllNewsletterSubscribers() {
    const subscribers = await db.query.newsletterSubscribers.findMany({
      orderBy: (newsletterSubscribers, { desc }) => [desc(newsletterSubscribers.createdAt)]
    });
    return subscribers;
  }
};
