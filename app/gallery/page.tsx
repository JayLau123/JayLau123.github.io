import { SiteFooter, SiteHeader } from "../components/site-shell";

const photos = [
  {
    src: "/gallery-2025.jpg",
    alt: "Group dinner during the 2025 Christmas holiday",
    caption: "2025: Winter 2025. Christmas holiday",
  },
  {
    src: "/gallery-2024.jpg",
    alt: "Research group photo by the Charles River in summer 2024",
    caption: "2024: Summer 2024. Charles river",
  },
  {
    src: "/gallery-2023.jpg",
    alt: "Kayaking on the Charles River in fall 2023",
    caption: "2023: Fall 2023. Kayaking",
  },
] as const;

export default function GalleryPage() {
  return (
    <main>
      <SiteHeader active="gallery" />

      <section className="page-hero gallery-hero" aria-labelledby="gallery-title">
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
        <div className="gallery-photo-list">
          {photos.map((photo) => (
            <figure className="gallery-photo" key={photo.src}>
              <img src={photo.src} alt={photo.alt} />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
