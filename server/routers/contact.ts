import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";

export const contactRouter = router({
  submitForm: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        subject: z.string().min(5, "Subject must be at least 5 characters"),
        message: z.string().min(10, "Message must be at least 10 characters"),
        phone: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Send notification to organization owner
        const notificationSent = await notifyOwner({
          title: `New Contact Form Submission from ${input.name}`,
          content: `
Name: ${input.name}
Email: ${input.email}
Phone: ${input.phone || "Not provided"}
Subject: ${input.subject}

Message:
${input.message}
          `.trim(),
        });

        if (!notificationSent) {
          console.warn("Failed to send notification to owner");
        }

        return {
          success: true,
          message: "Thank you for reaching out! We'll get back to you soon.",
        };
      } catch (error) {
        console.error("Error submitting contact form:", error);
        throw new Error("Failed to submit contact form. Please try again later.");
      }
    }),
});
