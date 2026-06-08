"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, MailOpen, MessageSquare, Users } from "lucide-react";
import { adminApi } from "@/lib/api/admin";
import { AdminRole } from "@/lib/types/user";
import { ContactSubmission, ContactStatus } from "@/lib/types/contact";
import { RoleProtectedPage } from "@/app/components/admin/RoleProtectedPage";
import { ContactTable } from "@/app/components/admin/contacts/ContactTable";
import { ContactDetailsModal } from "@/app/components/admin/contacts/ContactDetailsModal";
import DeleteConfirmDialog from "@/app/components/admin/contacts/DeleteConfirmDialog";

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className="p-3 bg-orange-100 rounded-lg">
          <Icon className="w-6 h-6 text-orange-600" />
        </div>
      </div>
    </div>
  );
}

export default function ContactsClient() {
  const queryClient = useQueryClient();
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: contacts = [], isLoading, isError } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => adminApi.getAllContacts(),
  });

  const markReadMutation = useMutation({
    mutationFn: (id: string) => adminApi.updateContactStatus(id, ContactStatus.READ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contacts"] }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContactStatus }) =>
      adminApi.updateContactStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contacts"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setDeleteId(null);
      setModalOpen(false);
      setSelectedContact(null);
    },
  });

  const handleViewContact = async (contact: ContactSubmission) => {
    if (contact.status === ContactStatus.NEW) {
      await markReadMutation.mutateAsync(contact.id);
    }
    setSelectedContact(contact);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setDeleteId(id);
  };

  const total = contacts.length;
  const newCount = contacts.filter(
    (c: ContactSubmission) => c.status === ContactStatus.NEW
  ).length;
  const readCount = contacts.filter(
    (c: ContactSubmission) => c.status === ContactStatus.READ
  ).length;
  const repliedCount = contacts.filter(
    (c: ContactSubmission) => c.status === ContactStatus.REPLIED
  ).length;

  return (
    <RoleProtectedPage
      allowedRoles={[AdminRole.SUPER_ADMIN, AdminRole.ADMIN, AdminRole.MANAGER]}
    >
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : isError ? (
          <p className="text-red-500">Failed to load contacts.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Contacts" value={total} icon={Users} />
              <StatCard label="New" value={newCount} icon={Mail} />
              <StatCard label="Read" value={readCount} icon={MailOpen} />
              <StatCard label="Replied" value={repliedCount} icon={MessageSquare} />
            </div>

            <ContactTable
              contacts={contacts}
              onViewContact={handleViewContact}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>

      <ContactDetailsModal
        isOpen={modalOpen}
        contact={selectedContact}
        onClose={() => {
          setModalOpen(false);
          setSelectedContact(null);
        }}
        onUpdateStatus={(status) =>
          updateStatusMutation.mutate({ id: selectedContact!.id, status })
        }
        onDelete={() => setDeleteId(selectedContact?.id ?? null)}
        isUpdating={updateStatusMutation.isPending}
      />

      <DeleteConfirmDialog
        isOpen={!!deleteId}
        itemName={
          contacts.find((c: ContactSubmission) => c.id === deleteId)?.subject ?? "Contact"
        }
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
        isDeleting={deleteMutation.isPending}
      />
    </RoleProtectedPage>
  );
}
