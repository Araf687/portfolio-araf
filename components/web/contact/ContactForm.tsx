"use client";

import { easeOut, motion, Variants } from "framer-motion";
import { useState } from "react";
import { Loader2, MoveUpRight } from "lucide-react";
import Magnetic from "../Magnetic";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

const labelClass = "block font-mono text-xs uppercase tracking-wider text-muted";
const fieldClass =
  "mt-1 w-full border-b border-border bg-transparent py-3 text-lg text-foreground placeholder-muted/60 outline-none transition-colors focus:border-accent";

const ContactForm = () => {
  // 1. State for Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // 2. State for Status Handling
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // 3. Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 4. Submission Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Success Logic
      setStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Reset form

      // Reset status after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);

    } catch (err: unknown) {
      console.error("Submission error:", err);
      setStatus("error");
      setErrorMessage((err as Error).message);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mt-12 space-y-7"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="grid gap-7 sm:grid-cols-2">
        {/* Name */}
        <motion.div variants={item}>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            required
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
          />
        </motion.div>

        {/* Email */}
        <motion.div variants={item}>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            required
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClass}
          />
        </motion.div>
      </div>

      {/* Message */}
      <motion.div variants={item}>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell me about your project..."
          className={`${fieldClass} resize-none`}
        />
      </motion.div>

      {/* Feedback Messages */}
      <div aria-live="polite">
        {status === "error" && (
          <p className="text-sm font-medium text-red-500">{errorMessage}</p>
        )}
        {status === "success" && (
          <p className="text-sm font-medium text-green-600">Message sent successfully! {`I'll`} get back to you soon.</p>
        )}
      </div>

      {/* Button */}
      <motion.div variants={item}>
        <Magnetic className="inline-block">
          <button
            disabled={status === "loading"}
            type="submit"
            className="flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 font-semibold text-background transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Sending...
              </>
            ) : (
              <>
                Send message <MoveUpRight size={18} />
              </>
            )}
          </button>
        </Magnetic>
      </motion.div>
    </motion.form>
  );
};

export default ContactForm;
