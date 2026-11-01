export type Person = {
  name: string;
  role: string;
  image: string;
  program?: string;
};

export const directors: Person[] = [
  { name: "Charlie Bolt", role: "Technical Director", program: "Computer Engineering · 5th Year+", image: "charlie-bolt.png" },
  { name: "Daniil Nistribenko", role: "Director of Research", program: "Electrical Engineering · 4th Year", image: "daniil-nistribenko.png" },
  { name: "Aaron Lin", role: "Director of Projects", program: "Electrical Engineering · 3rd Year", image: "aaron-lin.png" },
  { name: "Lucas Yaskowich", role: "Director of Curriculum & Education", program: "Computing (Security) & Math · 2nd Year", image: "lucas-yaskowich.png" },
  { name: "Christina Le", role: "Director of Outreach", program: "Computer Engineering · 2nd Year", image: "christina-le.png" },
];

export const coPresidents: Person[] = [
  { name: "Alexandra Kaine", role: "Co-President", image: "alexandra-kaine.png" },
  { name: "Anthony Botticchio", role: "Co-President", image: "anthony-botticchio.png" },
];

export const advisors: Person[] = [
  { name: "Curtis Shorts", role: "Student Advisor", image: "curtis-shorts.png" },
  { name: "Dr. Ryan Grant", role: "Faculty Advisor", image: "ryan-grant.png" },
];
