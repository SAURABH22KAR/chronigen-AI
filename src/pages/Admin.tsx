import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Trash2, RefreshCw, Lock, Eye, EyeOff } from 'lucide-react';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === ADMIN_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setValue('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#030712' }}>
      <div className="w-full max-w-sm">
        <div className="glow-card rounded-2xl p-8">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl btn-gradient flex items-center justify-center">
              <Lock size={24} className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-white text-center mb-1">Admin Access</h1>
          <p className="text-slate-500 text-sm text-center mb-8">Enter the admin password to continue</p>

          <form onSubmit={submit} className="space-y-4">
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Password"
                autoFocus
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors pr-11 ${
                  error ? 'border-red-500/60 focus:border-red-500' : 'border-white/10 focus:border-purple-500/50'
                }`}
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-xs text-center">Incorrect password. Try again.</p>
            )}

            <button
              type="submit"
              className="w-full btn-gradient text-white font-semibold py-3 rounded-xl text-sm transition-opacity disabled:opacity-40"
              disabled={!value}
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
}

interface JobApplication {
  id: string;
  job_id: string;
  job_title: string;
  full_name: string;
  email: string;
  phone: string;
  linkedin_profile: string | null;
  resume_url: string | null;
  cover_letter: string | null;
  created_at: string;
}

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [contactSubmissions, setContactSubmissions] = useState<ContactInquiry[]>([]);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'contact' | 'jobs'>('contact');
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [contactData, jobsData] = await Promise.all([
        supabase.from('contact_inquiries').select('*').order('created_at', { ascending: false }),
        supabase.from('job_applications').select('*').order('created_at', { ascending: false }),
      ]);
      if (contactData.error) throw contactData.error;
      if (jobsData.error) throw jobsData.error;
      setContactSubmissions(contactData.data || []);
      setJobApplications(jobsData.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load submissions');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (unlocked) fetchSubmissions();
  }, [unlocked]);

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  const deleteContactSubmission = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return;

    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setContactSubmissions(contactSubmissions.filter(s => s.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete submission');
    }
  };

  const deleteJobApplication = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;

    try {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setJobApplications(jobApplications.filter(a => a.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete application');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">View and manage form submissions</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-500 rounded-lg p-4 text-red-400">
            {error}
          </div>
        )}

        <div className="flex gap-4 mb-8 border-b border-slate-700">
          <button
            onClick={() => setActiveTab('contact')}
            className={`pb-4 px-4 font-semibold transition-colors ${
              activeTab === 'contact'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Contact Inquiries ({contactSubmissions.length})
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`pb-4 px-4 font-semibold transition-colors ${
              activeTab === 'jobs'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Job Applications ({jobApplications.length})
          </button>
          <button
            onClick={fetchSubmissions}
            className="ml-auto pb-4 px-4 text-slate-400 hover:text-slate-300 transition-colors flex items-center gap-2"
            disabled={isLoading}
          >
            <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block text-slate-400">Loading submissions...</div>
          </div>
        ) : activeTab === 'contact' ? (
          <div className="space-y-4">
            {contactSubmissions.length === 0 ? (
              <div className="text-center py-12 bg-slate-800/50 border border-slate-700 rounded-lg">
                <Mail className="mx-auto mb-4 text-slate-500" size={32} />
                <p className="text-slate-400">No contact inquiries yet</p>
              </div>
            ) : (
              contactSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{submission.name}</h3>
                      <p className="text-sm text-slate-400">{formatDate(submission.created_at)}</p>
                    </div>
                    <button
                      onClick={() => deleteContactSubmission(submission.id)}
                      className="text-slate-400 hover:text-red-400 transition-colors p-2"
                      title="Delete submission"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Email:</span>
                      <a href={`mailto:${submission.email}`} className="text-blue-400 hover:underline">
                        {submission.email}
                      </a>
                    </div>
                    {submission.company && (
                      <div>
                        <span className="text-slate-500">Company:</span>
                        <span className="ml-2 text-slate-300">{submission.company}</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-900/50 rounded p-4 border border-slate-700">
                    <p className="text-slate-300 whitespace-pre-wrap">{submission.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {jobApplications.length === 0 ? (
              <div className="text-center py-12 bg-slate-800/50 border border-slate-700 rounded-lg">
                <Mail className="mx-auto mb-4 text-slate-500" size={32} />
                <p className="text-slate-400">No job applications yet</p>
              </div>
            ) : (
              jobApplications.map((application) => (
                <div
                  key={application.id}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{application.full_name}</h3>
                      <p className="text-sm text-blue-400 mb-1">{application.job_title}</p>
                      <p className="text-sm text-slate-400">{formatDate(application.created_at)}</p>
                    </div>
                    <button
                      onClick={() => deleteJobApplication(application.id)}
                      className="text-slate-400 hover:text-red-400 transition-colors p-2"
                      title="Delete application"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Email:</span>
                      <a href={`mailto:${application.email}`} className="text-blue-400 hover:underline">
                        {application.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Phone:</span>
                      <a href={`tel:${application.phone}`} className="text-blue-400 hover:underline">
                        {application.phone}
                      </a>
                    </div>
                    {application.linkedin_profile && (
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">LinkedIn:</span>
                        <a
                          href={application.linkedin_profile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          View Profile
                        </a>
                      </div>
                    )}
                    {application.resume_url && (
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">Resume:</span>
                        <a
                          href={application.resume_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          Download Resume
                        </a>
                      </div>
                    )}
                  </div>

                  {application.cover_letter && (
                    <div className="bg-slate-900/50 rounded p-4 border border-slate-700">
                      <p className="text-sm text-slate-500 mb-2">Cover Letter:</p>
                      <p className="text-slate-300 whitespace-pre-wrap">{application.cover_letter}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
