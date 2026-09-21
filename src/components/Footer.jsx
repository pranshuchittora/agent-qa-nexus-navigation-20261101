import Icon from './Icons.jsx'
import ShinyLabel from './ShinyLabel.jsx'
import { profile } from '../data/profile.js'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" id="contact">
      <div className="footer__aurora" aria-hidden="true" />

      <div className="container footer__inner">
        <span className="eyebrow footer__eyebrow">
          <span className="eyebrow__dot" />
          <ShinyLabel text={`${profile.name} · Let's Talk`} />
        </span>

        <h2 className="footer__title">
          <span>让世界更快一步</span>
          <span className="gradient-text">抵达前沿科技</span>
        </h2>

        <p className="footer__desc">
          需要定制导航门户、科技品牌官网或高完成度的前端交互？欢迎随时来信，一起把想法变成上线产品。
        </p>

        <div className="footer__actions">
          <a className="btn btn--primary footer__mail" href={`mailto:${profile.email}`}>
            <Icon name="mail" size={18} />
            {profile.email}
          </a>
          <a
            className="btn btn--ghost"
            href="https://github.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            查看开源仓库
            <Icon name="arrow-up-right" size={17} className="btn__arrow" />
          </a>
        </div>

        <ul className="footer__socials">
          {profile.socials.map((social) => (
            <li key={social.id}>
              <a
                className="footer__social"
                href={social.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.name}
                title={social.name}
              >
                <Icon name={social.icon} size={20} />
              </a>
            </li>
          ))}
        </ul>

        <div className="footer__bottom">
          <span>© {year} {profile.name} · NEXUS 全球科技导航 · 仅收录国外科技站点</span>
          <span className="footer__location">
            <Icon name="globe" size={15} />
            {profile.location}
          </span>
          <a className="footer__top" href="#home">
            回到顶部
            <Icon name="arrow-up-right" size={15} />
          </a>
        </div>
      </div>
    </footer>
  )
}
