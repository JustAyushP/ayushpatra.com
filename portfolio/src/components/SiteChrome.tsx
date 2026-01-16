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
    label: 'projects',
    href: '#',
    ariaLabel: 'Projects',
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
    label: 'contact',
    href: '#',
    ariaLabel: 'Contact',
    rotation: -8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  }
];




export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
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
    </div>
  );
}
