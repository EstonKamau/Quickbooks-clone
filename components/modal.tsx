"use client"; // Use this to make it a client component

import { useState, useEffect } from "react";
import { Button } from "./ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, companyName: string) => void;
}

export default function Modal({ isOpen, onClose, onSubmit }: ModalProps) {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");

  if (!isOpen) return null; // Don't render if the modal is closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-lg font-semibold mb-4">Update Your Profile</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(name, companyName); // Call the submit function passed via props
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button type="button" variant={"outline"} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant={"default"}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
