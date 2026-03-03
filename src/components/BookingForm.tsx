"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FormType = "speaker" | "guest";

const inputClass = [
  "w-full py-3.5 px-4 text-sm rounded-xl border bg-white",
  "focus:outline-none transition-all",
  "placeholder:text-[var(--text-faint)]",
].join(" ");

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span
        className="text-sm font-semibold"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
        {required && (
          <span style={{ color: "var(--blue)" }} className="ml-1">
            *
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

export default function BookingForm() {
  const t = useTranslations("booking");
  const [activeTab, setActiveTab] = useState<FormType>("speaker");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: activeTab, ...data }),
    }).catch(() => {});
    setLoading(false);
    setSubmitted(true);
  }

  const inputStyle = {
    borderColor: "var(--border)",
    color: "var(--text)",
  };
  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "var(--blue)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
  };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "var(--border)";
    e.currentTarget.style.boxShadow = "none";
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center justify-center gap-5 py-24 text-center"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "var(--blue-light)" }}
        >
          <CheckCircle size={40} style={{ color: "var(--blue)" }} />
        </div>
        <h3
          className="text-2xl font-bold"
          style={{ color: "var(--text)" }}
        >
          {t("successMsg")}
        </h3>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Tab switcher */}
      <div
        className="inline-flex p-1.5 rounded-2xl mb-12 border"
        style={{
          background: "var(--bg-soft)",
          borderColor: "var(--border)",
        }}
      >
        {(["speaker", "guest"] as FormType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
            style={{
              color:
                activeTab === tab ? "white" : "var(--text-muted)",
            }}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 rounded-xl"
                style={{ background: "var(--blue)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              {tab === "speaker" ? t("tabSpeaker") : t("tabGuest")}
            </span>
          </button>
        ))}
      </div>

      <div className="max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === "speaker" ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === "speaker" ? 16 : -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="mb-8">
              <h2
                className="text-2xl font-bold mb-2"
                style={{ color: "var(--text)" }}
              >
                {activeTab === "speaker" ? t("speakerTitle") : t("guestTitle")}
              </h2>
              <p style={{ color: "var(--text-muted)" }}>
                {activeTab === "speaker" ? t("speakerSub") : t("guestSub")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label={t("fieldName")} required>
                  <input
                    name="name"
                    required
                    placeholder="Martin Pattera"
                    className={inputClass}
                    style={inputStyle}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  />
                </Field>
                <Field label={t("fieldEmail")} required>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className={inputClass}
                    style={inputStyle}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  />
                </Field>
              </div>

              <Field label={t("fieldCompany")} required>
                <input
                  name="company"
                  required
                  placeholder="Your Company"
                  className={inputClass}
                  style={inputStyle}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </Field>

              {activeTab === "speaker" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label={t("fieldEventType")}>
                      <select
                        name="eventType"
                        className={inputClass}
                        style={inputStyle}
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                      >
                        <option value="">— Select —</option>
                        <option value="conference">Conference</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="workshop">Workshop / Training</option>
                        <option value="university">University / School</option>
                        <option value="other">Other</option>
                      </select>
                    </Field>
                    <Field label={t("fieldEventDate")}>
                      <input
                        type="date"
                        name="eventDate"
                        className={inputClass}
                        style={inputStyle}
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                      />
                    </Field>
                  </div>
                  <Field label={t("fieldBudget")}>
                    <select
                      name="budget"
                      className={inputClass}
                      style={inputStyle}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    >
                      <option value="">— Select —</option>
                      <option>&lt; €5,000</option>
                      <option>€5,000 – €10,000</option>
                      <option>€10,000 – €20,000</option>
                      <option>€20,000+</option>
                    </select>
                  </Field>
                  <Field label={t("fieldMessage")}>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell us about your event, the audience, and what you hope to achieve…"
                      className={inputClass + " resize-none"}
                      style={inputStyle}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    />
                  </Field>
                </>
              )}

              {activeTab === "guest" && (
                <>
                  <Field label={t("fieldLinkedIn")} required>
                    <input
                      name="linkedin"
                      required
                      placeholder="https://linkedin.com/in/yourname"
                      className={inputClass}
                      style={inputStyle}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    />
                  </Field>
                  <Field label={t("fieldTopic")} required>
                    <textarea
                      name="topic"
                      rows={4}
                      required
                      placeholder={t("fieldTopicPlaceholder")}
                      className={inputClass + " resize-none"}
                      style={inputStyle}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    />
                  </Field>
                  <Field label={t("fieldAudience")}>
                    <textarea
                      name="audience"
                      rows={3}
                      placeholder={t("fieldAudiencePlaceholder")}
                      className={inputClass + " resize-none"}
                      style={inputStyle}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    />
                  </Field>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 self-start flex items-center gap-2.5 px-8 py-4 font-bold text-white text-base rounded-2xl transition-all hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(37,99,235,0.35)] active:scale-[0.98] disabled:opacity-60"
                style={{ background: "var(--blue)" }}
              >
                {loading ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                ) : (
                  <Send size={16} />
                )}
                {loading
                  ? "Sending…"
                  : activeTab === "speaker"
                  ? t("submitSpeaker")
                  : t("submitGuest")}
              </button>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
