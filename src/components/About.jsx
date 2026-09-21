import Icon from './Icons.jsx'
import ShinyLabel from './ShinyLabel.jsx'
import useCountUp from '../hooks/useCountUp.js'
import { profile } from '../data/profile.js'
import './About.css'

function StatItem({ stat, index }) {
  const [ref, value] = useCountUp(stat.value)

  return (
    <div className="about__stat reveal" style={{ '--reveal-delay': `${180 + index * 90}ms` }}>
      <span className="about__stat-value" ref={ref}>
        {value}
        <em>{stat.suffix}</em>
      </span>
      <span className="about__stat-label">{stat.label}</span>
    </div>
  )
}

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container about__inner">
        <div className="about__visual reveal reveal--left">
          <div className="about__avatar-wrap">
            <span className="about__avatar-ring" aria-hidden="true" />
            <img className="about__avatar" src={profile.avatar} alt={`${profile.name} 的头像标识`} />
            <span className="about__badge about__badge--top">
              <Icon name="globe" size={16} />
              仅收录国外站点
            </span>
            <span className="about__badge about__badge--bottom">
              <Icon name="sparkle" size={16} />
              AI × 硬件 × 开发
            </span>
          </div>
        </div>

        <div className="about__content">
            <span className="eyebrow reveal reveal--right">
              <span className="eyebrow__dot" />
              <ShinyLabel text={profile.nameEn} />
            </span>
            <h2 className="section-title reveal reveal--right" style={{ '--reveal-delay': '80ms' }}>
              <span className="gradient-text">{profile.name}</span>
              {' 的全球科技导航门户'}
            </h2>

          {profile.bio.map((paragraph, index) => (
            <p
              className="about__text reveal reveal--right"
              key={paragraph}
              style={{ '--reveal-delay': `${140 + index * 60}ms` }}
            >
              {paragraph}
            </p>
          ))}

          <div className="about__stats">
            {profile.stats.map((stat, index) => (
              <StatItem key={stat.id} stat={stat} index={index} />
            ))}
          </div>

          <div className="about__links reveal" style={{ '--reveal-delay': '460ms' }}>
            <a className="about__mail glass" href={`mailto:${profile.email}`}>
              <Icon name="mail" size={18} />
              <span>{profile.email}</span>
            </a>
            <ul className="about__socials">
              {profile.socials.map((social) => (
                <li key={social.id}>
                  <a
                    className="about__social"
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.name}
                    title={social.name}
                  >
                    <Icon name={social.icon} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
