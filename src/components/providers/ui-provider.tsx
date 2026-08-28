"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type UIState = {
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  toggleCommand: () => void;
  resumeOpen: boolean;
  setResumeOpen: (open: boolean) => void;
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  toggleTerminal: () => void;
};

const UIContext = createContext<UIState | null>(null);

/**
 * Shared overlay state. The header, hero, command palette and footer all need
 * to open the same modals, so the open flags live in one place rather than
 * being threaded through props.
 */
export function UIProvider({ children }: { children: ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const toggleCommand = useCallback(() => setCommandOpen((v) => !v), []);
  const toggleTerminal = useCallback(() => setTerminalOpen((v) => !v), []);

  const value = useMemo(
    () => ({
      commandOpen,
      setCommandOpen,
      toggleCommand,
      resumeOpen,
      setResumeOpen,
      terminalOpen,
      setTerminalOpen,
      toggleTerminal,
    }),
    [commandOpen, resumeOpen, terminalOpen, toggleCommand, toggleTerminal],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within <UIProvider>");
  return ctx;
}
