import React from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RESTAURANT_INFO, NAV_LINKS } from "@/lib/constants";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="font-serif text-xl font-bold">
                {RESTAURANT_INFO.name}
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              {RESTAURANT_INFO.tagline}
            </p>
            <div className="flex gap-3">
              {RESTAURANT_INFO.socialMedia.instagram && (
                <a
                  href={`https://instagram.com/${RESTAURANT_INFO.socialMedia.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {RESTAURANT_INFO.socialMedia.facebook && (
                <a
                  href={RESTAURANT_INFO.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {RESTAURANT_INFO.socialMedia.twitter && (
                <a
                  href={RESTAURANT_INFO.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Opening Hours</h3>
            <ul className="space-y-2 text-sm">
              {RESTAURANT_INFO.openingHours.map((hours) => (
                <li
                  key={hours.day}
                  className="flex justify-between text-gray-400"
                >
                  <span>{hours.day}</span>
                  <span>
                    {hours.isOpen
                      ? `${hours.openTime} AM - ${hours.closeTime} PM`
                      : "Closed"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="flex items-start gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{RESTAURANT_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="flex items-start gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{RESTAURANT_INFO.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  {RESTAURANT_INFO.address.street},{" "}
                  {RESTAURANT_INFO.address.city},{" "}
                  {RESTAURANT_INFO.address.state}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container>
          <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} {RESTAURANT_INFO.name}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};
