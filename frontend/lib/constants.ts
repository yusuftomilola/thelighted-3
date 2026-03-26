// frontend/src/lib/constants.ts
import type {
  MenuItem,
  MoodOption,
  OpeningHours,
  RestaurantInfo,
  Testimonial,
} from "@/lib/types";

// Restaurant Information
export const RESTAURANT_INFO: RestaurantInfo = {
  name: process.env.NEXT_PUBLIC_RESTAURANT_NAME || "Savoria Restaurant",
  tagline: "Where Every Bite Tells a Story",
  description:
    "Experience the perfect blend of traditional flavors and modern culinary artistry. Our passionate chefs craft each dish with the finest ingredients, bringing you an unforgettable dining journey.",
  phone: process.env.NEXT_PUBLIC_RESTAURANT_PHONE || "+234-XXX-XXX-XXXX",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "234XXXXXXXXXX",
  email: process.env.NEXT_PUBLIC_RESTAURANT_EMAIL || "info@savoria.com",
  address: {
    street: "123 Gourmet Street",
    city: "Abuja",
    state: "FCT",
    country: "Nigeria",
    zipCode: "900001",
  },
  coordinates: {
    lat: 9.0765,
    lng: 7.3986,
  },
  socialMedia: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "savoria_restaurant",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL,
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL,
  },
  openingHours: [
    { day: "Monday", isOpen: true, closeTime: "22:00", openTime: "08:00" },
    { day: "Tuesday", isOpen: true, closeTime: "22:00", openTime: "08:00" },
    { day: "Wednesday", isOpen: true, closeTime: "22:00", openTime: "08:00" },
    { day: "Thursday", isOpen: true, closeTime: "22:00", openTime: "08:00" },
    { day: "Friday", isOpen: true, closeTime: "22:00", openTime: "08:00" },
    { day: "Saturday", isOpen: true, closeTime: "21:00", openTime: "08:00" },
    { day: "Sunday", isOpen: false, closeTime: "07:00", openTime: "12:00" },
  ],
};

// Mood Options for Visual Mood Board
export const MOOD_OPTIONS: MoodOption[] = [
  {
    id: "spicy",
    label: "Spicy",
    emoji: "🌶️",
    gradient: "bg-gradient-spicy",
    description: "Bold, fiery flavors that pack a punch",
  },
  {
    id: "comfort",
    label: "Comfort",
    emoji: "🍲",
    gradient: "bg-gradient-comfort",
    description: "Warm, hearty dishes that feel like home",
  },
  {
    id: "light",
    label: "Light",
    emoji: "🥗",
    gradient: "bg-gradient-light",
    description: "Fresh, healthy options that energize",
  },
  {
    id: "adventurous",
    label: "Adventurous",
    emoji: "🌍",
    gradient: "bg-gradient-adventurous",
    description: "Exotic flavors from around the world",
  },
  {
    id: "traditional",
    label: "Traditional",
    emoji: "🏠",
    gradient: "bg-gradient-traditional",
    description: "Classic recipes passed down generations",
  },
];

// Sample Testimonials
export const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Amara Okafor",
    role: "Food Blogger",
    rating: 5,
    comment:
      "Absolutely incredible! The jollof rice here is the best I've had in Abuja. The atmosphere is cozy and the service is impeccable.",
    date: "2024-10-15",
  },
  {
    id: "2",
    name: "David Chen",
    role: "Regular Customer",
    rating: 5,
    comment:
      "I come here every Friday for their suya platter. Never disappoints! The quality and taste are consistently amazing.",
    date: "2024-10-20",
  },
  {
    id: "3",
    name: "Fatima Hassan",
    rating: 5,
    comment:
      "The perfect place for both traditional and modern dishes. Love their mood board feature - it helped me discover new favorites!",
    date: "2024-10-25",
  },
  {
    id: "4",
    name: "John Williams",
    role: "Tourist",
    rating: 4,
    comment:
      "Fantastic food and great ambiance. The staff was very helpful in explaining the local dishes. Highly recommend!",
    date: "2024-11-01",
  },
];

// Navigation Links
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/explore", label: "Explore" },
  // { href: "/cart", label: "Cart" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// SEO Configuration
export const DEFAULT_SEO = {
  title: "Savoria Restaurant | Authentic Cuisine in Abuja",
  description:
    "Experience the perfect blend of traditional and modern cuisine at Savoria Restaurant. Order online for delivery or visit us in Abuja.",
  keywords: [
    "restaurant Abuja",
    "Nigerian food",
    "online food order",
    "best restaurant Abuja",
    "African cuisine",
    "international dishes",
    "food delivery Abuja",
  ],
  ogImage: "/images/og-image.jpg",
};
