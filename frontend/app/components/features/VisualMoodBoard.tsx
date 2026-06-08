// frontend/src/components/features/VisualMoodBoard.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import type { MoodTag, MenuItem } from "@/lib/types";
import { MOOD_OPTIONS, RESTAURANT_INFO } from "@/lib/constants";
import { cn, generateWhatsAppLink } from "@/lib/utils";
import Link from "next/link";
import { useMenuItems } from "@/lib/hooks/useMenuItems";

export const VisualMoodBoard: React.FC = () => {
  const [selectedMoods, setSelectedMoods] = useState<MoodTag[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Use React Query hook
  const { data: menuItems = [], isLoading, error, refetch } = useMenuItems();

  const handleViewMenu = () => {
    window.location.href = "/menu";
  };

  const handleWhatsAppOrder = () => {
    const whatsappLink = generateWhatsAppLink(RESTAURANT_INFO.whatsapp, []);
    window.open(whatsappLink, "_blank");
  };

  const toggleMood = (moodId: MoodTag) => {
    let newMoods: MoodTag[];

    if (selectedMoods.includes(moodId)) {
      newMoods = selectedMoods.filter((id) => id !== moodId);
    } else {
      // Limit to 3 moods
      if (selectedMoods.length >= 3) {
        newMoods = [...selectedMoods.slice(1), moodId];
      } else {
        newMoods = [...selectedMoods, moodId];
      }
    }

    setSelectedMoods(newMoods);

    // Filter menu items
    if (newMoods.length === 0) {
      setFilteredItems([]);
      setShowResults(false);
    } else {
      const filtered = menuItems.filter((item) =>
        item.moodTags?.some((tag) => newMoods.includes(tag))
      );
      setFilteredItems(filtered);
      setShowResults(true);
    }
  };

  const handleShare = async () => {
    setShowShareModal(true);
  };

  const buildShareContent = () => {
    const moodNames = selectedMoods
      .map((id) => MOOD_OPTIONS.find((opt) => opt.id === id)?.label)
      .join(", ");

    const dishList = filteredItems
      .slice(0, 5)
      .map((item) => `• ${item.name}`)
      .join("\n");

    const moreText =
      filteredItems.length > 5
        ? `\n...and ${filteredItems.length - 5} more dishes!`
        : "";

    const shareText = `I'm in the mood for ${moodNames} food at Savoria Restaurant! 🍽️\n\nPerfect matches:\n${dishList}${moreText}`;

    const url = new URL("/explore", window.location.origin);
    selectedMoods.forEach((mood) => {
      url.searchParams.append("mood", mood);
    });

    const imageUrl = filteredItems[0]?.image || "";

    return { shareText, url: url.toString(), imageUrl };
  };

  const shareToSocial = (platform: string) => {
    const { shareText, url } = buildShareContent();
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(url);

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedText}%0A%0A${encodedUrl}`;
        break;
      case "instagram":
        navigator.clipboard.writeText(`${shareText}\n\n${url}`);
        alert(
          "Content copied to clipboard! 📋\n\nOpen Instagram and paste it in your story or post."
        );
        setShowShareModal(false);
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
      setShowShareModal(false);
    }
  };

  const handleReset = () => {
    setSelectedMoods([]);
    setFilteredItems([]);
    setShowResults(false);
  };

  // Load moods from URL on component mount
  useEffect(() => {
    if (menuItems.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    const moodParams = params.getAll("mood") as MoodTag[];

    if (moodParams.length > 0) {
      const validMoods = moodParams.filter((mood) =>
        MOOD_OPTIONS.some((opt) => opt.id === mood)
      );

      if (validMoods.length > 0) {
        setSelectedMoods(validMoods);

        const filtered = menuItems.filter((item) =>
          item.moodTags?.some((tag) => validMoods.includes(tag))
        );
        setFilteredItems(filtered);
        setShowResults(true);
      }
    }
  }, [menuItems]);

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4"
          >
            What&apos;s Your Food Mood?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto"
          >
            Based on what you are in a mood for, discover dishes that match your
            vibe. Order or Share your perfect combination!
          </motion.p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-text-muted">Loading mood options...</p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="text-center py-12">
            <div className="text-5xl mb-4">😕</div>
            <h3 className="font-serif text-2xl font-bold text-secondary mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-text-muted mb-6">
              {error instanceof Error
                ? error.message
                : "Failed to load menu items"}
            </p>
            <button
              onClick={() => refetch()}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Mood Selection */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
              {MOOD_OPTIONS.map((mood, index) => {
                const isSelected = selectedMoods.includes(mood.id);

                return (
                  <motion.button
                    key={mood.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleMood(mood.id)}
                    className={cn(
                      "relative p-6 rounded-2xl transition-all duration-300",
                      "border-4 border-transparent",
                      mood.gradient,
                      isSelected
                        ? "ring-4 ring-white ring-offset-4 ring-offset-primary shadow-2xl"
                        : "opacity-70 hover:opacity-100"
                    )}
                  >
                    <div className="text-center text-white">
                      <div className="text-5xl mb-3">{mood.emoji}</div>
                      <div className="font-bold text-lg mb-1">{mood.label}</div>
                      <div className="text-sm opacity-90">
                        {mood.description}
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                        >
                          <span className="text-primary font-bold">
                            {selectedMoods.indexOf(mood.id) + 1}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>

            {/* Action Buttons */}
            {selectedMoods.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
              >
                <Button onClick={handleShare} variant="primary" size="lg">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share My Mood
                </Button>
                <Button onClick={handleReset} variant="outline" size="lg">
                  <X className="w-5 h-5 mr-2" />
                  Clear Selection
                </Button>
              </motion.div>
            )}

            {/* Results */}
            <AnimatePresence>
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center mb-8">
                    <h2 className="font-serif text-3xl font-bold text-secondary mb-2">
                      Your Perfect Matches
                    </h2>
                    <p className="text-text-muted">
                      Found {filteredItems.length} dishes that match your mood
                    </p>
                  </div>

                  {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filteredItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <MenuItemCard item={item} showFullDetails />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-text-muted">
                        No dishes match your current mood selection.
                        <br />
                        Try a different combination!
                      </p>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="mt-20 flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/menu">
                      <Button variant="primary" size="lg" className="group">
                        View Our Menu
                        <svg
                          className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Button>
                    </Link>
                    <Button
                      onClick={handleWhatsAppOrder}
                      variant="outline"
                      size="md"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Order via WhatsApp
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State */}
            {!showResults && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🍽️</div>
                <p className="text-text-muted text-lg">
                  Select your moods above to discover amazing dishes!
                </p>
              </motion.div>
            )}
          </>
        )}

        {/* Share Modal */}
        <AnimatePresence>
          {showShareModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowShareModal(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] sm:w-full sm:max-w-md max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Header - Fixed */}
                <div className="bg-gradient-hero text-white p-4 sm:p-6 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
                      <h3 className="text-lg sm:text-xl font-bold">
                        Share Your Mood
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowShareModal(false)}
                      className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-white/90">
                    Choose a platform to share your food mood
                  </p>
                </div>

                {/* Social Media Options - Scrollable */}
                <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {/* Facebook */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => shareToSocial("facebook")}
                      className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-[#1877F2] text-white rounded-xl hover:shadow-lg transition-shadow"
                    >
                      <Facebook
                        className="w-6 h-6 sm:w-8 sm:h-8"
                        fill="currentColor"
                      />
                      <span className="font-semibold text-sm sm:text-base">
                        Facebook
                      </span>
                    </motion.button>

                    {/* WhatsApp */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => shareToSocial("whatsapp")}
                      className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-[#25D366] text-white rounded-xl hover:shadow-lg transition-shadow"
                    >
                      <MessageCircle
                        className="w-6 h-6 sm:w-8 sm:h-8"
                        fill="currentColor"
                      />
                      <span className="font-semibold text-sm sm:text-base">
                        WhatsApp
                      </span>
                    </motion.button>

                    {/* Twitter */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => shareToSocial("twitter")}
                      className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-[#1DA1F2] text-white rounded-xl hover:shadow-lg transition-shadow"
                    >
                      <Twitter
                        className="w-6 h-6 sm:w-8 sm:h-8"
                        fill="currentColor"
                      />
                      <span className="font-semibold text-sm sm:text-base">
                        Twitter
                      </span>
                    </motion.button>

                    {/* LinkedIn */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => shareToSocial("linkedin")}
                      className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-[#0A66C2] text-white rounded-xl hover:shadow-lg transition-shadow"
                    >
                      <Linkedin
                        className="w-6 h-6 sm:w-8 sm:h-8"
                        fill="currentColor"
                      />
                      <span className="font-semibold text-sm sm:text-base">
                        LinkedIn
                      </span>
                    </motion.button>

                    {/* Instagram */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => shareToSocial("instagram")}
                      className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white rounded-xl hover:shadow-lg transition-shadow col-span-2"
                    >
                      <Instagram className="w-6 h-6 sm:w-8 sm:h-8" />
                      <span className="font-semibold text-sm sm:text-base">
                        Instagram Story
                      </span>
                      <span className="text-xs opacity-90">
                        Copy to clipboard
                      </span>
                    </motion.button>
                  </div>

                  {/* Info Text */}
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs sm:text-sm text-text-muted text-center">
                      Images will be included where supported by the platform
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
};
