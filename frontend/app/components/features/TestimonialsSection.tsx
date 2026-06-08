"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import type { Testimonial } from "@/lib/types";
import { SAMPLE_TESTIMONIALS } from "@/lib/constants";

export const TestimonialsSection: React.FC = () => {
  return (
    <Section id="testimonials" background="gray">
      <Container>
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl font-bold text-secondary mb-4"
          >
            What Our Guests Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            Don&apos;t just take our word for it - hear from our satisfied customers
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center"
        >
          <div className="flex items-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-primary text-primary" />
            ))}
          </div>
          <p className="text-2xl font-bold text-secondary">4.9 out of 5</p>
          <p className="text-text-muted">Based on 500+ reviews</p>
        </motion.div>
      </Container>
    </Section>
  );
};

const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  index: number;
}> = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col">
        {/* Quote Icon */}
        <div className="mb-4">
          <Quote className="w-8 h-8 text-primary opacity-20" />
        </div>

        {/* Rating */}
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating
                  ? "fill-primary text-primary"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Comment */}
        <p className="text-text-muted mb-4 flex-grow leading-relaxed">
          &quot;{testimonial.comment}&quot;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {testimonial.name.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-semibold text-secondary">
              {testimonial.name}
            </div>
            {testimonial.role && (
              <div className="text-sm text-text-muted">{testimonial.role}</div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
