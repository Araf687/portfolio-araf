"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { contactColumns } from "./columns"; // Your columns definition
import { useFetchMessages, ContactMsg } from "@/app/hooks/useContact";
import { Modal } from "@/components/admin/modal";
import { Eye } from "lucide-react";

const ContactPage = () => {
  const { data, isLoading, isError } = useFetchMessages();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMsg | null>(null);

  const handleView = (msg: ContactMsg) => {
    setSelectedMessage(msg);
    setModalOpen(true);
  };

  // Override Actions column to include View button with icon
  const columnsWithView = contactColumns(handleView).map((col) => {
    if (col.id === "actions") {
      return {
        ...col,
        cell: ({ row }: { row: { original: ContactMsg } }) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleView(row.original)}
              className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              <Eye size={16} />
              View
            </button>
          </div>
        ),
      };
    }
    return col;
  });

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold text-white">Contact Messages</h1>

      {isLoading && (
        <p className="text-gray-400">Loading messages...</p>
      )}

      {isError && (
        <p className="text-red-500">Failed to load messages. Please try again later.</p>
      )}

      {!isLoading && !isError && data && data?.length === 0 && (
        <p className="text-gray-400">No messages found.</p>
      )}

      {!isLoading && !isError && data && data?.length > 0 && (
        <DataTable<ContactMsg, any>
          columns={columnsWithView}
          data={data}
        />
      )}

      {/* Modal for Viewing Message */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedMessage?.name ?? "Message"}
        width="w-3xl"
      >
        {selectedMessage && (
          <div className="space-y-3 text-gray-200">
            <p>
              <strong>Email:</strong> {selectedMessage.email}
            </p>
            <p>
              <strong>Message:</strong>
            </p>
            <p className="bg-gray-800 p-3 rounded whitespace-pre-wrap">
              {selectedMessage.message || "No message content"}
            </p>
            <p className="text-gray-400 text-sm">
              Sent on: {new Date(selectedMessage.created_at).toLocaleString()}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ContactPage;