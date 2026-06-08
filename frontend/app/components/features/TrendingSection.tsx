// frontend/src/components/features/TrendingSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Crown, Flame } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { useTrendingSection } from "@/lib/hooks/useTrending";

export const TrendingSection: React.FC = () => {
  const {
    items,
    isChefsFavorites,
    totalInteractions,
    isLoading,
    error,
    refetch,
  } = useTrendingSection();

  // Show loading state
  if (isLoading) {
    return (
      <Section id="trending" background="gray">
        <Container>
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-text-muted">Loading trending items...</p>
          </div>
        </Container>
      </Section>
    );
  }

  // Show error state with option to retry
  if (error) {
    return (
      <Section id="trending" background="gray">
        <Container>
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">
              {error instanceof Error
                ? error.message
                : "Failed to load trending items"}
            </p>
            <button
              onClick={() => refetch()}
              className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </Container>
      </Section>
    );
  }

  // Don't render if no items
  if (items.length === 0) {
    return null;
  }

  return (
    <Section id="trending" background="gray">
      <Container>
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4"
          >
            {isChefsFavorites ? (
              <>
                <Crown className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Chef&apos;s Favorites
                </span>
              </>
            ) : (
              <>
                <Flame className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">
                  What&apos;s Trending Now
                </span>
              </>
            )}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold text-secondary mb-4"
          >
            {isChefsFavorites
              ? "Our Chef's Top Picks"
              : "Most Ordered This Week"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            {isChefsFavorites
              ? "Handpicked by our culinary experts for exceptional taste and quality"
              : "See what other food lovers are ordering right now"}
          </motion.p>
        </div>

        {/* Trending Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative">
                {/* Ranking Badge */}
                <div className="absolute -top-3 -left-3 z-10 w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {index + 1}
                  </span>
                </div>
                <MenuItemCard item={item} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Activity Indicator */}
        {!isChefsFavorites && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 text-sm text-text-muted">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Live updates • {totalInteractions}+ orders this week</span>
            </div>
          </motion.div>
        )}
      </Container>
    </Section>
  );
};
