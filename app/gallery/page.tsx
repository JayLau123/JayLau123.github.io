import { SiteFooter, SiteHeader } from "../components/site-shell";

export default function GalleryPage() {
  return (
    <main>
      <SiteHeader active="gallery" />

      <section className="page-hero gallery-hero" aria-labelledby="gallery-title">
        <p className="eyebrow">travel | people | mentorship</p>
        <h1 id="gallery-title">Gallery</h1>
        <p>
          Outside of my research, I find immense inspiration in solo travel and
          snapping photos along the way. I value the texture of every city I have
          lived in and the brilliant individuals I have met. This gallery is
          also a special tribute to the mentors who have profoundly shaped my
          scientific journey. Working with such insightful minds has been one of
          the best parts of my research career so far, and these photographs
          capture the spirit of our time together.
        </p>
      </section>

      <section className="section compact-section" aria-labelledby="photos-title">
        <div className="section-heading">
          <h2 id="photos-title">Photos</h2>
        </div>
        <div className="gallery-placeholder-grid" aria-label="Photo placeholders">
          <div />
          <div />
          <div />
        </div>
        <p className="gallery-note">Photos will be added soon.</p>
      </section>

      <SiteFooter />
    </main>
  );
}
