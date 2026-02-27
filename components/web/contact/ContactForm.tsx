"use client";

import { easeOut, motion, Variants } from "framer-motion";
import { useState } from "react";
import { Loader2, Send } from "lucide-react";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

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
      
    } catch (err: any) {
      console.error("Submission error:", err);
      setStatus("error");
      setErrorMessage(err.message);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 mt-14"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Name */}
      <motion.div variants={item}>
        <label className="block text-sm mb-1 font-medium text-gray-400">
          Name
        </label>
        <input
          required
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          placeholder="Your name"
          className="mt-1 w-full rounded-md border border-gray-800 bg-black/20 px-4 py-2 text-white outline-none focus:border-indigo-500 transition-colors"
        />
      </motion.div>

      {/* Email */}
      <motion.div variants={item}>
        <label className="block mb-1 text-sm font-medium text-gray-400">
          Email
        </label>
        <input
          required
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="you@example.com"
          className="mt-1 w-full rounded-md border border-gray-800 bg-black/20 px-4 py-2 text-white outline-none focus:border-indigo-500 transition-colors"
        />
      </motion.div>

      {/* Message */}
      <motion.div variants={item}>
        <label className="block text-sm font-medium text-gray-400">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Write your message..."
          className="mt-1 w-full rounded-md border border-gray-800 bg-black/20 px-4 py-2 text-white outline-none focus:border-indigo-500 transition-colors resize-none"
        />
      </motion.div>

      {/* Feedback Messages */}
      {status === "error" && (
        <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
      )}
      {status === "success" && (
        <p className="text-green-500 text-sm font-medium">Message sent successfully! I'll get back to you soon.</p>
      )}

      {/* Button */}
      <motion.button
        variants={item}
        disabled={status === "loading"}
        type="submit"
        className={`
          flex items-center justify-center gap-2 w-full mb-1 rounded-md px-6 py-3 font-bold transition-all
          ${status === "loading" ? "bg-gray-600 cursor-not-allowed" : "bg-white text-black hover:bg-gray-200 active:scale-[0.98]"}
        `}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="animate-spin" size={18} /> Sending...
          </>
        ) : (
          <>
            <Send size={18} /> Send Message
          </>
        )}
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;