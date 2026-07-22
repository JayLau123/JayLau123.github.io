import { SiteFooter, SiteHeader } from "../components/site-shell";

export default function BlogPage() {
  return (
    <main>
      <SiteHeader active="blog" />

      <section className="page-hero" aria-labelledby="blog-title">
        <p className="eyebrow">notes | research logs</p>
        <h1 id="blog-title">Blog</h1>
        <p>
          Short notes on computational chemistry, DFT, physically grounded
          machine learning, and AI for science will live here.
        </p>
      </section>

      <section className="section compact-section" aria-labelledby="posts-title">
        <div className="section-heading">
          <h2 id="posts-title">Posts</h2>
        </div>
        <div className="placeholder-panel">
          <p>Posts will be added soon.</p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
