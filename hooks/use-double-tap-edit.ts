"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export function useDoubleTapEdit() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const lastTapRef = useRef(0);

  const onPointerUp = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTapRef.current <= DOUBLE_TAP_DELAY) {
      const params = new URLSearchParams(searchParams.toString());

      params.set("mode", "edit");

      router.replace(`${pathname}?${params.toString()}`);

      lastTapRef.current = 0;
      return;
    }

    lastTapRef.current = now;
  };

  return {
    onPointerUp,
  };
}
