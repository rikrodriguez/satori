import Link from "next/link";
import { SatoriImageCard } from "@/components/product-visual";
import { blogPosts } from "@/lib/store";

export const metadata = {
  title: "Satori Skincare Blog",
  description:
    "Read Satori skincare education on anti-aging routines, consistency, clean beauty, and science-led skincare positioning.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <main className="blog-page">
      <div className="blog-hero">
        <span className="eyebrow">Satori Pro-Aging Skincare Blog</span>
        <h1>Skincare education for a ritual people can repeat.</h1>
        <p>
          Science-led, conversion-minded articles on daily routines,
          hydration, texture, clean beauty, and the Satori cream ritual.
        </p>
      </div>

      <nav className="blog-index" aria-label="Blog articles">
        {blogPosts.map((post, index) => (
          <Link href={`#${post.slug}`} key={post.title}>
            <SatoriImageCard
              asset={post.image}
              badge={post.category}
              priority={index === 0}
            />
            <span>
              {post.category} · {post.readTime}
            </span>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </Link>
        ))}
      </nav>

      <section className="blog-article-list" aria-label="Satori skincare articles">
        {blogPosts.map((post) => (
          <article className="blog-article" id={post.slug} key={post.title}>
            <div>
              <span className="eyebrow">
                {post.category} · {post.readTime}
              </span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </div>

            <SatoriImageCard
              asset={post.image}
              badge={post.category}
              className="blog-article-image"
              sizes="(max-width: 860px) 100vw, 420px"
            />

            <div className="blog-article-body">
              {post.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="blog-takeaways">
                <h3>Ritual notes</h3>
                <ul>
                  {post.takeaways.map((takeaway) => (
                    <li key={takeaway}>{takeaway}</li>
                  ))}
                </ul>
              </div>
              <Link className="button teal" href="/products/satori-cream">
                Shop Satori Cream
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
