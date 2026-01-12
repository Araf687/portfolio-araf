"use client";

import { easeOut, motion, Variants } from "framer-motion";

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
  return (
    <motion.form
      className="space-y-4 mt-14"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Name */}
      <motion.div variants={item}>
        <label className="block text-sm mb-1 font-medium text-gray-300">
          Name
        </label>
        <input
          type="text"
          placeholder="Your name"
          className="mt-1 w-full rounded-md border border-gray-700 bg-transparent px-4 py-2 text-white outline-none focus:border-primary"
        />
      </motion.div>

      {/* Email */}
      <motion.div variants={item}>
        <label className="block mb-1 text-sm font-medium text-gray-300">
          Email
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          className="mt-1 w-full rounded-md border border-gray-700 bg-transparent px-4 py-2 text-white outline-none focus:border-primary"
        />
      </motion.div>

      {/* Message */}
      <motion.div variants={item}>
        <label className="block text-sm font-medium text-gray-300">
          Message
        </label>
        <textarea
          rows={5}
          placeholder="Write your message..."
          className="mt-1 w-full rounded-md border border-gray-700 bg-transparent px-4 py-2 text-white outline-none focus:border-primary"
        />
      </motion.div>

      {/* Button */}
      <motion.button
        variants={item}
        type="submit"
        className="w-full mb-1 rounded-md bg-gray-200 px-6 py-2 font-semibold text-black transition hover:opacity-90"
      >
        Send Message
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;
