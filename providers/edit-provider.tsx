"use client";

import {  useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type EditContextType = {
  isEdit: boolean;
  setIsEdit: (v: boolean) => void;
};

const EditContext = createContext<EditContextType | null>(null);
export default function EditProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "";
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setIsEdit(false);
  }, [activeTab]);
  return (
    <EditContext.Provider value={{ isEdit, setIsEdit }}>
      {children}
    </EditContext.Provider>
  );
}

export function useEdit() {
  const ctx = useContext(EditContext);
  if (!ctx) throw new Error("useEdit must be used inside EditProvider");
  return ctx;
}
