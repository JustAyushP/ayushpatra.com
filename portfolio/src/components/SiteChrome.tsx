import Link from "next/link";
import { SocialDock } from "./SocialDock";
import BubbleMenu from "./BubbleMenu";

const items = [
  {
    label: 'home',
    href: '/',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'about',
    href: '#',
    ariaLabel: 'About',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'music',
    href: '/music',
    ariaLabel: 'Music',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'gallery',
    href: '/gallery',
    ariaLabel: 'Gallery',
    rotation: 8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
  {
    label: 'travel',
    href: '/travel',
    ariaLabel: 'Travel',
    rotation: -8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  }
];




export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <header className="fixed left-0 right-0 top-0 z-50 w-full">
        <BubbleMenu
            logo={<span style={{ fontWeight: 700, fontSize: '1.25rem' }}>Ayush Patra.</span>}
            items={items}
            menuAriaLabel="Toggle navigation"
            menuBg="#ffffff"
            menuContentColor="#111111"
            useFixedPosition={false}
            animationEase="back.out(1.5)"
            animationDuration={0.5}
            staggerDelay={0.12}
        />
      </header>

      {/* Page content gets pushed down so it doesn't sit under the fixed header */}
      <main className="mx-auto max-w-6xl px-6 pt-24">{children}</main>

      <SocialDock />
      
      {/* Resume Download Button - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="/Resume.pdf"
          download="Ayush_Patra_Resume.pdf"
          className="group relative flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          <span className="text-sm font-medium">Resume</span>
        </a>
      </div>
    </div>
  );
}
