"use client";

// PROTOTYPE ONLY — a localStorage-backed stand-in for real auth/sessions
// until there's a backend. Replace this whole file when that exists.
import { useSyncExternalStore } from "react";
import { TEST_ACCOUNT } from "./test-account";

const SESSION_KEY = "omnia-demo-session";
const SESSION_CHANGE_EVENT = "omnia-session-change";

export type Session = {
  name: string;
  email: string;
  company: string;
};

export function signIn(email: string, password: string): Session | null {
  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedEmail !== TEST_ACCOUNT.email.toLowerCase() || password !== TEST_ACCOUNT.password) {
    return null;
  }
  return { name: TEST_ACCOUNT.name, email: TEST_ACCOUNT.email, company: TEST_ACCOUNT.company };
}

export function startSession(session: Session): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    dispatchEvent(new Event(SESSION_CHANGE_EVENT));
  } catch {}
}

export function endSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
    dispatchEvent(new Event(SESSION_CHANGE_EVENT));
  } catch {}
}

// One-off, non-reactive read of the current session — safe to call from an
// effect (e.g. to decide whether to redirect) without the render-time
// server/client mismatch that using useSession()'s value for that would hit.
export function getSession(): Session | null {
  try {
    return parseSession(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

function parseSession(raw: string | null): Session | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed?.name === "string" && typeof parsed?.email === "string" && typeof parsed?.company === "string") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

// Cache the parsed session by raw string, so getSnapshot returns a stable
// reference across renders (required by useSyncExternalStore) and only
// re-parses when localStorage actually changed.
let cachedRaw: string | null = null;
let cachedSession: Session | null = null;

function getSnapshot(): Session | null {
  let raw: string | null;
  try {
    raw = localStorage.getItem(SESSION_KEY);
  } catch {
    raw = null;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSession = parseSession(raw);
  }
  return cachedSession;
}

function getServerSnapshot(): Session | null {
  return null;
}

function subscribe(callback: () => void): () => void {
  addEventListener("storage", callback);
  addEventListener(SESSION_CHANGE_EVENT, callback);
  return () => {
    removeEventListener("storage", callback);
    removeEventListener(SESSION_CHANGE_EVENT, callback);
  };
}

// Reactive read of the current demo session — `null` on the server and
// until the client has checked localStorage once after mount, then stays
// in sync with startSession()/endSession() (including across tabs).
export function useSession(): Session | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
