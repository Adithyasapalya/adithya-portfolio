import { useState, type FormEvent } from "react";
import { ArrowDown, ArrowUpRight, Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./components/SocialIcons";
import { CarModelViewer } from "./components/CarModelViewer";
import profileImg from "./assets/profile.jpeg";
import "./App.css";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "activation_needed" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const mailtoHref = `mailto:adithyasapalya30@gmail.com?subject=${encodeURIComponent(
    formData.subject ? `[ADITHYA.exe] ${formData.subject}` : "Project Inquiry via ADITHYA.exe"
  )}&body=${encodeURIComponent(
    `Name: ${formData.name || "N/A"}\nEmail: ${formData.email || "N/A"}\nCompany: ${
      formData.company || "N/A"
    }\n\nMessage:\n${formData.message}`
  )}`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/adithyasapalya30@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          _subject: `[ADITHYA.exe] ${formData.subject}`,
          _captcha: "false",
          _template: "table",
          company: formData.company || "Not provided",
          message: formData.message,
          "Website Source": typeof window !== "undefined" ? window.location.origin : "ADITHYA.exe",
        }),
      });

      const data = await response.json();

      if (data.success === "true" || data.success === true) {
        setSubmitStatus("success");
        setStatusMessage(
          "Transmission dispatched successfully! Your message was delivered directly to adithyasapalya30@gmail.com. I'll get back to you shortly."
        );
      } else if (typeof data.message === "string" && data.message.toLowerCase().includes("activation")) {
        setSubmitStatus("activation_needed");
        setStatusMessage(
          "FormSubmit Activation Pending: FormSubmit has sent a one-time activation confirmation email to adithyasapalya30@gmail.com. Once you click the activation link in your inbox, automated forwarding is permanently activated!"
        );
      } else {
        setSubmitStatus("error");
        setStatusMessage(data.message || "Failed to dispatch transmission via mail relay. Please use direct email below.");
      }
    } catch {
      setSubmitStatus("error");
      setStatusMessage("Network error: Unable to contact mail relay service. You can send directly via your mail client below.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      {/* =========================================================
          01. FIXED NAVBAR (INLINE MENU ITEMS, NO HAMBURGER, NO AVAILABILITY)
          ========================================================= */}
      <header className="navbar">
        <a href="#hero" className="nav-brand">
          ADITHYA<span>.exe</span>
        </a>

        <nav className="navbar-links" aria-label="Main navigation">
          <a href="#about" className="nav-link">ABOUT</a>
          <a href="#skills" className="nav-link">SKILLS</a>
          <a href="#projects" className="nav-link">PROJECTS</a>
          <a href="#blogs" className="nav-link">BLOGS</a>
          <a href="#experience" className="nav-link">EXPERIENCE</a>
          <a href="#resume" className="nav-link">RESUME</a>
          <a href="#contact" className="nav-link">CONTACT</a>
        </nav>
      </header>

      {/* =========================================================
          02. HERO SECTION
          ========================================================= */}
      <section className="hero-section" id="hero">
        <div className="hero-top-labels">
          <span>PORTFOLIO / 2026</span>
          <span className="hidden sm:inline">AI · ML · GENAI · AGENTIC SYSTEMS · AUTOMATION</span>
        </div>

        <div className="hero-main">
          <div>
            <div className="hero-intro-label">
              <span className="red-indicator" />
              <span>AIML ENGINEER</span>
            </div>

            <h1 className="hero-heading">
              ENGINEERING<br />
              THE <span className="outline-yellow">UNSEEN.</span>
            </h1>

            <p className="hero-description">
              I'm Adithya Sapalya — an AIML engineer exploring intelligent systems, generative AI, and autonomous agents to build solutions for real-world problems.
            </p>

            <a href="#about" className="btn-primary">
              <span>MEET THE ENGINEER</span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Right Hero: 3D Streamliner Model Viewer */}
          <CarModelViewer />
        </div>

        <a href="#about" className="hero-bottom-scroll">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={14} />
        </a>
      </section>

      {/* =========================================================
          03. ABOUT SECTION (SAPALYA IN YELLOW OUTLINE)
          ========================================================= */}
      <section className="content-chapter" id="about">
        <div className="section-label-group">
          <div>
            <span className="red-indicator" />
            <span>02 / IDENTITY</span>
          </div>
          <span>ADITHYA ASHOK SAPALYA</span>
        </div>

        <div className="about-grid">
          {/* Left: Portrait image container */}
          <div className="portrait-frame-wrapper">
            <div className="portrait-frame">
              <span className="corner-reticle cr-tl" />
              <span className="corner-reticle cr-tr" />
              <span className="corner-reticle cr-bl" />
              <span className="corner-reticle cr-br" />

              <img src={profileImg} alt="Adithya Ashok Sapalya" />
            </div>
            <div className="portrait-identity-label">
              <span>ID // ADITHYA_ASHOK_SAPALYA</span>
              <span>VCET // 2026</span>
            </div>
          </div>

          {/* Right: Bio & Role */}
          <div className="about-content-right">
            <span className="section-kicker">WHO IS ADITHYA?</span>
            <h2 className="chapter-heading">
              ADITHYA<br />
              <span className="outline-yellow">SAPALYA.</span>
            </h2>

            <div className="about-role-title">
              ARTIFICIAL INTELLIGENCE & MACHINE LEARNING ENGINEER
            </div>

            <p className="body-text">
              I build practical AI systems around machine learning, generative AI, LLMs, RAG, and agentic workflows — turning ideas into systems that can reason, automate, and solve real-world problems.
            </p>

            <p className="body-text" style={{ marginTop: "16px" }}>
              My work spans from structured machine learning workflows and deep learning to agent orchestration with LangGraph, local quantized LLMs via Ollama, and full-stack integration with Go, Python, FastAPI, and React.
            </p>

            <a href="#skills" className="about-transition-indicator">
              <span>KEEP GOING / THERE'S MORE</span>
              <ArrowDown size={14} color="#FF3138" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          04. SKILLS SECTION (BALANCED 4-COLUMN + UNIFORM 2x2 ARSENAL MATRIX)
          ========================================================= */}
      <section className="content-chapter" id="skills">
        <div className="section-label-group">
          <div>
            <span className="red-indicator" />
            <span>03 / CAPABILITIES</span>
          </div>
          <span>THE TOOLSET</span>
        </div>

        <h2 className="chapter-heading">
          BUILDING<br />
          INTELLIGENCE.
        </h2>

        {/* 4 Skill Categories Balanced Grid */}
        <div className="skills-grid-categories">
          <div className="skill-category-card">
            <span className="category-num">01 —</span>
            <h3 className="category-name">INTELLIGENCE</h3>
            <ul className="category-skill-items">
              <li>Machine Learning</li>
              <li>Deep Learning</li>
              <li>NLP</li>
              <li>Computer Vision</li>
            </ul>
          </div>

          <div className="skill-category-card">
            <span className="category-num">02 —</span>
            <h3 className="category-name">GENERATIVE AI</h3>
            <ul className="category-skill-items">
              <li>Generative AI</li>
              <li>LLMs</li>
              <li>RAG</li>
              <li>Prompt Engineering</li>
            </ul>
          </div>

          <div className="skill-category-card">
            <span className="category-num">03 —</span>
            <h3 className="category-name">AGENTIC SYSTEMS</h3>
            <ul className="category-skill-items">
              <li>Agentic AI</li>
              <li>AI Agents</li>
              <li>Multi-Agent Workflows</li>
              <li>AI Automation</li>
            </ul>
          </div>

          <div className="skill-category-card">
            <span className="category-num">04 —</span>
            <h3 className="category-name">ENGINEERING</h3>
            <ul className="category-skill-items">
              <li>Python</li>
              <li>Go</li>
              <li>C</li>
              <li>Java</li>
              <li>HTML</li>
              <li>CSS</li>
            </ul>
          </div>
        </div>

        {/* Balanced 2x2 Arsenal Matrix: Single Uniform Yellow Accent & Pattern */}
        <div className="skills-matrix-container">
          {/* Card 01 */}
          <div className="matrix-group-card">
            <div className="matrix-group-header">
              <span>01 // AI & MACHINE LEARNING</span>
              <span className="matrix-tag-uniform">ACTIVE</span>
            </div>
            <div className="matrix-chips-grid">
              {["Scikit-learn", "Pandas", "NumPy", "MATLAB", "Simulink"].map((tool) => (
                <span key={tool} className="tech-chip">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Card 02 */}
          <div className="matrix-group-card">
            <div className="matrix-group-header">
              <span>02 // GENAI & AGENTIC STACK</span>
              <span className="matrix-tag-uniform">ACTIVE</span>
            </div>
            <div className="matrix-chips-grid">
              {[
                "LangChain",
                "LangGraph",
                "FAISS",
                "Ollama",
                "Llama 3",
                "OpenAI API",
                "MiroFish",
                "Hermes Agent",
              ].map((tool) => (
                <span key={tool} className="tech-chip">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Card 03 */}
          <div className="matrix-group-card">
            <div className="matrix-group-header">
              <span>03 // LANGUAGES & INFRASTRUCTURE</span>
              <span className="matrix-tag-uniform">ACTIVE</span>
            </div>
            <div className="matrix-chips-grid">
              {["Python", "Go", "C", "Java", "SQL", "FastAPI", "Streamlit", "Git", "GitHub"].map((tool) => (
                <span key={tool} className="tech-chip">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Card 04 */}
          <div className="matrix-group-card">
            <div className="matrix-group-header">
              <span>04 // VISUAL & DATA TOOLS</span>
              <span className="matrix-tag-uniform">ACTIVE</span>
            </div>
            <div className="matrix-chips-grid">
              {["Power BI", "Tableau", "PowerPoint", "Canva", "Picsart"].map((tool) => (
                <span key={tool} className="tech-chip">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          05. MYSTERY TRANSITION SECTION
          ========================================================= */}
      <section className="mystery-section" id="unknown">
        <div className="section-label-group">
          <div>
            <span className="red-indicator" />
            <span>04 / UNKNOWN</span>
          </div>
          <span>DATA FOUND</span>
        </div>

        <div className="mystery-main">
          <div className="mystery-kicker">YOU KNOW THE TOOLS.</div>
          <h2 className="mystery-heading">
            <span className="mystery-white">BUT...</span><br />
            <span className="mystery-blue">WHAT DID I</span><br />
            <span className="mystery-build-outline">BUILD</span>
            <span className="mystery-red-marks">??</span>
          </h2>
        </div>

        <div className="mystery-bottom-text">
          <a href="#projects" className="hero-bottom-scroll" style={{ padding: 0 }}>
            <span>SCROLL TO FIND OUT</span>
            <ArrowDown size={14} />
          </a>
        </div>
      </section>

      {/* =========================================================
          06. PROJECTS SECTION
          ========================================================= */}
      <section className="content-chapter" id="projects">
        <div className="section-label-group">
          <div>
            <span className="red-indicator" />
            <span>05 / SYSTEMS</span>
          </div>
          <span>PROJECT ARCHIVE</span>
        </div>

        <h2 className="chapter-heading">
          THE WORK<br />
          COMES NEXT.
        </h2>

        <div className="projects-container">
          {/* Project 1 */}
          <article className="project-card-technical">
            <div className="project-card-header">
              <span className="project-id-badge">PROJECT // 01</span>
              <span className="project-category-badge">MULTI-AGENT & QUANT FINANCE</span>
            </div>

            <h3 className="project-title">
              Chronos AI: AI-Powered Financial Analytics and Trading Simulation System
            </h3>

            <p className="project-description-text">
              An AI-powered multi-agent trading and financial analytics platform built using MiroFish and Hermes Agent for stock prediction, sentiment analysis, and autonomous investment recommendations. Features interactive candlestick charts, RSI indicators, bull/bear detection, real-time news intelligence, and local LLM financial reasoning with Ollama and Llama3.
            </p>

            <div className="project-stack-row">
              {[
                "MiroFish",
                "Hermes Agent",
                "Python",
                "Streamlit",
                "Ollama",
                "Llama3",
                "yFinance",
                "Plotly",
                "Scikit-learn",
                "NewsAPI",
                "TextBlob",
              ].map((item) => (
                <span key={item} className="project-tech-tag">
                  {item}
                </span>
              ))}
            </div>

            <div className="project-actions-row">
              <a
                href="https://github.com/Adithyasapalya/mango-sorbet"
                target="_blank"
                rel="noreferrer"
                className="project-link-btn"
              >
                <span>View on GitHub</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </article>

          {/* Project 2 */}
          <article className="project-card-technical">
            <div className="project-card-header">
              <span className="project-id-badge">PROJECT // 02</span>
              <span className="project-category-badge">KSCST SPP 49TH SERIES RECOGNIZED</span>
            </div>

            <h3 className="project-title">
              CYBERSEC: AI Powered Red Teaming Assistant
            </h3>

            <p className="project-description-text">
              A project that leverages a fine-tuned large language model (LLM), trained on structured cybersecurity datasets. Selected for KSCST SPP 49th Series (Reference ID: 49S_BE_6839). Integrates TinyLLM with Nmap and Nikto to automate vulnerability scanning, risk prioritization via MITRE ATT&CK and OWASP Top 10, and a RAG pipeline to enrich scans with CVE references and actionable remediation playbooks.
            </p>

            <div className="project-stack-row">
              {[
                "Python",
                "TinyLLM",
                "Ollama",
                "RAG",
                "Nmap",
                "Nikto",
                "FAISS",
                "MITRE ATT&CK",
                "OWASP Top 10",
              ].map((item) => (
                <span key={item} className="project-tech-tag">
                  {item}
                </span>
              ))}
            </div>

            <div className="project-actions-row">
              <a
                href="https://github.com/Adithyasapalya"
                target="_blank"
                rel="noreferrer"
                className="project-link-btn"
              >
                <span>View on GitHub</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </article>

          {/* Project 3 */}
          <article className="project-card-technical">
            <div className="project-card-header">
              <span className="project-id-badge">PROJECT // 03</span>
              <span className="project-category-badge">COMPUTER VISION & BIOMETRICS</span>
            </div>

            <h3 className="project-title">
              Smart Surveillance System using AI
            </h3>

            <p className="project-description-text">
              A smart face recognition surveillance system for real-time security and monitoring applications. Uses advanced neural models including FaceNet, DeepFace, and ArcFace combined with MediaPipe to execute high-accuracy real-time facial localization and identification across both live camera feeds and stored video archives.
            </p>

            <div className="project-stack-row">
              {["Python", "Droid Cam", "MediaPipe", "FaceNet", "DeepFace", "ArcFace"].map((item) => (
                <span key={item} className="project-tech-tag">
                  {item}
                </span>
              ))}
            </div>

            <div className="project-actions-row">
              <a
                href="https://github.com/Adithyasapalya"
                target="_blank"
                rel="noreferrer"
                className="project-link-btn"
              >
                <span>View on GitHub</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* =========================================================
          07. BLOGS SECTION (ACTUAL PUBLISHED ARTICLES)
          ========================================================= */}
      <section className="content-chapter" id="blogs">
        <div className="section-label-group">
          <div>
            <span className="red-indicator" />
            <span>06 / THOUGHTS</span>
          </div>
          <span>WRITING & RESEARCH</span>
        </div>

        <h2 className="chapter-heading">
          BUILDING IS ONE THING.<br />
          UNDERSTANDING IS ANOTHER.
        </h2>

        <div className="blogs-container">
          {/* Real Blog 1 */}
          <a
            href="https://www.arealtimetech.com/blog/we-built-walls-to-stop-hackers"
            target="_blank"
            rel="noreferrer"
            className="blog-card"
          >
            <div>
              <div className="blog-meta-top">
                <span>A REAL TIME TECH // DEVSECOPS & AGENTS</span>
                <span className="blog-status-tag">PUBLISHED</span>
              </div>
              <h3 className="blog-title">
                We Built Walls to Stop Hackers (and trapped our own developers inside)
              </h3>
              <p className="blog-summary">
                An engineering breakdown exploring how traditional perimeter barriers and monolithic security controls create friction for development teams, and how modern intelligent agent workflows and contextual guardrails keep development velocity high without sacrificing infrastructure safety.
              </p>
            </div>
            <div className="blog-bottom-row">
              <span>6 MIN READ</span>
              <span className="blog-read-link">
                <span>READ ARTICLE</span>
                <ArrowUpRight size={14} />
              </span>
            </div>
          </a>

          {/* Real Blog 2 */}
          <a
            href="https://www.arealtimetech.com/blog/your-api-cloud-and-database-are-connected"
            target="_blank"
            rel="noreferrer"
            className="blog-card"
          >
            <div>
              <div className="blog-meta-top">
                <span>A REAL TIME TECH // CLOUD & THREAT MODELLING</span>
                <span className="blog-status-tag">PUBLISHED</span>
              </div>
              <h3 className="blog-title">
                Your API, Cloud, and Database Are Connected (So are your security risks)
              </h3>
              <p className="blog-summary">
                A technical deep dive into modern interconnected distributed systems — investigating attack surfaces, cross-service privilege escalation, and architecting automated security verification across API endpoints, cloud environments, and database layers.
              </p>
            </div>
            <div className="blog-bottom-row">
              <span>7 MIN READ</span>
              <span className="blog-read-link">
                <span>READ ARTICLE</span>
                <ArrowUpRight size={14} />
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* =========================================================
          08. EXPERIENCE SECTION
          ========================================================= */}
      <section className="content-chapter" id="experience">
        <div className="section-label-group">
          <div>
            <span className="red-indicator" />
            <span>07 / EXPERIENCE</span>
          </div>
          <span>WHERE I BUILT IT</span>
        </div>

        <h2 className="chapter-heading">
          FROM<br />
          LEARNING<br />
          TO ENGINEERING.
        </h2>

        <div className="experience-timeline">
          {/* Experience 1 */}
          <article className="experience-block">
            <div className="experience-top-row">
              <span className="mono" style={{ color: "#FF3138", fontWeight: 700 }}>
                01 // MANGALORE, INDIA
              </span>
              <span className="mono" style={{ color: "#999999" }}>
                SEPT – ONGOING
              </span>
            </div>

            <h3 className="experience-org">Aiotrix Private Limited</h3>
            <div className="experience-role">ARTIFICIAL INTELLIGENCE ENGINEER INTERN</div>

            <ul className="experience-responsibilities-list">
              <li>
                Contributing to AEGIS, an AI-powered cybersecurity solution with the Sentinel framework for security assessment and continuous protection of user-created infrastructure.
              </li>
              <li>
                Developing backend microservices using Go and frontend components using React to support security monitoring and framework integration.
              </li>
              <li>
                Building agentic security workflows using LLMs, Planner, Reinforcement Learning (RL), telemetry, and policy-based guardrails for automated test planning and execution.
              </li>
              <li>
                Implementing security testing, threat analysis, and evidence-based vulnerability validation, with findings classified as Confirmed, Rejected, or Unverified, alongside risk assessment and remediation workflows.
              </li>
            </ul>
          </article>

          {/* Experience 2 */}
          <article className="experience-block">
            <div className="experience-top-row">
              <span className="mono" style={{ color: "#FF3138", fontWeight: 700 }}>
                02 // BANGALORE, INDIA
              </span>
              <span className="mono" style={{ color: "#999999" }}>
                FEB – MAY 2026
              </span>
            </div>

            <h3 className="experience-org">Take It Smart OPC Pvt Ltd</h3>
            <div className="experience-role">DATA SCIENCE AND MACHINE LEARNING INTERN</div>

            <ul className="experience-responsibilities-list">
              <li>
                Developed AI-powered applications using LangChain, RAG, FAISS, and OpenAI models.
              </li>
              <li>
                Built projects including document chatbots, semantic search systems, AI agents, and FastAPI-based AI services.
              </li>
              <li>
                Worked on prompt engineering, vector databases, embeddings, and LLM-based workflows.
              </li>
              <li>
                Implemented Streamlit dashboards and integrated AI models for real-world automation tasks.
              </li>
              <li>
                Explored Agentic AI frameworks such as CrewAI, LangGraph, and Amazon Bedrock for intelligent system development.
              </li>
            </ul>
          </article>

          {/* Education & Leadership */}
          <article className="experience-block">
            <div className="experience-top-row">
              <span className="mono" style={{ color: "#FF3138", fontWeight: 700 }}>
                03 // EDUCATION & LEADERSHIP
              </span>
              <span className="mono" style={{ color: "#999999" }}>
                2022 – 2026
              </span>
            </div>

            <h3 className="experience-org">Vivekananda College of Engineering & Technology, Puttur</h3>
            <div className="experience-role">BE IN ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING · CGPA: 7.3</div>

            <ul className="experience-responsibilities-list">
              <li>
                MDC Chairman at Vivekananda College of Engineering and Technology, Puttur.
              </li>
              <li>
                MDC Co-Lead at IEEE Mangalore Subsection — coordinated with engineering colleges, branch counselors, and student leaders to organize technical events and initiatives.
              </li>
              <li>
                Certifications: Cisco Networking Academy (Python Essentials 1), HP AI for Beginners, Neo4j Certified Professional, Accenture Nordics Software Engineering Simulation, Postman NLP Academy.
              </li>
            </ul>
          </article>
        </div>
      </section>

      {/* =========================================================
          09. RESUME SECTION
          ========================================================= */}
      <section className="content-chapter" id="resume">
        <div className="section-label-group">
          <div>
            <span className="red-indicator" />
            <span>08 / PROFILE</span>
          </div>
          <span>FULL PROFILE</span>
        </div>

        <div className="resume-layout-grid">
          <div>
            <h2 className="chapter-heading">
              YOU'VE SEEN<br />
              WHAT I BUILD.
            </h2>
          </div>

          <div>
            <p className="body-text">
              Here's the complete profile — education, experience, certifications, leadership, and technical skills.
            </p>

            <div className="resume-buttons-group">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <span>VIEW RESUME</span>
                <ArrowUpRight size={15} />
              </a>

              <a
                href="/resume.pdf"
                download="Adithya_Resume.pdf"
                className="btn-secondary"
              >
                <span>DOWNLOAD PDF</span>
                <ArrowDown size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          10. CONTACT SECTION & FORM (SOMETHING IN YELLOW OUTLINE)
          ========================================================= */}
      <section className="content-chapter" id="contact">
        <div className="section-label-group">
          <div>
            <span className="red-indicator" />
            <span>09 / EXIT</span>
          </div>
          <span>WHAT'S NEXT?</span>
        </div>

        <div className="contact-layout-grid">
          {/* Left Column */}
          <div>
            <span className="section-kicker">CONTACT</span>
            <h2 className="chapter-heading">
              LET'S BUILD<br />
              <span className="outline-yellow" style={{ fontSize: "0.85em" }}>SOMETHING.</span>
            </h2>

            <p className="body-text" style={{ marginTop: "24px" }}>
              Have an opportunity, project, collaboration, or idea? Send me the details and I'll get back to you.
            </p>

            <div className="contact-channels-list">
              <a href="mailto:adithyasapalya30@gmail.com" className="channel-link">
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Mail size={16} color="#FF3138" /> EMAIL
                </span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href="https://linkedin.com/in/adithya-sapalya/"
                target="_blank"
                rel="noreferrer"
                className="channel-link"
              >
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <LinkedinIcon size={16} /> LINKEDIN
                </span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href="https://github.com/Adithyasapalya"
                target="_blank"
                rel="noreferrer"
                className="channel-link"
              >
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <GithubIcon size={16} /> GITHUB
                </span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-container">
            {submitStatus === "success" ? (
              <div className="form-success-banner">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "8px" }}>
                  <CheckCircle2 size={18} color="#22c55e" />
                  <strong>TRANSMISSION DELIVERED</strong>
                </div>
                <p>{statusMessage}</p>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ name: "", email: "", company: "", subject: "", message: "" });
                    setSubmitStatus("idle");
                    setStatusMessage("");
                  }}
                  className="form-btn-secondary"
                  style={{ marginTop: "18px" }}
                >
                  SEND ANOTHER TRANSMISSION
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {submitStatus === "activation_needed" && (
                  <div className="form-activation-banner">
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <AlertCircle size={18} color="#FFD300" />
                      <strong>ONE-TIME ACTIVATION REQUIRED</strong>
                    </div>
                    <p style={{ margin: "0 0 14px 0", fontSize: "0.78rem", lineHeight: 1.6 }}>{statusMessage}</p>
                    <a
                      href={mailtoHref}
                      className="form-btn-secondary"
                      style={{ color: "var(--color-yellow)", borderColor: "var(--color-yellow)" }}
                    >
                      <Mail size={14} />
                      <span>DISPATCH VIA EMAIL CLIENT NOW</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="form-error-banner">
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <AlertCircle size={18} color="#FF3138" />
                      <strong>DISPATCH NOTICE</strong>
                    </div>
                    <p style={{ margin: "0 0 14px 0", fontSize: "0.78rem", lineHeight: 1.6 }}>{statusMessage}</p>
                    <a
                      href={mailtoHref}
                      className="form-btn-secondary"
                      style={{ color: "var(--color-red)", borderColor: "var(--color-red)" }}
                    >
                      <Mail size={14} />
                      <span>DISPATCH VIA EMAIL CLIENT NOW</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    NAME *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="form-input"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    EMAIL *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="form-input"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company" className="form-label">
                    COMPANY / ORGANIZATION (OPTIONAL)
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company or institution"
                    className="form-input"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    SUBJECT *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project inquiry, role, or discussion"
                    className="form-input"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    MESSAGE *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share project scope or opportunity details..."
                    className="form-textarea"
                    disabled={isSubmitting}
                  />
                </div>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                  <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>DISPATCHING...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND TRANSMISSION</span>
                        <ArrowUpRight size={16} />
                      </>
                    )}
                  </button>

                  <a
                    href={mailtoHref}
                    className="form-btn-secondary"
                    title="Open directly in your default mail app"
                  >
                    <Mail size={14} />
                    <span>OPEN IN MAIL APP</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          11. FOOTER
          ========================================================= */}
      <footer className="site-footer">
        <span className="footer-brand">
          ADITHYA<span>.exe</span>
        </span>

        <span>AI · ML · GENAI · AGENTIC SYSTEMS · 2026</span>

        <a href="#hero" className="footer-back-top">
          BACK TO TOP ↑
        </a>
      </footer>
    </div>
  );
}
