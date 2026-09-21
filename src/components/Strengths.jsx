import Icon from './Icons.jsx'
import ShinyLabel from './ShinyLabel.jsx'
import { strengths } from '../data/strengths.js'
import './Strengths.css'

export default function Strengths() {
  return (
    <section className="section strengths" id="strengths">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow reveal">
            <span className="eyebrow__dot" />
            <ShinyLabel text="Core Strengths" />
          </span>
          <h2 className="section-title reveal" style={{ '--reveal-delay': '80ms' }}>
            让视觉惊艳与
            <span className="gradient-text"> 工程质量</span> 同时成立
          </h2>
          <p className="section-desc reveal" style={{ '--reveal-delay': '140ms' }}>
            门户的每一处动效、每一层毛玻璃、每一个断点都经过实测调优，保证在真实设备上依旧顺滑。
          </p>
        </div>

        <div className="strengths__grid">
          {strengths.map((item, index) => (
            <article
              className="strength-card glass reveal"
              key={item.id}
              style={{
                '--reveal-delay': `${index * 110}ms`,
                '--accent-a': item.accent[0],
                '--accent-b': item.accent[1],
              }}
            >
              <span className="strength-card__icon">
                <Icon name={item.icon} size={22} />
              </span>
              <span className="strength-card__index">0{index + 1}</span>
              <h3 className="strength-card__title">{item.title}</h3>
              <p className="strength-card__desc">{item.description}</p>
              <span className="strength-card__line" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
