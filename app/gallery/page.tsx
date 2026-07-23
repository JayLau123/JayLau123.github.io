import { GalleryYearCarousel } from "../components/gallery-year-carousel";
import { galleryYears } from "../gallery-data";
import { SiteFooter, SiteHeader } from "../components/site-shell";

export default function GalleryPage() {
  return (
    <main>
      <SiteHeader active="gallery" />

      <section className="page-hero gallery-hero" aria-labelledby="gallery-title">
        <h1 id="gallery-title">Gallery</h1>
        <p>
          Outside of the research, I find immense inspiration in solo travel and
          snapping photos along the way. I value the texture of every city I have
          lived in and the brilliant individuals I have met, and these photos
          are my way of holding on to those moments.
        </p>
      </section>

      <section className="section compact-section" aria-labelledby="photos-title">
        <div className="section-heading">
          <h2 id="photos-title">Photos</h2>
        </div>
        <GalleryYearCarousel years={galleryYears} />
      </section>

      <SiteFooter />
    </main>
  );
}
