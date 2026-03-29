"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ContactStatus } from "@/lib/types/contact";

interface StatusBadgeProps {
  status: ContactStatus;
  className?: string;
}

const statusConfig = {
  [ContactStatus.NEW]: {
    label: "New",
    icon: "🆕",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
    borderColor: "border-blue-200",
  },
  [ContactStatus.READ]: {
    label: "Read",
    icon: "👁️",
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
    borderColor: "border-gray-200",
  },
  [ContactStatus.REPLIED]: {
    label: "Replied",
    icon: "✅",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    borderColor: "border-green-200",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.bgColor,
        config.textColor,
        config.borderColor,
        className
      )}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
}
