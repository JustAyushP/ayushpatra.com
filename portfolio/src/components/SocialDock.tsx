export function SocialDock() {
    return (
      <div className="fixed bottom-6 left-6 flex gap-4 text-sm ">
        <a
          href="https://github.com/JustAyushP"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/apatra07/"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          LinkedIn
        </a>
        <a
          href="mailto:your-email@example.com"
          className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Email
        </a>
      </div>
    );
  }
  