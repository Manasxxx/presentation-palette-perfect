import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import { createTimeline, createTimer, utils } from 'animejs';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

// Instant placement. Cards self-centre via negative margins in CSS, so the
// transform here only carries the slot offset + skew and stays fully
// animatable by Anime.js (no GSAP xPercent/yPercent compositing needed).
const placeNow = (el, slot, skew) => {
  if (!el) return;
  el.style.zIndex = String(slot.zIndex);
  utils.set(el, {
    translateX: slot.x,
    translateY: slot.y,
    translateZ: slot.z,
    skewY: skew
  });
};

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  reduceMotion = false,
  children
}) => {
  // Durations are in milliseconds (Anime.js), unlike the old GSAP seconds.
  const config = reduceMotion
    ? {
        // Reduced motion: cards still cycle so back-card content stays
        // reachable, but they snap into place instead of animating.
        ease: 'linear',
        durDrop: 1,
        durMove: 1,
        durReturn: 1,
        promoteOverlap: 0,
        returnDelay: 0
      }
    : easing === 'elastic'
      ? {
          ease: 'outElastic(0.6, 0.9)',
          durDrop: 2000,
          durMove: 2000,
          durReturn: 2000,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'inOutQuad',
          durDrop: 800,
          durMove: 800,
          durReturn: 800,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef(null);
  const loopRef = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    let cancelled = false;

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = createTimeline();
      tlRef.current = tl;

      // Drop the front card down and out.
      tl.add(elFront, { translateY: '+=500', duration: config.durDrop, ease: config.ease }, 0);

      // Promote the rest forward one slot, overlapping the drop.
      const promoteAt = config.durDrop - config.durDrop * config.promoteOverlap;
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.call(() => { if (el) el.style.zIndex = String(slot.zIndex); }, promoteAt);
        tl.add(
          el,
          {
            translateX: slot.x,
            translateY: slot.y,
            translateZ: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          promoteAt + i * 150
        );
      });

      // Send the dropped card to the back slot.
      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      const returnAt = promoteAt + config.durMove * config.returnDelay;
      tl.call(() => { if (elFront) elFront.style.zIndex = String(backSlot.zIndex); }, returnAt);
      tl.add(
        elFront,
        {
          translateX: backSlot.x,
          translateY: backSlot.y,
          translateZ: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        returnAt
      );

      tl.call(() => { order.current = [...rest, front]; });
    };

    // Self-scheduling loop driven by Anime.js's own timer (its engine keeps a
    // live rAF while animations/timers exist), so the stack never freezes the
    // way the old setInterval-vs-GSAP-ticker combination could.
    const scheduleNext = () => {
      loopRef.current = createTimer({
        duration: delay,
        onComplete: () => {
          if (cancelled) return;
          swap();
          scheduleNext();
        }
      });
    };

    swap();
    scheduleNext();

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        loopRef.current?.pause();
      };
      const resume = () => {
        tlRef.current?.play();
        loopRef.current?.play();
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        cancelled = true;
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        tlRef.current?.pause();
        loopRef.current?.pause();
      };
    }
    return () => {
      cancelled = true;
      tlRef.current?.pause();
      loopRef.current?.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, reduceMotion]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          // Negative margins centre the card on its top:50%/left:50% anchor so
          // the transform stays free for the slot animation (see placeNow).
          style: { width, height, marginLeft: -width / 2, marginTop: -height / 2, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          }
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
