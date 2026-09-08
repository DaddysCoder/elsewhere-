export interface Paper {
  slug: string;
  category: string;
  year: string;
  title: string;
  dek: string;
  body: string[];
}

export const papers: Paper[] = [
  {
    slug: "shortest-path-routing-under-structural-drift",
    category: "routing",
    year: "2026",
    title: "Shortest-Path Routing Under Structural Drift",
    dek: "A routing model that tracks its own confidence as the graph it operates on continues to change.",
    body: [
      "Classical shortest-path algorithms answer a question most operational graphs do not ask: what is the cheapest walk through a structure that will hold still while you traverse it. The graphs that actually move material, packets, or attention change underfoot — edges appear, costs jump, whole regions drop out — and a plan that was optimal at t0 is often a lie by t1.",
      "We treat drift as first-class. The router maintains a posterior over the last observed graph and a scalar confidence that decays with both time since the last observation and a simple measure of recent structural change. While confidence stays above a threshold, it follows the current plan. When confidence collapses, it re-observes and re-plans rather than hoping the map is still true.",
      "// working claim",
      "The useful product is not a shorter path. It is a system that knows when to stop trusting its own map. In three weeks of live drift traces from a changing industrial network, the confidence-gated planner incurred fewer catastrophic detours than a static Dijkstra baseline recomputed on a fixed interval, at the cost of extra sensing when the graph was actually quiet.",
      "The write-up here is the method and the discrepancy with the whiteboard argument, not a packaged PDF. Code and the drift traces stay with the lab until they can be released without leaking operational topology. If you want either, write to hello@elsewhere-lab.com.",
    ],
  },
  {
    slug: "boundary-instability-in-learned-object-categories",
    category: "representation",
    year: "2025",
    title: "Boundary Instability in Learned Object Categories",
    dek: "Measuring how category boundaries shift under distribution change across five vision benchmarks.",
    body: [
      "A classifier's decision boundary is usually treated as a property of the model. In practice it is a property of the model plus the distribution it last saw. Move the data and the boundary moves, often in ways that do not show up in average accuracy.",
      "We measure that movement directly. On five standard vision benchmarks we train a fixed architecture, then apply controlled distribution shifts and record how the boundary around each class warps — not just whether examples flip, but how far the frontier travels in representation space.",
      "// working claim",
      "Classes that look stable under i.i.d. evaluation can have highly mobile boundaries. The mobility correlates more with how densely the class was sampled near its frontier than with overall frequency. That is an argument for evaluating representations by boundary stability, not only by top-1.",
      "The five-benchmark tables and the measurement code are available on request. This page is the public record of the claim and the method; we are not hosting a drive of weights here.",
    ],
  },
  {
    slug: "minimal-descriptions-of-self-referential-systems",
    category: "compression",
    year: "2025",
    title: "Minimal Descriptions of Self-Referential Systems",
    dek: "A working paper on compression bounds for systems that model themselves.",
    body: [
      "A system that includes a model of itself cannot, in general, have a shortest description that is also complete. That is an old observation. What we want is a usable bound: how much extra length is forced once self-reference is required, and when a partial self-model is cheaper than an honest one.",
      "We work in a simple description-length setting. A system is a program that outputs a history; a self-model is a component whose job is to predict the system's own next description. Completeness would require the model to contain a copy of itself. We instead ask for the shortest description that predicts its own future up to a stated error.",
      "// working claim",
      "Once you drop completeness, the extra cost of self-reference is bounded and often small. The expensive move is insisting the model be a faithful copy rather than a compression that is allowed to be wrong in named ways. That is closer to how people actually keep a self than the infinite-regress cartoon.",
      "This is still a working paper. The proofs are in a note we will publish when they are no longer changing under us; until then the argument above is the version we will stand behind.",
    ],
  },
  {
    slug: "external-observer-assumptions-in-coupled-systems",
    category: "observation",
    year: "2024",
    title: "External Observer Assumptions in Coupled Systems",
    dek: 'A survey of where "external observer" models quietly break down in practice.',
    body: [
      "A lot of measurement language assumes an observer who is not part of the thing being measured. That is fine for a thermometer in a room and less fine for a model that is trained on logs of the system it will later steer, or a team that writes the benchmark they will be scored on.",
      "This survey collects places we have seen the external-observer assumption fail in coupled systems: evaluation that leaks into training, sensors that change the graph they report, and organisations that treat their own dashboards as if they were weather.",
      "// working claim",
      "The failure mode is rarely malice. It is a modelling convenience that stops being free once the observer's actions are in the data. The practical test is simple: if removing the observer would change the trajectory, they were never external, and the model should say so.",
      "We are not offering a new formalism here. The point of the survey is to name the assumption where it is hiding so later work can drop it on purpose rather than by accident.",
    ],
  },
];

export function getPaperBySlug(slug: string): Paper | undefined {
  return papers.find((paper) => paper.slug === slug);
}

export function getNextPaper(slug: string): Paper {
  const index = papers.findIndex((paper) => paper.slug === slug);
  return papers[(index + 1) % papers.length];
}
