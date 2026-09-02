import { SiteFooter, SiteHeader } from "./components/site-shell";
import { PublicationList } from "./components/publication-list";

const scholarUrl =
  "https://scholar.google.com/citations?hl=en&user=f2qAmGIAAAAJ&scilu=&scisig=AKLELW8AAAAAamA-UixXKb5bXOUC94G6p-iPr2U&gmla=AO4B3jsDrYJAtgxAtTYhd2ZKamz0I8z-iOgFEDGwYQA2Hd8fVtVCZCItY274crw7cpnxSuM2f_5KHe05OqBEPBTeLHRRflV94_vj-bc&sciund=1239809507754054681";

const profileLinks = [
  {
    label: "Email",
    href: "mailto:jayjob2023@gmail.com",
    icon: "email",
  },
  {
    label: "GitHub",
    href: "https://github.com/JayLau123",
    icon: "github",
  },
  {
    label: "Google Scholar",
    href: scholarUrl,
    icon: "scholar",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chuanyu-l-a1a00b1a3/?skipRedirect=true",
    icon: "linkedin",
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/Chuanyuliu21",
    icon: "x",
  },
] as const;

const publications = [
  {
    date: "08/2026",
    dateTime: "2026-08",
    title: "Empowering Polymeric Materials Discovery by Artificial Intelligence",
    authors:
      "C. Ma, L. Zhang, Y. Chen, W. Du, S. Fang, Z. Jiang, C. Liu, X. Ma, R. Su, and others",
    venue: "JACS Au",
    abstract:
      "Polymeric materials underpin modern technologies spanning energy storage, microelectronics, healthcare and sustainable manufacturing. Yet their rational design remains exceptionally challenging because material performance emerges from complex interactions among molecular composition, chain architecture, processing history and hierarchical structural evolution across multiple length and time scales. Consequently, polymer research has long relied on labor-intensive experimentation and fragmented modeling approaches, limiting both mechanistic understanding and innovation efficiency. Recent advances in data infrastructure, machine learning, large artificial intelligence models and laboratory automation are beginning to reshape this landscape. Rather than functioning as isolated tools, polymer databases, predictive models, AI agents and automated laboratories are increasingly converging into interconnected discovery ecosystems. As a result, the central challenge is shifting from improving predictive accuracy alone to enabling reliable decision-making, adaptive learning and seamless integration across computation, experimentation and scientific reasoning. We argue that polymer science is entering an era of autonomous discovery, in which data, simulation, reasoning and experimentation operate within self-improving feedback loops that continuously generate hypotheses, design materials, execute experiments and refine predictive models. By unifying molecular design, process optimization, experimental validation and industrial translation, such autonomous ecosystems establish a more predictive, reproducible and scalable paradigm for polymer innovation, fundamentally transforming how polymer research is conducted.",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=f2qAmGIAAAAJ&citation_for_view=f2qAmGIAAAAJ:4TOpqqG69KYC",
  },
  {
    date: "08/2026",
    dateTime: "2026-08",
    title:
      "Building a physics-aware AI ecosystem for solid-state hydrogen storage materials",
    authors:
      "S.-H. Jang, Y. Yao, C. Liu, L. Zhang, D. Zhang, X. Jia, H. B. Tran, E. J. Cheng, and others",
    venue: "ACS Energy Letters",
    abstract:
      "Hydrogen storage remains a central bottleneck for scalable hydrogen energy systems due to the multiscale and coupled nature of the thermodynamics, kinetics, and microstructural evolution of hydrogen storage materials. Although artificial intelligence has accelerated materials discovery, current approaches remain constrained by fragmented data, limited physical consistency, and weak integration with experimental validation. Here, we propose a unified framework that integrates coherent data infrastructure, physics-grounded modeling, and AI-driven inverse design within a closed-loop discovery paradigm. By constraining optimization with thermodynamics, kinetics, uncertainty, provenance, and experimental feedback, this approach enables adaptive, physically consistent optimization, thereby establishing a pathway toward autonomous, digital-twin-enabled discovery of hydrogen storage materials.",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=f2qAmGIAAAAJ&citation_for_view=f2qAmGIAAAAJ:4DMP91E08xMC",
  },
  {
    date: "06/2026",
    dateTime: "2026-06",
    title:
      "Breaking Bottlenecks in Solid Electrolyte Discovery with Large Artificial Intelligence Models",
    authors:
      "E. J. Cheng, M. Hong, Z. Zeng, C. Liu, Q. Wang, M. J. Meadowcroft, V. Badilita, and others",
    venue: "arXiv preprint arXiv:2606.24480",
    abstract:
      "Solid electrolytes are central to next-generation metal batteries, yet their discovery remains constrained by fragmented data, limited transferability of simulations, and slow experimental iteration. Unlike catalysis, where surface reactivity dominates, solid electrolytes require simultaneous optimization of bulk ion transport, defect chemistry, mechanical integrity, and interfacial stability. Here, we outline a framework for autonomous solid-electrolyte discovery enabled by large artificial intelligence models, including machine learning interatomic potentials and large language models. We discuss the evolution from static materials databases to dynamic, self-updating knowledge systems, the role of machine learning interatomic potentials in bridging density functional theory and long-timescale ion migration, and the emergence of large language models as engines for literature mining, hypothesis generation, and scientific reasoning. We further describe a closed-loop architecture integrating AI-driven candidate design, multiscale simulation, uncertainty-aware selection, and experimental validation. Such systems shift solid-electrolyte research from intuition-guided exploration to data-informed, self-improving cycles. We conclude by highlighting challenges in data standardization, interfacial complexity, and reproducibility, and propose design principles for building autonomous laboratories for solid-state battery materials.",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=f2qAmGIAAAAJ&citation_for_view=f2qAmGIAAAAJ:M3ejUd6NZC8C",
  },
  {
    date: "02/2026",
    dateTime: "2026-02",
    title:
      "Accelerating catalyst materials discovery with large artificial intelligence models",
    authors:
      "D. Zhang, Y. Chen, C. Liu, Y. Liu, H. Xin, J. Peng, P. Ou, and H. Li",
    venue: "Angewandte Chemie International Edition 65 (16), e26150",
    abstract:
      "The integration of artificial intelligence into catalysis is fundamentally reshaping the research paradigm of catalyst discovery. Unlike traditional trial-and-error approaches, AI-empowered data-driven technologies, particularly large AI models such as universal machine learning interatomic potentials and large language models, offer unprecedented capabilities in exploring complex spaces, predicting catalytic performance, and accelerating rational design. Standing at the forefront of data-driven science, we underscore how databases, universal machine learning interatomic potentials, and large language models are revolutionizing the traditional catalysis paradigm and bridging the ontology-concept-computation-experiment continuum. We demonstrate significant recent progress and discuss its potential and challenges in catalysis. By leveraging these technologies, researchers can conduct large-scale simulations, highly efficient data acquisition, training, prediction, and even self-directed research. Looking ahead, integrated universal machine learning interatomic potentials, multimodal large language models, and automation systems could enable AI-empowered closed-loop platforms and cross-disciplinary digital materials ecosystems.",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=f2qAmGIAAAAJ&citation_for_view=f2qAmGIAAAAJ:YOwf2qJgpHMC",
  },
  {
    date: "11/2025",
    dateTime: "2025-11",
    title:
      "Accelerating Multimetallic Catalyst Discovery with Robotics and Agentic AI",
    authors: "J. Peng, C. Liu, Y. Luo, and K. Dandapat",
    venue: "ChemRxiv 2025 (1106)",
    abstract:
      "The design space of catalyst materials spans composition, processing, atomistic structure, and microstructure. As materials become more complex, the dimension of this parameter space grows combinatorially. Conventional active learning approaches operate on a single data stream and stay decoupled from the messy reality of experiments, limiting their efficiency and reproducibility in real-world catalyst optimization. To tackle this limitation, Li and coworkers developed a robotic platform, Copilot for Real-world Experimental Scientists (CRESt), which facilitates multimetallic catalyst discovery in a multiplex parameter space by combining multimodal large vision-language models, knowledge-assisted Bayesian optimization, and robotic automation of synthesis, characterization, and electrochemical tests.",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=f2qAmGIAAAAJ&citation_for_view=f2qAmGIAAAAJ:Zph67rFs4hoC",
  },
  {
    date: "08/2021",
    dateTime: "2021-08",
    title:
      "Automatically adaptive ventilated metamaterial absorber for environment with varying noises",
    authors:
      "H. Tian, X. Xiang, K. He, C. Liu, S. Hou, S. Wang, Y. Huang, X. Wu, and W. Wen",
    venue: "Advanced Materials Technologies 6 (12), 2100668",
    abstract:
      "An automatically adaptive metamaterial sound absorber is designed to absorb tunable low-frequency sounds below 500 Hz under ventilated conditions. A feedback circuit actively detects noise signals and adjusts sliders on the reconfigurable absorbers. The system adapts its sound-absorption units directly to the external environment while retaining efficient absorption and ventilation. The intelligent absorber is demonstrated experimentally, and an effective model of coupled lossy oscillators is used to understand its mechanism. The device can be adjusted for different working frequencies in applications such as ventilated smart windows, where it can reduce external noise while preserving a fresh and bright working environment. It may also be useful in ducts where noise frequencies vary over time and manual tuning is difficult or inaccurate.",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=f2qAmGIAAAAJ&citation_for_view=f2qAmGIAAAAJ:roLk4NBRz8UC",
  },
  {
    date: "07/2021",
    dateTime: "2021-07",
    title:
      "Microfluidic transport of hybrid optoplasmonic particles for repeatable SERS detection",
    authors: "D. Liu, C. Liu, Y. Yuan, X. Zhang, Y. Huang, and S. Yan",
    venue: "Analytical Chemistry 93 (30), 10672-10678",
    abstract:
      "A hybrid optoplasmonic microfluidic conveyer is developed in which movable, highly ordered optoplasmonic particles are delivered to a detection spot for surface-enhanced Raman spectroscopy. Each particle is a silica microsphere with silver nanoparticles reduced photochemically in situ on its surface. The converged light at the microsphere surface produces strong Raman spectra in the channel, consistent with simulated electric-field distributions. The experiments demonstrate quantitative analysis at 1 nM. Used particles can be ejected by changing the injected fluid velocity, allowing a new particle to move into the same detection spot for repeatable measurements. The transport dynamics are investigated, and a theoretical model accurately predicts particle release. The resulting conveyer provides replaceable, highly sensitive enhanced substrates that reduce cross-contamination between target molecules during repeated detection.",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=f2qAmGIAAAAJ&citation_for_view=f2qAmGIAAAAJ:hqOjcs7Dif8C",
  },
  {
    date: "07/2021",
    dateTime: "2021-07",
    title: "Optoplasmonic film for SERS",
    authors: "L. Ju, J. Shi, C. Liu, Y. Huang, and X. Sun",
    venue:
      "Spectrochimica Acta Part A: Molecular and Biomolecular Spectroscopy 255, 119698",
    abstract:
      "Combining plasmonic and photonic elements, optoplasmonic hybrid structures can exhibit optical properties beyond conventional plasmonic or photonic systems. This work investigates a simple optoplasmonic film composed of silica microspheres and a gold film without nanostructuring. With the microspheres acting as lenses, the surface-enhanced Raman spectroscopy intensity on the gold film increases by approximately 1000 times compared with bare gold. Simulated electromagnetic fields attribute the enhancement to the optical lens effect, which concentrates light beneath each microsphere and excites surface plasmons on the gold film. Experiments further show that this enhancement depends strongly on microsphere size and incident-light wavelength. The simple film avoids fabrication and storage challenges associated with nanostructured substrates and offers potential for enhanced spectroscopy, photocatalysis, photothermal effects, and hot-electron generation.",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=f2qAmGIAAAAJ&citation_for_view=f2qAmGIAAAAJ:YsMSGLbcyi4C",
  },
] as const;

function ProfileIcon({ icon }: { icon: (typeof profileLinks)[number]["icon"] }) {
  if (icon === "github") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.1.8-.25.8-.56v-2c-3.26.7-3.95-1.38-3.95-1.38-.53-1.36-1.3-1.72-1.3-1.72-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.21 1.8 1.21 1.05 1.8 2.76 1.28 3.43.98.1-.76.41-1.28.75-1.57-2.6-.3-5.33-1.3-5.33-5.78 0-1.28.46-2.32 1.2-3.14-.12-.3-.52-1.5.12-3.1 0 0 .99-.32 3.22 1.2A11.1 11.1 0 0 1 12 5.93c1 0 1.98.13 2.91.4 2.23-1.52 3.22-1.2 3.22-1.2.64 1.6.24 2.8.12 3.1.75.82 1.2 1.86 1.2 3.14 0 4.5-2.74 5.48-5.35 5.77.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.81.56A11.5 11.5 0 0 0 12 .5Z" />
      </svg>
    );
  }

  if (icon === "scholar") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 3 1.8 8.6 12 14.2 22.2 8.6 12 3Zm-6.4 8.7v4.1c1.8 2.1 4 3.2 6.4 3.2s4.6-1.1 6.4-3.2v-4.1L12 15.2l-6.4-3.5Z" />
      </svg>
    );
  }

  if (icon === "linkedin") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M4.98 3.5a2.5 2.5 0 1 1-.02 5 2.5 2.5 0 0 1 .02-5ZM3 21h4V9.75H3V21Zm6.2-11.25H13v1.54h.05c.53-1 1.84-2.05 3.78-2.05 4.05 0 4.8 2.66 4.8 6.12V21h-4v-5.02c0-1.2-.02-2.73-1.66-2.73-1.67 0-1.93 1.3-1.93 2.64V21h-4V9.75Z" />
      </svg>
    );
  }

  if (icon === "x") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M18.24 2.25h3.31l-7.23 8.26 8.51 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M3.5 5h17A1.5 1.5 0 0 1 22 6.5v11A1.5 1.5 0 0 1 20.5 19h-17A1.5 1.5 0 0 1 2 17.5v-11A1.5 1.5 0 0 1 3.5 5Zm.85 2 7.65 5.5L19.65 7H4.35Zm15.65 9.7V8.95l-7.42 5.34a1 1 0 0 1-1.16 0L4 8.95v7.75h16Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      <SiteHeader active="about" />

      <section className="hero" id="about" aria-labelledby="page-title">
        <div className="hero-copy">
          <h1 id="page-title">Chuanyu Liu</h1>
          <p>
            <strong>Hi, I&apos;m Chuanyu Liu,</strong> a PhD student in
            Computational Materials at SUNY, Buffalo, advised by{" "}
            <a href="https://ubwp.buffalo.edu/jiayu-peng-lab/">
              Prof. Jiayu Peng
            </a>
            . I obtained my Bachelor&apos;s in Applied Physics from Chongqing
            University in 2021 and Masters in Molecular Engineering from the
            University of Chicago in 2023. From 2023 to 2025, I was a full
            Research Associate in the Department of Chemistry at MIT and Broad
            Institute, working with{" "}
            <a href="https://www.sampenglab.org/research">Prof. Sam Peng</a> on
            the computational design of lanthanide-doped upconversion
            nanoparticles (UCNPs) for molecular bioprobes.
          </p>
        </div>

        <aside className="portrait-panel" aria-label="Profile links">
          <img src="/profile.jpg" alt="Chuanyu Liu" />
          <div className="portrait-meta">
            <p className="panel-title">Chuanyu Liu</p>
            <div className="icon-links" aria-label="Profile links">
              {profileLinks.map((link) => (
                <a key={link.label} href={link.href} aria-label={link.label}>
                  <ProfileIcon icon={link.icon} />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section
        className="section interest-section"
        id="interests"
        aria-labelledby="interests-title"
      >
        <div className="section-heading">
          <h2 id="interests-title">Research Interests</h2>
          <p>
            Current AI-driven materials discovery often faces a bottleneck:
            models frequently over-idealize structures by predicting perfectly
            ordered crystallographic sites, neglecting the thermodynamically
            driven disorder inherent in bulk and surface structures under
            real-world conditions.
          </p>
          <figure className="research-schematic">
            <img
              src="/research-schematic-v2.png"
              alt="Schematic comparing an ordered AI-predicted structure with a disordered experimentally synthesized structure"
            />
          </figure>
          <p>
            My methodological focus lies in developing physics-informed,
            data-driven machine learning methods to capture the fundamental laws
            of materials thermodynamics and surface kinetics from atomistic
            simulations and characterization data, bridging material behavior
            from the single-atom level up to experimental observables.
          </p>
          <p>
            My goal is to close the loop between idealized computational design,
            the experimental workbench, and practical applications in catalysts,
            electrolytes, and energy storage materials, accelerating innovation
            at the AI-energy nexus.
          </p>
        </div>
      </section>

      <section className="section news-section" id="news">
        <div className="section-heading">
          <h2>Recent News</h2>
        </div>
        <article className="news-item">
          <div className="news-mark">
            <img
              src="/genesis-logo-lockup-black.png"
              alt="Genesis Mission"
            />
          </div>
          <div className="news-copy">
            <p className="news-meta">07/2026</p>
            <h3>
              <a href="https://www.linkedin.com/feed/update/urn:li:activity:7485926986947858432/">
                CLEAR-AI selected for Genesis Mission Phase I
              </a>
            </h3>
            <p>
              I am excited to have the opportunity to contribute to CLEAR-AI:
              Closed-Loop, Efficient, Adaptive, and Robust AI for Agentic
              Chemical Manufacturing, selected by the U.S. Department of
              Energy as a Phase I project in the Genesis Mission.
            </p>
            <p>
              CLEAR-AI will develop a closed-loop, agentic AI platform that
              connects modeling and experiment to accelerate catalyst and
              process development for the electrosynthesis of carbon-based
              fuels and chemicals.
            </p>
            <p>
              It&apos;s so glad to learn from and work alongside an outstanding
              team spanning {" "}
              <a href="https://scholar.google.com/citations?user=NK94F4kAAAAJ&amp;hl=en">
                Dr.Thomas Mallouk
              </a>{" "}
              at the University of Pennsylvania, {" "}
              <a href="https://scholar.google.com/citations?user=P_iNYbQAAAAJ&amp;hl=en">
                Dr.Hongliang Xin
              </a>{" "}
              at Virginia Tech, {" "}
              <a href="https://scholar.google.com/citations?user=u6tJUFwAAAAJ&amp;hl=en">
                Dr.Sen Zhang
              </a>{" "}
              at the University of Virginia, {" "}
              <a href="https://scholar.google.com/citations?user=2U-7B-MAAAAJ&amp;hl=en">
                Dr.Yugang Zhang
              </a>{" "}
              at Brookhaven National Laboratory, and {" "}
              <a href="https://scholar.google.com/citations?hl=en&amp;user=C2bjyO8AAAAJ&amp;view_op=list_works&amp;sortby=pubdate">
                Dr.Chang Liu
              </a>{" "}
              at Oak Ridge National Laboratory. I look forward to helping
              demonstrate CLEAR-AI and advance agentic AI for broader
              electrosynthetic and chemical manufacturing applications.
            </p>
            <a
              className="news-link"
              href="https://www.energy.gov/undersecretaryforscience/genesis-mission/genesis-mission"
            >
              Explore the Genesis Mission <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </section>

      <section
        className="section publication-section"
        id="publications"
        aria-labelledby="publications-title"
      >
        <div className="section-heading">
          <h2 id="publications-title">Publications</h2>
        </div>
        <PublicationList publications={publications} />
      </section>

      <section className="section contact-section" id="contact">
        <div className="section-heading">
          <h2>Let us connect</h2>
          <p>
            I am open to chat and collaboration about quantum chemistry, DFT,
            and physically grounded machine learning — or the art of
            photography.
          </p>
          <div
            className="icon-links contact-icon-links"
            aria-label="Contact links"
          >
            {profileLinks.map((link) => (
              <a key={link.label} href={link.href} aria-label={link.label}>
                <ProfileIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
