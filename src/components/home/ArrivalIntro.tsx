"use client";

import { useEffect, useRef } from "react";
import styles from "./ArrivalIntro.module.css";

const SESSION_KEY = "qhpc-arrival-seen";
const DURATION = 2850;

/** A short brand animation, independent of page or asset loading. */
export function ArrivalIntro() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!dialog || motion.matches || typeof dialog.showModal !== "function") return;

    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      // Storage can be unavailable in private or restricted browsing.
    }

    const remember = () => {
      try {
        window.sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        // The introduction remains dismissible without storage.
      }
    };
    const dismiss = () => {
      delete document.documentElement.dataset.arrivalIntro;
      dialog.close();
    };
    const alignLogo = () => {
      const target = document.querySelector<HTMLElement>("[data-arrival-logo]");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const appearance = window.getComputedStyle(target);
      dialog.style.setProperty("--logo-x", `${rect.left + rect.width / 2}px`);
      dialog.style.setProperty("--logo-y", `${rect.top + rect.height / 2}px`);
      dialog.style.setProperty("--logo-size", appearance.width);
      dialog.style.setProperty("--logo-opacity", appearance.opacity);
      dialog.style.setProperty("--logo-color", appearance.backgroundColor);
    };
    const reduceMotion = () => { if (motion.matches) dismiss(); };

    // Keep the intro non-modal so visitors can scroll and use the page beneath it.
    const onClose = () => {
      delete document.documentElement.dataset.arrivalIntro;
      remember();
    };
    alignLogo();
    try {
      dialog.show();
      document.documentElement.dataset.arrivalIntro = "true";
    } catch {
      return;
    }
    dialog.addEventListener("close", onClose);
    motion.addEventListener("change", reduceMotion);
    window.addEventListener("resize", alignLogo);
    const timeout = window.setTimeout(dismiss, DURATION);

    return () => {
      window.clearTimeout(timeout);
      dialog.removeEventListener("close", onClose);
      window.removeEventListener("resize", alignLogo);
      delete document.documentElement.dataset.arrivalIntro;
      motion.removeEventListener("change", reduceMotion);
      dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.intro}
      aria-label="Welcome to QHPC"
    >
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.mark} aria-hidden="true">
        <div className={styles.outline} />
        <div className={styles.fill} />
        <div className={styles.shine} />
      </div>
      <div className={styles.identity} aria-hidden="true">
        <p className={styles.name}>QHPC</p>
        <p className={styles.caption}>Queen&apos;s High Performance Computing</p>
        <div className={styles.rule} />
      </div>
      <span className={styles.corner} aria-hidden="true">QUEEN&apos;S UNIVERSITY · KINGSTON</span>
      <button className={styles.skip} onClick={() => dialogRef.current?.close()}>
        Skip intro <span aria-hidden="true">↗</span>
      </button>
    </dialog>
  );
}
