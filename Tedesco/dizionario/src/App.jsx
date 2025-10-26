import React, { useState } from 'react';
import { FileText, DollarSign, CheckSquare, Users } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('budget');

  // Budget calculations
  const labor = {
    creativeDirector: { hours: 80, rate: 185, total: 14800 },
    seniorDesigner: { hours: 120, rate: 155, total: 18600 },
    uxDesigner: { hours: 100, rate: 140, total: 14000 },
    developer: { hours: 180, rate: 155, total: 27900 },
    projectManager: { hours: 90, rate: 160, total: 14400 },
    contentStrategist: { hours: 60, rate: 130, total: 7800 }
  };

  const laborTotal = Object.values(labor).reduce((sum, item) => sum + item.total, 0);

  const materials = {
    software: 8000,
    assets: 5000,
    userTesting: 3000,
    technicalConsult: 4000,
    installation: 12000
  };

  const materialsTotal = Object.values(materials).reduce((sum, val) => sum + val, 0);
  const subtotal = laborTotal + materialsTotal;
  const contingency = subtotal * 0.15;
  const overhead = subtotal * 0.20;
  const totalBudget = subtotal + contingency + overhead;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-red-600">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Swiss Government Expo Project</h1>
          <p className="text-gray-600">Interactive Installation - Budget & Closure Documentation</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('budget')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'budget'
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <DollarSign size={20} />
              Task 1: Budget
            </button>
            <button
              onClick={() => setActiveTab('rfp')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'rfp'
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText size={20} />
              Task 2: RFP Analysis
            </button>
            <button
              onClick={() => setActiveTab('closure')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'closure'
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <CheckSquare size={20} />
              Exercise 2: Closure
            </button>
            <button
              onClick={() => setActiveTab('retro')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'retro'
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users size={20} />
              Retrospective
            </button>
          </div>
        </div>

        {/* Budget Tab */}
        {activeTab === 'budget' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Labor Costs</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4">Role</th>
                      <th className="text-right py-3 px-4">Hours</th>
                      <th className="text-right py-3 px-4">Rate (CHF)</th>
                      <th className="text-right py-3 px-4">Total (CHF)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">Creative Director</td>
                      <td className="text-right py-3 px-4">{labor.creativeDirector.hours}</td>
                      <td className="text-right py-3 px-4">{labor.creativeDirector.rate}</td>
                      <td className="text-right py-3 px-4 font-semibold">{labor.creativeDirector.total.toLocaleString()}</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">Senior Designer</td>
                      <td className="text-right py-3 px-4">{labor.seniorDesigner.hours}</td>
                      <td className="text-right py-3 px-4">{labor.seniorDesigner.rate}</td>
                      <td className="text-right py-3 px-4 font-semibold">{labor.seniorDesigner.total.toLocaleString()}</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">UX Designer</td>
                      <td className="text-right py-3 px-4">{labor.uxDesigner.hours}</td>
                      <td className="text-right py-3 px-4">{labor.uxDesigner.rate}</td>
                      <td className="text-right py-3 px-4 font-semibold">{labor.uxDesigner.total.toLocaleString()}</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">Developer</td>
                      <td className="text-right py-3 px-4">{labor.developer.hours}</td>
                      <td className="text-right py-3 px-4">{labor.developer.rate}</td>
                      <td className="text-right py-3 px-4 font-semibold">{labor.developer.total.toLocaleString()}</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">Project Manager</td>
                      <td className="text-right py-3 px-4">{labor.projectManager.hours}</td>
                      <td className="text-right py-3 px-4">{labor.projectManager.rate}</td>
                      <td className="text-right py-3 px-4 font-semibold">{labor.projectManager.total.toLocaleString()}</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">Content Strategist</td>
                      <td className="text-right py-3 px-4">{labor.contentStrategist.hours}</td>
                      <td className="text-right py-3 px-4">{labor.contentStrategist.rate}</td>
                      <td className="text-right py-3 px-4 font-semibold">{labor.contentStrategist.total.toLocaleString()}</td>
                    </tr>
                    <tr className="bg-red-50 font-bold">
                      <td className="py-3 px-4" colSpan="3">Subtotal Labor</td>
                      <td className="text-right py-3 px-4">CHF {laborTotal.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Material and Service Costs</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span>Software/Technology (projection, sensors, interactive tech)</span>
                  <span className="font-semibold">CHF {materials.software.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Assets (3D models, media, AR content)</span>
                  <span className="font-semibold">CHF {materials.assets.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>User Testing/Research</span>
                  <span className="font-semibold">CHF {materials.userTesting.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Technical Consultation</span>
                  <span className="font-semibold">CHF {materials.technicalConsult.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Installation Materials & Setup</span>
                  <span className="font-semibold">CHF {materials.installation.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-3 bg-red-50 px-3 rounded font-bold">
                  <span>Subtotal Materials</span>
                  <span>CHF {materialsTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Contingency and Overhead</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span>Project Contingency (15%)</span>
                  <span className="font-semibold">CHF {contingency.toLocaleString('de-CH', {maximumFractionDigits: 0})}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Overhead (20%)</span>
                  <span className="font-semibold">CHF {overhead.toLocaleString('de-CH', {maximumFractionDigits: 0})}</span>
                </div>
                <div className="flex justify-between py-4 bg-red-600 text-white px-4 rounded-lg text-xl font-bold mt-4">
                  <span>Total Project Budget</span>
                  <span>CHF {totalBudget.toLocaleString('de-CH', {maximumFractionDigits: 0})}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Cost Assumptions Justification</h3>
              <p className="text-gray-700 mb-3">
                The budget reflects a multi-sensory interactive installation requiring specialized technical skills and hardware. Developer hours are highest (180h) due to complex AR/projection integration and sensor programming. Material costs emphasize installation hardware and interactive technology essential for the immersive experience. The 15% contingency addresses technical integration risks inherent in innovative installations.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3 mt-4">Budget Risk Assessment</h3>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="font-semibold text-gray-800 mb-2">Risk: Technical Integration Complexity</p>
                <p className="text-gray-700">
                  The integration of multiple technologies (projection, AR, sensors, sound) presents significant technical challenges that may require additional development time or specialized consultation. Our 15% contingency (CHF {contingency.toLocaleString('de-CH', {maximumFractionDigits: 0})}) specifically addresses this risk, covering approximately 27 additional developer hours or unforeseen technical requirements during installation and testing phases.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* RFP Analysis Tab */}
        {activeTab === 'rfp' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">RFP Engagement Model Analysis</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-red-600 pl-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">What engagement model is requested?</h3>
                <p className="text-gray-700">
                  Fixed-price (lump sum) contract model. The client requires a single, predetermined price for the complete project scope including design, development, and implementation. All work must be delivered within the agreed budget, with changes requiring formal change orders.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">What risks does this create for your team?</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Scope creep without compensation:</strong> Client requests beyond initial scope may be difficult to identify and charge for</li>
                  <li><strong>Underestimation risk:</strong> If hours or complexity are underestimated, the team absorbs losses</li>
                  <li><strong>Technical unknowns:</strong> Innovative installations may reveal unforeseen challenges that increase costs</li>
                  <li><strong>Client approval delays:</strong> Extended review cycles eat into budget without additional compensation</li>
                  <li><strong>Quality vs. budget tension:</strong> Pressure to cut corners if project exceeds estimates</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">How should contingency be adjusted?</h3>
                <p className="text-gray-700 mb-3">
                  Contingency should be increased to 15-20% (we used 15%) for fixed-price contracts due to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Higher risk of absorbing unforeseen costs</li>
                  <li>Technical innovation uncertainty in interactive installations</li>
                  <li>Limited flexibility to negotiate additional fees</li>
                  <li>Buffer for client-induced delays or iteration requests</li>
                  <li>Protection against vendor or technology issues</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">What scope boundaries must be crystal clear?</h3>
                <div className="space-y-3 text-gray-700">
                  <p className="font-semibold">Critical scope boundaries to define:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Number of installations:</strong> Single location or multiple zones</li>
                    <li><strong>Interaction types:</strong> Specific technologies (AR, projection, sensors) and their extent</li>
                    <li><strong>Content volume:</strong> Number of stories, media assets, 3D models, languages</li>
                    <li><strong>Revision rounds:</strong> Maximum number of design/development iterations included</li>
                    <li><strong>Testing scope:</strong> User testing sessions, locations, participant numbers</li>
                    <li><strong>Installation duration:</strong> Setup time, on-site support hours</li>
                    <li><strong>Training:</strong> Staff training sessions and materials included</li>
                    <li><strong>Maintenance period:</strong> What's included in 6-month support (hours, response time)</li>
                    <li><strong>Hardware ownership:</strong> Who provides and owns specialized equipment</li>
                    <li><strong>Change order process:</strong> Clear procedure and pricing for out-of-scope requests</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Closure Tab */}
        {activeTab === 'closure' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Closure Checklist - Expo Installation</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <CheckSquare className="text-red-600" size={24} />
                  1. Deliverable Closure
                </h3>
                <div className="space-y-2 ml-8">
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>All interactive installation components tested and operational</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Source files and assets delivered to client repository</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Final client sign-off obtained on all deliverables</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Content (stories, media, translations) approved and integrated</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FileText className="text-red-600" size={24} />
                  2. Documentation & Knowledge Transfer
                </h3>
                <div className="space-y-2 ml-8">
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Installation operation manual delivered</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Technical documentation and architecture diagrams completed</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Troubleshooting guide and emergency procedures documented</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Staff training sessions completed with attendance records</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Content update procedures and guidelines provided</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <DollarSign className="text-red-600" size={24} />
                  3. Financial & Administrative
                </h3>
                <div className="space-y-2 ml-8">
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Final invoice submitted (30% final payment)</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>All vendor and contractor payments processed</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Project budget variance report completed</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Equipment and software licenses transferred or terminated</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Users className="text-red-600" size={24} />
                  4. Stakeholder & Relationship
                </h3>
                <div className="space-y-2 ml-8">
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Client retrospective meeting conducted</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Testimonial or case study approval requested</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Thank you notes sent to key stakeholders and team</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Future collaboration opportunities identified and documented</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FileText className="text-red-600" size={24} />
                  5. Portfolio & Learning
                </h3>
                <div className="space-y-2 ml-8">
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Photography/video of installation captured</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Case study written and published (with client approval)</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Internal lessons learned session completed</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Project retrospective findings documented and shared</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Awards and recognition opportunities identified</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <CheckSquare className="text-red-600" size={24} />
                  6. Support Transition
                </h3>
                <div className="space-y-2 ml-8">
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>6-month maintenance plan activated</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Support contact protocols and escalation paths established</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Monitoring system and analytics dashboard access provided</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Regular check-in schedule for 6-month period established</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <input type="checkbox" className="w-5 h-5" />
                    <span>Hardware warranty and vendor support information transferred</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Retrospective Tab */}
        {activeTab === 'retro' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Client Retrospective Planning</h2>
            
            <div className="mb-8 border-l-4 border-red-600 pl-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">1-Hour Retrospective Agenda</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="font-bold text-red-600 min-w-20">0:00-0:05</div>
                  <div>
                    <div className="font-semibold">Welcome and Objective Setting</div>
                    <div className="text-gray-600 text-sm">Introduction, agenda overview, and retrospective goals</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="font-bold text-red-600 min-w-20">0:05-0:20</div>
                  <div>
                    <div className="font-semibold">Project Success Review</div>
                    <div className="text-gray-600 text-sm">Review deliverables, timeline adherence, and achievement of project objectives. Celebrate wins and acknowledge the team's efforts.</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="font-bold text-red-600 min-w-20">0:20-0:35</div>
                  <div>
                    <div className="font-semibold">What Went Well & Improvement Areas</div>
                    <div className="text-gray-600 text-sm">Structured discussion using feedback questions below. Focus on collaboration, communication, and process effectiveness.</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="font-bold text-red-600 min-w-20">0:35-0:50</div>
                  <div>
                    <div className="font-semibold">Installation Performance & User Feedback</div>
                    <div className="text-gray-600 text-sm">Review visitor engagement data, technical performance during Expo, and any early feedback from the public.</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="font-bold text-red-600 min-w-20">0:50-0:55</div>
                  <div>
                    <div className="font-semibold">Forward Planning</div>
                    <div className="text-gray-600 text-sm">Discuss maintenance expectations, potential future collaborations, and opportunities for promotion or evolution of the installation.</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="font-bold text-red-600 min-w-20">0:55-1:00</div>
                  <div>
                    <div className="font-semibold">Action Items and Next Steps</div>
                    <div className="text-gray-600 text-sm">Summarize key takeaways, assign action items, and confirm next touchpoints during the 6-month support period.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-l-4 border-green-600 pl-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Client Feedback Questions</h3>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-semibold text-gray-800 mb-2">1. Quantitative Question</div>
                  <p className="text-gray-700 mb-3">
                    "On a scale of 1-10, how would you rate our team's performance in the following areas:"
                  </p>
                  <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                    <li>Communication and responsiveness</li>
                    <li>Technical execution and quality</li>
                    <li>Meeting deadlines and budget</li>
                    <li>Creative vision and innovation</li>
                    <li>Problem-solving during challenges</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-semibold text-gray-800 mb-2">2. Qualitative Question</div>
                  <p className="text-gray-700">
                    "What aspect of our collaboration exceeded your expectations, and what one thing could we have done differently to improve your experience with this project?"
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-semibold text-gray-800 mb-2">3. Forward-looking Question</div>
                  <p className="text-gray-700">
                    "As the installation runs for the next 6 months, what are your priorities for support and potential enhancements? Are there future projects or initiatives where you envision a similar collaboration?"
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <h4 className="font-semibold text-gray-800 mb-2">💡 Retrospective Best Practices</h4>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Create a safe, blame-free environment for honest feedback</li>
                <li>• Focus on actionable insights rather than dwelling on problems</li>
                <li>• Document all feedback and commitments for follow-up</li>
                <li>• Balance appreciation with constructive improvement areas</li>
                <li>• Follow up on action items within 1 week of the meeting</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;