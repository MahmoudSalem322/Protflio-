"use client";

import { useEffect } from "react";

export function ScrollReveals() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        const element = target as HTMLElement;

        if (isIntersecting) {
          element.dataset.revealState = "visible";
          observer.unobserve(element);
        } else {
          element.dataset.revealState = "pending";
        }
      }
    }, { rootMargin: "0px 0px -48px", threshold: 0.05 });

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      elements.forEach((element) => delete element.dataset.revealState);
    };
  }, []);

  return null;
}
