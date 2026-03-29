"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Info } from "lucide-react";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type PasswordFormData = z.infer<typeof passwordSchema>;

interface ChangePasswordFormProps {
  onSubmit: (data: PasswordFormData) => Promise<void>;
  isSubmitting: boolean;
}

export function ChangePasswordForm({ onSubmit, isSubmitting }: ChangePasswordFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleValidSubmit = handleSubmit(async (values) => {
    await onSubmit(values);
    reset();
  });

  const renderToggleButton = (isVisible: boolean, toggle: () => void) => (
    <button
      type="button"
      className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-gray-500"
      onClick={toggle}
    >
      {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  );

  return (
    <form onSubmit={handleValidSubmit} className="space-y-6">
      {[
        {
          key: "current",
          name: "currentPassword" as const,
          label: "Current password",
          placeholder: "********",
          type: showCurrentPassword ? "text" : "password",
          isVisible: showCurrentPassword,
          toggle: () => setShowCurrentPassword((current) => !current),
        },
        {
          key: "new",
          name: "newPassword" as const,
          label: "New password",
          placeholder: "********",
          type: showNewPassword ? "text" : "password",
          isVisible: showNewPassword,
          toggle: () => setShowNewPassword((current) => !current),
        },
        {
          key: "confirm",
          name: "confirmPassword" as const,
          label: "Confirm new password",
          placeholder: "********",
          type: showConfirmPassword ? "text" : "password",
          isVisible: showConfirmPassword,
          toggle: () => setShowConfirmPassword((current) => !current),
        },
      ].map((field) => (
        <div key={field.key} className="space-y-1">
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700"
          >
            {field.label}
          </label>
          <div className="relative">
            <input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={
                field.name === "currentPassword"
                  ? "current-password"
                  : "new-password"
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              {...register(field.name)}
            />
            {renderToggleButton(field.isVisible, field.toggle)}
          </div>
          {field.name === "newPassword" && (
            <p className="text-xs text-gray-500">Must be at least 6 characters</p>
          )}
          {errors[field.name] && (
            <p className="text-xs text-red-600">{errors[field.name]?.message}</p>
          )}
        </div>
      ))}

      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
        <div className="flex items-center gap-2 text-blue-800">
          <Info size={16} />
          <p className="font-semibold">Security notice</p>
        </div>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Use a strong, unique password</li>
          <li>Include letters, numbers, and special characters</li>
          <li>Don't reuse passwords from other accounts</li>
        </ul>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex min-w-[200px] items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Updating...</span>
            </>
          ) : (
            "Update Password"
          )}
        </button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
