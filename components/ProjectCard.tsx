import React, { useRef, useState } from 'react';
import { ProjectIdea } from '../types';
import { 
  Globe, 
  Terminal, 
  Lightbulb, 
  Puzzle,
  Zap,
  ListOrdered,
  UserCheck,
  Users,
  Wrench,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  Box,
  Copy,
  Check,
  Download,
  FileText
} from 'lucide-react';

interface ProjectCardProps {
  project: ProjectIdea;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    const text = `
# ${project.title}
**Complexity**: ${project.complexity}
**Description**: ${project.shortDescription}

## The Challenge
${project.problem}

## The Solution
${project.solution}

## Tech Stack
${project.techStack.join(', ')}

## Implementation
${project.implementationSteps.map((s, i) => `${i+1}. ${s}`).join('\n')}
    `;
    
    try {
      await navigator.clipboard.writeText(text.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownloadPDF = () => {
    if (cardRef.current) {
      cardRef.current.classList.add('printing-card');
      window.print();
      cardRef.current.classList.remove('printing-card');
    }
  };

  return (
    <div ref={cardRef} className="project-card animate-fade-in">
      {/* Header */}
      <div className="card-header">
        <div className="card-title-row">
          <h3 className="card-title">{project.title}</h3>
          <div className="card-actions no-print">
            <button className="action-btn" onClick={handleCopy} title="Copy as Markdown">
              {copied ? <Check size={16} color="#34d399" /> : <Copy size={16} />}
            </button>
            <button className="action-btn" onClick={handleDownloadPDF} title="Download PDF">
              <Download size={16} />
            </button>
            <span className="card-badge">{project.complexity}</span>
          </div>
        </div>
        <p className="card-desc">{project.shortDescription}</p>
      </div>

      <div className="card-content">
        
        {/* Problem & Solution */}
        <div className="grid-2-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <div className="section-label" style={{ color: '#ef4444' }}>
              <Puzzle size={14} /> The Challenge
            </div>
            <p className="text-block">{project.problem}</p>
          </div>
          <div>
             <div className="section-label" style={{ color: '#3b82f6' }}>
              <Lightbulb size={14} /> The Solution
            </div>
            <p className="text-block">{project.solution}</p>
          </div>
        </div>

        {/* Target Users */}
        <div className="section">
          <div className="section-label" style={{ color: '#ec4899' }}>
            <Users size={14} /> Target Users & Personas
          </div>
          <div className="persona-grid">
            {project.targetUsers?.map((user, i) => (
              <span key={i} className="persona-tag">
                {user}
              </span>
            ))}
          </div>
        </div>

        {/* Tech Stack & Tools */}
        <div className="section">
          <div className="section-label" style={{ color: '#8b5cf6' }}>
            <Terminal size={14} /> Tech Architecture
          </div>
          <div className="tech-stack-grid" style={{ marginBottom: '1rem' }}>
            {project.techStack.map((tech, i) => (
              <span key={i} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>
          
          <div className="section-label" style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: '#a1a1aa', fontWeight: 500 }}>
             <Wrench size={12} /> Suggested Apps, Tools & AI
          </div>
          <div className="tech-stack-grid">
            {project.toolsAndAI?.map((tool, i) => (
              <span key={i} className="tool-pill">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features & Impact */}
        <div className="section">
           <div className="section-label" style={{ color: '#f59e0b' }}>
            <Zap size={14} /> Key Features & Impact
          </div>
           <div className="feature-impact-box">
              <ul className="feature-list">
                {project.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <div className="impact-footer">
                 <Globe size={14} className="text-accent" />
                 <span>{project.realWorldImpact}</span>
              </div>
           </div>
        </div>

        {/* User Experience Enhancements */}
        <div className="section">
           <div className="section-label" style={{ color: '#06b6d4' }}>
            <UserCheck size={14} /> User Perspective & UX Tips
          </div>
           <div className="ux-box">
              {project.userExperienceTips?.map((tip, i) => (
                <div key={i} className="ux-item">
                  <span className="ux-bullet">•</span>
                  <span>{tip}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Security & Risks Grid */}
        {/* Used flex-col layout inside the card content via CSS, but grid here needs to ensure height doesn't overlap */}
        <div className="grid-2-col security-risk-container">
          <div className="security-col">
            <div className="section-label" style={{ color: '#10b981' }}>
              <ShieldCheck size={14} /> Security Considerations
            </div>
            <div className="security-box">
              <ul className="simple-list">
                {project.security?.map((sec, i) => (
                  <li key={i}>{sec}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="risk-col">
            <div className="section-label" style={{ color: '#f97316' }}>
              <AlertTriangle size={14} /> Risk Analysis
            </div>
             <div className="risk-box">
              <ul className="simple-list">
                {project.risks?.map((risk, i) => (
                  <li key={i}>{risk}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Implementation Roadmap - Added extra margin top to ensure clearance */}
        <div className="section" style={{ marginTop: '3rem', clear: 'both' }}>
          <div className="section-label" style={{ color: '#6366f1' }}>
            <ListOrdered size={14} /> Implementation Roadmap
          </div>
          <div className="roadmap-container">
            {project.implementationSteps?.map((step, i) => (
              <div key={i} className="roadmap-step">
                <div className="step-number">{i + 1}</div>
                <div className="step-content">{step}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Improvements */}
        <div className="section" style={{ marginBottom: 0 }}>
          <div className="section-label" style={{ color: '#71717a' }}>
            <TrendingUp size={14} /> Limitations & Future Improvements
          </div>
          <div className="future-box">
             {project.limitations?.map((item, i) => (
                <div key={i} className="future-item">
                   <Box size={14} className="future-icon"/>
                   <span>{item}</span>
                </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectCard;