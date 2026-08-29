type CrystalUnitProps = {
  x: number;
  y: number;
  tone: "blue" | "amber";
  rotation?: number;
  scale?: number;
};

function CrystalUnit({
  x,
  y,
  tone,
  rotation = 0,
  scale = 1,
}: CrystalUnitProps) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}>
      <path
        className={`schematic-polyhedron schematic-${tone}-polyhedron`}
        d="M0-38 45 0 0 38-45 0Z"
      />
      <path className="schematic-unit-bonds" d="M0-38V38M-45 0H45" />
      <circle className={`schematic-atom schematic-${tone}-atom`} r="13" />
      <circle className="schematic-vertex" cx="0" cy="-38" r="4" />
      <circle className="schematic-vertex" cx="45" cy="0" r="4" />
      <circle className="schematic-vertex" cx="0" cy="38" r="4" />
      <circle className="schematic-vertex" cx="-45" cy="0" r="4" />
    </g>
  );
}

const orderedUnits: CrystalUnitProps[] = [
  { x: 130, y: 160, tone: "blue" },
  { x: 220, y: 160, tone: "amber" },
  { x: 310, y: 160, tone: "blue" },
  { x: 130, y: 236, tone: "amber" },
  { x: 220, y: 236, tone: "blue" },
  { x: 310, y: 236, tone: "amber" },
  { x: 130, y: 312, tone: "blue" },
  { x: 220, y: 312, tone: "amber" },
  { x: 310, y: 312, tone: "blue" },
];

const disorderedUnits: CrystalUnitProps[] = [
  { x: 690, y: 164, tone: "blue", rotation: -6, scale: 0.96 },
  { x: 783, y: 151, tone: "amber", rotation: 8, scale: 0.88 },
  { x: 877, y: 181, tone: "blue", rotation: -5, scale: 1.02 },
  { x: 714, y: 246, tone: "amber", rotation: 11, scale: 0.9 },
  { x: 810, y: 238, tone: "blue", rotation: -12, scale: 0.98 },
  { x: 900, y: 269, tone: "amber", rotation: 9, scale: 0.84 },
  { x: 686, y: 326, tone: "blue", rotation: -7, scale: 0.86 },
  { x: 791, y: 319, tone: "amber", rotation: 14, scale: 1.01 },
];

export function ResearchSchematic() {
  return (
    <figure className="research-schematic">
      <svg
        viewBox="0 0 1000 420"
        role="img"
        aria-labelledby="research-schematic-title research-schematic-description"
      >
        <title id="research-schematic-title">
          Ordered AI predictions and disordered experimental materials
        </title>
        <desc id="research-schematic-description">
          An ordered crystal predicted by artificial intelligence is separated
          by an unresolved two-way relationship from a disordered material made
          in an experiment.
        </desc>

        <defs>
          <marker
            id="schematic-arrow-start"
            viewBox="0 0 10 10"
            refX="2"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path className="schematic-arrow-head" d="M10 0 0 5l10 5Z" />
          </marker>
          <marker
            id="schematic-arrow-end"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto"
          >
            <path className="schematic-arrow-head" d="M0 0 10 5 0 10Z" />
          </marker>
        </defs>

        <g className="schematic-robot" transform="translate(184 30)">
          <rect x="0" y="12" width="72" height="58" rx="13" />
          <path d="M36 12V3M30 3h12M0 34h-9v19h9M72 34h9v19h-9" />
          <circle cx="23" cy="39" r="4" />
          <circle cx="49" cy="39" r="4" />
          <path d="M23 55h26" />
        </g>
        <text className="schematic-icon-label" x="220" y="119" textAnchor="middle">
          AI prediction
        </text>

        <g className="schematic-flask" transform="translate(765 28)">
          <path d="M24 0h38M31 0v31L10 67c-8 14 1 28 17 28h32c16 0 25-14 17-28L55 31V0" />
          <path d="M18 67h50" />
          <circle cx="37" cy="61" r="4" />
          <circle cx="52" cy="72" r="3" />
        </g>
        <text className="schematic-icon-label" x="808" y="119" textAnchor="middle">
          Experiment
        </text>

        <g className="schematic-ordered-structure">
          {orderedUnits.map((unit) => (
            <CrystalUnit key={`${unit.x}-${unit.y}`} {...unit} />
          ))}
        </g>

        <g className="schematic-disordered-structure">
          <path
            className="schematic-disorder-link"
            d="M645 190 690 164 748 188 783 151 831 186 877 181 922 218M654 287 714 246 758 282 810 238 854 284 900 269M686 326 743 341 791 319 852 346"
          />
          {disorderedUnits.map((unit) => (
            <CrystalUnit key={`${unit.x}-${unit.y}`} {...unit} />
          ))}
          <path className="schematic-vacancy" d="M855 299 904 337 862 371 819 337Z" />
        </g>

        <line
          className="schematic-question-arrow"
          x1="425"
          y1="240"
          x2="575"
          y2="240"
          markerStart="url(#schematic-arrow-start)"
          markerEnd="url(#schematic-arrow-end)"
        />
        <circle className="schematic-question-circle" cx="500" cy="240" r="37" />
        <text className="schematic-question" x="500" y="254" textAnchor="middle">
          ?
        </text>

        <text className="schematic-structure-label" x="220" y="396" textAnchor="middle">
          Ordered structure
        </text>
        <text className="schematic-structure-label" x="800" y="396" textAnchor="middle">
          Disordered structure
        </text>
      </svg>
    </figure>
  );
}
