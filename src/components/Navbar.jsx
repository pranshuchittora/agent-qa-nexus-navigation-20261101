import { useEffect, useState } from 'react'
import Icon from './Icons.jsx'
import useActiveSection from '../hooks/useActiveSection.js'
import { profile } from '../data/profile.js'
import './Navbar.css'

const sectionIds = profile.nav.map((item) => item.id)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a className="navbar__brand" href="#home" aria-label={`${profile.name} · 返回首页`}>
          <span className="navbar__mark" aria-hidden="true">
            <span className="navbar__mark-glyph">{profile.mark}</span>
          </span>
          <span className="navbar__brand-text">
            <strong>{profile.name}</strong>
            <em>{profile.nameEn}</em>
          </span>
        </a>

        <nav className={`navbar__nav ${open ? 'is-open' : ''}`} aria-label="主导航">
          {profile.nav.map((item) => (
            <a
              key={item.id}
              className={`navbar__link ${active === item.id ? 'is-active' : ''}`}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <a
            className="btn btn--primary navbar__cta navbar__cta--mobile"
            href={`mailto:${profile.email}`}
            title={profile.email}
            onClick={() => setOpen(false)}
          >
            联系我
            <Icon name="arrow-up-right" size={17} className="btn__arrow" />
          </a>

          {/* 折叠菜单里的补充信息：邮箱与社交入口，避免菜单过于单薄 */}
          <div className="navbar__menu-foot">
            <a className="navbar__menu-mail" href={`mailto:${profile.email}`} onClick={() => setOpen(false)}>
              <Icon name="mail" size={16} />
              <span>{profile.email}</span>
            </a>
            <ul className="navbar__menu-socials">
              {profile.socials.slice(0, 4).map((social) => (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.name}
                    title={social.name}
                  >
                    <Icon name={social.icon} size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="navbar__actions">
          <a className="btn btn--primary navbar__cta" href={`mailto:${profile.email}`} title={profile.email}>
            联系我
            <Icon name="arrow-up-right" size={17} className="btn__arrow" />
          </a>
          <button
            type="button"
            className="navbar__toggle"
            aria-label={open ? '关闭菜单' : '打开菜单'}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>
    </header>
  )
}
