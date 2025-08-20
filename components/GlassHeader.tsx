export interface GlassHeaderProps {
  title?: string;
  navLinks?: Array<{ label: string; href: string; ariaLabel?: string; title?: string; github?: boolean }>;
}

export default function GlassHeader({
  title = "Liquid Glass ComponentKit",
  navLinks = [
    { label: "GitHub", href: "https://github.com/nibilin33/liquid-glass-ui", ariaLabel: "GitHub 仓库", title: "GitHub", github: true }
  ]
}: GlassHeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 w-full py-4 px-8 flex items-center justify-between liquid-glass rounded-2xl transition-all"
      role="banner"
      style={{boxShadow: '0 4px 24px 0 rgba(60,120,80,0.10)'}}
    >
      <a href="/" aria-label={`${title} 首页`} title={`${title} 首页`}>
        <h1 className="text-2xl font-extrabold tracking-wide drop-shadow">{title}</h1>
      </a>
      <nav className="flex gap-6" role="navigation" aria-label="主导航">
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className={`liquid-glass px-5 py-2 rounded-xl flex items-center gap-2 text-emerald-700 font-semibold shadow-glass hover:scale-105 transition${link.github ? '' : ''}`}
            aria-label={link.ariaLabel || link.label}
            title={link.title || link.label}
            target={link.github ? "_blank" : undefined}
            rel={link.github ? "noopener noreferrer" : undefined}
          >
            {link.github && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.646.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.099 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.175 22 16.427 22 12.012 22 6.484 17.523 2 12 2z"/></svg>
            )}
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
