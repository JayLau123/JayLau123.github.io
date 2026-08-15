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
        <div className="blog-list">
          <article className="blog-post">
            <ReactMarkdown {...markdownOptions}>{firstPost}</ReactMarkdown>
          </article>
          <article className="blog-post">
            <ReactMarkdown {...markdownOptions}>{secondPost}</ReactMarkdown>
          </article>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
