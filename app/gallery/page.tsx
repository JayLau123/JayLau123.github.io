import { GalleryYearCarousel } from "../components/gallery-year-carousel";
import { SiteFooter, SiteHeader } from "../components/site-shell";

const galleryYears = [
  {
    year: "2026",
    photos: [
      {
        src: "/2026/2026_1.JPG",
        alt: "Sunset in Chongqing",
        caption: "Sunset in Chongqing",
      },
      {
        src: "/2026/2026_2.JPG",
        alt: "One Thousand and One Nights in Doha",
        caption: "One Thousand and One Nights (Doha)",
      },
    ],
  },
  {
    year: "2025",
    photos: [
      {
        src: "/2025/2025_1.JPG",
        alt: "Spring 2025 in Chongqing",
        caption: "Spring 2025. Chongqing",
      },
      {
        src: "/2025/2025_2.JPG",
        alt: "Fall 2025 return to America",
        caption: "Fall 2025. Fight back to America",
      },
      {
        src: "/2025/2025_3.jpg",
        alt: "Winter 2025 Christmas holiday with Peng Lab 2.0",
        caption: "Winter 2025. Christmas holiday (Peng Lab 2.0)",
      },
    ],
  },
  {
    year: "2024",
    photos: [
      {
        src: "/2024/2024_1.JPG",
        alt: "Rainy day in Kendall Square in winter 2024",
        caption: "Winter 2024. Rainy day in Kendall Square",
      },
      {
        src: "/2024/2024_2.JPG",
        alt: "Northern lights in Rockport in spring 2024",
        caption: "Spring 2024. Chasing the northern lights for the first time (Rockport)",
      },
      {
        src: "/2024/2024_3.png",
        alt: "Peng Lab 1.0 by the Charles River in summer 2024",
        caption: "Summer 2024. Charles River (Peng Lab 1.0)",
      },
      {
        src: "/2024/2024_4.JPG",
        alt: "Crater Lake National Park in summer 2024",
        caption: "Summer 2024. Crater Lake National Park",
      },
      {
        src: "/2024/2024_5.JPG",
        alt: "Mount Hood in summer 2024",
        caption: "Summer 2024. Mount Fuji in CA (Mt Hood)",
      },
      {
        src: "/2024/2024_6.JPG",
        alt: "Windy City in summer 2024",
        caption: "Summer 2024. Windy City",
      },
    ],
  },
  {
    year: "2023",
    photos: [
      {
        src: "/2023/2023_1.JPG",
        alt: "University of Chicago campus in spring 2023",
        caption: "Spring 2023. UChicago campus",
      },
      {
        src: "/2023/2023_2.JPG",
        alt: "Indiana Dunes National Park in summer 2023",
        caption: "Summer 2023. Indiana Dunes National Park",
      },
      {
        src: "/2023/2023_3.JPG",
        alt: "Yosemite National Park in summer 2023",
        caption: "Summer 2023. Yosemite National Park",
      },
      {
        src: "/2023/2023_4.JPG",
        alt: "First hangout in San Francisco in summer 2023",
        caption: "Summer 2023. First hangout in SF",
      },
      {
        src: "/2023/2023_5.jpg",
        alt: "Revere Beach in Boston in summer 2023",
        caption: "Summer 2023. Revere Beach in Boston",
      },
      {
        src: "/2023/2023_6.JPG",
        alt: "Graffiti Mountain in Quincy in summer 2023",
        caption: "Summer 2023. Graffiti Mountain in Quincy",
      },
      {
        src: "/2023/2023_7.JPG",
        alt: "MIT campus in fall 2023",
        caption: "Fall 2023. MIT campus",
      },
      {
        src: "/2023/2023_8.png",
        alt: "Kayaking with Peng Lab 1.0 in fall 2023",
        caption: "Fall 2023. Kayaking (Peng Lab 1.0)",
      },
    ],
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
        <GalleryYearCarousel years={galleryYears} />
      </section>

      <SiteFooter />
    </main>
  );
}
