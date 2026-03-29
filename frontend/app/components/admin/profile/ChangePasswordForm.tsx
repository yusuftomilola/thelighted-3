"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  currentPassword: z.string().min(1, "Required"),
  newPassword: z.string().min(8, "At least 8 characters"),
  confirmPassword: z.string().min(1, "Required"),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

interface ChangePasswordFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
}

export function ChangePasswordForm({ onSubmit, isSubmitting }: ChangePasswordFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async (data: FormData) => {
    await onSubmit(data);
    reset();
  };

  const fields: { name: keyof FormData; label: string }[] = [
    { name: "currentPassword", label: "Current Password" },
    { name: "newPassword", label: "New Password" },
    { name: "confirmPassword", label: "Confirm New Password" },
  ];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {fields.map(({ name, label }) => (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
          <input
            type="password"
            {...register(name)}
            className={cn(
              "w-full px-3 py-2 rounded-lg bg-gray-800 border text-white focus:outline-none focus:ring-2 focus:ring-purple-500",
              errors[name] ? "border-red-500" : "border-gray-600"
            )}
          />
          {errors[name] && <p className="mt-1 text-xs text-red-400">{errors[name]?.message}</p>}
        </div>
      ))}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition disabled:opacity-50"
      >
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
        Change Password
      </button>
    </form>
  );
}
