"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Users, Heart, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RESTAURANT_INFO } from "@/lib/constants";

export const AboutSection: React.FC = () => {
  const stats = [
    { icon: Award, value: "10+", label: "Years Experience" },
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: Heart, value: "100+", label: "Menu Items" },
    { icon: Clock, value: "7", label: "Days a Week" },
  ];

  return (
    <Section id="about" background="default">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-sm font-medium text-primary">
                Our Story
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-secondary mb-6">
              A Culinary Journey of Passion & Excellence
            </h2>

            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                Founded in 2014, {RESTAURANT_INFO.name} began with a simple
                vision: to create a dining experience that celebrates both
                traditional flavors and modern culinary innovation.
              </p>
              <p>
                Our journey started with a small team of passionate chefs who
                believed that great food brings people together. Today, we&apos;re
                proud to serve thousands of satisfied customers who return not
                just for the food, but for the warmth and authenticity that
                defines our restaurant.
              </p>
              <p>
                Every dish we serve tells a story - from our chef&apos;s heritage
                recipes passed down through generations to innovative creations
                that push the boundaries of flavor. We source only the finest
                ingredients, work with local farmers, and prepare everything
                with the care it deserves.
              </p>
              <p>
                Whether you&apos;re joining us for a casual lunch, a special
                celebration, or a romantic dinner, we&apos;re committed to making
                every visit memorable.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-muted">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=800&fit=crop"
                  alt="Chef preparing food"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=600&fit=crop"
                  alt="Restaurant interior"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&fit=crop"
                  alt="Signature dish"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=800&fit=crop"
                  alt="Culinary team"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Floating Badge */}
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-8 left-8 bg-white rounded-xl shadow-2xl p-6 max-w-[200px]"
            >
              <div className="text-4xl mb-2">🍽️</div>
              <div className="font-semibold text-secondary mb-1">
                Award Winning
              </div>
              <div className="text-sm text-text-muted">
                Best Restaurant 2023
              </div>
            </motion.div> */}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
