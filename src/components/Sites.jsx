import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Icon from './Icons.jsx'
import SpotlightCard from './reactbits/SpotlightCard.jsx'
import SquishSwitch from './reactbits/SquishSwitch.jsx'
import ShinyLabel from './ShinyLabel.jsx'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'
import { categories } from '../data/categories.js'
import { sites } from '../data/sites.js'
import './Sites.css'

const VIEW_TRANSITION = { duration: 0.36, ease: [0.22, 1, 0.36, 1] }

const domainOf = (url) => new URL(url).hostname.replace('www.', '')

function SiteCard({ site, index, animateReveal }) {
  return (
    <li
      className={`sites__item ${animateReveal ? 'reveal reveal--scale' : ''}`}
      style={animateReveal ? { '--reveal-delay': `${Math.min(index, 11) * 45}ms` } : undefined}
    >
      <SpotlightCard
        className="sites__spotlight"
        spotlightColor={`color-mix(in srgb, ${site.accent[0]} 45%, transparent)`}
      >
        <a
          className="site-card glass"
          href={site.url}
          target="_blank"
          rel="noreferrer noopener"
          style={{ '--accent-a': site.accent[0], '--accent-b': site.accent[1] }}
        >
          <span className="site-card__top">
            <span className="site-card__logo" aria-hidden="true">
              {site.initial}
            </span>
            <span className="site-card__action" aria-hidden="true">
              <Icon name="arrow-up-right" size={16} />
            </span>
          </span>

          <span className="site-card__body">
            <span className="site-card__name">{site.name}</span>
            <span className="site-card__desc">{site.description}</span>
          </span>

          <span className="site-card__foot">
            <span className="site-card__tags">
              {site.tags.map((tag) => (
                <span className="site-card__tag" key={tag}>
                  {tag}
                </span>
              ))}
            </span>
            <span className="site-card__domain">{domainOf(site.url)}</span>
          </span>
        </a>
      </SpotlightCard>
    </li>
  )
}

function SiteRow({ site, categoryName }) {
  return (
    <li className="sites__row-item">
      <a
        className="sites__row glass"
        href={site.url}
        target="_blank"
        rel="noreferrer noopener"
        style={{ '--accent-a': site.accent[0], '--accent-b': site.accent[1] }}
      >
        <span className="sites__row-logo" aria-hidden="true">
          {site.initial}
        </span>

        <span className="sites__row-main">
          <span className="sites__row-name">{site.name}</span>
          <span className="sites__row-desc">{site.description}</span>
        </span>

        <span className="sites__row-tags">
          <span className="sites__row-category">{categoryName}</span>
          {site.tags.map((tag) => (
            <span className="sites__row-tag" key={tag}>
              {tag}
            </span>
          ))}
        </span>

        <span className="sites__row-end">
          <span className="sites__row-domain">{domainOf(site.url)}</span>
          <span className="sites__row-arrow" aria-hidden="true">
            <Icon name="arrow-up-right" size={16} />
          </span>
        </span>
      </a>
    </li>
  )
}

export default function Sites() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [keyword, setKeyword] = useState('')
  // 始终以卡片视图（开关关闭）作为默认状态，不跨访问记忆
  const [view, setView] = useState('card')
  const [hasSwitched, setHasSwitched] = useState(false)
  const reduce = usePrefersReducedMotion()

  const filtered = useMemo(() => {
    const query = keyword.trim().toLowerCase()
    return sites.filter((site) => {
      const matchCategory = activeCategory === 'all' || site.category === activeCategory
      if (!matchCategory) return false
      if (!query) return true
      return (
        site.name.toLowerCase().includes(query) ||
        site.description.toLowerCase().includes(query) ||
        site.url.toLowerCase().includes(query) ||
        site.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    })
  }, [activeCategory, keyword])

  const activeMeta = categories.find((item) => item.id === activeCategory) ?? categories[0]
  const categoryNameOf = (id) => categories.find((item) => item.id === id)?.name ?? id

  // 清理早期版本写入过的视图偏好，避免旧访客被“记忆”影响默认状态
  useEffect(() => {
    try {
      window.localStorage.removeItem('nexus.siteView')
    } catch {
      /* 隐私模式下忽略 */
    }
  }, [])

  const handleViewChange = (next) => {
    setHasSwitched(true)
    setView(next ? 'list' : 'card')
  }

  const layoutMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: VIEW_TRANSITION,
      }

  return (
    <section className="section sites" id="sites">
      <div className="container">
        <div className="section-head section-head--split">
          <div className="sites__heading">
            <span className="eyebrow reveal">
              <span className="eyebrow__dot" />
              <ShinyLabel text="Site Directory" />
            </span>
            <h2 className="section-title reveal" style={{ '--reveal-delay': '80ms' }}>
              全球主流 <span className="gradient-text">科技站点</span> 快捷入口
            </h2>
            <p className="section-desc reveal" style={{ '--reveal-delay': '160ms' }}>
              收录的全部为国外站点，按 AI 工具、硬件科技、软件平台与开发者资源四个维度整理。
              点击卡片即在新标签页打开对应官方网站。
            </p>
          </div>

          <div className="sites__search reveal" style={{ '--reveal-delay': '200ms' }}>
            <Icon name="search" size={18} />
            <input
              type="search"
              value={keyword}
              placeholder="搜索站点、标签或域名…"
              aria-label="搜索站点"
              onChange={(event) => setKeyword(event.target.value)}
            />
            {keyword ? (
              <button type="button" className="sites__search-clear" onClick={() => setKeyword('')} aria-label="清空搜索">
                <Icon name="close" size={16} />
              </button>
            ) : (
              <span className="sites__search-hint">{filtered.length}</span>
            )}
          </div>
        </div>

        <div className="sites__toolbar reveal">
          <div className="sites__filters" role="tablist" aria-label="站点分类">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === category.id}
                className={`sites__filter ${activeCategory === category.id ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="sites__filter-name">{category.name}</span>
                <span className="sites__filter-en">{category.en}</span>
                <span className="sites__filter-count">
                  {category.id === 'all'
                    ? sites.length
                    : sites.filter((site) => site.category === category.id).length}
                </span>
              </button>
            ))}
          </div>

          <SquishSwitch
            id="site-view-switch"
            className="view-switch"
            checked={view === 'list'}
            onChange={handleViewChange}
            label="紧凑列表"
            ariaLabel="在卡片视图与紧凑列表之间切换"
            width={76}
            height={38}
            radius={19}
            speed={50}
            stretch={36}
            hoverScale={1.035}
            colorDuration={320}
          >
            <span className="view-switch__icon view-switch__icon--grid" aria-hidden="true">
              <Icon name="grid" size={15} />
            </span>
            <span className="view-switch__icon view-switch__icon--list" aria-hidden="true">
              <Icon name="list" size={15} />
            </span>
          </SquishSwitch>
        </div>

        <p className="sites__current reveal">
          {activeMeta.name} · {activeMeta.description}
          <span className="sites__current-count">当前展示 {filtered.length} 个站点</span>
        </p>

        {filtered.length ? (
          <AnimatePresence mode="wait" initial={false}>
            {view === 'list' ? (
              <motion.ul key="list" className="sites__list" {...layoutMotion}>
                {filtered.map((site) => (
                  <SiteRow key={site.id} site={site} categoryName={categoryNameOf(site.category)} />
                ))}
              </motion.ul>
            ) : (
              <motion.ul key="card" className="sites__grid" {...layoutMotion}>
                {filtered.map((site, index) => (
                  <SiteCard key={site.id} site={site} index={index} animateReveal={!hasSwitched} />
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        ) : (
          <div className="sites__empty glass">
            <Icon name="search" size={26} />
            <p>没有匹配「{keyword}」的站点，换个关键词试试。</p>
            <button type="button" className="btn btn--ghost" onClick={() => setKeyword('')}>
              重置搜索
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
