import { useCallback, useLayoutEffect, useRef } from "react";
import Lenis from "lenis";

/* eslint-disable react/prop-types */

export const ScrollStackItem = ({
  children,
  itemClassName = "",
  style,
}) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()} style={style}>
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  nextSectionId,
  previousSectionId,
  onUserScroll,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const touchStartYRef = useRef(null);
  const handoffLockRef = useRef(false);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }

    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    const scroller = scrollerRef.current;

    return {
      scrollTop: scroller.scrollTop,
      containerHeight: scroller.clientHeight,
    };
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    handoffLockRef.current = true;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      handoffLockRef.current = false;
    }, 800);
  }, []);

  const handoffScrollAtBounds = useCallback(
    (deltaY, event) => {
      const scroller = scrollerRef.current;
      if (!scroller || handoffLockRef.current || Math.abs(deltaY) < 4) return;

      const maxScrollTop = scroller.scrollHeight - scroller.clientHeight;
      const isAtTop = scroller.scrollTop <= 2;
      const isAtBottom = scroller.scrollTop >= maxScrollTop - 2;

      if (deltaY > 0 && isAtBottom && nextSectionId) {
        event?.preventDefault?.();
        scrollToSection(nextSectionId);
      }

      if (deltaY < 0 && isAtTop && previousSectionId) {
        event?.preventDefault?.();
        scrollToSection(previousSectionId);
      }
    },
    [nextSectionId, previousSectionId, scrollToSection],
  );

  const handleWheel = useCallback(
    (event) => {
      onUserScroll?.();
      handoffScrollAtBounds(event.deltaY, event);
    },
    [handoffScrollAtBounds, onUserScroll],
  );

  const handleTouchStart = useCallback(
    (event) => {
      onUserScroll?.();
      touchStartYRef.current = event.touches[0].clientY;
    },
    [onUserScroll],
  );

  const handleTouchMove = useCallback(
    (event) => {
      if (touchStartYRef.current === null) return;

      const deltaY = touchStartYRef.current - event.touches[0].clientY;
      handoffScrollAtBounds(deltaY, event);
    },
    [handoffScrollAtBounds],
  );

  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElement = scroller.querySelector(".scroll-stack-end");
    const endElementTop = endElement ? endElement.offsetTop : 0;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const cardTop = card.offsetTop;
      const triggerStart =
        cardTop - stackPositionPx - itemStackDistance * index;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = endElementTop - containerHeight / 2;
      const scaleProgress = calculateProgress(
        scrollTop,
        triggerStart,
        triggerEnd,
      );
      const targetScale = baseScale + index * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount
        ? index * rotationAmount * scaleProgress
        : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let cardIndex = 0; cardIndex < cardsRef.current.length; cardIndex += 1) {
          const currentCardTop = cardsRef.current[cardIndex].offsetTop;
          const currentTriggerStart =
            currentCardTop - stackPositionPx - itemStackDistance * cardIndex;
          if (scrollTop >= currentTriggerStart) {
            topCardIndex = cardIndex;
          }
        }

        if (index < topCardIndex) {
          blur = Math.max(0, (topCardIndex - index) * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY =
          scrollTop - cardTop + stackPositionPx + itemStackDistance * index;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * index;
      }

      const nextTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };
      const previousTransform = lastTransformsRef.current.get(index);
      const hasChanged =
        !previousTransform ||
        Math.abs(previousTransform.translateY - nextTransform.translateY) > 0.1 ||
        Math.abs(previousTransform.scale - nextTransform.scale) > 0.001 ||
        Math.abs(previousTransform.rotation - nextTransform.rotation) > 0.1 ||
        Math.abs(previousTransform.blur - nextTransform.blur) > 0.1;

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${nextTransform.translateY}px, 0) scale(${nextTransform.scale}) rotate(${nextTransform.rotation}deg)`;
        card.style.filter =
          nextTransform.blur > 0 ? `blur(${nextTransform.blur}px)` : "";
        lastTransformsRef.current.set(index, nextTransform);
      }

      if (index === cardsRef.current.length - 1) {
        const isLastCardInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isLastCardInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isLastCardInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    baseScale,
    blurAmount,
    calculateProgress,
    getScrollData,
    itemScale,
    itemStackDistance,
    onStackComplete,
    parsePercentage,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
  ]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card"));
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const transformsCache = lastTransformsRef.current;

    cardsRef.current = cards;
    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.transform = "translateZ(0)";
      card.style.perspective = "1000px";
    });

    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller.querySelector(".scroll-stack-inner"),
      duration: 1.2,
      easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      normalizeWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });

    lenis.on("scroll", updateCardTransforms);

    const raf = (time) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };

    updateCardTransforms();
    animationFrameRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      lenisRef.current?.destroy();
      touchStartYRef.current = null;
      handoffLockRef.current = false;
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [itemDistance, updateCardTransforms]);

  return (
    <div
      className={`scroll-stack-scroller ${className}`.trim()}
      ref={scrollerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
