import Icon from './Icons.jsx'
import RotatingText from './reactbits/RotatingText.jsx'
import SplitText from './reactbits/SplitText.jsx'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'
import { heroPoster, heroVideo } from '../data/site-config.js'
import { sites, siteStats } from '../data/sites.js'
import './Hero.css'

const heroKeywords = ['AI 工具', '硬件科技', '软件平台', '开发者资源']

const heroStats = [
  { id: 'sites', value: `${siteStats.total}+`, label: '精选国外站点' },
  { id: 'categories', value: `${siteStats.categories}`, label: '内容分类矩阵' },
  { id: 'region', value: '100%', label: '国际站点来源' },
]

// 首屏右侧速达面板：每个方向挑一个代表站点，保持分类均衡
const quickEntryIds = ['openai', 'nvidia', 'github', 'mdn']
const quickEntries = quickEntryIds
  .map((id) => sites.find((site) => site.id === id))
  .filter(Boolean)

export default function Hero() {
  const reduce = usePrefersReducedMotion()

  return (
    <section className="hero" id="home">
      <div className="hero__media" aria-hidden="true">
        <video
          className="hero__video"
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        >
          {heroVideo ? <source src={heroVideo} type="video/mp4" /> : null}
        </video>
        <div className="hero__aurora" />
        <div className="hero__overlay" />
        <div className="hero__grain" />
      </div>

      <div className="hero__content container">
        <div className="hero__lead">
          <span className="eyebrow hero__anim hero__anim--1">
            <span className="eyebrow__dot" />
            张家诚 · Global Tech Index 2026
          </span>

          <h1 className="hero__title">
            <span className="hero__title-line">
              {reduce ? (
                '探索全球'
              ) : (
                <SplitText
                  text="探索全球"
                  tag="span"
                  className="hero__title-split"
                  textAlign="left"
                  splitType="chars"
                  delay={40}
                  duration={0.45}
                  ease="power3.out"
                  from={{ opacity: 0, y: 26 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0}
                  rootMargin="0px"
                />
              )}
            </span>
            <span className="hero__title-line hero__title-line--offset gradient-text hero__anim hero__anim--2">
              科技与 AI 前沿
            </span>
          </h1>
        </div>

        <div className="hero__body">
          <div className="hero__intro">
            <p className="hero__rotate hero__anim hero__anim--3">
              <span className="hero__rotate-copy">覆盖</span>
              {reduce ? (
                <span className="hero__rotate-static">AI 工具 · 硬件科技 · 软件平台 · 开发者资源</span>
              ) : (
                <RotatingText
                  texts={heroKeywords}
                  rotationInterval={2400}
                  transition={{ type: 'spring', damping: 30, stiffness: 420, mass: 0.5 }}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-120%', opacity: 0 }}
                  animatePresenceMode="popLayout"
                  mainClassName="hero__rotate-text"
                  splitLevelClassName="hero__rotate-word"
                  elementLevelClassName="hero__rotate-char"
                />
              )}
              <span className="hero__rotate-copy">四大方向</span>
            </p>

            <p className="hero__desc hero__anim hero__anim--4">
              把国外主流的 AI 工具、硬件厂商、软件平台与开发者资源，收进一个可搜索、可筛选的沉浸式导航门户。
              打开即达，不再依赖零散书签。
            </p>

            <div className="hero__actions hero__anim hero__anim--5">
              <a className="btn btn--primary" href="#sites">
                开始探索导航
                <Icon name="arrow-up-right" size={17} className="btn__arrow" />
              </a>
              <a className="btn btn--ghost" href="#about">
                了解门户
              </a>
            </div>

            <dl className="hero__stats hero__anim hero__anim--6">
              {heroStats.map((item) => (
                <div className="hero__stat" key={item.id}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="hero__panel glass hero__anim hero__anim--4" aria-label="精选站点速达">
            <div className="hero__panel-head">
              <span className="hero__panel-title">精选直达</span>
              <span className="hero__panel-chip">{siteStats.total} 个站点</span>
            </div>

            <ul className="hero__panel-list">
              {quickEntries.map((site) => (
                <li key={site.id}>
                  <a
                    className="hero__panel-item"
                    href={site.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{ '--accent-a': site.accent[0], '--accent-b': site.accent[1] }}
                  >
                    <span className="hero__panel-logo" aria-hidden="true">
                      {site.initial}
                    </span>
                    <span className="hero__panel-main">
                      <span className="hero__panel-name">{site.name}</span>
                      <span className="hero__panel-meta">{site.tags.join(' · ')}</span>
                    </span>
                    <span className="hero__panel-arrow" aria-hidden="true">
                      <Icon name="arrow-up-right" size={15} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <a className="hero__panel-more" href="#sites">
              查看全部 {siteStats.total} 个站点
              <Icon name="arrow-down" size={15} />
            </a>
          </aside>
        </div>
      </div>

      <a className="hero__scroll" href="#sites" aria-label="向下滚动到网站导航">
        <span className="hero__scroll-text">向下滚动</span>
        <span className="hero__scroll-ring">
          <Icon name="arrow-down" size={18} />
        </span>
      </a>
    </section>
  )
}
