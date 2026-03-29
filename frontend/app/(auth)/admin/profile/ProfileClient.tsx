"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useAuthStore } from "@/lib/store/authStore";
import { ProfileForm } from "@/app/components/admin/profile/ProfileForm";
import { ChangePasswordForm } from "@/app/components/admin/profile/ChangePasswordForm";
import { RoleBadge } from "@/app/components/admin/users/RoleBadge";

type Tab = "profile" | "security";

export default function ProfileClient() {
  const user = useAuthStore((s) => s.user);
  const [tab, setTab] = useState<Tab>("profile");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) return null;

  const initials = user.username.slice(0, 2).toUpperCase();

  const handleProfileSubmit = async (data: { username: string; email: string }) => {
    setIsSubmitting(true);
    try {
      // TODO: call update profile API
      console.log("Profile update", data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
    setIsSubmitting(true);
    try {
      // TODO: call change password API
      console.log("Password change", data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Left: Avatar card */}
      <div className="md:w-64 shrink-0 bg-gray-900 rounded-xl p-6 flex flex-col items-center gap-3 text-center">
        <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-2xl font-bold text-white">
          {initials}
        </div>
        <div>
          <p className="font-semibold text-white">{user.username}</p>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
        <RoleBadge role={user.role} />
        {user.lastLoginAt && (
          <p className="text-xs text-gray-500">
            Last login: {format(new Date(user.lastLoginAt), "PPP")}
          </p>
        )}
      </div>

      {/* Right: Tabs */}
      <div className="flex-1 bg-gray-900 rounded-xl p-6">
        <div className="flex gap-4 border-b border-gray-700 mb-6">
          {(["profile", "security"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-2 text-sm font-medium capitalize border-b-2 transition ${
                tab === t ? "border-purple-500 text-white" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {t === "profile" ? "Profile Info" : "Security"}
            </button>
          ))}
        </div>

        {tab === "profile" ? (
          <ProfileForm
            initialData={{ username: user.username, email: user.email }}
            onSubmit={handleProfileSubmit}
            isSubmitting={isSubmitting}
          />
        ) : (
          <ChangePasswordForm onSubmit={handlePasswordSubmit} isSubmitting={isSubmitting} />
        )}
      </div>
    </div>
  );
}
