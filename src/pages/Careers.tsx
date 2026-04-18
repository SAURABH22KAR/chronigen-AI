import { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import JobApplicationModal from '../components/JobApplicationModal';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Contract';
  salary: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
}

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [selectedJobForApplication, setSelectedJobForApplication] = useState<{ id: string; title: string } | null>(null);

  const jobs: JobPosting[] = [
    {
      id: 'senior-ai-engineer',
      title: 'Senior AI/ML Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      salary: '$180,000 - $220,000',
      description: 'Lead the development of our next-generation AI models and infrastructure. Work with cutting-edge technologies to build scalable ML systems.',
      responsibilities: [
        'Design and implement machine learning models and algorithms',
        'Architect scalable ML infrastructure and data pipelines',
        'Collaborate with product and data teams to deliver AI features',
        'Mentor junior engineers and conduct code reviews',
        'Research and evaluate emerging AI technologies',
      ],
      qualifications: [
        '5+ years of experience in machine learning or AI',
        'Strong proficiency in Python, TensorFlow, or PyTorch',
        'Experience with cloud platforms (AWS, GCP, or Azure)',
        'MS or PhD in Computer Science, Math, or related field (or equivalent experience)',
        'Published research or significant open-source contributions',
      ],
    },
    {
      id: 'full-stack-engineer',
      title: 'Full-Stack Engineer',
      department: 'Engineering',
      location: 'New York, NY / Remote',
      type: 'Full-time',
      salary: '$140,000 - $180,000',
      description: 'Build robust and scalable web applications that power our AI solutions. Work across frontend and backend to deliver seamless user experiences.',
      responsibilities: [
        'Develop full-stack web applications using React and Node.js',
        'Design and optimize database schemas and APIs',
        'Implement responsive UI/UX designs',
        'Ensure application security and performance',
        'Participate in architecture decisions and code reviews',
      ],
      qualifications: [
        '3+ years of full-stack development experience',
        'Proficiency in React, Node.js, and TypeScript',
        'Experience with SQL and NoSQL databases',
        'Knowledge of REST APIs and microservices architecture',
        'Strong problem-solving skills and attention to detail',
      ],
    },
    {
      id: 'product-manager',
      title: 'Senior Product Manager',
      department: 'Product',
      location: 'Boston, MA / Remote',
      type: 'Full-time',
      salary: '$150,000 - $190,000',
      description: 'Own the product strategy and roadmap for our AI agent platform. Drive product vision and ensure successful delivery of customer-focused features.',
      responsibilities: [
        'Define and communicate product vision and strategy',
        'Gather and prioritize customer requirements',
        'Work cross-functionally with engineering, design, and sales',
        'Analyze market trends and competitive landscape',
        'Track and optimize key product metrics',
      ],
      qualifications: [
        '5+ years in product management or related field',
        'Experience with B2B SaaS products',
        'Understanding of AI/ML technologies and applications',
        'Strong analytical and communication skills',
        'Proven track record of launching successful products',
      ],
    },
    {
      id: 'solutions-architect',
      title: 'Solutions Architect',
      department: 'Sales Engineering',
      location: 'Chicago, IL / Remote',
      type: 'Full-time',
      salary: '$130,000 - $170,000',
      description: 'Partner with enterprise clients to design and implement custom AI solutions. Bridge the gap between business needs and technical capabilities.',
      responsibilities: [
        'Conduct technical discovery with prospective clients',
        'Design solution architecture tailored to client needs',
        'Create technical proposals and presentations',
        'Support sales team in deal closure and technical validation',
        'Provide implementation guidance and best practices',
      ],
      qualifications: [
        '4+ years in solutions engineering or consulting',
        'Experience with AI/ML implementation projects',
        'Strong technical background in software architecture',
        'Excellent communication and presentation skills',
        'Experience with enterprise sales cycles',
      ],
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      department: 'Research',
      location: 'Seattle, WA / Remote',
      type: 'Full-time',
      salary: '$140,000 - $180,000',
      description: 'Develop data-driven insights and advance our AI capabilities. Work on challenging problems that have direct impact on our products.',
      responsibilities: [
        'Conduct exploratory data analysis and statistical modeling',
        'Build and validate predictive models',
        'Implement machine learning pipelines',
        'Collaborate with engineers to productionize models',
        'Present findings and insights to stakeholders',
      ],
      qualifications: [
        '3+ years of data science experience',
        'Strong statistical and mathematical foundation',
        'Proficiency in Python, R, or similar languages',
        'Experience with data visualization and storytelling',
        'MS or PhD in relevant field, or equivalent experience',
      ],
    },
    {
      id: 'technical-writer',
      title: 'Technical Writer',
      department: 'Documentation',
      location: 'Austin, TX / Remote',
      type: 'Full-time',
      salary: '$90,000 - $120,000',
      description: 'Create clear, comprehensive documentation for our AI platform. Help users understand and maximize the value of our products.',
      responsibilities: [
        'Write technical documentation and API references',
        'Create user guides and tutorial content',
        'Collaborate with engineers and product teams',
        'Maintain documentation quality and consistency',
        'Gather feedback and iterate on content',
      ],
      qualifications: [
        '3+ years of technical writing experience',
        'Strong understanding of AI/ML concepts',
        'Proficiency in documentation tools (Markdown, Confluence, etc.)',
        'Excellent written communication skills',
        'Experience with developer-focused documentation',
      ],
    },
    {
      id: 'devops-engineer',
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      location: 'Portland, OR / Remote',
      type: 'Full-time',
      salary: '$130,000 - $170,000',
      description: 'Build and maintain our cloud infrastructure and deployment systems. Ensure reliability, scalability, and security of our platform.',
      responsibilities: [
        'Design and implement CI/CD pipelines',
        'Manage cloud infrastructure on AWS/GCP',
        'Implement monitoring, logging, and alerting systems',
        'Automate deployment and operational processes',
        'Ensure security best practices and compliance',
      ],
      qualifications: [
        '3+ years of DevOps or infrastructure engineering',
        'Experience with Kubernetes and Docker',
        'Proficiency with cloud platforms (AWS, GCP, or Azure)',
        'Strong scripting skills (Python, Bash, Go)',
        'Experience with infrastructure-as-code tools',
      ],
    },
    {
      id: 'sales-executive',
      title: 'Enterprise Sales Executive',
      department: 'Sales',
      location: 'Dallas, TX / Remote',
      type: 'Full-time',
      salary: '$120,000 - $160,000 + Commission',
      description: 'Drive enterprise sales growth by building relationships with C-level executives. Own the full sales cycle for high-value deals.',
      responsibilities: [
        'Identify and prospect new enterprise accounts',
        'Build relationships with decision makers',
        'Present solutions and negotiate contracts',
        'Manage and close complex, multi-stakeholder deals',
        'Exceed revenue targets and expand existing accounts',
      ],
      qualifications: [
        '5+ years of enterprise software sales experience',
        'Proven track record of quota achievement',
        'Experience selling to Fortune 500 companies',
        'Strong negotiation and closing skills',
        'Ability to understand complex technical solutions',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            We're looking for talented individuals to help us build the future of AI. Join us in creating transformative technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
            <Briefcase className="text-blue-400 mx-auto mb-3" size={32} />
            <p className="text-3xl font-bold text-white mb-2">{jobs.length}+</p>
            <p className="text-slate-300">Open Positions</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
            <MapPin className="text-blue-400 mx-auto mb-3" size={32} />
            <p className="text-3xl font-bold text-white mb-2">Remote</p>
            <p className="text-slate-300">Work Anywhere</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
            <Clock className="text-blue-400 mx-auto mb-3" size={32} />
            <p className="text-3xl font-bold text-white mb-2">Growth</p>
            <p className="text-slate-300">Continuous Learning</p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Why Work at Chronigen?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-400 mb-3">Competitive Compensation</h3>
              <p className="text-slate-300">Market-leading salaries, comprehensive benefits, and equity for all levels.</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-400 mb-3">Flexible Work</h3>
              <p className="text-slate-300">Remote-first culture with flexible hours and the ability to work from anywhere.</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-400 mb-3">Professional Development</h3>
              <p className="text-slate-300">Annual learning budget, mentorship programs, and career advancement opportunities.</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-400 mb-3">Health & Wellness</h3>
              <p className="text-slate-300">Comprehensive health insurance, wellness programs, and generous time off.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-8">Open Positions</h2>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-slate-800/30 border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all"
              >
                <button
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  className="w-full px-6 py-6 text-left hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center text-slate-400">
                          <Briefcase size={16} className="mr-2" />
                          {job.department}
                        </div>
                        <div className="flex items-center text-slate-400">
                          <MapPin size={16} className="mr-2" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-slate-400">
                          <Clock size={16} className="mr-2" />
                          {job.type}
                        </div>
                        <div className="flex items-center text-blue-400 font-semibold">
                          <DollarSign size={16} className="mr-2" />
                          {job.salary}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 mt-1">
                      {expandedJob === job.id ? (
                        <ChevronUp className="text-blue-400" size={24} />
                      ) : (
                        <ChevronDown className="text-slate-400" size={24} />
                      )}
                    </div>
                  </div>
                </button>

                {expandedJob === job.id && (
                  <div className="border-t border-slate-700 px-6 py-6 bg-slate-900/50">
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-2">About This Role</h4>
                      <p className="text-slate-300">{job.description}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Responsibilities</h4>
                      <ul className="space-y-2">
                        {job.responsibilities.map((resp, idx) => (
                          <li key={idx} className="text-slate-300 flex items-start">
                            <span className="text-blue-400 mr-3">•</span>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Qualifications</h4>
                      <ul className="space-y-2">
                        {job.qualifications.map((qual, idx) => (
                          <li key={idx} className="text-slate-300 flex items-start">
                            <span className="text-blue-400 mr-3">•</span>
                            {qual}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => setSelectedJobForApplication({ id: job.id, title: job.title })}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors transform hover:scale-105"
                    >
                      Apply Now
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Don't See Your Perfect Role?</h3>
          <p className="text-blue-100 text-lg mb-8">
            Send us your resume and tell us what you're interested in. We're always looking for exceptional talent.
          </p>
          <a
            href="mailto:careers@chronigen.ai"
            className="inline-block bg-white hover:bg-slate-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
          >
            Send Your Resume
          </a>
        </div>

        {selectedJobForApplication && (
          <JobApplicationModal
            jobId={selectedJobForApplication.id}
            jobTitle={selectedJobForApplication.title}
            isOpen={!!selectedJobForApplication}
            onClose={() => setSelectedJobForApplication(null)}
          />
        )}
      </div>
    </div>
  );
}
