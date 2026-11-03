import { SOCIALS } from "@/lib/site";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-border px-6 py-6 font-mono text-xs uppercase tracking-wider text-muted sm:flex-row lg:px-12 xl:px-20">
      <span>&copy; {new Date().getFullYear()} Mohammad Yeasin</span>
      <ul className="flex gap-5">
        {SOCIALS.map((social) => (
          <li key={social.name}>
            <a href={social.href} className="transition-colors hover:text-foreground">
              {social.name}
            </a>
          </li>
        ))}
      </ul>
      <a href="#" className="transition-colors hover:text-foreground">
        Back to top &uarr;
      </a>
    </footer>
  );
};

export default Footer;
