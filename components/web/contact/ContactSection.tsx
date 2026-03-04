"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ContactForm from "./ContactForm";
import TitleText from "../../Title";
import GlowingImage from "../../GlowingImage";

const ContactSection = () => {
  return (
    <div className="grid pt-20 mb-4 lg:pt-50 lg:px-0 px-3 grid-cols-1 items-end gap-12 md:grid-cols-2">
      <div>
        <TitleText direction="column">Contact Me</TitleText>
        {/* Left: Contact Form */}
        
        <ContactForm />
      </div>

 
      <GlowingImage/>
    </div>
  );
};

export default ContactSection;
