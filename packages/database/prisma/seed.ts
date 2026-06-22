import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const MOCK_POSTS = [
  {
    title: "Optimizing Next.js API Latency under 50ms at Global Edge Nodes",
    excerpt: "A deep dive into optimizing Edge Middleware, minimizing cold starts, choosing the right databases, and structuring serverless endpoints for speed.",
    content: "Next.js APIs can be incredibly fast when configured at the Edge. In this post, we explore cold start mitigation, Edge middleware caching strategies, and connecting to global database replicas using HTTP connections instead of persistent TCP pools.",
    category: "Engineering",
    readTime: "6 min read",
    tags: ["Next.js", "Edge Computing", "Performance"],
    featured: true,
    thumbnailUrl: "/edge-latency-thumbnail.jpg",
    projectSummary: "Edge latency optimization for global real-time applications.",
    projectApproach: "Configured regional database read-replicas, leveraged Next.js edge-runtime, and implemented aggressive stale-while-revalidate cache control headers."
  },
  {
    title: "Exploring Tailwind CSS v4's New Engine and Declarative Layouts",
    excerpt: "An exploration of Tailwind v4's CSS-first configuration, lightning-fast compile speeds, native CSS variable theme mapping, and clean utility patterns.",
    content: "Tailwind CSS v4 introduces a revamped Rust-powered engine that compiles styles up to 10x faster. It fully embraces modern CSS features like cascade layers, native CSS custom properties, and declarative configurations directly inside your styles file rather than tailwind.config.js.",
    category: "Design",
    readTime: "4 min read",
    tags: ["TailwindCSS", "CSS", "Frontend"],
    featured: false,
    thumbnailUrl: "/tailwind-v4-thumbnail.jpg",
    projectSummary: "UI layout optimization using modern Tailwind compilation specs.",
    projectApproach: "Upgraded existing CSS architectures to tailwind v4, eliminated javascript config bloat, and mapped colors using HSL css variables."
  },
  {
    title: "Designing Resilient API Architectures with TypeScript and OpenAPI",
    excerpt: "Best practices for writing type-safe API routers, automated documentation generation, request schema validation, and decoupling infrastructure layers.",
    content: "Building production-grade APIs requires strict schema validation and clear typing contracts. By leveraging TypeScript interfaces and OpenAPI specifications, developer teams can guarantee type safety between the frontend requests and backend route inputs seamlessly.",
    category: "Engineering",
    readTime: "8 min read",
    tags: ["TypeScript", "API Design", "Backend"],
    featured: false,
    thumbnailUrl: "/typescript-api-thumbnail.jpg",
    projectSummary: "Strictly typed REST/GraphQL backend frameworks.",
    projectApproach: "Defined Zod validation schemas for requests, auto-generated OpenAPI definitions, and implemented strict controller route handler typings."
  },
  {
    title: "A Practical Guide to CI/CD Pipelines for Monorepos using Turborepo",
    excerpt: "How to structure remote caching, parallelize verification builds, optimize docker layers, and configure GitHub actions to run build checks in under 2 minutes.",
    content: "Monorepos improve team collaboration but can slow down build speeds if checks aren't run concurrently. This guide covers setting up remote cache servers using Turborepo, optimizing docker multi-stage layers, and using conditional execution to skip redundant linting.",
    category: "DevOps",
    readTime: "5 min read",
    tags: ["Turborepo", "Docker", "CI/CD"],
    featured: false,
    thumbnailUrl: "/turborepo-thumbnail.jpg",
    projectSummary: "Monorepo automated pipeline build optimizations.",
    projectApproach: "Set up remote caching via Vercel Turbo, structured Dockerfiles with builder stages, and configured parallel GitHub actions workflows."
  }
];

async function main() {
  console.log("Seeding database via shared seed.ts...");
  await prisma.post.deleteMany(); // Clear existing posts
  for (const post of MOCK_POSTS) {
    const createdPost = await prisma.post.create({
      data: {
        ...post,
        comments: {
          create: [
            {
              authorName: "John Doe",
              content: "This is an extremely informative post, thanks for sharing!"
            }
          ]
        },
        likes: {
          create: [
            { ipAddress: "127.0.0.1" }
          ]
        }
      }
    });
    console.log(`Created post with ID: ${createdPost.id}`);
  }
  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
