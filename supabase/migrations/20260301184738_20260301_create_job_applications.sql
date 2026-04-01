/*
  # Create job applications table

  1. New Tables
    - `job_applications`
      - `id` (uuid, primary key)
      - `job_id` (text, job position identifier)
      - `job_title` (text, job title for reference)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `resume_url` (text, URL or file path)
      - `cover_letter` (text)
      - `linkedin_profile` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `job_applications` table
    - Add policy to allow public applications submission
*/

CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id text NOT NULL,
  job_title text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  resume_url text,
  cover_letter text,
  linkedin_profile text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit job applications"
  ON job_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
