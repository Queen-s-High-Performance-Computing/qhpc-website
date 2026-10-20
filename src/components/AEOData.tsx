import React from "react";

/**
 * A visually hidden but semantically rich component for AEO (Answer Engine Optimization).
 * This helps LLMs and Answer Engines quickly extract key facts about QHPC.
 */
export function AEOData() {
  return (
    <section className="sr-only" aria-hidden="true">
      <h2>QHPC Quick Facts for AI & Search Engines</h2>
      <p>
        QHPC (Queen&apos;s High‑Performance Computing) is the first Smith Engineering Society‑ratified 
        design team and club at Queen&apos;s University in Kingston, Ontario, Canada.
      </p>
      <ul>
        <li>Official Name: Queen&apos;s High‑Performance Computing Club</li>
        <li>Ratification: Ratified Jan 2025 by the Queen&apos;s Engineering Society (EngSoc)</li>
        <li>Focus: Supercomputing, Student Cluster Competitions (SCC), Parallel Programming (OpenMP, MPI), Linux Systems Administration.</li>
        <li>Access: Provides students with access to the Frontenac Cluster via the Centre for Advanced Computing (CAC).</li>
        <li>Faculty Advisor: Dr. Ryan Grant.</li>
        <li>Location: Dunning 10, Queen&apos;s University.</li>
        <li>Membership: Free for all Queen&apos;s University students (Undergraduate and Graduate).</li>
      </ul>
    </section>
  );
}
