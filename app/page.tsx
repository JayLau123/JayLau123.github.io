import { SiteFooter, SiteHeader } from "./components/site-shell";

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
] as const;

const publications = [
  {
    year: "2026",
    title:
      "Breaking Bottlenecks in Solid Electrolyte Discovery with Large Artificial Intelligence Models",
    authors:
      "E. J. Cheng, M. Hong, Z. Zeng, C. Liu, Q. Wang, M. J. Meadowcroft, V. Badilita, and others",
    venue: "arXiv preprint arXiv:2606.24480",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=f2qAmGIAAAAJ&citation_for_view=f2qAmGIAAAAJ:M3ejUd6NZC8C",
  },
  {
    year: "2026",
    title: "Empowering Polymeric Materials Discovery by Artificial Intelligence",
    authors:
      "C. Ma, L. Zhang, Y. Chen, W. Du, S. Fang, Z. Jiang, C. Liu, X. Ma, R. Su, and others",
    venue: "arXiv preprint arXiv:2606.20753",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=f2qAmGIAAAAJ&citation_for_view=f2qAmGIAAAAJ:4TOpqqG69KYC",
  },
  {
    year: "2026",
    title:
      "Building a physics-aware AI ecosystem for solid-state hydrogen storage materials",
    authors:
      "S.-H. Jang, Y. Yao, C. Liu, L. Zhang, D. Zhang, X. Jia, H. B. Tran, E. J. Cheng, and others",
    venue: "arXiv preprint arXiv:2605.03081",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=f2qAmGIAAAAJ&citation_for_view=f2qAmGIAAAAJ:_kc_bZDykSQC",
  },
  {
    year: "2026",
    title:
      "Accelerating catalyst materials discovery with large artificial intelligence models",
    authors:
      "D. Zhang, Y. Chen, C. Liu, Y. Liu, H. Xin, J. Peng, P. Ou, and H. Li",
    venue: "Angewandte Chemie International Edition 65 (16), e26150",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=f2qAmGIAAAAJ&citation_for_view=f2qAmGIAAAAJ:YOwf2qJgpHMC",
  },
  {
    year: "2025",
    title:
      "Accelerating Multimetallic Catalyst Discovery with Robotics and Agentic AI",
    authors: "J. Peng, C. Liu, Y. Luo, and K. Dandapat",
    venue: "ChemRxiv 2025 (1106)",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=f2qAmGIAAAAJ&citation_for_view=f2qAmGIAAAAJ:Zph67rFs4hoC",
  },
  {
    year: "2021",
    title:
      "Automatically adaptive ventilated metamaterial absorber for environment with varying noises",
    authors:
      "H. Tian, X. Xiang, K. He, C. Liu, S. Hou, S. Wang, Y. Huang, X. Wu, and W. Wen",
    venue: "Advanced Materials Technologies 6 (12), 2100668",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=f2qAmGIAAAAJ&citation_for_view=f2qAmGIAAAAJ:roLk4NBRz8UC",
  },
  {
    year: "2021",
    title:
      "Microfluidic transport of hybrid optoplasmonic particles for repeatable SERS detection",
    authors: "D. Liu, C. Liu, Y. Yuan, X. Zhang, Y. Huang, and S. Yan",
    venue: "Analytical Chemistry 93 (30), 10672-10678",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=f2qAmGIAAAAJ&citation_for_view=f2qAmGIAAAAJ:hqOjcs7Dif8C",
  },
  {
    year: "2021",
    title: "Optoplasmonic film for SERS",
    authors: "L. Ju, J. Shi, C. Liu, Y. Huang, and X. Sun",
    venue:
      "Spectrochimica Acta Part A: Molecular and Biomolecular Spectroscopy 255, 119698",
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
              alt="Schematic comparing AI-predicted ordered structures with experimentally synthesized disordered structures"
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
        <div className="news-placeholder">
          <p>News updates will be added soon.</p>
        </div>
      </section>

      <section
        className="section publication-section"
        id="publications"
        aria-labelledby="publications-title"
      >
        <div className="section-heading">
          <h2 id="publications-title">Publications</h2>
        </div>
        <ol className="publication-list">
          {publications.map((paper) => (
            <li className="publication-item" key={paper.title}>
              <span className="year">{paper.year}</span>
              <div>
                <h3>
                  <a href={paper.href}>{paper.title}</a>
                </h3>
                <p className="authors">{paper.authors}</p>
                <p className="venue">{paper.venue}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section contact-section" id="contact">
        <div className="section-heading">
          <h2>Let us connect</h2>
          <p>
            I am open to chat about quantum chemistry, DFT, and physically
            grounded machine learning — or the art of photography.
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
