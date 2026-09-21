import Icon from './Icons.jsx'
import ShinyLabel from './ShinyLabel.jsx'
import SpotlightCard from './reactbits/SpotlightCard.jsx'
import { projects } from '../data/projects.js'
import './Projects.css'

export default function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="section-head section-head--split">
          <div className="projects__heading">
            <span className="eyebrow reveal">
              <span className="eyebrow__dot" />
              <ShinyLabel text="Selected Works" />
            </span>
            <h2 className="section-title reveal" style={{ '--reveal-delay': '80ms' }}>
              精选 <span className="gradient-text">项目案例</span>
            </h2>
            <p className="section-desc reveal" style={{ '--reveal-delay': '140ms' }}>
              从导航门户到数据中台与品牌官网，每个项目都围绕同一件事：把复杂的交互做得干净、快速、可维护。
            </p>
          </div>

          <a
            className="btn btn--ghost reveal"
            style={{ '--reveal-delay': '180ms' }}
            href="https://github.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            查看全部作品
            <Icon name="arrow-up-right" size={17} className="btn__arrow" />
          </a>
        </div>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <SpotlightCard
              key={project.id}
              className="project-card reveal reveal--scale"
              spotlightColor="color-mix(in srgb, #7AA2FF 55%, transparent)"
              style={{ '--reveal-delay': `${Math.min(index, 3) * 90}ms` }}
            >
              <a className="project-card__link" href={project.url} target="_blank" rel="noreferrer noopener">
                <div className="project-card__media">
                  <img src={project.cover} alt={`${project.title} 项目封面`} loading="lazy" />
                  <span className="project-card__scrim" aria-hidden="true" />
                  <span className="project-card__meta">
                    <span className="project-card__year">{project.year}</span>
                    <span className="project-card__subtitle">{project.subtitle}</span>
                  </span>
                  <span className="project-card__enter">
                    访问项目
                    <Icon name="arrow-up-right" size={16} />
                  </span>
                </div>

                <div className="project-card__content">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.description}</p>

                  <ul className="project-card__tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>

                  <ul className="project-card__metrics">
                    {project.metrics.map((metric) => (
                      <li key={metric}>{metric}</li>
                    ))}
                  </ul>
                </div>
              </a>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
