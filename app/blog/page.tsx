import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
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
    title: "From Observation to Integration: The Four Paradigms of Scientific Discovery",
    body: firstPost,
  },
  {
    slug: "beyond-the-shadow-of-language",
    title: "Beyond the Shadow of Language: AI as the New Observer of Nature",
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

      <section className="section compact-section" aria-labelledby="posts-title">
        <div className="section-heading">
          <h2 id="posts-title">Content</h2>
        </div>
        <nav className="blog-content" id="blog-content" aria-label="Blog contents">
          <ol className="blog-content-list">
            {posts.map((post, index) => (
              <li key={post.slug}>
                <a href={`#${post.slug}`}>
                  <span className="blog-content-number">{index + 1}.</span>
                  <span>{post.title}</span>
                  <span className="blog-content-arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="blog-list">
          {posts.map((post, index) => (
            <article className="blog-post" id={post.slug} key={post.slug}>
              <ReactMarkdown {...markdownOptions}>{post.body}</ReactMarkdown>
              <footer className="blog-post-footer">
                <nav
                  className="blog-post-navigation"
                  aria-label={`Post ${index + 1} navigation`}
                >
                  {index > 0 ? (
                    <a href={`#${posts[index - 1].slug}`}>Previous</a>
                  ) : (
                    <span aria-hidden="true" />
                  )}
                  <span className="blog-page-number">
                    {index + 1} / {posts.length}
                  </span>
                  {index < posts.length - 1 ? (
                    <a href={`#${posts[index + 1].slug}`}>Next</a>
                  ) : (
                    <span aria-hidden="true" />
                  )}
                </nav>
                <a className="blog-back-to-content" href="#blog-content">
                  Back to content
                </a>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
