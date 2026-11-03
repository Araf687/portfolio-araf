"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ContactForm from "./ContactForm";
import Magnetic from "../Magnetic";
import { EMAIL } from "@/lib/site";

const ContactSection = () => {
  return (
    <section className="overflow-hidden px-6 pt-10 lg:px-12 xl:px-20">
      <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">
        (04) Contact
      </p>

      <h2 className="font-display text-7xl font-normal uppercase leading-[1.05] lg:text-9xl">
        {`Let's`} <em className="font-serif lowercase text-accent">talk</em>
      </h2>

      <div className="mt-10 grid grid-cols-1 items-end gap-12 lg:mt-14 lg:grid-cols-2">
        <div className="pb-14">
          <Magnetic strength={0.15} className="inline-block">
            <a
              href={`mailto:${EMAIL}`}
              className="text-xl font-medium underline decoration-accent decoration-2 underline-offset-8 sm:text-3xl"
            >
              {EMAIL}
            </a>
          </Magnetic>

          <ContactForm />
        </div>

        {/* Black suit needs a colored backdrop to read in dark mode */}
        <motion.div
          className="relative mx-auto h-[60svh] w-full max-w-xl origin-bottom overflow-hidden rounded-t-full bg-accent lg:h-[560px]"
          initial={{ y: 120, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/contact2.png"
            alt="Illustration of Mohammad Yeasin taking a phone call"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[55%_top]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
