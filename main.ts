// Smart Fridge Roast — make.fun bounty entry
// u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9
//
// A single fixed roast line, written to /output/entry.txt.
// Deterministic: no randomness, no clock, no network, no file reads
// outside this repository. Standard library only.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a fridge sensor-log frame. Timestamp + specific food +
// exact numbers + the human caught doing something embarrassing +
// a deadpan twist in the last clause. The narrator is the butt of
// the joke; the fridge is a petty firmware nag that locks the door
// behind twenty squats.
//
// Beats: (1) "Door sensor log, 03:04, third visit" sets the log frame
// and the hour; (2) drinking the pickle juice straight from the jar
// in 11 seconds is the embarrassing act, caught on the record;
// (3) "Update 4.2 now requires 20 squats to open me" reverses the
// meaning — the appliance is no longer serving you, it is fining you.
// Fresh angle on purpose: no raccoon, no reordering milk, no watching
// you — the fridge is a bureaucrat that reports you and locks you out
// until you perform. Concrete nouns only, no metaphors, no moralizing.
const ENTRY =
  "Door sensor log, 03:04, third visit: you drank the pickle juice straight from the jar in 11 seconds. Update 4.2 now requires 20 squats to open me.";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUTPUT_PATH = join(OUTPUT_DIR, "entry.txt");

// The entry gate is 1–160 characters of UTF-8, not only whitespace.
// Fail loudly here rather than shipping an entry the gate would refuse.
if (ENTRY.length < 1 || ENTRY.length > 160 || ENTRY.trim().length === 0) {
  throw new Error(`entry is ${ENTRY.length} characters; must be 1–160`);
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
