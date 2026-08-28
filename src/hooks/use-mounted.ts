"use client";

import { useSyncExternalStore } from "react";

/** No external store to watch — the value only depends on where it renders. */
const subscribe = () => () => {};

/**
 * False during SSR and the hydration pass, true afterwards. Used to defer
 * theme-dependent rendering so the server HTML and first client paint agree.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
