import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Sites from './components/Sites.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Strengths from './components/Strengths.jsx'
import Footer from './components/Footer.jsx'
import ClickSpark from './components/reactbits/ClickSpark.jsx'
import Noise from './components/reactbits/Noise.jsx'
import { useScrollReveal } from './hooks/useScrollReveal.js'
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion.js'
import useLiteMode from './hooks/useLiteMode.js'

export default function App() {
  // 全站滚动渐显：统一由 IntersectionObserver 驱动 .reveal 元素
  useScrollReveal()
  const reduce = usePrefersReducedMotion()
  // 移动端 / 触屏：跳过颗粒层与点击火花这类持续运行的装饰效果
  const lite = useLiteMode()

  const content = (
    <>
      {/* 固定彩色光场：位于内容层之下，让毛玻璃面板真的“磨”到颜色 */}
      <div className="ambient-glass-field" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Sites />
        <About />
        <Projects />
        <Strengths />
      </main>
      <Footer />
      {/* 全站颗粒层：桌面端低频率重绘；移动端与「减少动态效果」下直接不渲染 */}
      {lite || reduce ? null : <Noise patternAlpha={10} patternRefreshInterval={12} />}
    </>
  )

  // 轻量模式（小屏 / 触屏）不挂点击火花：既没有指针悬浮，也省掉一层固定画布
  if (lite) return content

  return (
    <ClickSpark
      sparkColor="#0bcff0"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
      canvasMode="fixed"
    >
      {content}
    </ClickSpark>
  )
}
