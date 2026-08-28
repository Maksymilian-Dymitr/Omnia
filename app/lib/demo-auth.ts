// PROTOTYPE ONLY — a localStorage-backed stand-in for real auth/sessions
// until there's a backend. Replace this whole file when that exists.
import { TEST_ACCOUNT } from "./test-account";

const SESSION_KEY = "omnia-demo-session";

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
  } catch {}
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.name === "string" && typeof parsed?.email === "string" && typeof parsed?.company === "string") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function endSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {}
}
