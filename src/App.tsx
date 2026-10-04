
import { useState } from "react";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import "./App.css";

const navItems = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "The Lab", id: "lab" },
  { label: "Contact", id: "contact" },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="navbar">
        <a href="#home" className="brand" onClick={closeMenu}>
          ADITHYA<span>.exe</span>
        </a>

        <div className="nav-right">
          <span className="availability">
            <span className="status-dot" />
            AVAILABLE FOR OPPORTUNITIES
          </span>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
            <span>{menuOpen ? "CLOSE" : "MENU"}</span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="menu-overlay">
          <div className="menu-heading">NAVIGATION / 01—05</div>
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={closeMenu}
              className="menu-link"
            >
              <span className="menu-number">0{index + 1}</span>
              <span>{item.label}</span>
              <ArrowUpRight className="menu-arrow" size={24} />
            </a>
          ))}
        </nav>
      )}

      <section className="hero" id="home">
        <div className="hero-topline">
          <span>PORTFOLIO / 2026</span>
          <span>AI · ML · GENAI · AGENTIC SYSTEMS · AUTOMATION</span>
        </div>

        <div className="hero-content">
          <div className="hero-kicker">
            <span className="red-line" />
            AIML ENGINEER
          </div>

          <h1>
            ENGINEERING
            <br />
            THE <span className="outline-text">UNSEEN.</span>
          </h1>

          <div className="hero-bottom">
            <p className="hero-description">
              I'm Adithya Sapalya — an AIML engineer exploring intelligent
              systems, generative AI, and autonomous agents to build
              solutions for real-world problems.
            </p>

            <a href="#projects" className="explore-button">
              <span>EXPLORE MY WORK</span>
              <span className="button-icon">
                <ArrowUpRight size={20} />
              </span>
            </a>
          </div>
        </div>

        
        <div className="hero-visual">
          <div className="orbit orbit-outer">
            <span className="orbit-node node-red" />
          </div>

          <div className="orbit orbit-middle">
            <span className="orbit-node node-yellow" />
          </div>

          <div className="orbit orbit-inner">
            <span className="orbit-node node-blue" />
          </div>

          <div className="core-glow">
            <div className="core">
              <span>AIML</span>
            </div>
          </div>

          <span className="data-particle particle-one" />
          <span className="data-particle particle-two" />
          <span className="data-particle particle-three" />

          <span className="visual-label">01 / INTELLIGENCE</span>
          <span className="visual-coordinate">12° 58' N / 77° 35' E</span>
        </div>


        <a href="#projects" className="scroll-indicator">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={16} />
        </a>
      </section>

      
      <section className="project-section" id="projects">
        <div className="project-topline">
          <span>01 / FEATURED SYSTEM</span>
          <span>AI · DOCUMENT INTELLIGENCE</span>
        </div>

        <div className="project-intro">
          <div className="project-label">
            <span className="red-line" />
            PROJECTS / 001
          </div>

          <h2>
            URBANROOF.
          </h2>

          <p className="project-tagline">
            FROM INSPECTION DATA
            <br />
            TO INTELLIGENT DIAGNOSIS.
          </p>

          <p className="project-description">
            An AI-powered building inspection system that analyzes
            inspection and thermal reports, consolidates defects,
            and generates structured diagnosis reports using
            semantic search and LLM reasoning.
          </p>

          <a href="#urbanroof-details" className="project-link">
            EXPLORE THE SYSTEM
            <span><ArrowUpRight size={19} /></span>
          </a>
        </div>

        <div className="project-visual">
          <div className="project-visual-grid" />

          <div className="scan-frame">
            <div className="scan-corner top-left" />
            <div className="scan-corner top-right" />
            <div className="scan-corner bottom-left" />
            <div className="scan-corner bottom-right" />

            <div className="scan-building">
              <div className="building-layer layer-one" />
              <div className="building-layer layer-two" />
              <div className="building-layer layer-three" />
              <div className="scan-line" />
            </div>

            <span className="scan-tag tag-top">THERMAL ANALYSIS / ACTIVE</span>
            <span className="scan-tag tag-bottom">DEFECT DETECTION / 01</span>
          </div>

          <div className="project-side-note">
            <span>PROCESSING</span>
            <span className="side-note-line" />
            <span>INSPECTION DATA</span>
          </div>
        </div>

        <div className="pipeline">
          <div className="pipeline-heading">
            <span>THE PIPELINE</span>
            <span>01 — 04</span>
          </div>

          <div className="pipeline-steps">
            {[
              { number: "01", title: "DOCUMENT INPUT", detail: "Inspection + thermal PDFs" },
              { number: "02", title: "SEMANTIC SEARCH", detail: "Embeddings + FAISS" },
              { number: "03", title: "AI REASONING", detail: "Context + LLM analysis" },
              { number: "04", title: "REPORT OUTPUT", detail: "Structured diagnosis" },
            ].map((step) => (
              <div className="pipeline-step" key={step.number}>
                <span className="step-number">{step.number}</span>
                <span className="step-title">{step.title}</span>
                <span className="step-detail">{step.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      <div id="about" className="section-anchor" />
      <div id="experience" className="section-anchor" />
      <div id="lab" className="section-anchor" />
      <div id="contact" className="section-anchor" />
    </main>
  );
}

export default App;
