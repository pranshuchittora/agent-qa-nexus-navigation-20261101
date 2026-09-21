import { useCallback, useEffect, useRef } from 'react';
import './SpotlightCard.css';

/**
 * React Bits · SpotlightCard（项目侧扩展版）
 *
 * 在原版指针跟随聚光的基础上，补充了两件事（仅在有精确指针的设备上启用）：
 * 1. 轻微 3D 倾斜（--tilt-x / --tilt-y）：卡片朝向指针“翻”一点，类似 iPhone 翻屏时的角度变化；
 * 2. 镜面高光扫过（--sheen-pos）：高光带随指针横向移动，模拟玻璃反光。
 * 全部写入 CSS 变量、每帧最多一次，触屏与「减少动态效果」下不绑定。
 */
const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)',
  tilt = 7,
  ...rest
}) => {
  const divRef = useRef(null);
  const frameRef = useRef(0);
  const pointRef = useRef(null);
  const hoverCapableRef = useRef(false);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      hoverCapableRef.current = false;
      return undefined;
    }
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    hoverCapableRef.current = fine && !reduce;

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // 指针跟随：聚光 + 倾斜 + 高光，每帧最多写入一次 CSS 变量
  const handleMouseMove = e => {
    if (!hoverCapableRef.current || !divRef.current) return;
    pointRef.current = { x: e.clientX, y: e.clientY };
    if (frameRef.current) return;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      const el = divRef.current;
      const point = pointRef.current;
      if (!el || !point) return;

      const rect = el.getBoundingClientRect();
      const localX = point.x - rect.left;
      const localY = point.y - rect.top;
      const relX = rect.width ? localX / rect.width : 0.5;
      const relY = rect.height ? localY / rect.height : 0.5;

      el.style.setProperty('--mouse-x', `${localX}px`);
      el.style.setProperty('--mouse-y', `${localY}px`);
      el.style.setProperty('--spotlight-color', spotlightColor);
      el.style.setProperty('--tilt-y', `${((relX - 0.5) * 2 * tilt).toFixed(2)}deg`);
      el.style.setProperty('--tilt-x', `${((0.5 - relY) * 2 * tilt * 0.72).toFixed(2)}deg`);
      el.style.setProperty('--sheen-pos', `${(relX * 100).toFixed(1)}%`);
    });
  };

  // 指针离开后回到正位，交给 CSS 的回弹缓动收尾
  const handleMouseLeave = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }
    const el = divRef.current;
    if (!el) return;
    el.style.setProperty('--tilt-y', '0deg');
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--sheen-pos', '50%');
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card-spotlight ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
