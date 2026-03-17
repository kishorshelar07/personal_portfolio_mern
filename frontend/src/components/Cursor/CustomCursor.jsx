import React, { useEffect, useRef } from 'react';
import './Cursor.css';

const CustomCursor = () => {
  const cursorDot = useRef(null);
  const cursorRing = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animFrame;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorDot.current) {
        cursorDot.current.style.left = mouseX + 'px';
        cursorDot.current.style.top = mouseY + 'px';
      }
    };

    const animateCursor = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (cursorRing.current) {
        cursorRing.current.style.left = ringX + 'px';
        cursorRing.current.style.top = ringY + 'px';
      }
      animFrame = requestAnimationFrame(animateCursor);
    };

    const onMouseEnterLink = () => {
      cursorDot.current?.classList.add('cursor-hover');
      cursorRing.current?.classList.add('ring-hover');
    };
    const onMouseLeaveLink = () => {
      cursorDot.current?.classList.remove('cursor-hover');
      cursorRing.current?.classList.remove('ring-hover');
    };

    document.addEventListener('mousemove', onMouseMove);
    animFrame = requestAnimationFrame(animateCursor);

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [data-cursor="hover"]').forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };
    addHoverListeners();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={cursorDot} />
      <div className="cursor-ring" ref={cursorRing} />
    </>
  );
};

export default CustomCursor;
