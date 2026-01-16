import Image from "next/image";
import githubIcon from "./assets/github.png";
import linkedinIcon from "./assets/linkedin.png";
import gmailIcon from "./assets/gmail.png";

export function SocialDock() {
    return (
      <div className="fixed bottom-6 left-6 flex items-center gap-4 text-sm z-50">
        <a
          href="https://github.com/JustAyushP"
          target="_blank"
          rel="noreferrer"
          className="opacity-60 hover:opacity-100 transition-opacity"
        >
          <Image
            src={githubIcon}
            alt="GitHub"
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/apatra07/"
          target="_blank"
          rel="noreferrer"
          className="opacity-60 hover:opacity-100 transition-opacity"
        >
          <Image
            src={linkedinIcon}
            alt="LinkedIn"
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
          />
        </a>
        <a
          href="mailto:your-email@example.com"
          className="opacity-60 hover:opacity-100 transition-opacity"
        >
          <Image
            src={gmailIcon}
            alt="Email"
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
          />
        </a>
      </div>
    );
  }
  