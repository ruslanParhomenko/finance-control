"use client";
import { useRouter, useSearchParams } from "next/navigation";

export function useSetViewMode() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setViewMode = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("mode", "view");

    router.replace(`?${params.toString()}`);
  };

  return setViewMode;
}
