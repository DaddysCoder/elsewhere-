export interface Essay {
  slug: string;
  index: string;
  category: string;
  title: string;
  dek: string;
  readTime: string;
  isCoverStory?: boolean;
  body: string[];
}

export const essays: Essay[] = [
  {
    slug: "maybe-things-dont-exist",
    index: "01",
    category: "on ontology",
    title: "Maybe Things Don't Exist",
    dek: "What changes if an object is a stable pattern rather than the primitive unit of reality?",
    readTime: "8 min read",
    isCoverStory: true,
    body: [
      "Pick up a chair. Take it apart, piece by piece — legs, seat, back, the screws holding it together. At what point did the chair stop existing? There is no single joint whose removal crosses a line from \"chair\" to \"not chair.\" The chair was never a fundamental unit of reality. It was a pattern stable enough, for long enough, that it was useful to give it a name.",
      "This is not a new observation. It is, roughly, the ship of Theseus, dressed in different clothes. What is newer — or at least less comfortable — is taking the same argument seriously about things we don't usually flinch at: cells, species, minds, selves. If a chair is a pattern rather than a primitive, what is a person?",
      "// working definition",
      "Call something an object when treating it as a stable, bounded pattern is more useful than tracking its parts individually. That's a claim about usefulness, not a claim about what's \"really\" out there. It sidesteps the metaphysics and asks an engineering question instead: at what resolution does modeling something as one thing pay for itself?",
      "This reframing has a cost. If objects are just useful patterns, then the boundary of any object is a modeling choice, not a fact discovered in the world. Two people can disagree about where a \"storm\" begins and ends, or where a \"company\" starts, without either being wrong — they're running different compressions of the same underlying mess.",
      "It also has a payoff. Once you stop looking for the joint where \"not-a-thing\" becomes \"a-thing,\" a lot of stalled arguments about emergence, identity, and category boundaries stop being unsolvable and start being uninteresting in the way a units-conversion error is uninteresting. The disagreement wasn't about reality. It was about which pattern each side found convenient.",
      "None of this proves objects don't exist, in whatever sense \"exist\" is supposed to mean here. It's an argument for demoting the question — for treating \"does X exist\" as often a worse question than \"at what scale, and for what purpose, is X the right unit to reason in.\"",
    ],
  },
  {
    slug: "the-space-between-two-rollers",
    index: "02",
    category: "on beginnings",
    title: "The Space Between Two Rollers",
    dek: "A mining problem, a network, and the beginning of an obsession with relationships.",
    readTime: "6 min read",
    body: [
      "It started with a conveyor. Two rollers, a belt, and a question nobody in the room could answer cleanly: which path gets ore from the pit to the crusher fastest, given that half the routes are shut on any given day for maintenance we can't fully predict?",
      "The honest answer was that shortest-path algorithms assume a map that holds still while you walk it. Ours didn't. Every attempt to force the problem into a static graph produced an answer that was correct for a version of the mine that no longer existed by the time the truck left the loading bay.",
      "That gap — between the elegance of the textbook algorithm and the mess of a graph that keeps changing underneath you — is where most of what follows in this publication actually comes from. Not from grand theory. From a roller, a belt, and a spreadsheet that kept lying to us.",
    ],
  },
  {
    slug: "a-map-is-an-argument-about-reality",
    index: "03",
    category: "on representation",
    title: "A Map Is an Argument About Reality",
    dek: "Every model decides what deserves to exist. Most just don't admit it.",
    readTime: "7 min read",
    body: [
      "A map is never neutral. Every line drawn on it is a decision about what matters enough to be represented and what can be safely thrown away. A subway map that ignores geography in favor of legibility isn't lying — it's arguing that legibility is the point.",
      "The same is true of the models we build. A model of traffic that treats roads as edges and ignores weather is making a claim: that weather doesn't matter enough to earn a variable. Sometimes that claim is right. Often nobody checked.",
      "The uncomfortable part is that this applies recursively. This essay is also a map. It has decided some things are worth saying and others aren't. Read it the way you'd read any argument about reality — skeptically, and looking for what got left off the page.",
    ],
  },
  {
    slug: "when-does-a-pattern-become-a-thing",
    index: "04",
    category: "on emergence",
    title: "When Does a Pattern Become a Thing?",
    dek: "On emergence, boundaries, and why naming something can change the level you reason at.",
    readTime: "9 min read",
    body: [
      "A traffic jam has no fixed cars in it. Cars enter, cars leave, and yet the jam persists as a recognizable thing for hours, moving backward down the highway like a wave through water that never moves the water. At what point does a pattern earn the right to be called a thing?",
      "The honest answer is: whenever naming it lets you reason at a higher level without losing anything you actually cared about. \"The jam is clearing\" is a true and useful sentence, even though no single car is doing any clearing.",
      "This is the quiet trick behind most emergent phenomena we take for granted — markets, minds, ecosystems. We stop tracking the parts once the pattern becomes the more efficient unit of description. The interesting research question isn't whether the pattern is \"really there.\" It's when the switch in levels stops being optional and starts being necessary.",
    ],
  },
  {
    slug: "the-shortest-path-through-a-changing-world",
    index: "05",
    category: "on navigation",
    title: "The Shortest Path Through a Changing World",
    dek: "The shortest path is easy when the map stands still. The interesting systems don't.",
    readTime: "8 min read",
    body: [
      "Dijkstra's algorithm is a beautiful answer to a question the real world rarely asks: what is the shortest path through a graph that isn't going to change while you walk it? Most graphs that matter — road networks under construction, supply chains under disruption, social networks under moderation — change while you're mid-route.",
      "Our routing model doesn't try to predict the future graph perfectly. It tracks its own confidence, degrading gracefully as the graph drifts further from the one it last observed, and re-plans before that confidence collapses rather than after.",
      "The result isn't a better shortest path. It's a system that knows when to stop trusting its own map — which, it turns out, is usually the harder and more valuable problem.",
    ],
  },
  {
    slug: "the-universe-doesnt-know-what-you-named-it",
    index: "06",
    category: "on categories",
    title: "The Universe Doesn't Know What You Named It",
    dek: "Categories are useful. Reality is under no obligation to respect them.",
    readTime: "7 min read",
    body: [
      "This one started as a comment on a pull request, arguing about whether a particular edge case counted as a \"bug\" or a \"feature request.\" It didn't resolve cleanly, because the underlying behavior didn't care which label we filed it under.",
      "Categories are compressions we impose so we can communicate quickly. They work until the thing you're categorizing sits close enough to a boundary that the category starts doing more harm than good — hiding the actual shape of the problem behind a label that was convenient yesterday.",
      "The fix isn't better categories. It's remembering, on the days it matters, that the category was always a tool and never a fact about the object it was describing.",
    ],
  },
  {
    slug: "information-doesnt-have-to-mean-anything",
    index: "07",
    category: "on meaning",
    title: "Information Doesn't Have to Mean Anything",
    dek: "Meaning may be higher-order. Difference comes first.",
    readTime: "6 min read",
    body: [
      "Claude Shannon's information theory has nothing to say about meaning, and that omission is usually treated as a limitation. It might be the opposite: a discovery that difference — the raw fact that a signal could have been otherwise — is the more fundamental quantity, and meaning is something we build on top of it.",
      "A sequence of bits carries information whether or not anyone interprets it. Meaning requires an interpreter, a context, a purpose. Difference comes first; meaning is the second-order thing we add when there's a mind around to want something from the signal.",
      "This ordering matters more than it sounds. It suggests you can build systems that handle information faithfully without ever needing to solve the much harder problem of what any of it means — and that most of the systems we rely on already do exactly that.",
    ],
  },
  {
    slug: "the-observer-is-inside-the-machine",
    index: "08",
    category: "on observation",
    title: "The Observer Is Inside the Machine",
    dek: "Why sufficiently complicated systems make a perfectly external observer impossible to maintain.",
    readTime: "9 min read",
    body: [
      "The idea of an external, unaffected observer is a convenience that works fine for simple systems and quietly breaks down as systems get complicated enough to model the observer back.",
      "A trading algorithm that watches a market changes the market it watches. A moderation model trained on a platform's behavior shapes the behavior it was trained to describe. Past a certain point, the observer isn't standing outside the system taking notes — it's a component of the system, coupled to everything else.",
      "Once you accept that, a lot of models built assuming a clean separation between \"the system\" and \"the thing measuring it\" need to be re-read as approximations, valid only until the coupling gets strong enough to matter.",
    ],
  },
  {
    slug: "you-are-probably-a-compression-algorithm",
    index: "09",
    category: "on compression",
    title: "You Are Probably a Compression Algorithm",
    dek: "Possibly wrong. Still worth discussing.",
    readTime: "7 min read",
    body: [
      "A self, on this view, is a compression scheme running continuously on an overwhelming stream of sensory input, discarding almost everything and keeping just enough structure to predict what happens next and act on it in time to matter.",
      "That framing undersells what a self actually does, and a reader was right to push back on it — the follow-up to this essay tries to do better. But as a first approximation, it's a useful one: most of what feels like \"who you are\" is closer to a lossy, adaptive encoding of experience than a fixed, discovered essence.",
      "Whether that's comforting or unsettling seems to depend entirely on how attached you were to the essence version.",
    ],
  },
  {
    slug: "why-zero-is-more-interesting-than-nothing",
    index: "10",
    category: "on nothing",
    title: "Why Zero Is More Interesting Than Nothing",
    dek: "Neutrality, unresolved state, and the strange amount of structure hiding in the middle.",
    readTime: "6 min read",
    body: [
      "\"Nothing\" is a philosophical trapdoor — the absence of everything, including the framework you'd need to talk about it. Zero is a much more useful concept, precisely because it isn't nothing. It's a specific, well-defined point: the boundary between positive and negative, present and absent, on and off.",
      "A surprising amount of structure hides in that boundary. A neutral vote is not the same as no vote. An unresolved state in a system is not the same as an empty one. Zero carries information — it says \"this was measured, and it came out exactly balanced\" — in a way that true absence never can.",
      "The interesting systems are usually the ones that track the difference carefully, instead of collapsing \"zero\" and \"nothing\" into the same lazy default.",
    ],
  },
];

export function getEssayBySlug(slug: string): Essay | undefined {
  return essays.find((e) => e.slug === slug);
}

export function getNextEssay(slug: string): Essay {
  const i = essays.findIndex((e) => e.slug === slug);
  return essays[(i + 1) % essays.length];
}
