"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// ── Types ──────────────────────────────────────────────────────────────────
interface Project {
  index: string;
  tag: string;
  live: boolean;
  name: string;
  desc: string;
  highlights: string[];
  pills: string[];
  media?: { type: "image" | "video"; src: string; poster?: string };
}

interface Experience {
  period: string;
  company: string;
  role: string;
  note: string;
  tag: string;
}

// ── Data ───────────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    index: "01",
    tag: "Live · Enterprise ERP",
    live: true,
    name: "Multi-Agent ERP Intelligence System",
    desc: "A production multi-agent system built on LangGraph ReAct that gives enterprise teams natural language access to their ERP data — receivables, payables, sales tax, inventory, sales orders, and more. Supports text and Urdu voice input via Azure Whisper, auto-generates PDF reports matching ERP formats, drafts emails from query results, and surfaces live Power BI dashboards with agent-applied filters.",
    highlights: [
      "Architected six specialised agents with isolated scopes and a unified LangGraph orchestrator",
      "Dynamic LLM-generated SQL with fuzzy search (pg_trgm) for flexible natural language querying",
      "Voice input pipeline via Azure Whisper — always outputs English regardless of Urdu audio input",
      "PDF generation via raw SQL rows, bypassing LLM context limits for large financial reports",
      "Power BI dashboard embedding with agent-applied URL filters for dynamic, query-driven analytics",
      "Deployed as NSSM services on Windows Server; UNC path resolution for ERP network share access",
    ],
    pills: [
      "LangGraph", "FastAPI", "Azure OpenAI GPT-4o", "Azure Whisper",
      "PostgreSQL", "Next.js", "Python", "Power BI", "REST APIs",
    ],
    media: { type: "video", src: "/media/printech-agent.mp4", poster: "/media/printech-thumb.png" },
  },
  {
    index: "02",
    tag: "In Development · AI SaaS",
    live: true,
    name: "AI Customer Engagement & Service Automation Platform",
    desc: "An AI-powered customer service platform for professional service businesses in the UK — handling inbound enquiries, scheduling, and end-to-end customer communication autonomously, 24/7. Built as a full product from scratch: market research, lead generation pipeline, integration architecture, and onboarding flow designed end-to-end.",
    highlights: [
      "Conversational AI agent with natural dialogue flow for enquiry handling, booking, and escalation",
      "CRM integration architecture with webhook-driven workflow automation across business systems",
      "Omnichannel communication layer — voice, messaging, and follow-up handled by a single agent",
      "Lead enrichment pipeline using public directories and location data for targeted outreach",
      "Designed for multi-client scalability across UK professional service verticals",
    ],
    pills: ["Voice AI", "Python", "Webhooks", "CRM Integration", "REST APIs", "n8n", "Automation"],
    media: { type: "video", src: "/media/Voice_Demo.mp4", poster: "/media/Voice_AI-thumb.png" },
  },
  {
    index: "03",
    tag: "Shipped · Fintech",
    live: false,
    name: "Conversational Banking AI Agent",
    desc: "A production-grade conversational AI agent for social banking — enabling customers to perform transactions, onboard digitally, and navigate financial products through natural language. Showcased at an international fintech summit as a demonstration of the future of AI-powered banking.",
    highlights: [
      "Multi-agent architecture with LangChain orchestration and n8n workflow automation",
      "Integrated with MongoDB for real-time transactional data and customer state management",
      "End-to-end pipeline from NLU to secure action execution — deployed on Railway and Vercel",
      "Presented at the Pulse Africa Summit as a flagship AI banking demonstration",
    ],
    pills: ["LangChain", "n8n", "OpenAI API", "MongoDB", "Next.js", "Webhooks", "Railway", "Vercel"],
    media: { type: "video", src: "/media/banking-agent.mp4", poster: "/media/banking-agent-thumb.png" },
  },
  {
    index: "04",
    tag: "Shipped · Education / Enterprise",
    live: false,
    name: "Institutional Intelligence AI Agent",
    desc: "A natural language AI agent enabling non-technical senior leadership to query large-scale institutional datasets — covering courses, programs, instructors, and student outcomes — without writing a single line of SQL. Achieved 99% metadata-aware retrieval accuracy across structured and unstructured data sources.",
    highlights: [
      "Hybrid RAG architecture: vector database for semantic search + SQL for structured institutional records",
      "NLU-driven entity extraction, dynamic query classification, multi-turn conversational memory",
      "On-demand visual analytics — bar charts, trend comparisons, program dashboards generated from queries",
      "FastAPI backend + Next.js frontend + Dockerised deployment for production scalability",
      "Scaled to multi-year datasets: 1,200+ courses, 230+ instructors, 2,200+ students",
    ],
    pills: ["OpenAI API", "LangChain", "RAG", "Vector DB", "FastAPI", "Next.js", "Docker", "PostgreSQL"],
    media: { type: "video", src: "/media/institutional-agent.mp4", poster: "/media/IR-agent-thumb.png" },
  },
];

const experiences: Experience[] = [
  {
    period: "Feb 2026 — Present",
    company: "Printech Packages (Pvt) Ltd",
    role: "AI Engineer",
    note: "Building and maintaining a production multi-agent ERP intelligence system — the company's primary AI infrastructure. Sole AI Engineer responsible for architecture, deployment, and iteration.",
    tag: "Full-time · Karachi",
  },
  {
    period: "Jul 2025 — Aug 2025",
    company: "Avanza Solutions",
    role: "AI Engineer Intern",
    note: "Built the Conversational Social Banking AI Agent (primary project) and an HR AI Agent. The banking agent was selected to be showcased at the Avanza Pulse Africa Edition Summit.",
    tag: "Internship · Karachi",
  },
  {
    period: "May 2025 — Aug 2025",
    company: "Habib University — OIR",
    role: "AI/LLM Systems Intern",
    note: "Built the Institutional Intelligence AI Agent from scratch — RAG architecture, FastAPI backend, Next.js frontend, Docker deployment. 99% retrieval accuracy across multi-year institutional datasets.",
    tag: "Internship · Karachi",
  },
];

const skillGroups = [
  {
    name: "AI / LLM",
    items: ["OpenAI API", "LangGraph", "LangChain", "Azure OpenAI", "Whisper", "RAG", "Prompt Engineering", "Vector Search"],
  },
  {
    name: "Voice & Automation",
    items: ["Voice AI", "n8n", "Webhooks", "REST APIs", "CRM Integration", "Workflow Automation"],
  },
  {
    name: "Backend & Infra",
    items: ["Python", "FastAPI", "PostgreSQL", "MongoDB", "Docker", "Redis", "NSSM", "Git"],
  },
  {
    name: "Frontend & BI",
    items: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Power BI"],
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "var(--cyan)",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        marginBottom: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {children}
      <span style={{ display: "block", height: "1px", width: "60px", background: "var(--cyan)", opacity: 0.4 }} />
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

function MediaThumbnail({
  media,
  fullWidth = false,
}: {
  media: NonNullable<Project["media"]>;
  fullWidth?: boolean;
}) {
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <div
        onClick={() => setLightbox(true)}
        style={{
          width: fullWidth ? "100%" : "200px",
          flexShrink: 0,
          borderRadius: "6px",
          overflow: "hidden",
          border: "1px solid var(--border)",
          cursor: "pointer",
          position: "relative",
          aspectRatio: "16/10",
          background: "var(--bg3)",
        }}
      >
        {media.type === "image" ? (
          <img
            src={media.src}
            alt="Project preview"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <>
            <video
              src={media.src}
              poster={media.poster}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              muted
              playsInline
            />
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(0,0,0,0.35)",
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "var(--cyan)", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--bg)" stroke="none">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 999,
            background: "rgba(0,0,0,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "2rem",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "900px", width: "100%", borderRadius: "8px", overflow: "hidden" }}
          >
            {media.type === "image" ? (
              <img src={media.src} alt="Project preview" style={{ width: "100%", display: "block" }} />
            ) : (
              <video src={media.src} poster={media.poster} controls autoPlay style={{ width: "100%", display: "block" }} />
            )}
          </div>
          <button
            onClick={() => setLightbox(false)}
            style={{
              position: "absolute", top: "1.5rem", right: "1.5rem",
              background: "none", border: "1px solid var(--border)",
              color: "var(--text2)", cursor: "pointer", padding: "6px 14px",
              borderRadius: "4px", fontFamily: "var(--font-mono)", fontSize: "12px",
            }}
          >
            close ✕
          </button>
        </div>
      )}
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "var(--bg3)" : "var(--bg2)",
        border: `1px solid ${hovered ? "var(--border-hover)" : "var(--border)"}`,
        borderRadius: "6px",
        padding: "2rem 2.25rem",
        position: "relative",
        overflow: "hidden",
        marginBottom: "1rem",
        transition: "border-color 0.25s, background 0.25s",
      }}
    >
      {/* left accent bar */}
      <span style={{
        position: "absolute", top: 0, left: 0,
        width: "3px", height: "100%",
        background: "var(--cyan)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.25s",
      }} />

      {/* top row: content + thumbnail (thumbnail only on desktop) */}
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* tag */}
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--cyan)",
            letterSpacing: "0.1em", textTransform: "uppercase",
            marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "8px",
          }}>
            <span className={project.live ? "pulse-dot" : ""} style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "var(--cyan)", display: "inline-block", flexShrink: 0,
            }} />
            {project.tag}
          </div>

          {/* name + index */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.6rem" }}>
            <h3 style={{
              fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 600,
              color: "var(--text)", letterSpacing: "-0.025em", lineHeight: 1.2,
            }}>
              {project.name}
            </h3>
            <span style={{
              fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700,
              color: "rgba(255,255,255,0.04)", letterSpacing: "-0.06em", flexShrink: 0,
            }}>
              {project.index}
            </span>
          </div>

          {/* desc */}
          <p style={{ fontSize: "0.92rem", color: "var(--text2)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
            {project.desc}
          </p>
        </div>

        {/* desktop thumbnail — hidden on mobile */}
        {project.media && !isMobile && (
          <div style={{ flexShrink: 0 }}>
            <MediaThumbnail media={project.media} />
          </div>
        )}
      </div>

      {/* mobile thumbnail — full width, below description */}
      {project.media && isMobile && (
        <div style={{ marginBottom: "1.25rem" }}>
          <MediaThumbnail media={project.media} fullWidth />
        </div>
      )}

      {/* highlights */}
      <ul style={{ listStyle: "none", margin: "0 0 1.25rem", padding: 0 }}>
        {project.highlights.map((h, i) => (
          <li key={i} style={{
            fontSize: "0.87rem", color: "var(--text2)",
            padding: "5px 0", display: "flex", alignItems: "flex-start", gap: "10px",
            borderBottom: i < project.highlights.length - 1 ? "1px solid var(--border)" : "none",
          }}>
            <span style={{ color: "var(--cyan)", fontSize: "12px", flexShrink: 0, marginTop: "2px" }}>→</span>
            {h}
          </li>
        ))}
      </ul>

      {/* pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
        {project.pills.map((p) => (
          <span key={p} style={{
            fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text3)",
            border: "1px solid var(--border)", padding: "3px 10px",
            borderRadius: "2px", letterSpacing: "0.04em",
          }}>
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .hero-layout { flex-direction: column-reverse !important; }
          .hero-photo { width: 200px !important; height: 200px !important; margin: 0 auto; }
          .exp-row { grid-template-columns: 1fr !important; gap: 0.5rem !important; }
          .research-grid { grid-template-columns: 1fr !important; }
          .nav-links-wrap { display: none !important; }
          .media-thumb { display: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(1.5rem, 5vw, 4rem)", height: "64px",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background: scrolled ? "rgba(10,14,20,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.3s, border-color 0.3s",
      }}>
        <div style={{
          fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 600,
          color: "var(--text)", letterSpacing: "-0.02em",
        }}>
          Yusra<span style={{ color: "var(--cyan)" }}>.</span>
        </div>

        <ul className="nav-links-wrap" style={{ display: "flex", gap: "2rem", listStyle: "none" }}>
          {["#projects", "#experience", "#research", "#contact"].map((href) => (
            <li key={href}>
              <a href={href} style={{
                fontSize: "13px", color: "var(--text2)", textDecoration: "none",
                letterSpacing: "0.02em", transition: "color 0.2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text2)")}
              >
                {href.replace("#", "")}
              </a>
            </li>
          ))}
        </ul>

        <a href="mailto:yusrafaisal68@gmail.com" style={{
          fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 500,
          color: "var(--cyan)", textDecoration: "none",
          border: "1px solid rgba(0,201,255,0.35)", padding: "7px 18px", borderRadius: "4px",
          transition: "background 0.2s, border-color 0.2s",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cyan-dim)"; e.currentTarget.style.borderColor = "var(--cyan)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,201,255,0.35)"; }}
        >
          Get in touch
        </a>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "64px clamp(1.5rem, 5vw, 4rem) 4rem", position: "relative", overflow: "hidden",
      }}>
        {/* grid bg */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(0,201,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,201,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
          pointerEvents: "none",
        }} />

        {/* split layout */}
        <div className="hero-layout" style={{
          display: "flex", alignItems: "center",
          gap: "clamp(2rem, 5vw, 5rem)",
          position: "relative",
        }}>
          {/* LEFT: text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--cyan)",
              letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem",
            }}>
              <span style={{ display: "block", width: "24px", height: "1px", background: "var(--cyan)" }} />
              AI Engineer · Production Systems
            </div>

            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
              fontWeight: 700, lineHeight: 1.08,
              letterSpacing: "-0.035em", color: "var(--text)",
              marginBottom: "1.75rem",
            }}>
              I build AI systems
              <br />
              that{" "}
              <span style={{ color: "var(--cyan)" }}>ship to production</span>
              <br />
              and stay there.
            </h1>

            <p style={{
              fontSize: "1.05rem", fontWeight: 300, color: "var(--text2)",
              maxWidth: "500px", lineHeight: 1.8, marginBottom: "2.5rem",
            }}>
              Multi-agent architectures, voice AI, LLM-powered automation, and enterprise integrations -
              designed end-to-end, deployed on real infrastructure, used by real teams.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "3rem" }}>
              {["LangGraph / LangChain", "FastAPI · Python", "Voice AI · Whisper", "OpenAI API", "n8n · REST APIs", "RAG Pipelines", "PostgreSQL · MongoDB", "Power BI"].map((c) => (
                <span key={c} style={{
                  fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text2)",
                  border: "1px solid var(--border)", padding: "5px 12px",
                  borderRadius: "3px", letterSpacing: "0.05em",
                }}>
                  {c}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#projects" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 500,
                color: "var(--bg)", background: "var(--cyan)",
                padding: "12px 28px", borderRadius: "4px", textDecoration: "none",
                letterSpacing: "-0.01em", transition: "opacity 0.2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                View production work
              </a>
              <a href="#contact" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 500,
                color: "var(--text)", border: "1px solid var(--border)",
                padding: "12px 28px", borderRadius: "4px", textDecoration: "none",
                letterSpacing: "-0.01em", transition: "border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.color = "var(--cyan)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; }}
              >
                Let&apos;s talk
              </a>
            </div>
          </div>

          {/* RIGHT: photo */}
          <div style={{ flexShrink: 0, display: "flex", justifyContent: "center" }}>
            <div
              className="hero-photo"
              style={{
                width: "clamp(220px, 28vw, 380px)",
                aspectRatio: "1 / 1",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid rgba(0,201,255,0.25)",
                boxShadow: "0 0 60px rgba(0,201,255,0.08)",
                position: "relative",
                background: "var(--bg3)",
              }}
            >
              {/*
                ─────────────────────────────────────────────────────
                DROP YOUR PHOTO HERE:
                1. Put your image in /public/photo.jpg (or .png / .webp)
                2. Uncomment the <Image> block below and delete the placeholder div
                ─────────────────────────────────────────────────────
              */}

              {/* PLACEHOLDER — delete this once you add your photo */}
              <div style={{
                width: "100%", height: "100%",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: "8px",
              }}>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "11px",
                  color: "var(--text3)", letterSpacing: "0.08em", textAlign: "center",
                  padding: "0 1rem",
                }}>
                  Add /public/photo.jpg
                </div>
              </div>

              {/* YOUR PHOTO — uncomment after adding file to /public/ */}
              <Image
                src="/photo1.jpg"
                alt="Yusra Faisal"
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
                priority
              />
             
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div style={{
        borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
        background: "var(--bg2)", padding: "2.5rem clamp(1.5rem, 5vw, 4rem)",
        display: "flex", gap: "3rem", flexWrap: "wrap",
      }}>
        {[
          { num: "5+", label: "Production AI systems shipped" },
          { num: "3", label: "Industries deployed in" },
          { num: "99%", label: "Retrieval accuracy on enterprise data" },
          { num: "2", label: "Published research papers (CLEF 2026)" },
        ].map((s) => (
          <div key={s.label} style={{ flex: 1, minWidth: "140px" }}>
            <div style={{
              fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700,
              color: "var(--text)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "6px",
            }}>
              {s.num.replace(/[+%]/, "")}<span style={{ color: "var(--cyan)" }}>{s.num.match(/[+%]/)?.[0] ?? ""}</span>
            </div>
            <div style={{ fontSize: "13px", color: "var(--text3)", letterSpacing: "0.02em" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "6rem clamp(1.5rem, 5vw, 4rem)" }}>
        <SectionLabel>Selected Work</SectionLabel>
        <h2 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
          fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)",
          marginBottom: "1rem", lineHeight: 1.15,
        }}>
          Production systems,<br />not demos.
        </h2>
        <p style={{
          fontSize: "1rem", color: "var(--text2)", maxWidth: "560px",
          lineHeight: 1.8, marginBottom: "3.5rem",
        }}>
          Every project below is live infrastructure - built, deployed, and actively used by real teams. No toy apps.
        </p>
        {projects.map((p) => <ProjectCard key={p.index} project={p} />)}
      </section>

      <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: 0 }} />

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "6rem clamp(1.5rem, 5vw, 4rem)" }}>
        <SectionLabel>Experience</SectionLabel>
        <h2 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
          fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)",
          marginBottom: "3rem", lineHeight: 1.15,
        }}>
          Where I&apos;ve shipped.
        </h2>

        <div>
          {experiences.map((exp, i) => (
            <div key={i} className="exp-row" style={{
              display: "grid", gridTemplateColumns: "200px 1fr",
              gap: "2rem", padding: "2.5rem 0",
              borderTop: "1px solid var(--border)",
              borderBottom: i === experiences.length - 1 ? "1px solid var(--border)" : "none",
              alignItems: "start",
            }}>
              <div>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "12px",
                  color: "var(--text3)", letterSpacing: "0.03em", lineHeight: 1.6,
                }}>
                  {exp.period}
                </div>
                <div style={{ fontSize: "11px", color: "var(--cyan)", marginTop: "4px" }}>{exp.company}</div>
              </div>
              <div>
                <div style={{
                  fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600,
                  color: "var(--text)", letterSpacing: "-0.02em", marginBottom: "0.4rem",
                }}>
                  {exp.role}
                </div>
                <p style={{ fontSize: "0.88rem", color: "var(--text2)", lineHeight: 1.75 }}>{exp.note}</p>
                <span style={{
                  display: "inline-flex", fontFamily: "var(--font-mono)", fontSize: "10px",
                  color: "var(--cyan)", border: "1px solid rgba(0,201,255,0.2)",
                  padding: "2px 9px", borderRadius: "2px", letterSpacing: "0.06em",
                  marginTop: "8px", textTransform: "uppercase",
                }}>
                  {exp.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: 0 }} />

      {/* RESEARCH */}
      <section id="research" style={{ padding: "6rem clamp(1.5rem, 5vw, 4rem)" }}>
        <SectionLabel>Research</SectionLabel>
        <h2 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
          fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)",
          marginBottom: "1rem", lineHeight: 1.15,
        }}>
          Published work.
        </h2>
        <p style={{ fontSize: "1rem", color: "var(--text2)", maxWidth: "560px", lineHeight: 1.8, marginBottom: "3.5rem" }}>
          Co-authored papers at CLEF 2026 — applying NLP and retrieval systems to clinical mental health datasets.
        </p>

        <div className="research-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          {[
            {
              venue: "CLEF 2026 · eRisk Task",
              title: "Depression Symptom Detection from User-Generated Text",
              desc: "Applied clinical NLP pipeline to detect early risk signals for depression from longitudinal social media data. eRisk shared task evaluation.",
            },
            {
              venue: "CLEF 2026 · eRisk Task",
              title: "ADHD Symptom Ranking via Medical Sentence Retrieval",
              desc: "Retrieval-augmented pipeline using PubMedBERT for ranking ADHD-related symptoms from clinical text. Included query expansion, first-person filtering, and LLM reranking.",
            },
          ].map((r) => (
            <div key={r.title} style={{
              background: "var(--bg2)", border: "1px solid var(--border)",
              borderRadius: "6px", padding: "1.5rem 1.75rem", transition: "border-color 0.25s",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--cyan)",
                letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.6rem",
              }}>
                {r.venue}
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 500,
                color: "var(--text)", lineHeight: 1.4, letterSpacing: "-0.015em", marginBottom: "0.6rem",
              }}>
                {r.title}
              </h3>
              <p style={{ fontSize: "0.84rem", color: "var(--text2)", lineHeight: 1.7 }}>{r.desc}</p>
            </div>
          ))}
        </div>

        <p style={{ marginTop: "1.25rem", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--cyan)" }}>
          Education: B.S. Computer Science — Habib University, Karachi (2023–2027) · CGPA 3.78/4.00
        </p>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: 0 }} />

      {/* SKILLS */}
      <section style={{ padding: "6rem clamp(1.5rem, 5vw, 4rem)" }}>
        <SectionLabel>Technical Stack</SectionLabel>
        <h2 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
          fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)",
          marginBottom: "3rem", lineHeight: 1.15,
        }}>
          What I build with.
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          {skillGroups.map((g) => (
            <div key={g.name} style={{
              background: "var(--bg2)", border: "1px solid var(--border)",
              borderRadius: "6px", padding: "1.25rem 1.5rem",
            }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--cyan)",
                letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.85rem",
              }}>
                {g.name}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {g.items.map((item) => (
                  <span key={item} style={{
                    fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text2)",
                    background: "var(--bg3)", border: "1px solid var(--border)",
                    padding: "4px 10px", borderRadius: "3px",
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <div id="contact" style={{
        background: "var(--bg2)", borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)", padding: "6rem clamp(1.5rem, 5vw, 4rem)",
      }}>
        <div style={{ maxWidth: "700px" }}>
          <SectionLabel>Contact</SectionLabel>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700, color: "var(--text)", letterSpacing: "-0.035em",
            lineHeight: 1.15, marginBottom: "1rem",
          }}>
            Let&apos;s build <span style={{ color: "var(--cyan)" }}>something real.</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text2)", lineHeight: 1.8 }}>
            I&apos;m open to senior AI engineering contracts, technical partnerships, and consulting on production AI systems. No agency middlemen - direct only.
          </p>

          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginTop: "2.5rem" }}>
            {[
              {
                href: "mailto:yusrafaisal68@gmail.com",
                label: "yusrafaisal68@gmail.com",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>,
              },
              {
                href: "https://www.linkedin.com/in/yusra-faisal",
                label: "linkedin.com/in/yusra-faisal",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="4" /><path d="M7 10v7M7 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></svg>,
              },
              {
                href: "https://github.com/yusrafaisal",
                label: "github.com/yusrafaisal",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>,
              },
            ].map((link) => (
              <a key={link.href} href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  fontSize: "14px", color: "var(--text2)", textDecoration: "none",
                  borderBottom: "1px solid var(--border)", paddingBottom: "4px",
                  fontFamily: "var(--font-mono)", transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--cyan)"; e.currentTarget.style.borderColor = "var(--cyan)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.borderColor = "var(--border)"; }}
              >
                {link.icon}{link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{
        padding: "2rem clamp(1.5rem, 5vw, 4rem)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "1rem", borderTop: "1px solid var(--border)",
      }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text3)", letterSpacing: "0.04em" }}>
          © 2026 Yusra Faisal. All rights reserved.
        </div>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text3)",
          letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: "8px",
        }}>
          <span className="pulse-dot" style={{ display: "block", width: "6px", height: "6px", borderRadius: "50%", background: "var(--cyan)" }} />
          Available for AI Engineering contracts
        </div>
      </footer>
    </>
  );
}