import { SiteFooter, SiteHeader } from "../components/site-shell";

export default function BlogPage() {
  return (
    <main>
      <SiteHeader active="blog" />

      <section className="page-hero" aria-labelledby="blog-title">
        <h1 id="blog-title">Blog</h1>
        <p>
          A collection of research notes and unpolished thoughts. All views
          expressed here are strictly my own.
        </p>
      </section>

      <section className="section compact-section" aria-labelledby="posts-title">
        <div className="section-heading">
          <h2 id="posts-title">Posts</h2>
        </div>
        <div className="blog-list">
          <article className="blog-post">
            <header className="blog-post-header">
              <h3>From Observation to Integration: The Four Paradigms of Scientific Discovery</h3>
            </header>

            <p>
              Science is defined by how we observe the universe. Over centuries,
              our methods of observation and discovery have evolved through
              distinct paradigms, each fundamentally changing the speed and
              scale of human progress.
            </p>

            <h4>The First Paradigm: Empirical Science</h4>
            <p>
              The foundation of scientific discovery lies in directly observing,
              recording, and describing natural phenomena. Scientists formulate
              hypotheses, test them, and develop laws based strictly on physical
              validation.
            </p>
            <p className="blog-example">
              <strong>Concrete examples:</strong> Galileo rolling spheres down
              inclines to measure motion, and Mendel meticulously breeding pea
              plants to deduce the laws of inheritance. This is the classic
              hypothetico-deductive method.
            </p>

            <h4>The Second Paradigm: Theoretical Science</h4>
            <p>
              Knowledge advances through abstract reasoning and mathematical
              synthesis, often extending far beyond what can be seen in a lab.
              The goal is to derive fundamental theories that explain observed
              phenomena and predict entirely new ones using limited experimental
              data or purely thought experiments.
            </p>
            <p className="blog-example">
              <strong>Concrete examples:</strong> Maxwell unifying electricity
              and magnetism into a set of elegant equations, and Einstein
              deriving general relativity. These theories capture the underlying
              mathematical structure of physical laws.
            </p>

            <h4>The Third Paradigm: Computational Science</h4>
            <p>
              As physical equations became too complex to solve by hand, science
              shifted toward creating virtual models. By translating physical
              systems into algorithms, we can simulate phenomena that are too
              small, too fast, or too dangerous to observe directly.
            </p>
            <p className="blog-example">
              <strong>Concrete examples:</strong> Density Functional Theory
              calculations solving quantum mechanical states of many-body
              systems, and Molecular Dynamics simulating the atomic movements of
              materials over time.
            </p>

            <h4>The Fourth Paradigm: AI for Science (AI4S)</h4>
            <p>
              The current frontier integrates artificial intelligence, machine
              learning, and high-performance computing with traditional methods.
              AI does not just crunch numbers; it identifies hidden topological
              patterns in massive datasets, proposes hypotheses, and bridges the
              gap between pure statistics and physical laws.
            </p>
            <p className="blog-example">
              <strong>Concrete examples:</strong> DeepMind&apos;s AlphaFold
              predicting protein structures, symbolic regression uncovering new
              physical laws from raw data, and neural networks predicting complex
              material properties millions of times faster than traditional
              solvers.
            </p>

            <blockquote>
              As highlighted in <em>Scientific Discovery in the Age of Artificial Intelligence</em>,
              the fusion of AI with traditional scientific inquiry forms a
              methodology that pushes the very boundaries of what is discoverable.
            </blockquote>
          </article>

          <article className="blog-post">
            <header className="blog-post-header">
              <h3>Beyond the Shadow of Language: AI as the New Observer of Nature</h3>
            </header>

            <p>
              For centuries, science has been bound by a profound limitation: the
              bottleneck of human language.
            </p>
            <p>
              When we talk about Artificial Intelligence for Science (AI4S), we
              often think of it as a tool to process data faster or write code
              more efficiently. But in my view, the true essence of AI4S is far
              more radical. It is about empowering artificial intelligence to
              bypass the barrier of human language entirely, allowing it to
              directly observe, experiment, synthesize, and reason with the raw
              fabric of reality.
            </p>
            <p>
              The philosopher Ludwig Wittgenstein famously noted that language is
              merely a tool to describe the world, not the world itself.{" "}
              <em>&quot;The limits of my language mean the limits of my world.&quot;</em>{" "}
              When an AI generates text, its meaning and logic are subjectively
              judged by humans. It is simply a shadow embellishing another shadow.
            </p>
            <p>
              However, the molecules, proteins, and materials we aim to discover
              in the lab are not abstract linguistic symbols. They are nature
              itself. Their existence and interactions are not governed by
              grammar or syntax, but strictly by the Schrödinger equation.
            </p>
            <p>
              To truly understand nature, we must ask: <strong>What happens when
              the observer is no longer human?</strong>
            </p>

            <h4>The Physics of Observation: Human vs. AI</h4>
            <p>
              To understand this paradigm shift, we can look through the lens of
              quantum mechanics. In quantum theory, the act of measurement is what
              collapses an infinite wave of probabilities into a definitive,
              observable reality.
            </p>

            <h4>The Standard Quantum Framework</h4>
            <p>
              In traditional physics, measuring the energy of a quantum system is
              expressed as:
            </p>
            <div className="blog-equation" aria-label="Hamiltonian operator H hat times psi equals energy E times psi">
              H_hat psi = E psi
            </div>
            <ul className="blog-definitions">
              <li><strong>H_hat:</strong> the Hamiltonian operator, representing the energy measurement.</li>
              <li><strong>psi:</strong> the intrinsic, uncollapsed state of the quantum system.</li>
              <li><strong>E:</strong> the energy eigenvalue yielded by the measurement.</li>
            </ul>

            <h4>The Human Observation Analogy</h4>
            <p>
              If we view humanity as a collective operator measuring the wave
              function of nature, the resulting eigenvalue we obtain is what we
              call human language.
            </p>
            <div className="blog-equation" aria-label="Human observer operator H human times psi equals language L times psi">
              H_human psi = L psi
            </div>
            <ul className="blog-definitions">
              <li><strong>H_human:</strong> the human observer acting as the measurement operator.</li>
              <li><strong>psi:</strong> the intrinsic, unobserved state of nature.</li>
              <li><strong>L:</strong> the resulting eigenvalue, collapsing into human constructs such as English, Chinese, or classical mathematical symbols.</li>
            </ul>
            <p>
              Language is an evolutionary compression algorithm. It is highly
              effective for human survival and storytelling, but it is a
              profoundly lossy, low-dimensional projection of a high-dimensional,
              complex universe.
            </p>

            <h4>The AI Measurement Paradigm</h4>
            <p>
              This raises a fascinating, paradigm-shifting question. If an AI
              system, unburdened by evolutionary biology or linguistic syntax,
              acts as the operator observing nature, what will its eigenvalue be?
            </p>
            <div className="blog-equation" aria-label="AI operator A times psi equals X times psi">
              A psi = X psi
            </div>
            <ul className="blog-definitions">
              <li><strong>A:</strong> the artificial intelligence, such as a neural operator or foundational model.</li>
              <li><strong>psi:</strong> the intrinsic state of nature.</li>
              <li><strong>X:</strong> the novel eigenvalue generated by the machine.</li>
            </ul>

            <h4>Uncovering the &quot;Alien&quot; Eigenvalue</h4>
            <p>
              Unlike human language, this new eigenvalue does not manifest as a
              linear string of characters or words. It manifests as a sprawling,
              high-dimensional topology. It is encoded in latent manifolds,
              multi-dimensional feature spaces, and billions of network weights.
            </p>
            <p>
              When a machine observes a folding protein or a quantum material, it
              does not translate that phenomenon into a noun or a verb. It
              translates it into a continuous mathematical geometry where distance
              equals structural similarity, and trajectory equals chemical
              reaction.
            </p>
            <p>
              This means that a neural architecture and its specific combination
              of parameters might inherently encode scientific truth in a purer
              form than human language ever could.
            </p>
            <p>
              The future of AI4S is not just about using machines to read
              scientific papers so they can summarize them for us. It is about
              allowing machines to read the universe directly, capturing the wave
              function of nature in a language we are only just beginning to learn
              how to translate.
            </p>
          </article>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
