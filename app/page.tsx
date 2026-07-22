const scholarUrl =
  "https://scholar.google.com/citations?hl=en&user=f2qAmGIAAAAJ&scilu=&scisig=AKLELW8AAAAAamA-UixXKb5bXOUC94G6p-iPr2U&gmla=AO4B3jsDrYJAtgxAtTYhd2ZKamz0I8z-iOgFEDGwYQA2Hd8fVtVCZCItY274crw7cpnxSuM2f_5KHe05OqBEPBTeLHRRflV94_vj-bc&sciund=1239809507754054681";

const profileLinks = [
  {
    label: "Email",
    href: "mailto:jayjob2023@gmail.com",
    text: "jayjob2023@gmail.com",
  },
  {
    label: "Google Scholar",
    href: scholarUrl,
    text: "Google Scholar",
  },
  {
    label: "GitHub",
    href: "https://github.com/JayLau123",
    text: "GitHub",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chuanyu-l-a1a00b1a3/?skipRedirect=true",
    text: "LinkedIn",
  },
] as const;

const researchPath = [
  {
    period: "B.S.",
    title: "Applied Physics, Chongqing University",
    detail:
      "Built an early research foundation in SERS, optoplasmonic films, and metamaterials, with public papers published in 2021.",
  },
  {
    period: "M.S.",
    title: "Computational Modeling of Materials, University of Chicago",
    detail:
      "Focused on computational chemistry and materials modeling. No paper was published from this stage.",
  },
  {
    period: "RA-I",
    title: "MIT Chemistry and Broad Institute",
    detail:
      "Worked with Sam Peng on lanthanide-doped upconversion nanoparticles, combining Judd-Ofelt analysis, ab initio calculations, and Monte Carlo-ODE energy-transfer modeling. Paper coming soon.",
    href: "https://chemistry.mit.edu/profile/sam-peng/",
    linkText: "Sam Peng",
  },
  {
    period: "Ph.D.",
    title: "University at Buffalo",
    detail:
      "Works with Jiayu Peng on AI for materials, physics-informed machine learning, graph neural networks, and catalyst and materials discovery.",
    href: "https://ubwp.buffalo.edu/jiayu-peng-lab/research/",
    linkText: "Jiayu Peng / Peng Lab",
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

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#about" aria-label="Chuanyu Liu home">
          Chuanyu Liu
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about">about</a>
          <a href="#research-path">research path</a>
          <a href="#publications">publications</a>
          <a href="#contact">contact</a>
        </nav>
      </header>

      <section className="hero" id="about" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">Computational materials | AI for science</p>
          <h1 id="page-title">Chuanyu Liu</h1>
          <p className="lead">
            I work at the intersection of computational materials, quantum
            chemistry, and physics-informed machine learning.
          </p>
          <p>
            I am a Ph.D. student in Computational Materials at the University at
            Buffalo, advised by{" "}
            <a href="https://ubwp.buffalo.edu/jiayu-peng-lab/research/">
              Dr. Jiayu Peng
            </a>
            . My current interests center on AI for materials discovery, graph
            neural networks, catalyst design, and machine learning models that
            preserve physical structure.
          </p>
          <ul className="contact-strip" aria-label="Profile links">
            {profileLinks.map((link) => (
              <li key={link.label}>
                <span>{link.label}</span>
                <a href={link.href}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>

        <aside className="portrait-panel" aria-label="Profile summary">
          <img
            src="https://scholar.googleusercontent.com/citations?view_op=view_photo&user=f2qAmGIAAAAJ&citpid=25"
            alt="Chuanyu Liu profile"
          />
          <div>
            <p className="panel-title">Research focus</p>
            <p>
              AI4Materials, ML interatomic potentials, graph neural networks,
              quantum chemistry, and upconversion nanoparticle modeling.
            </p>
          </div>
        </aside>
      </section>

      <section
        className="section research-section"
        id="research-path"
        aria-labelledby="research-path-title"
      >
        <div className="section-heading">
          <p className="eyebrow">Training and research</p>
          <h2 id="research-path-title">Research Path</h2>
        </div>
        <div className="timeline">
          {researchPath.map((item) => (
            <article className="timeline-item" key={item.period}>
              <div className="timeline-period">{item.period}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                {"href" in item ? (
                  <a className="text-link" href={item.href}>
                    {item.linkText}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section publication-section"
        id="publications"
        aria-labelledby="publications-title"
      >
        <div className="section-heading">
          <p className="eyebrow">Public papers</p>
          <h2 id="publications-title">Publications</h2>
          <p>
            Listed from latest to oldest, with titles linked to public Google
            Scholar entries.
          </p>
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
          <p className="eyebrow">Contact</p>
          <h2>Let us connect</h2>
          <p>
            I am open to conversations around computational materials,
            AI4Science, catalyst discovery, and physically grounded machine
            learning.
          </p>
        </div>
        <div className="contact-actions" aria-label="Contact links">
          {profileLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.text}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
