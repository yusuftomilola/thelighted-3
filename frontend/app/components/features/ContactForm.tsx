"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { RESTAURANT_INFO } from "@/lib/constants";
import {
  isRestaurantOpen,
  getNextOpeningTime,
  generateWhatsAppLink,
} from "@/lib/utils";
import { contactApi } from "@/lib/api/api";
import { toast } from "sonner";

// Validation Schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const isOpen = isRestaurantOpen(RESTAURANT_INFO.openingHours);

  const handleWhatsAppOrder = () => {
    const whatsappLink = generateWhatsAppLink(RESTAURANT_INFO.whatsapp, []);
    window.open(whatsappLink, "_blank");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<ContactFormData>();

  const validateForm = (data: ContactFormData): boolean => {
    let isValid = true;

    if (data.name.length < 2) {
      setError("name", { message: "Name must be at least 2 characters" });
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setError("email", { message: "Invalid email address" });
      isValid = false;
    }

    if (data.subject.length < 3) {
      setError("subject", { message: "Subject must be at least 3 characters" });
      isValid = false;
    }

    if (data.message.length < 10) {
      setError("message", {
        message: "Message must be at least 10 characters",
      });
      isValid = false;
    }

    return isValid;
  };

  const onSubmit = async (data: ContactFormData) => {
    if (!validateForm(data)) return;

    setIsSubmitting(true);

    try {
      // In production, this would call the API
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      await contactApi.submit(data);
      toast.success("Form submitted successfully. We will be in touch soon😊");
      setIsSuccess(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" background="default">
      <Container>
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl font-bold text-secondary mb-4"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            Have a question or want to make a reservation? We&apos;d love to hear
            from you!
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-serif text-2xl font-bold text-secondary mb-6">
              Contact Information
            </h3>

            <div className="space-y-6">
              <Card className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-secondary mb-1">
                      Phone (Call)
                    </h4>
                    <a
                      href={`tel:${RESTAURANT_INFO.phone}`}
                      className="text-text-muted hover:text-primary transition-colors"
                    >
                      {RESTAURANT_INFO.phone}
                    </a>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary mb-1">
                      WhatsApp
                    </h4>
                    <button
                      onClick={handleWhatsAppOrder}
                      className="text-text-muted hover:text-primary transition-colors cursor-pointer"
                    >
                      {RESTAURANT_INFO.whatsapp}
                    </button>
                  </div>
                </div>
              </Card>

              <Card className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary mb-1">Email</h4>
                  <a
                    href={`mailto:${RESTAURANT_INFO.email}`}
                    className="text-text-muted hover:text-primary transition-colors"
                  >
                    {RESTAURANT_INFO.email}
                  </a>
                </div>
              </Card>

              <Card className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary mb-1">Address</h4>
                  <p className="text-text-muted">
                    {RESTAURANT_INFO.address.street}
                    <br />
                    {RESTAURANT_INFO.address.city},{" "}
                    {RESTAURANT_INFO.address.state}
                  </p>
                </div>
              </Card>

              <Card className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary mb-1">Hours</h4>
                  <p className={isOpen ? "text-green-600" : "text-red-600"}>
                    {isOpen
                      ? "Open Now"
                      : `Opens ${getNextOpeningTime(
                          RESTAURANT_INFO.openingHours
                        )}`}
                  </p>
                </div>
              </Card>
            </div>

            {/* Map */}
            <div className="mt-8 rounded-xl overflow-hidden shadow-lg h-64 bg-gray-200">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.9!2d${RESTAURANT_INFO.coordinates?.lng}!3d${RESTAURANT_INFO.coordinates?.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDQnMzUuNCJOIDfCsDIzJzU1LjAiRQ!5e0!3m2!1sen!2sng!4v1234567890123!5m2!1sen!2sng`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant location map"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <h3 className="font-serif text-2xl font-bold text-secondary mb-6">
                Send Us a Message
              </h3>

              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-800">
                    Message sent successfully! We&apos;ll get back to you soon.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  label="Name"
                  {...register("name")}
                  error={errors.name?.message}
                  required
                  placeholder="Your full name"
                />

                <Input
                  label="Email"
                  type="email"
                  {...register("email")}
                  error={errors.email?.message}
                  required
                  placeholder="your.email@example.com"
                />

                <Input
                  label="Phone (Optional)"
                  type="tel"
                  {...register("phone")}
                  error={errors.phone?.message}
                  placeholder="+234-XXX-XXX-XXXX"
                />

                <Input
                  label="Subject"
                  {...register("subject")}
                  error={errors.subject?.message}
                  required
                  placeholder="What is this regarding?"
                />

                <Textarea
                  label="Message"
                  {...register("message")}
                  error={errors.message?.message}
                  required
                  rows={6}
                  placeholder="Tell us more about your inquiry..."
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                >
                  {!isSubmitting && <Send className="w-5 h-5 mr-2" />}
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
