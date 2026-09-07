import { SubpageHeader } from "../components/SubpageHeader";
import { TexturePlate } from "../components/TexturePlate";
import styles from "./Notes.module.css";
import wideDunes from "../assets/stills/04_wide_plain_dunes.png";

const notes = [
  {
    date: "sep 06",
    body: 'Spent the afternoon arguing with the whiteboard about whether "shortest path" even means anything once the graph is allowed to change while you\'re walking it. It doesn\'t, not cleanly. More on this soon.',
  },
  {
    date: "sep 02",
    body: 'A reader pointed out that "compression algorithm" undersells what a self does — fair. Adding a follow-up to essay 09.',
  },
  {
    date: "aug 27",
    body: "Ran the routing model against three weeks of live drift data. It held up better than the whiteboard argument suggested it should. Writing up the discrepancy.",
  },
  {
    date: "aug 19",
    body: '"The universe doesn\'t know what you named it" started as a comment on a pull request. Now it\'s essay 06. Good ideas rarely announce themselves.',
  },
  {
    date: "aug 11",
    body: "First week of the lab notebook going public. Turns out writing things down for strangers changes how carefully you think them through. That's probably the point.",
  },
];

export function Notes() {
  return (
    <div className={styles.page}>
      <div className={styles.headerWrap}>
        <TexturePlate height={420} opacity={0.5} image={wideDunes} />
        <div className={styles.headerContent}>
          <SubpageHeader
            maxWidth={760}
            links={[
              { label: "essays", to: "/essays" },
              { label: "notes", to: "/notes", active: true },
              { label: "research", to: "/research" },
            ]}
          />
          <div className={styles.intro}>
            <p className={styles.kicker}>// notes</p>
            <h1 className={styles.headline}>Small things, as they happen.</h1>
            <p className={styles.body}>
              Not every idea earns an essay. Some are just a line, a link, a result that
              surprised us. Posted here, unpolished, on the day it happened.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.list}>
        {notes.map((note, i) => (
          <div
            key={note.date}
            className={`fade-up ${styles.note}`}
            style={{ animationDelay: `${0.05 + i * 0.07}s` }}
          >
            <span className={styles.date}>{note.date}</span>
            <p className={styles.noteBody}>{note.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
