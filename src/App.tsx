import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Menu, X, Github, Linkedin, Mail } from "lucide-react";
import "./App.css";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Resume", id: "resume" },
  { label: "Contact", id: "contact" },
];

const skillGroups = [
  { number: "01", name: "AI / MACHINE LEARNING", summary: "Building models that learn from data and support real decisions.", tools: ["Python", "NumPy", "Pandas", "Scikit-learn", "Deep Learning"] },
  { number: "02", name: "GENERATIVE AI & LLMs", summary: "Designing grounded, useful applications around language models.", tools: ["LLMs", "Prompt Engineering", "RAG", "Embeddings", "FAISS"] },
  { number: "03", name: "AGENTIC SYSTEMS", summary: "Connecting reasoning, tools, and workflows into practical systems.", tools: ["LangChain", "LangGraph", "Tool Calling", "Orchestration", "Automation"] },
  { number: "04", name: "APPLICATION ENGINEERING", summary: "Turning prototypes into interfaces and services people can use.", tools: ["FastAPI", "Streamlit", "SQL", "Git", "React basics"] },
];

const projects = [
  { number: "01", name: "URBANROOF AI DDR", type: "DOCUMENT INTELLIGENCE", description: "Analyzes inspection and thermal reports, consolidates defects, and generates structured diagnosis reports with semantic search and LLM reasoning.", stack: "PyMuPDF · Embeddings · FAISS · LLMs · DOCX" },
  { number: "02", name: "AI FINANCIAL INTELLIGENCE", type: "DATA + AI", description: "An interactive market dashboard combining financial indicators, trend analysis, news sentiment, and currency conversion.", stack: "Python · Streamlit · yfinance · Plotly · Ollama" },
  { number: "03", name: "CYBERSEC ASSISTANT", type: "SECURITY + LLMs", description: "A local-first assistant concept for exploring cybersecurity knowledge, threat frameworks, and security guidance.", stack: "Python · LLMs · PEFT/LoRA · OWASP · MITRE" },
  { number: "04", name: "SMART SURVEILLANCE", type: "COMPUTER VISION", description: "A computer-vision project focused on interpreting visual input and supporting automated monitoring workflows.", stack: "Python · Computer Vision · Deep Learning" },
  { number: "05", name: "ECOMMERCE SENTIMENT", type: "NLP", description: "Classifies customer sentiment from text to turn unstructured feedback into useful product insights.", stack: "Python · NLP · Machine Learning" },
  { number: "06", name: "SMART ATTENDANCE", type: "COMPUTER VISION", description: "An attendance workflow concept using visual recognition to reduce repetitive manual tracking.", stack: "Python · Computer Vision · Automation" },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [revealedSkills, setRevealedSkills] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -52% 0px", threshold: [0, 0.1, 0.25, 0.5] }
    );
    sections.forEach((section) => observer.observe(section));

    const skillSection = document.getElementById("skills");
    const skillObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealedSkills(true);
      },
      { threshold: 0.18 }
    );
    if (skillSection) skillObserver.observe(skillSection);

    return () => {
      observer.disconnect();
      skillObserver.disconnect();
    };
  }, []);

  return (
    <main>
      <header className="navbar">
        <a href="#home" className="brand" onClick={closeMenu}>ADITHYA<span>.exe</span></a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`desktop-nav-link ${activeSection === item.id ? "active" : ""}`}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <span className="availability"><span className="status-dot" />AVAILABLE FOR OPPORTUNITIES</span>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
            <span>{menuOpen ? "CLOSE" : "MENU"}</span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="menu-overlay" aria-label="Mobile navigation">
          <div className="menu-heading">NAVIGATION / 01—07</div>
          {navItems.map((item, index) => (
            <a key={item.id} href={`#${item.id}`} onClick={closeMenu} className={`menu-link ${activeSection === item.id ? "active" : ""}`}>
              <span className="menu-number">0{index + 1}</span><span>{item.label}</span><ArrowUpRight className="menu-arrow" size={24} />
            </a>
          ))}
        </nav>
      )}

      <section className="hero" id="home">
        <div className="hero-topline"><span>PORTFOLIO / 2026</span><span>AI · ML · GENAI · AGENTIC SYSTEMS · AUTOMATION</span></div>
        <div className="hero-content">
          <div className="hero-kicker"><span className="red-line" />AIML ENGINEER</div>
          <h1>ENGINEERING<br />THE <span className="outline-text">UNSEEN.</span></h1>
          <div className="hero-bottom">
            <p className="hero-description">I'm Adithya Sapalya — an AIML engineer exploring intelligent systems, generative AI, and autonomous agents to build solutions for real-world problems.</p>
            <a href="#projects" className="explore-button"><span>EXPLORE MY WORK</span><span className="button-icon"><ArrowUpRight size={20} /></span></a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="signal-caption signal-caption-top">SYSTEM / 001 <span>ONLINE</span></div>
          <div className="signal-plate">
            <div className="signal-grid" />
            <div className="signal-axis signal-axis-x" /><div className="signal-axis signal-axis-y" />
            <svg className="signal-trace" viewBox="0 0 520 360" fill="none" preserveAspectRatio="xMidYMid meet">
              <path className="trace-shadow" d="M18 258H98L128 258L154 218L178 285L207 116L238 240L267 178L293 208H336L365 151L394 151L420 84L448 84L472 121L502 121" />
              <path className="trace-main" d="M18 258H98L128 258L154 218L178 285L207 116L238 240L267 178L293 208H336L365 151L394 151L420 84L448 84L472 121L502 121" />
              <path className="trace-secondary" d="M18 294H125L155 278H205L230 302H315L350 267H405L433 286H502" />
            </svg>
            <span className="signal-point point-a" /><span className="signal-point point-b" /><span className="signal-point point-c" />
            <span className="signal-readout readout-a">INPUT <b>DATA</b></span>
            <span className="signal-readout readout-b">MODEL <b>ACTIVE</b></span>
            <span className="signal-stamp">A / S</span>
          </div>
          <div className="signal-caption signal-caption-bottom"><span>FROM DATA</span><span className="caption-rule" /><span>TO INTELLIGENCE</span></div>
        </div>

        <a href="#about" className="scroll-indicator"><span>SCROLL TO EXPLORE</span><ArrowDown size={16} /></a>
      </section>

      <section className="content-section about-section" id="about">
        <div className="section-topline"><span>01 / ABOUT</span><span>THE PERSON BEHIND THE SYSTEMS</span></div>
        <div className="about-layout">
          <div className="section-heading-block"><span className="section-kicker"><span className="red-line" />A LITTLE CONTEXT</span><h2>CURIOUS BY<br /><span className="outline-text">DESIGN.</span></h2></div>
          <div className="about-copy"><p className="about-lead">I’m Adithya Sapalya, an Artificial Intelligence and Machine Learning engineer interested in building practical intelligent systems.</p><p>I enjoy working across the stack — from data and model workflows to LLM-powered applications, retrieval systems, and agents that connect tools to real tasks. I care about understanding how things work, making ideas usable, and learning by building.</p><div className="about-focus"><span>MY FOCUS</span><div>AI / ML</div><div>GENERATIVE AI</div><div>AGENTIC SYSTEMS</div><div>AUTOMATION</div></div></div>
        </div>
      </section>

      <section className={`content-section skills-section ${revealedSkills ? "skills-revealed" : ""}`} id="skills">
        <div className="section-topline"><span>02 / TECHNICAL STACK</span><span>CAPABILITIES → IMPLEMENTATION</span></div>
        <div className="skills-heading-row"><div><span className="section-kicker"><span className="red-line" />TOOLS ARE ONLY THE START</span><h2>SKILLS THAT<br /><span className="outline-text">SHIP.</span></h2></div><p className="skills-intro">A practical toolkit for moving from a problem statement to a working AI application.</p></div>
        <div className="skills-list">
          {skillGroups.map((group) => (
            <article className="skill-row" key={group.number}>
              <span className="skill-number">{group.number}</span>
              <div className="skill-capability"><h3>{group.name}</h3><p>{group.summary}</p></div>
              <div className="skill-tools" aria-label={`${group.name} tools`}>{group.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
              <ArrowUpRight className="skill-arrow" size={21} />
            </article>
          ))}
        </div>
        <p className="skills-note">STACK EVOLVES. FUNDAMENTALS STAY.</p>
      </section>

      <section className="project-section" id="projects">
        <div className="project-topline"><span>03 / SELECTED WORK</span><span>AI · DOCUMENT INTELLIGENCE · APPLICATIONS</span></div>
        <div className="project-intro">
          <div className="project-label"><span className="red-line" />PROJECTS / 001</div>
          <h2>URBANROOF.</h2>
          <p className="project-tagline">FROM INSPECTION DATA<br />TO INTELLIGENT DIAGNOSIS.</p>
          <p className="project-description">An AI-powered building inspection system that analyzes inspection and thermal reports, consolidates defects, and generates structured diagnosis reports using semantic search and LLM reasoning.</p>
          <a href="https://github.com/Adithyasapalya" target="_blank" rel="noreferrer" className="project-link">VIEW PROJECTS ON GITHUB<span><ArrowUpRight size={19} /></span></a>
        </div>
        <div className="project-visual"><div className="project-visual-grid" /><div className="scan-frame"><div className="scan-corner top-left" /><div className="scan-corner top-right" /><div className="scan-corner bottom-left" /><div className="scan-corner bottom-right" /><div className="scan-building"><div className="building-layer layer-one" /><div className="building-layer layer-two" /><div className="building-layer layer-three" /><div className="scan-line" /></div><span className="scan-tag tag-top">THERMAL ANALYSIS / ACTIVE</span><span className="scan-tag tag-bottom">DEFECT DETECTION / 01</span></div><div className="project-side-note"><span>PROCESSING</span><span className="side-note-line" /><span>INSPECTION DATA</span></div></div>
        <div className="pipeline"><div className="pipeline-heading"><span>THE PIPELINE</span><span>01 — 04</span></div><div className="pipeline-steps">{[{ number: "01", title: "DOCUMENT INPUT", detail: "Inspection + thermal PDFs" }, { number: "02", title: "SEMANTIC SEARCH", detail: "Embeddings + FAISS" }, { number: "03", title: "AI REASONING", detail: "Context + LLM analysis" }, { number: "04", title: "REPORT OUTPUT", detail: "Structured diagnosis" }].map((step) => <div className="pipeline-step" key={step.number}><span className="step-number">{step.number}</span><span className="step-title">{step.title}</span><span className="step-detail">{step.detail}</span></div>)}</div></div>
        <div className="project-grid-list">{projects.slice(1).map((project) => <article className="project-card" key={project.number}><div className="project-card-top"><span>{project.number}</span><span>{project.type}</span></div><h3>{project.name}</h3><p>{project.description}</p><div className="project-stack">{project.stack}</div></article>)}</div>
        <div className="github-more"><span>MORE PROJECTS</span><p>More experiments, builds, and code.</p><a href="https://github.com/Adithyasapalya" target="_blank" rel="noreferrer">VIEW ALL PROJECTS ON GITHUB <ArrowUpRight size={18} /></a></div>
      </section>

      <section className="content-section experience-section" id="experience">
        <div className="section-topline"><span>04 / EXPERIENCE</span><span>LEARNING BY BUILDING</span></div><div className="section-heading-block"><span className="section-kicker"><span className="red-line" />WHERE I’VE CONTRIBUTED</span><h2>WORK IN<br /><span className="outline-text">PROGRESS.</span></h2></div>
        <div className="experience-list"><article className="experience-item"><span className="experience-index">01</span><div><span className="experience-type">AI AGENTS · TESTING · ORCHESTRATION</span><h3>ART / A REAL TIME TECH</h3><p>Working around AI-agent workflows, orchestration behavior, and systematic testing of agent reliability, boundaries, and guardrails.</p></div><span className="experience-period">INTERNSHIP / PROJECT WORK</span></article><article className="experience-item"><span className="experience-index">02</span><div><span className="experience-type">DATA SCIENCE · GENERATIVE AI</span><h3>TAKE IT SMART (OPC)</h3><p>Internship experience focused on data science and Generative AI concepts, practical workflows, and applied problem-solving.</p></div><span className="experience-period">INTERNSHIP</span></article></div>
      </section>

      <section className="content-section resume-section" id="resume">
        <div className="section-topline"><span>05 / RESUME</span><span>EDUCATION · SKILLS · EXPERIENCE</span></div><div className="resume-layout"><div><span className="section-kicker"><span className="red-line" />THE SHORT VERSION</span><h2>BUILT ON<br /><span className="outline-text">FUNDAMENTALS.</span></h2></div><div className="resume-details"><div className="resume-detail"><span>EDUCATION</span><h3>B.E. — Artificial Intelligence & Machine Learning</h3><p>Vivekananda College of Engineering & Technology</p></div><div className="resume-detail"><span>CORE TOOLKIT</span><p>Python · SQL · Machine Learning · Deep Learning · Generative AI · LLMs · RAG · LangChain · LangGraph · FastAPI</p></div><a className="resume-button" href="/Adithya_Resume.pdf" target="_blank" rel="noreferrer">VIEW RESUME <ArrowUpRight size={19} /></a><p className="resume-note">Place your current PDF in the public folder and name it <code>Adithya_Resume.pdf</code> to activate this link.</p></div></div>
      </section>

      <section className="content-section contact-section" id="contact">
        <div className="section-topline"><span>06 / CONTACT</span><span>OPEN TO THE RIGHT OPPORTUNITY</span></div><span className="section-kicker"><span className="red-line" />HAVE SOMETHING IN MIND?</span><h2>LET’S BUILD<br /><span className="outline-text">SOMETHING.</span></h2><div className="contact-bottom"><p>Interested in AI engineering, GenAI, agentic systems, or building something useful? Let’s talk.</p><div className="contact-links"><a href="mailto:adithyasapalya30@gmail.com"><Mail size={18} /> EMAIL <ArrowUpRight size={16} /></a><a href="https://www.linkedin.com/in/adithya-sapalya/" target="_blank" rel="noreferrer"><Linkedin size={18} /> LINKEDIN <ArrowUpRight size={16} /></a><a href="https://github.com/Adithyasapalya" target="_blank" rel="noreferrer"><Github size={18} /> GITHUB <ArrowUpRight size={16} /></a></div></div><footer className="site-footer"><span>ADITHYA<span className="footer-red">.exe</span></span><span>DESIGNED TO KEEP LEARNING.</span><a href="#home">BACK TO TOP ↑</a></footer>
      </section>
    </main>
  );
}

export default App;
