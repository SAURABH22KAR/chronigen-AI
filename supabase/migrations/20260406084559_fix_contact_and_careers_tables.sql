/*
  # Fix Contact Inquiries and Job Applications Tables

  Recreates tables with all required columns after previous migration
  incomplete creation.

  1. Tables
    - `contact_inquiries` - stores contact form submissions
    - `job_applications` - stores job application submissions
  2. Security
    - RLS enabled with public insert, authenticated read policies
*/

DROP TABLE IF EXISTS contact_inquiries CASCADE;
DROP TABLE IF EXISTS job_applications CASCADE;

CREATE TABLE contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id text NOT NULL,
  job_title text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  linkedin_profile text,
  resume_url text,
  cover_letter text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact inquiries"
  ON contact_inquiries
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view contact inquiries"
  ON contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can submit job applications"
  ON job_applications
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view job applications"
  ON job_applications
  FOR SELECT
  TO authenticated
  USING (true);
