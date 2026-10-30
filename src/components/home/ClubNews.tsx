import { CssicPartnershipFeature } from "@/components/CssicPartnershipFeature";
import { SectionLabel } from "@/components/ui/SectionLabel";
import styles from "./ClubNews.module.css";

export function ClubNews() {
  return (
    <section id="news" className={styles.news} aria-labelledby="club-news-title">
      <div className={styles.heading}>
        <div>
          <SectionLabel>CLUB NEWS</SectionLabel>
          <h2 id="club-news-title">What we’ve been up to.</h2>
        </div>
        <p>
          A look at the collaborations and activities taking shape at QHPC.
        </p>
      </div>

      <div className={styles.stories}>
        <article aria-labelledby="cssic-feature-title">
          <CssicPartnershipFeature headingLevel="h3" />
        </article>
      </div>
    </section>
  );
}
