"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Flame, Clock, Heart } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { MenuItem } from "@/lib/types";
import { formatCurrency, cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cartStore";

interface MenuItemCardProps {
  item: MenuItem;
  onOrder?: (item: MenuItem) => void;
  showFullDetails?: boolean;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onOrder,
  showFullDetails = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { openModal } = useCartStore();

  const handleAddToCart = () => {
    if (onOrder) {
      onOrder(item);
    } else {
      openModal(item);
    }
  };

  return (
    <Card padding="none" hover className="overflow-hidden group">
      {/* Image Section */}
      <div className="relative h-25 overflow-hidden bg-gray-200">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "object-cover transition-all duration-500 group-hover:scale-110",
            imageLoaded ? "opacity-100" : "opacity-0",
          )}
          onLoadingComplete={() => setImageLoaded(true)}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {!item.isAvailable && (
            <span className="px-2 py-1 bg-gray-800 text-white text-xs font-medium rounded-full">
              Unavailable
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-semibold text-text group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          <span className="text-lg font-bold text-primary whitespace-nowrap ml-2">
            {formatCurrency(item.price)}
          </span>
        </div>

        <p className="text-sm text-text-muted mb-4 line-clamp-1">
          {item.description}
        </p>

        {/* Meta Information */}
        {showFullDetails && (
          <div className="flex flex-wrap gap-3 mb-4 text-xs text-text-muted">
            {item.preparationTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {item.preparationTime} mins
              </span>
            )}
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          fullWidth
          size="sm"
          disabled={!item.isAvailable}
        >
          {item.isAvailable ? "Add to Cart" : "Currently Unavailable"}
        </Button>
      </div>
    </Card>
  );
};
