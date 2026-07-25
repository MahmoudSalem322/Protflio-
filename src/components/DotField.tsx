'use client';

import { useEffect, useRef, memo } from 'react';

const TWO_PI = Math.PI * 2;

interface DotFieldProps {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
}

export const DotField = memo(({
  dotRadius = 2, 
  dotSpacing = 28, 
  cursorRadius = 500, 
  cursorForce = 0.1,
  bulgeOnly = true, 
  bulgeStrength = 67, 
  glowRadius = 160, 
  sparkle = false, 
  waveAmplitude = 0,
  gradientFrom = 'rgba(168, 85, 247, 0.35)', 
  gradientTo = 'rgba(180, 151, 207, 0.25)', 
  glowColor = '#120F17'
}: DotFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null); 
  const glowRef = useRef<SVGCircleElement>(null); 
  const dotsRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
  const rafRef = useRef<number | null>(null); 
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
  const glowOpacity = useRef(0); 
  const engagement = useRef(0); 
  const propsRef = useRef<DotFieldProps>({});
  
  propsRef.current = { dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeOnly, bulgeStrength, sparkle, waveAmplitude, gradientFrom, gradientTo };
  
  useEffect(() => {
    const canvas = canvasRef.current; 
    const glowEl = glowRef.current; 
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true }); 
    if (!ctx) return;
    
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    function doResize() {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect(); 
      if (!rect) return;
      const w = rect.width; 
      const h = rect.height;
      
      canvas.width = w * dpr; 
      canvas.height = h * dpr; 
      canvas.style.width = `${w}px`; 
      canvas.style.height = `${h}px`;
      
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h, offsetX: rect.left + window.scrollX, offsetY: rect.top + window.scrollY };
      buildDots(w, h);
    }
    
    function buildDots(w: number, h: number) {
      const p = propsRef.current as any; 
      const step = p.dotRadius + p.dotSpacing;
      const cols = Math.floor(w / step); 
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2; 
      const padY = (h % step) / 2; 
      const dots = [];
      for (let r = 0; r < rows; r++) { 
        for (let c = 0; c < cols; c++) {
          const ax = padX + c * step + step / 2; 
          const ay = padY + r * step + step / 2;
          dots.push({ ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay });
        }
      } 
      dotsRef.current = dots;
    }
    
    function tick() {
      const dots = dotsRef.current; 
      const m = mouseRef.current; 
      const { w, h } = sizeRef.current; 
      const p = propsRef.current as any;
      
      const targetSpeed = Math.min(m.speed / 5, 1); 
      engagement.current += (targetSpeed - engagement.current) * 0.15;
      glowOpacity.current += (engagement.current - glowOpacity.current) * 0.15;
      
      if (glowEl) { 
        glowEl.setAttribute('cx', String(m.x)); 
        glowEl.setAttribute('cy', String(m.y)); 
        glowEl.style.opacity = String(glowOpacity.current); 
      }
      
      ctx?.clearRect(0, 0, w, h);
      if(!ctx) return;
      const grad = ctx.createLinearGradient(0, 0, w, h); 
      grad.addColorStop(0, p.gradientFrom); 
      grad.addColorStop(1, p.gradientTo); 
      ctx.fillStyle = grad;
      ctx.beginPath();
      
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]; 
        const dx = m.x - d.ax; 
        const dy = m.y - d.ay; 
        const distSq = dx * dx + dy * dy;
        
        if (distSq < p.cursorRadius * p.cursorRadius && engagement.current > 0.01) {
          const dist = Math.sqrt(distSq); 
          const t = 1 - dist / p.cursorRadius; 
          const push = t * t * p.bulgeStrength * engagement.current; 
          const angle = Math.atan2(dy, dx);
          d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.3; 
          d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.3;
        } else { 
          d.sx += (d.ax - d.sx) * 0.2; 
          d.sy += (d.ay - d.sy) * 0.2; 
        }
        ctx.moveTo(d.sx + p.dotRadius, d.sy); 
        ctx.arc(d.sx, d.sy, p.dotRadius, 0, TWO_PI);
      }
      ctx.fill(); 
      rafRef.current = requestAnimationFrame(tick);
    }
    
    doResize(); 
    window.addEventListener('resize', doResize);
    window.addEventListener('mousemove', (e) => { 
      mouseRef.current.speed = Math.abs(e.movementX) + Math.abs(e.movementY);
      mouseRef.current.x = e.pageX - sizeRef.current.offsetX; 
      mouseRef.current.y = e.pageY - sizeRef.current.offsetY; 
    }, { passive: true });
    
    rafRef.current = requestAnimationFrame(tick);
    
    return () => { 
      if (rafRef.current) cancelAnimationFrame(rafRef.current); 
      window.removeEventListener('resize', doResize); 
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="glow">
            <stop offset="0%" stopColor={glowColor}/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <circle ref={glowRef} cx="-9999" cy="-9999" r={glowRadius} fill="url(#glow)" style={{ opacity: 0, willChange: 'opacity' }}/>
      </svg>
    </div>
  );
});

DotField.displayName = "DotField";
