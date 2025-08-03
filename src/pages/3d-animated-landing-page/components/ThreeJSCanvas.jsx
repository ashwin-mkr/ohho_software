import React, { useRef, useEffect, useState } from 'react';

const ThreeJSCanvas = ({ isVisible = true }) => {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isVisible) return;

    // Simulate Three.js initialization
    const initializeThreeJS = () => {
      const canvas = canvasRef?.current;
      if (!canvas) return;

      // Mock Three.js scene setup
      const ctx = canvas?.getContext('2d');
      if (!ctx) return;

      let time = 0;
      const shapes = [];
      
      // Create mock geometric shapes
      for (let i = 0; i < 15; i++) {
        shapes?.push({
          x: Math.random() * canvas?.width,
          y: Math.random() * canvas?.height,
          size: Math.random() * 30 + 10,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          glowIntensity: Math.random(),
          type: Math.floor(Math.random() * 3) // 0: cube, 1: sphere, 2: pyramid
        });
      }

      const animate = () => {
        if (!canvas || !ctx) return;

        // Clear canvas with dark background
        ctx.fillStyle = 'rgba(10, 15, 30, 0.1)';
        ctx?.fillRect(0, 0, canvas?.width, canvas?.height);

        time += 0.01;

        shapes?.forEach((shape, index) => {
          // Update rotation
          shape.rotation += shape?.rotationSpeed;
          
          // Floating animation
          const floatY = Math.sin(time + index) * 20;
          const currentY = shape?.y + floatY;

          // Glow effect
          const glowSize = shape?.size + Math.sin(time * 2 + index) * 5;
          const alpha = 0.3 + Math.sin(time + index) * 0.2;

          // Draw glow
          const gradient = ctx?.createRadialGradient(
            shape?.x, currentY, 0,
            shape?.x, currentY, glowSize * 2
          );
          gradient?.addColorStop(0, `rgba(0, 123, 255, ${alpha})`);
          gradient?.addColorStop(0.5, `rgba(0, 212, 255, ${alpha * 0.5})`);
          gradient?.addColorStop(1, 'rgba(0, 123, 255, 0)');

          ctx.fillStyle = gradient;
          ctx?.fillRect(
            shape?.x - glowSize * 2, 
            currentY - glowSize * 2,
            glowSize * 4, 
            glowSize * 4
          );

          // Draw shape
          ctx?.save();
          ctx?.translate(shape?.x, currentY);
          ctx?.rotate(shape?.rotation);

          if (shape?.type === 0) {
            // Cube wireframe
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.8 + alpha * 0.2})`;
            ctx.lineWidth = 2;
            ctx?.strokeRect(-shape?.size/2, -shape?.size/2, shape?.size, shape?.size);
            
            // Inner lines for 3D effect
            ctx?.beginPath();
            ctx?.moveTo(-shape?.size/2, -shape?.size/2);
            ctx?.lineTo(shape?.size/2, shape?.size/2);
            ctx?.moveTo(shape?.size/2, -shape?.size/2);
            ctx?.lineTo(-shape?.size/2, shape?.size/2);
            ctx?.stroke();
          } else if (shape?.type === 1) {
            // Sphere (circle with rings)
            ctx.strokeStyle = `rgba(0, 123, 255, ${0.8 + alpha * 0.2})`;
            ctx.lineWidth = 2;
            ctx?.beginPath();
            ctx?.arc(0, 0, shape?.size/2, 0, Math.PI * 2);
            ctx?.stroke();
            
            // Inner rings
            ctx?.beginPath();
            ctx?.arc(0, 0, shape?.size/3, 0, Math.PI * 2);
            ctx?.stroke();
          } else {
            // Pyramid (triangle)
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.8 + alpha * 0.2})`;
            ctx.lineWidth = 2;
            ctx?.beginPath();
            ctx?.moveTo(0, -shape?.size/2);
            ctx?.lineTo(-shape?.size/2, shape?.size/2);
            ctx?.lineTo(shape?.size/2, shape?.size/2);
            ctx?.closePath();
            ctx?.stroke();
            
            // Center lines
            ctx?.beginPath();
            ctx?.moveTo(0, -shape?.size/2);
            ctx?.lineTo(0, shape?.size/3);
            ctx?.stroke();
          }

          ctx?.restore();

          // Boundary check and reset
          if (shape?.x < -50) shape.x = canvas?.width + 50;
          if (shape?.x > canvas?.width + 50) shape.x = -50;
          if (shape?.y < -50) shape.y = canvas?.height + 50;
          if (shape?.y > canvas?.height + 50) shape.y = -50;
        });

        // Data nodes (small glowing dots)
        for (let i = 0; i < 30; i++) {
          const x = (Math.sin(time * 0.5 + i) * 200) + canvas?.width / 2;
          const y = (Math.cos(time * 0.3 + i) * 150) + canvas?.height / 2;
          const size = 2 + Math.sin(time * 3 + i) * 1;
          const alpha = 0.5 + Math.sin(time * 2 + i) * 0.3;

          ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
          ctx?.beginPath();
          ctx?.arc(x, y, size, 0, Math.PI * 2);
          ctx?.fill();

          // Connection lines
          if (i > 0) {
            const prevX = (Math.sin(time * 0.5 + (i-1)) * 200) + canvas?.width / 2;
            const prevY = (Math.cos(time * 0.3 + (i-1)) * 150) + canvas?.height / 2;
            const distance = Math.sqrt((x - prevX) ** 2 + (y - prevY) ** 2);
            
            if (distance < 100) {
              ctx.strokeStyle = `rgba(0, 123, 255, ${0.2 * (1 - distance/100)})`;
              ctx.lineWidth = 1;
              ctx?.beginPath();
              ctx?.moveTo(prevX, prevY);
              ctx?.lineTo(x, y);
              ctx?.stroke();
            }
          }
        }

        animationRef.current = requestAnimationFrame(animate);
      };

      setIsLoaded(true);
      animate();
    };

    const handleResize = () => {
      const canvas = canvasRef?.current;
      if (!canvas) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Delay initialization to simulate loading
    const timer = setTimeout(initializeThreeJS, 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef?.current);
      }
    };
  }, [isVisible]);

  return (
    <div className="fixed inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className={`w-full h-full transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(135deg, #0a0f1e 0%, #1a1f2e 50%, #0f1419 100%)'
        }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500/20 rounded-full animate-spin mx-auto">
              <div className="w-12 h-12 border-4 border-transparent border-t-blue-500 rounded-full animate-spin" />
            </div>
            <p className="text-white/80 text-sm">Initializing 3D Experience...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeJSCanvas;