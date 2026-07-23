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
        <div className="placeholder-panel">
          <p>Posts will be added soon.</p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
