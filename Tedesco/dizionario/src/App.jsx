import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Calendar, Clock, AlertCircle } from 'lucide-react';

const ProjectTimeline = () => {
  const [expandedPhases, setExpandedPhases] = useState({
    phase1: true,
    phase2: true,
    phase21: true,
    phase22: true,
    phase23: true,
    phase3: true,
    phase31: true,
    phase32: true,
    phase4: true
  });

  // Timeline spans 17 months (44 weeks development + 26 weeks expo)
  const totalWeeks = 70;
  const weeksPerMonth = 4.3;
  
  const phases = [
    {
      id: 'phase1',
      name: 'Phase 1: Project Initiation & Planning',
      start: 0,
      duration: 4,
      color: 'bg-blue-500',
      children: [
        { name: 'Project Charter & Kickoff', start: 0, duration: 1, responsible: 'Luca (PM)' },
        { name: 'Budget & Risk Planning', start: 1, duration: 1, responsible: 'Luca (PM) + Federico (CFO)' },
        { name: 'Technical Architecture Design', start: 1, duration: 2, responsible: 'Chen (Dev)' },
        { name: 'Equipment Procurement Initiation', start: 2, duration: 2, responsible: 'Luca (PM)' },
        { name: 'External Contracts (AI, Sound, UX)', start: 2, duration: 2, responsible: 'Luca (PM)' },
        { name: 'Venue & Japan Logistics Setup', start: 3, duration: 1, responsible: 'Luca (PM)' }
      ]
    },
    {
      id: 'phase2',
      name: 'Phase 2: Creation, Design & Development',
      start: 4,
      duration: 24,
      color: 'bg-purple-500',
      children: []
    },
    {
      id: 'phase21',
      name: 'Phase 2.1: Creation and Design',
      parent: 'phase2',
      start: 4,
      duration: 12,
      color: 'bg-purple-400',
      children: [
        { name: 'Sprint 1: Creative Vision & Concept', start: 4, duration: 3, responsible: 'Lolita (Creative Dir)' },
        { name: 'Sprint 2: Visual Design & Art Direction', start: 7, duration: 3, responsible: 'Lolita + Federico' },
        { name: 'Sprint 3: UX Design & User Journey', start: 10, duration: 3, responsible: 'Federico + Junior UX' },
        { name: 'Sprint 4: UI/Interaction Design', start: 13, duration: 3, responsible: 'Federico + Junior UX' },
        { name: 'User Research & Testing (ongoing)', start: 8, duration: 8, responsible: 'Federico (Senior Designer)', iterative: true },
        { name: 'Prototyping & Design System', start: 10, duration: 6, responsible: 'Junior UX Designer', iterative: true }
      ]
    },
    {
      id: 'phase22',
      name: 'Phase 2.2: Technical & Audio Development',
      parent: 'phase2',
      start: 10,
      duration: 14,
      color: 'bg-indigo-400',
      children: [
        { name: 'Software Development Foundation', start: 10, duration: 4, responsible: 'Chen (Dev)' },
        { name: 'AI Integration Sprints (70h)', start: 14, duration: 3, responsible: 'AI/SW Specialist', critical: true },
        { name: 'Projection Mapping Development', start: 12, duration: 8, responsible: 'Chen + AI Specialist' },
        { name: 'Sensor Integration & Calibration', start: 16, duration: 6, responsible: 'Chen (Dev)', critical: true },
        { name: 'Sound Design & 3D Audio', start: 18, duration: 4, responsible: 'Sound Designer (Ext)' },
        { name: 'Software Testing (Unit & Integration)', start: 20, duration: 4, responsible: 'Chen (Dev)', iterative: true }
      ]
    },
    {
      id: 'phase23',
      name: 'Phase 2.3: Integration & System Testing',
      parent: 'phase2',
      start: 24,
      duration: 4,
      color: 'bg-violet-400',
      children: [
        { name: 'System Integration & End-to-End Testing', start: 24, duration: 3, responsible: 'Chen + AI Specialist', critical: true },
        { name: 'Performance & Load Testing', start: 26, duration: 2, responsible: 'Chen (Dev)' },
        { name: 'Final Refinements & Bug Fixes', start: 27, duration: 1, responsible: 'All Team', iterative: true }
      ]
    },
    {
      id: 'phase3',
      name: 'Phase 3: Pre-Installation & Installation',
      start: 28,
      duration: 16,
      color: 'bg-orange-500',
      children: []
    },
    {
      id: 'phase31',
      name: 'Phase 3.1: Pre-Installation',
      parent: 'phase3',
      start: 36,
      duration: 3,
      color: 'bg-orange-400',
      children: [
        { name: 'Installation Planning & Logistics', start: 36, duration: 1, responsible: 'Luca (PM)' },
        { name: 'Installer Training & Briefing', start: 37, duration: 1, responsible: 'Luca + Chen' },
        { name: 'Pre-Shipment & Customs Prep', start: 38, duration: 1, responsible: 'Luca (PM)', critical: true }
      ]
    },
    {
      id: 'phase32',
      name: 'Phase 3.2: On-Site Installation (Japan)',
      parent: 'phase3',
      start: 39,
      duration: 5,
      color: 'bg-red-400',
      children: [
        { name: 'Equipment Shipping to Japan', start: 39, duration: 1, responsible: 'Logistics', critical: true },
        { name: 'Physical Installation (2 installers, 60h each)', start: 40, duration: 1.5, responsible: 'Installers + Chen' },
        { name: 'Equipment Calibration & Setup', start: 41.5, duration: 1, responsible: 'Chen + Installers', critical: true },
        { name: 'Final On-Site Testing', start: 42.5, duration: 1, responsible: 'Chen (Dev)' },
        { name: 'Documentation & Crew Handover', start: 43, duration: 1, responsible: 'Documentation Crew + Luca' }
      ]
    },
    {
      id: 'phase4',
      name: 'Phase 4: Maintenance & Operations (6 months)',
      start: 44,
      duration: 26,
      color: 'bg-green-500',
      children: [
        { name: 'Daily Monitoring (200h over 6 months)', start: 44, duration: 26, responsible: 'Maintenance Crew (Japan)' },
        { name: 'Remote Technical Support', start: 44, duration: 26, responsible: 'Chen (Dev) - Remote', iterative: true },
        { name: 'Incident Response & Spare Parts', start: 44, duration: 26, responsible: 'Luca + Maintenance Crew', iterative: true },
        { name: 'Post-Event Evaluation', start: 68, duration: 2, responsible: 'Luca + Lolita' }
      ]
    }
  ];

  const milestones = [
    { name: 'Project Kickoff', week: 0, critical: true },
    { name: 'All Contracts Signed', week: 4, critical: true },
    { name: 'Design Concept Approved', week: 12, critical: false },
    { name: 'First User Testing', week: 16, critical: false },
    { name: 'Development Freeze', week: 24, critical: true },
    { name: 'System Integration Complete', week: 28, critical: true },
    { name: 'Equipment Shipped to Japan', week: 39, critical: true },
    { name: 'Installation Complete', week: 44, critical: true },
    { name: 'EXPO OPENS', week: 44, critical: true },
    { name: 'EXPO CLOSES', week: 70, critical: true }
  ];

  const togglePhase = (phaseId) => {
    setExpandedPhases(prev => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  const getMonthLabel = (week) => {
    const month = Math.floor(week / weeksPerMonth) + 1;
    return `M${month}`;
  };

  const renderBar = (start, duration, color, isChild = false, isIterative = false, isCritical = false) => {
    const left = (start / totalWeeks) * 100;
    const width = (duration / totalWeeks) * 100;
    
    return (
      <div
        className={`absolute h-6 rounded ${color} ${isChild ? 'opacity-80' : ''} ${isCritical ? 'ring-2 ring-red-600' : ''} flex items-center px-2 text-white text-xs`}
        style={{ left: `${left}%`, width: `${width}%`, top: '4px' }}
      >
        {isIterative && (
          <span className="mr-1" title="Iterative task">↻</span>
        )}
        {isCritical && (
          <AlertCircle className="w-3 h-3 mr-1" />
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-screen overflow-auto bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Swiss Pavilion Immersive Installation - Project Timeline</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Duration: 17 months (44 weeks dev + 26 weeks expo)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Total Labor: 1,050 hours</span>
            </div>
          </div>
          <div className="flex gap-4 mt-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Planning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span>Design/Dev</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span>Installation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Operations</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>Critical Path</span>
            </div>
            <div className="flex items-center gap-2">
              <span>↻</span>
              <span>Iterative</span>
            </div>
          </div>
        </div>

        {/* Timeline Header */}
        <div className="relative border-b-2 border-gray-300 mb-4">
          <div className="flex">
            <div className="w-80"></div>
            <div className="flex-1 relative h-12">
              {Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute text-xs text-gray-600 font-semibold"
                  style={{ left: `${(i * weeksPerMonth / totalWeeks) * 100}%` }}
                >
                  Month {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Week Grid */}
        <div className="relative">
          <div className="flex">
            <div className="w-80"></div>
            <div className="flex-1 relative" style={{ height: '40px' }}>
              {Array.from({ length: totalWeeks }).map((_, i) => (
                <div
                  key={i}
                  className="absolute border-l border-gray-200"
                  style={{ 
                    left: `${(i / totalWeeks) * 100}%`,
                    height: '2000px',
                    top: 0
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Phases */}
          <div className="space-y-1">
            {phases.map((phase) => (
              <div key={phase.id}>
                <div className="flex items-center hover:bg-gray-50">
                  <div className="w-80 px-3 py-2 flex items-center gap-2">
                    {phase.children.length > 0 && (
                      <button
                        onClick={() => togglePhase(phase.id)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        {expandedPhases[phase.id] ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    )}
                    <span className={`text-sm font-semibold ${phase.parent ? 'ml-6' : ''}`}>
                      {phase.name}
                    </span>
                  </div>
                  <div className="flex-1 relative h-8">
                    {renderBar(phase.start, phase.duration, phase.color)}
                  </div>
                </div>

                {expandedPhases[phase.id] && phase.children.map((child, idx) => (
                  <div key={idx} className="flex items-center hover:bg-gray-50">
                    <div className="w-80 px-3 py-2">
                      <div className="ml-12 text-xs text-gray-700">{child.name}</div>
                      <div className="ml-12 text-xs text-gray-500">{child.responsible}</div>
                    </div>
                    <div className="flex-1 relative h-8">
                      {renderBar(
                        child.start,
                        child.duration,
                        phase.color,
                        true,
                        child.iterative,
                        child.critical
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Milestones */}
          <div className="mt-8 border-t-2 border-gray-300 pt-4">
            <h3 className="text-lg font-semibold mb-3 px-3">Key Milestones</h3>
            <div className="flex">
              <div className="w-80"></div>
              <div className="flex-1 relative" style={{ height: '60px' }}>
                {milestones.map((milestone, idx) => (
                  <div
                    key={idx}
                    className="absolute"
                    style={{ left: `${(milestone.week / totalWeeks) * 100}%` }}
                  >
                    <div className={`w-1 h-12 ${milestone.critical ? 'bg-red-600' : 'bg-blue-600'}`}></div>
                    <div className="absolute top-14 -left-12 w-24 text-xs text-center font-medium">
                      {milestone.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-4 gap-4 p-4 bg-gray-100 rounded">
          <div>
            <div className="text-xs text-gray-600">Phase 1</div>
            <div className="text-lg font-bold">4 weeks</div>
          </div>
          <div>
            <div className="text-xs text-gray-600">Phase 2</div>
            <div className="text-lg font-bold">24 weeks</div>
          </div>
          <div>
            <div className="text-xs text-gray-600">Phase 3</div>
            <div className="text-lg font-bold">16 weeks</div>
          </div>
          <div>
            <div className="text-xs text-gray-600">Phase 4</div>
            <div className="text-lg font-bold">26 weeks</div>
          </div>
        </div>

        {/* Risk Buffer Notice */}
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm">
              <div className="font-semibold text-yellow-900">Built-in Time Buffers:</div>
              <ul className="mt-1 text-yellow-800 space-y-1">
                <li>• 12-week gap between development freeze (Week 24) and installation start (Week 36) allows for unexpected delays</li>
                <li>• 1-week shipping buffer included in installation phase</li>
                <li>• Critical path items marked with red rings require close monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;