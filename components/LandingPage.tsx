import React from 'react';
import { Box, ArrowRight, Layers, Target, Briefcase } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="landing-container animate-fade-in">
      
      {/* Hero Section */}
      <div className="landing-hero">
        <div className="hero-brand">
            <div className="landing-logo-wrapper">
                <Box size={32} color="white" />
            </div>
            <div className="hero-text">
                <h1 className="landing-title">DevArchitect</h1>
                <p className="landing-subtitle">Project Builder</p>
            </div>
        </div>
        
        <p className="landing-description">
          Stop building generic apps. Start architecting <strong>complex, portfolio-ready systems</strong>.
        </p>

        <button className="btn-start" onClick={onStart}>
          <span>Start Building</span>
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Value Props */}
      <div className="landing-grid">
        <div className="landing-card">
          <Target className="landing-icon text-primary" size={28} />
          <div>
            <h3>Real-World Focus</h3>
            <p>Specs for high-impact problems in FinTech, Healthcare, & AI.</p>
          </div>
        </div>
        <div className="landing-card">
          <Layers className="landing-icon text-secondary" size={28} />
          <div>
            <h3>Full Architecture</h3>
            <p>Technical roadmap, security analysis, & implementation strategy.</p>
          </div>
        </div>
        <div className="landing-card">
          <Briefcase className="landing-icon text-accent" size={28} />
          <div>
            <h3>Career Ready</h3>
            <p>Build a portfolio that demonstrates professional engineering competency.</p>
          </div>
        </div>
      </div>

      {/* How it Works - Compact */}
      <div className="landing-steps">
        <div className="steps-row">
          <div className="step-item">
            <div className="step-number">1</div>
            <span>Select Domain</span>
          </div>
          <div className="step-line"></div>
          <div className="step-item">
            <div className="step-number">2</div>
            <span>AI Architects</span>
          </div>
          <div className="step-line"></div>
          <div className="step-item">
            <div className="step-number">3</div>
            <span>You Build</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;