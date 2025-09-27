import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useLayoutEffect } from 'react';

export interface GlassHeaderProps {
  title?: string;
  navLinks?: Array<{
    label: string;
    href?: string;
    ariaLabel?: string;
    title?: string;
    github?: boolean;
    dropdown?: Array<{ label: string; href: string; ariaLabel?: string; title?: string }>;
  }>;
}

export function Header({
  title = "Liquid Glass ComponentKit",
  navLinks = [
    { label: "GitHub", href: "https://github.com/nibilin33/liquid-glass-ui", ariaLabel: "GitHub 仓库", title: "GitHub", github: true },
  ]
}: GlassHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [menuStyles, setMenuStyles] = useState<Record<string, React.CSSProperties>>({});

  useLayoutEffect(() => {
    if (!hovered) return;
    const btn = btnRefs.current[hovered];
    const menu = menuRefs.current[hovered];
    if (btn && menu) {
      const btnRect = btn.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      const winW = window.innerWidth, winH = window.innerHeight;
      let top = btnRect.bottom + 8;
      let left = btnRect.left;
      let right: number | undefined = undefined;
      let transform = '';
      let maxWidth = Math.min(winW - 24, 400); // 限制最大宽度
      // 下方空间不足则向上弹出
      if (btnRect.bottom + menuRect.height + 16 > winH) {
        top = Math.max(8, btnRect.top - menuRect.height - 8);
      }
      // 右侧空间不足则左对齐
      if (btnRect.left + menuRect.width > winW - 8) {
        left = Math.max(8, winW - menuRect.width - 8);
        right = undefined;
        transform = 'unset';
      }
      // 菜单宽度小于按钮宽度时，left 取 btnRect.left
      // 菜单宽度大于按钮宽度时，left 取 min(btnRect.left, winW - menuRect.width - 8)
      if (menuRect.width > btnRect.width) {
        left = Math.min(btnRect.left, winW - menuRect.width - 8);
      }
      setMenuStyles(s => ({ ...s, [hovered]: {
        position: 'fixed',
        top,
        left,
        right,
        zIndex: 100,
        maxWidth,
        transform,
        overflow: 'auto',
      }}));
    }
  }, [hovered]);

  return (
    <header
      className="sticky top-0 z-50 w-full py-4 px-4 md:px-8 flex items-center justify-between liquid-glass rounded-2xl transition-all"
      role="banner"
      style={{ boxShadow: '0 4px 24px 0 rgba(60,120,80,0.10)' }}
    >
      <a href="/" aria-label={`${title} 首页`} title={`${title} 首页`}>
        <h1 className="text-2xl font-extrabold tracking-wide drop-shadow">{title}</h1>
      </a>
      {/* 桌面导航 */}
      <motion.nav
        className="hidden md:flex gap-6"
        role="navigation"
        aria-label="主导航"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {navLinks.map(link => (
          <div
            key={link.label}
            className="relative"
            onMouseEnter={() => setHovered(link.label)}
            onMouseLeave={() => setHovered(null)}
          >
            {link.dropdown ? (
              <>
                <motion.button
                  className="liquid-glass px-5 py-2 rounded-xl flex items-center gap-2 text-emerald-700 font-semibold shadow-glass transition"
                  aria-label={link.ariaLabel || link.label}
                  title={link.title || link.label}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  ref={el => { btnRefs.current[link.label] = el}}
                >
                  {link.label}
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </motion.button>
                <AnimatePresence>
                  {hovered === link.label && (
                    <motion.div
                      ref={el => { menuRefs.current[link.label] = el }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full mt-2 min-w-[180px] max-w-[90vw] bg-white/90 backdrop-blur border border-emerald-100 rounded-xl shadow-xl z-50 overflow-auto"
                      style={menuStyles[link.label]}
                    >
                      <ul className="py-2">
                        {link.dropdown.map(item => (
                          <li key={item.href}>
                            <a
                              href={item.href}
                              className="block px-5 py-2 text-emerald-700 hover:bg-emerald-50/80 rounded-lg transition"
                              aria-label={item.ariaLabel || item.label}
                              title={item.title || item.label}
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <motion.a
                href={link.href}
                className={`liquid-glass px-5 py-2 rounded-xl flex items-center gap-2 text-emerald-700 font-semibold shadow-glass transition`}
                aria-label={link.ariaLabel || link.label}
                title={link.title || link.label}
                target={link.github ? "_blank" : undefined}
                rel={link.github ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
              >
                {link.github && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.646.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.099 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.175 22 16.427 22 12.012 22 6.484 17.523 2 12 2z"/></svg>
                )}
                {link.label}
              </motion.a>
            )}
          </div>
        ))}
      </motion.nav>
      {/* 移动端菜单按钮 */}
      <button
        className="md:hidden liquid-glass px-3 py-2 rounded-xl text-emerald-700 font-semibold shadow-glass flex items-center gap-2"
        aria-label="Open navigation menu"
        onClick={() => setMenuOpen(true)}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      {/* 移动端抽屉导航 */}
      {menuOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 半透明渐变遮罩 */}
          <div className="flex-1 bg-gradient-to-br from-emerald-100/60 via-white/40 to-blue-100/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <motion.div
            className="w-72 h-full bg-gradient-to-br from-white/80 via-emerald-50/90 to-blue-50/80 shadow-2xl rounded-l-3xl p-7 flex flex-col gap-7 border-l border-emerald-100"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <button
              className="self-end mb-2 text-emerald-700 hover:bg-emerald-100/60 rounded-full p-2 transition"
              aria-label="Close navigation menu"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" stroke="currentColor" strokeOpacity="0.15" fill="white" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 8l8 8M8 16l8-8"/></svg>
            </button>
            {navLinks.map(link => (
              <div key={link.label} className="mb-2">
                {link.dropdown ? (
                  <>
                    <div className="font-semibold text-emerald-700 mb-1">{link.label}</div>
                    <ul>
                      {link.dropdown.map(item => (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            className="block px-4 py-2 rounded-lg hover:bg-emerald-50/80 text-emerald-700"
                            aria-label={item.ariaLabel || item.label}
                            title={item.title || item.label}
                            onClick={() => setMenuOpen(false)}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a
                    href={link.href}
                    className="liquid-glass px-6 py-4 rounded-2xl flex items-center gap-3 text-emerald-700 font-semibold shadow-glass text-lg hover:bg-emerald-50/60 transition"
                    aria-label={link.ariaLabel || link.label}
                    title={link.title || link.label}
                    target={link.github ? "_blank" : undefined}
                    rel={link.github ? "noopener noreferrer" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.github && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.646.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.099 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.175 22 16.427 22 12.012 22 6.484 17.523 2 12 2z"/></svg>
                    )}
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </header>
  );
}