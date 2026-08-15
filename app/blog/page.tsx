import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import { SmoothScrollLink } from "../components/smooth-scroll-link";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import firstPost from "./posts/four-paradigms.md?raw";
import secondPost from "./posts/new-observer.md?raw";

const markdownOptions = {
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeKatex],
};

const posts = [
  {
    slug: "from-observation-to-integration",
    title:
      "From Observation to Integration: The Four Paradigms of Scientific Discovery",
    date: "09/2025",
    dateTime: "2025-09",
    body: firstPost,
  },
  {
    slug: "beyond-the-shadow-of-language",
    title: "Beyond the Shadow of Language: AI as the New Observer of Nature",
    date: "05/2026",
    dateTime: "2026-05",
    body: secondPost,
  },
] as const;

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

      <section className="section compact-section" aria-label="Blog posts">
        <nav className="blog-content" id="blog-content" aria-label="Blog contents">
          <ol className="blog-content-list">
            {posts.map((post, index) => (
              <li key={post.slug}>
                <SmoothScrollLink href={`#${post.slug}`}>
                  <span>{index + 1}. {post.title}</span>
                  <span className="blog-content-arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </SmoothScrollLink>
              </li>
            ))}
          </ol>
        </nav>

        <div className="blog-list">
          {posts.map((post, index) => (
            <article className="blog-post" id={post.slug} key={post.slug}>
              <ReactMarkdown
                {...markdownOptions}
                components={{
                  h1: ({ children }) => (
                    <>
                      <h1>
                        {index + 1}. {children}
                      </h1>
                      <p className="blog-post-date">
                        <time dateTime={post.dateTime}>{post.date}</time>
                      </p>
                    </>
                  ),
                }}
              >
                {post.body}
              </ReactMarkdown>
              <footer className="blog-post-footer">
                <nav
                  className="blog-post-navigation"
                  aria-label={`Post ${index + 1} navigation`}
                >
                  {index > 0 ? (
                    <SmoothScrollLink href={`#${posts[index - 1].slug}`}>
                      Previous
                    </SmoothScrollLink>
                  ) : (
                    <span aria-hidden="true" />
                  )}
                  <span className="blog-page-number">
                    {index + 1} / {posts.length}
                  </span>
                  <span aria-hidden="true" />
                </nav>
                <SmoothScrollLink
                  className="blog-back-to-content"
                  href="#blog-content"
                >
                  Back to content
                </SmoothScrollLink>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
