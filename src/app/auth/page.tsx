"use client";

import type { CSSProperties, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import styles from "./AuthPage.module.css";

type View = "options" | "signup" | "login" | "google" | "otp" | "success";
type Flow = "phone-signup" | "phone-login" | "google";
type Notice = { tone: "success" | "error"; text: string } | null;

class AuthRequestError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

type GoogleCredentialResponse = {
  credential?: string;
};

type GoogleAccounts = {
  id: {
    initialize: (options: {
      client_id: string;
      callback: (response: GoogleCredentialResponse) => void;
      auto_select?: boolean;
      cancel_on_tap_outside?: boolean;
      use_fedcm_for_prompt?: boolean;
    }) => void;
    renderButton: (
      parent: HTMLElement,
      options: {
        theme?: "outline" | "filled_blue" | "filled_black";
        size?: "large" | "medium" | "small";
        type?: "standard" | "icon";
        shape?: "rectangular" | "pill" | "circle" | "square";
        text?: "signin_with" | "signup_with" | "continue_with" | "signin";
        width?: string | number;
      },
    ) => void;
  };
};

declare global {
  interface Window {
    google?: {
      accounts?: GoogleAccounts;
    };
  }
}

const AUTH_API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL ?? "http://localhost:8087";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
const SHOW_DEV_OTP = process.env.NODE_ENV !== "production";
const AUTH_REQUEST_TIMEOUT_MS = 12_000;
const OTP_LENGTH = 6;

const landscapeContent: Record<View, { title: string; text: string; place: string; image: string }> = {
  options: {
    title: "Make room for the wild.",
    text: "Keep your treks, plans, and people close. Your next story starts here.",
    place: "The Western Ghats",
    image: "/Hero/mountain-ridge-trail.jpg",
  },
  signup: {
    title: "Start fresh this weekend.",
    text: "Create your BackBySunday account and save the trails, stays, and plans you want to come back to.",
    place: "Your next trail",
    image: "/Hero/sahyadri-fort-sunrise.png",
  },
  login: {
    title: "Welcome back outside.",
    text: "Return to saved plans, favourite routes, and the weekends already waiting for you.",
    place: "Saved weekend plans",
    image: "/Hero/misty-hills-dawn.jpg",
  },
  google: {
    title: "Start fresh this weekend.",
    text: "Use Google, then confirm your phone so every booking has the right contact.",
    place: "Your next trail",
    image: "/Hero/sahyadri-fort-sunrise.png",
  },
  otp: {
    title: "Almost there.",
    text: "One quick code keeps your weekend plans tied to the right phone.",
    place: "Secure account access",
    image: "/Hero/sahyadri-fort-sunrise.png",
  },
  success: {
    title: "You are ready.",
    text: "Your BackBySunday account is set for the next refreshing weekend.",
    place: "BackBySunday",
    image: "/Hero/misty-hills-dawn.jpg",
  },
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5a4.7 4.7 0 0 1-2 3.1v2.5h3.3c1.9-1.8 3-4.3 3-7.4Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.5c-.9.6-2.1 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3v2.6A10 10 0 0 0 12 22Z"
      />
      <path fill="#FBBC05" d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3A10 10 0 0 0 3 16.6L6.4 14Z" />
      <path fill="#EA4335" d="M12 5.9c1.5 0 2.9.5 4 1.6l3-3A10 10 0 0 0 3 7.4L6.4 10c.8-2.3 3-4.1 5.6-4.1Z" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

async function postAuth(path: string, body: Record<string, string>) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), AUTH_REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${AUTH_API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (error) {
    const message =
      error instanceof DOMException && error.name === "AbortError"
        ? "The auth service took too long to respond. Try again."
        : "Could not reach the auth service. Check that the backend is running.";
    throw new AuthRequestError("network_error", message);
  } finally {
    window.clearTimeout(timeoutId);
  }

  const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;

  if (!response.ok) {
    const code = typeof data.error === "string" ? data.error : "request_failed";
    const message = typeof data.message === "string" ? data.message : code;
    throw new AuthRequestError(code, message);
  }

  return data;
}

export default function AuthPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [view, setView] = useState<View>("options");
  const [flow, setFlow] = useState<Flow>("phone-signup");
  const [notice, setNotice] = useState<Notice>(null);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [challengePhone, setChallengePhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [googleIdToken, setGoogleIdToken] = useState("");
  const [googleName, setGoogleName] = useState("");
  const [googleEmail, setGoogleEmail] = useState("");
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const otpInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const landscape = landscapeContent[view];
  const cssVars = useMemo(
    () =>
      ({
        "--ambient-image": `url("${landscape.image}")`,
      }) as CSSProperties,
    [landscape.image],
  );
  const landscapeVars = useMemo(
    () =>
      ({
        "--landscape-image": `url("${landscape.image}")`,
      }) as CSSProperties,
    [landscape.image],
  );

  const resetOtpChallenge = useCallback(() => {
    setOtp("");
    setDevOtp("");
    setChallengePhone("");
  }, []);

  const showView = (nextView: View, nextFlow?: Flow) => {
    if (nextFlow) {
      setFlow(nextFlow);
    }
    setNotice(null);
    if (nextView !== "otp") {
      resetOtpChallenge();
    }
    setView(nextView);
  };

  const normalizePhone = (value: string) => value.replace(/[\s()-]/g, "");
  const normalizeCode = (value: string) => value.replace(/\D/g, "");
  const isValidPhone = (value: string) => /^\+[1-9]\d{7,14}$/.test(value);
  const isValidEmail = (value: string) => value.length > 0 && value.includes("@") && !/\s/.test(value);
  const isValidName = (value: string) => value.length > 0 && value.length <= 120;

  const getGoogleProfile = (idToken: string) => {
    try {
      const payload = idToken.split(".")[1];
      const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
      const paddedPayload = normalizedPayload.padEnd(normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4), "=");
      const json = window.atob(paddedPayload);
      const claims = JSON.parse(json) as { name?: unknown; email?: unknown };
      return {
        name: typeof claims.name === "string" ? claims.name.trim() : "",
        email: typeof claims.email === "string" ? claims.email.trim().toLowerCase() : "",
      };
    } catch {
      return { name: "", email: "" };
    }
  };

  const friendlyError = (error: unknown) => {
    if (error instanceof AuthRequestError) {
      if (error.code === "invalid_input") {
        return "Check the phone, name, email, and OTP format, then try again.";
      }
      if (error.code === "invalid_credentials") {
        return "That OTP is no longer valid. Request a fresh code and use the latest one.";
      }
      if (error.code === "rate_limited") {
        return "Too many attempts. Please wait before requesting another OTP.";
      }
      if (error.code === "conflict") {
        return "This email is already linked to another account.";
      }
      if (error.code === "account_exists") {
        return "You already have an account with this phone number. Sign in instead.";
      }
      if (error.code === "network_error") {
        return error.message;
      }
      return error.message;
    }

    return error instanceof Error ? error.message : "Could not complete this step.";
  };

  const updateOtpDigit = (index: number, value: string) => {
    const digit = normalizeCode(value).slice(-1);
    const nextOtp = otp.padEnd(OTP_LENGTH, " ").split("");
    nextOtp[index] = digit || " ";
    setOtp(nextOtp.join("").replace(/\s/g, ""));

    if (digit && index < OTP_LENGTH - 1) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, key: string) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const requestOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setNotice(null);
    resetOtpChallenge();

    const normalizedPhone = normalizePhone(phone);
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidPhone(normalizedPhone)) {
      setLoading(false);
      setNotice({ tone: "error", text: "Use a valid phone number with country code, for example +919812345678." });
      return;
    }

    if (flow === "phone-signup") {
      if (!isValidName(normalizedName)) {
        setLoading(false);
        setNotice({ tone: "error", text: "Enter your full name before requesting OTP." });
        return;
      }

      if (!isValidEmail(normalizedEmail)) {
        setLoading(false);
        setNotice({ tone: "error", text: "Enter a valid email address before requesting OTP." });
        return;
      }

      setName(normalizedName);
      setEmail(normalizedEmail);
    }

    try {
      const data = await postAuth("/app/auth/otp/request", { phone: normalizedPhone });
      const latestDevOtp = SHOW_DEV_OTP && typeof data.dev_otp === "string" ? data.dev_otp : "";
      setPhone(normalizedPhone);
      setChallengePhone(normalizedPhone);
      setDevOtp(latestDevOtp);
      setOtp(latestDevOtp);
      setNotice({
        tone: "success",
        text: latestDevOtp
          ? `We sent a verification code to ${normalizedPhone}. Development OTP: ${latestDevOtp}`
          : `We sent a verification code to ${normalizedPhone}.`,
      });
      setView("otp");
    } catch (error) {
      setNotice({ tone: "error", text: friendlyError(error) });
    } finally {
      setLoading(false);
    }
  };

  const startGoogleOtp = async (idToken: string) => {
    setLoading(true);
    setNotice(null);
    resetOtpChallenge();

    const normalizedPhone = normalizePhone(phone);
    const normalizedName = googleName || name.trim();

    if (!idToken) {
      setLoading(false);
      setNotice({ tone: "error", text: "Choose your Google account again before requesting OTP." });
      return;
    }

    if (!isValidPhone(normalizedPhone)) {
      setLoading(false);
      setNotice({ tone: "error", text: "Use a valid phone number with country code, for example +919812345678." });
      return;
    }

    if (!isValidName(normalizedName)) {
      setLoading(false);
      setNotice({ tone: "error", text: "Enter your full name before continuing with Google." });
      return;
    }

    setName(normalizedName);

    try {
      const data = await postAuth("/app/auth/google/start", {
        id_token: idToken,
        phone: normalizedPhone,
      });
      const latestDevOtp = SHOW_DEV_OTP && typeof data.dev_otp === "string" ? data.dev_otp : "";
      setPhone(normalizedPhone);
      setChallengePhone(normalizedPhone);
      setDevOtp(latestDevOtp);
      setOtp(latestDevOtp);
      setGoogleIdToken(idToken);
      setNotice({
        tone: "success",
        text: latestDevOtp
          ? `Google verified. We sent a phone code to ${normalizedPhone}. Development OTP: ${latestDevOtp}`
          : `Google verified. We sent a phone code to ${normalizedPhone}.`,
      });
      setView("otp");
    } catch (error) {
      setNotice({ tone: "error", text: friendlyError(error) });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleCredential = useCallback((response: GoogleCredentialResponse) => {
    if (response.credential) {
      const profile = getGoogleProfile(response.credential);
      resetOtpChallenge();
      setGoogleIdToken(response.credential);
      setGoogleName(profile.name);
      setGoogleEmail(profile.email);
      setName(profile.name);
      setEmail(profile.email);
      setFlow("google");
      setView("google");
      setLoading(false);
      setNotice({ tone: "success", text: "Google is connected. Add your phone number to continue." });
    } else {
      setLoading(false);
      setNotice({ tone: "error", text: "Google did not return a credential. Please try again." });
    }
  }, [resetOtpChallenge]);

  const initializeGoogleButton = useCallback((showErrors = true) => {
    if (!GOOGLE_CLIENT_ID) {
      if (showErrors) {
        setNotice({ tone: "error", text: "Google client ID is missing in the frontend environment." });
      }
      return;
    }

    const google = window.google?.accounts?.id;
    if (!google) {
      if (showErrors) {
        setNotice({ tone: "error", text: "Google Sign-In is still loading. Try again in a moment." });
      }
      return;
    }

    google.initialize({
      client_id: GOOGLE_CLIENT_ID,
      auto_select: false,
      cancel_on_tap_outside: true,
      use_fedcm_for_prompt: true,
      callback: handleGoogleCredential,
    });

    if (googleButtonRef.current && googleButtonRef.current.childElementCount === 0) {
      google.renderButton(googleButtonRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        shape: "rectangular",
        text: "continue_with",
        width: "430",
      });
    }
  }, [handleGoogleCredential]);

  useEffect(() => {
    if (view === "options") {
      const timeoutId = window.setTimeout(() => initializeGoogleButton(false), 0);
      return () => window.clearTimeout(timeoutId);
    }
    return undefined;
  }, [initializeGoogleButton, view]);

  // A visitor who is already signed in and lands on /auth directly (not via
  // a fresh verify-OTP success) doesn't need the sign-up/login options
  // again — send them back. Skipped while on "success" so the confirmation
  // screen they just earned still shows.
  useEffect(() => {
    if (!isLoading && isAuthenticated && view !== "success") {
      router.replace("/");
    }
  }, [isLoading, isAuthenticated, view, router]);

  const verifyOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setNotice(null);

    try {
      const normalizedCode = normalizeCode(otp);
      if (normalizedCode.length !== OTP_LENGTH) {
        setNotice({ tone: "error", text: "Enter the latest 6-digit OTP." });
        setLoading(false);
        return;
      }

      const endpoint = flow === "google" ? "/app/auth/google/verify" : "/app/auth/otp/verify";
      const body: Record<string, string> = {
        phone: challengePhone || normalizePhone(phone),
        code: normalizedCode,
      };
      if (flow === "google") {
        const verifiedGoogleName = googleName || name.trim();
        if (!googleIdToken || !isValidName(verifiedGoogleName)) {
          setNotice({ tone: "error", text: "Google did not return a usable profile name. Choose your Google account again." });
          setLoading(false);
          return;
        }
        body.id_token = googleIdToken;
        body.name = verifiedGoogleName;
      } else if (flow === "phone-signup") {
        const normalizedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();

        if (!isValidName(normalizedName) || !isValidEmail(normalizedEmail)) {
          setNotice({ tone: "error", text: "Edit details, add a valid name and email, then request a fresh OTP." });
          setLoading(false);
          return;
        }
        body.name = normalizedName;
        body.email = normalizedEmail;
        // Tells identity-svc this phone must NOT already have an account —
        // otherwise verify silently logs the caller in instead of erroring,
        // which is right for the login flow but wrong here.
        body.intent = "signup";
      }
      const data = await postAuth(endpoint, body);
      if (typeof data.access_token === "string" && typeof data.refresh_token === "string") {
        login({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          token_type: typeof data.token_type === "string" ? data.token_type : "Bearer",
          expires_in: typeof data.expires_in === "number" ? data.expires_in : 0,
          user_id: typeof data.user_id === "string" ? data.user_id : "",
        });
      }
      setNotice({ tone: "success", text: "Your account is ready. You can continue exploring BackBySunday." });
      setView("success");
    } catch (error) {
      if (error instanceof AuthRequestError && error.code === "account_exists") {
        // Send them straight to the login form — sign-up already told them
        // why, no point leaving them stuck re-submitting the same signup.
        showView("login", "phone-login");
        setNotice({ tone: "error", text: friendlyError(error) });
        setLoading(false);
        return;
      }
      setNotice({ tone: "error", text: friendlyError(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={initializeGoogleButton} />
      <main className={styles.authPage} style={cssVars}>
        <aside className={styles.landscape} style={landscapeVars} aria-label="BackBySunday landscape">
          <div className={styles.landscapeMedia} aria-hidden="true">
            <span className={styles.landscapeBg} style={{ backgroundImage: `url("${landscape.image}")` }} />
            <span className={`${styles.landscapeBg} ${styles.landscapeBgNext}`} />
          </div>
          <div className={styles.landscapeContent}>
            <Link className={styles.brand} href="/" aria-label="BackBySunday home">
              <Image src="/Hero/hero-logo.png" alt="BackBySunday" width={217} height={72} priority />
            </Link>
            <div className={styles.landscapeCopy}>
              <h1>{landscape.title}</h1>
              <p>{landscape.text}</p>
              <span className={styles.place}>
                <PinIcon />
                <span>{landscape.place}</span>
              </span>
            </div>
          </div>
        </aside>

        <section className={styles.authSide} aria-label="Account access">
          <div className={styles.topbar}>
            <Link className={styles.backLink} href="/">
              <BackIcon />
              Back to explore
            </Link>
          </div>

          <div className={styles.formWrap}>
            {view === "options" ? (
              <section className={styles.authView} aria-labelledby="options-title">
                <header className={styles.viewHeading}>
                  <h2 id="options-title">Let&apos;s get started</h2>
                  <p>Create your account and keep your favourite trails close.</p>
                </header>

                <div className={styles.choiceStack}>
                  <div className={styles.googleButtonSlot}>
                    <div className={styles.googleButtonVisual} aria-hidden="true">
                      <GoogleIcon />
                      <span>Continue with Google</span>
                    </div>
                    <div className={styles.googleButtonNative} ref={googleButtonRef} aria-label="Continue with Google" />
                  </div>
                  <div className={styles.orDivider}>or</div>
                  <button className={`${styles.choiceButton} ${styles.mossButton}`} type="button" onClick={() => showView("signup", "phone-signup")}>
                    Sign up with your phone
                  </button>
                </div>

                <button className={styles.accountSwitch} type="button" onClick={() => showView("login", "phone-login")}>
                  Already have an account? <span>Sign in</span>
                </button>
              </section>
            ) : null}

            {view === "signup" ? (
              <section className={styles.authView} aria-labelledby="signup-title">
                <button className={styles.viewBack} type="button" onClick={() => showView("options")}>
                  <BackIcon />
                  All sign-up options
                </button>
                <header className={styles.formViewHeading}>
                  <h2 id="signup-title">Create your account</h2>
                  <p>We will send a one-time code to your phone.</p>
                </header>
                {notice ? <div className={`${styles.message} ${notice.tone === "error" ? styles.messageError : ""}`}>{notice.text}</div> : null}
                <form className={styles.form} onSubmit={requestOtp}>
                  <div className={styles.field}>
                    <label htmlFor="signup-name">Full name</label>
                    <input id="signup-name" value={name} onChange={(event) => setName(event.target.value)} type="text" autoComplete="name" placeholder="Enter your first and last name" required />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="signup-email">Email address</label>
                    <input id="signup-email" value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="you@example.com" required />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="signup-phone">Phone number</label>
                    <input id="signup-phone" value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" autoComplete="tel" placeholder="+919812345678" required />
                  </div>
                  <p className={styles.formTerms}>
                    By creating an account, you agree to our <Link href="/terms-and-conditions">Terms of use</Link> and <Link href="/privacy-policy">Privacy policy</Link>.
                  </p>
                  <button className={styles.primaryButton} type="submit" disabled={loading}>
                    <span>{loading ? "Sending code..." : "Get OTP"}</span>
                    <ArrowIcon />
                  </button>
                </form>
                <button className={styles.accountSwitch} type="button" onClick={() => showView("login", "phone-login")}>
                  Already have an account? <span>Sign in</span>
                </button>
              </section>
            ) : null}

            {view === "login" ? (
              <section className={styles.authView} aria-labelledby="login-title">
                <button className={styles.viewBack} type="button" onClick={() => showView("options")}>
                  <BackIcon />
                  All account options
                </button>
                <header className={styles.formViewHeading}>
                  <h2 id="login-title">Welcome back</h2>
                  <p>Enter your phone number to receive a secure code.</p>
                </header>
                {notice ? <div className={`${styles.message} ${notice.tone === "error" ? styles.messageError : ""}`}>{notice.text}</div> : null}
                <form className={styles.form} onSubmit={requestOtp}>
                  <div className={styles.field}>
                    <label htmlFor="login-phone">Phone number</label>
                    <input id="login-phone" value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" autoComplete="tel" placeholder="+919812345678" required />
                  </div>
                  <button className={styles.primaryButton} type="submit" disabled={loading}>
                    <span>{loading ? "Sending code..." : "Send login OTP"}</span>
                    <ArrowIcon />
                  </button>
                </form>
                <button className={styles.accountSwitch} type="button" onClick={() => showView("signup", "phone-signup")}>
                  New to BackBySunday? <span>Create an account</span>
                </button>
              </section>
            ) : null}

            {view === "google" ? (
              <section className={styles.authView} aria-labelledby="google-title">
                <button className={styles.viewBack} type="button" onClick={() => showView("options")}>
                  <BackIcon />
                  All sign-up options
                </button>
                <header className={styles.formViewHeading}>
                  <h2 id="google-title">Add your phone</h2>
                  <p>{googleEmail ? `Google connected as ${googleEmail}.` : "Google is connected."} Add your phone number for OTP.</p>
                </header>
                {notice ? <div className={`${styles.message} ${notice.tone === "error" ? styles.messageError : ""}`}>{notice.text}</div> : null}
                <form className={styles.form} onSubmit={(event) => {
                  event.preventDefault();
                  void startGoogleOtp(googleIdToken);
                }}>
                  <div className={styles.field}>
                    <label htmlFor="google-phone">Phone number</label>
                    <input id="google-phone" value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" autoComplete="tel" placeholder="+919812345678" required />
                  </div>
                  <button className={styles.primaryButton} type="submit" disabled={loading}>
                    <span>{loading ? "Sending code..." : "Get phone OTP"}</span>
                    <ArrowIcon />
                  </button>
                </form>
              </section>
            ) : null}

            {view === "otp" ? (
              <section className={styles.authView} aria-labelledby="otp-title">
                <button className={styles.viewBack} type="button" onClick={() => showView(flow === "phone-login" ? "login" : flow === "google" ? "google" : "signup")}>
                  <BackIcon />
                  Edit details
                </button>
                <header className={styles.formViewHeading}>
                  <h2 id="otp-title">Enter OTP</h2>
                  <p>Use the latest code sent to {challengePhone || phone || "your phone"}.</p>
                </header>
                {notice ? <div className={`${styles.message} ${notice.tone === "error" ? styles.messageError : ""}`}>{notice.text}</div> : null}
                <form className={styles.form} onSubmit={verifyOtp}>
                  <div className={styles.field}>
                    <label htmlFor="otp-code">Verification code</label>
                    <div className={styles.otpGroup} id="otp-code">
                      {Array.from({ length: OTP_LENGTH }, (_, index) => (
                        <input
                          key={index}
                          id={`otp-digit-${index}`}
                          ref={(element) => {
                            otpInputRefs.current[index] = element;
                          }}
                          value={otp[index] ?? ""}
                          onChange={(event) => updateOtpDigit(index, event.target.value)}
                          onKeyDown={(event) => handleOtpKeyDown(index, event.key)}
                          onPaste={(event) => {
                            event.preventDefault();
                            const pastedCode = normalizeCode(event.clipboardData.getData("text")).slice(0, OTP_LENGTH);
                            setOtp(pastedCode);
                            const nextFocusIndex = pastedCode.length > 0 ? Math.min(pastedCode.length, OTP_LENGTH) - 1 : 0;
                            otpInputRefs.current[nextFocusIndex]?.focus();
                          }}
                          inputMode="numeric"
                          autoComplete={index === 0 ? "one-time-code" : "off"}
                          maxLength={1}
                          aria-label={`OTP digit ${index + 1}`}
                          required
                        />
                      ))}
                    </div>
                  </div>
                  {devOtp ? <p className={styles.legal}>Development OTP is auto-filled from the latest request: {devOtp}</p> : null}
                  <button className={styles.primaryButton} type="submit" disabled={loading}>
                    <span>{loading ? "Verifying..." : "Verify and continue"}</span>
                    <ArrowIcon />
                  </button>
                </form>
              </section>
            ) : null}

            {view === "success" ? (
              <section className={styles.authView} aria-labelledby="success-title">
                <header className={styles.viewHeading}>
                  <h2 id="success-title">You&apos;re all set</h2>
                  <p>Your account is ready for the next weekend worth remembering.</p>
                </header>
                {notice ? <div className={`${styles.message} ${notice.tone === "error" ? styles.messageError : ""}`}>{notice.text}</div> : null}
                <Link className={`${styles.choiceButton} ${styles.mossButton}`} href="/">
                  Back to explore
                </Link>
              </section>
            ) : null}
          </div>

          <footer className={styles.footer}>BackBySunday. Make every weekend refreshing.</footer>
        </section>
      </main>
    </>
  );
}
