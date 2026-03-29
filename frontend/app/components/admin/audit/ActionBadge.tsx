"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ActionBadgeProps {
  action: string;
  className?: string;
}

interface ActionConfig {
  icon: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

function getActionConfig(action: string): ActionConfig {
  const lowerAction = action.toLowerCase();

  if (lowerAction.includes("create")) {
    return {
      icon: "✨",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      borderColor: "border-green-200",
    };
  }

  if (lowerAction.includes("update") || lowerAction.includes("edit")) {
    return {
      icon: "📝",
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
      borderColor: "border-blue-200",
    };
  }

  if (lowerAction.includes("delete")) {
    return {
      icon: "🗑️",
      bgColor: "bg-red-100",
      textColor: "text-red-800",
      borderColor: "border-red-200",
    };
  }

  if (lowerAction.includes("login")) {
    return {
      icon: "🔐",
      bgColor: "bg-purple-100",
      textColor: "text-purple-800",
      borderColor: "border-purple-200",
    };
  }

  if (lowerAction.includes("logout")) {
    return {
      icon: "🚪",
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
      borderColor: "border-gray-200",
    };
  }

  if (lowerAction.includes("toggle") || lowerAction.includes("status")) {
    return {
      icon: "🔄",
      bgColor: "bg-orange-100",
      textColor: "text-orange-800",
      borderColor: "border-orange-200",
    };
  }

  return {
    icon: "📌",
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
    borderColor: "border-gray-200",
  };
}

export function ActionBadge({ action, className }: ActionBadgeProps) {
  const config = getActionConfig(action);

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
      <span>{action}</span>
    </span>
  );
}
