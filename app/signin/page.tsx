import type { Metadata } from "next";
import SigninView from "../components/signin-view";

export const metadata: Metadata = {
  title: "Sign in — Omnia",
  description: "Sign in to your Omnia seat.",
};

export default function Signin() {
  return <SigninView />;
}
