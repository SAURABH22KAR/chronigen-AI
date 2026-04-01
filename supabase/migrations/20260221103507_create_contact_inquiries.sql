/*
  # Create contact inquiries table

  1. New Tables
    - `contact_inquiries`
      - `id` (uuid, primary key) - Unique identifier for each inquiry
      - `name` (text) - Name of the person submitting the inquiry
      - `email` (text) - Email address for follow-up
      - `company` (text, optional) - Company name if provided
      - `message` (text) - The inquiry message
      - `created_at` (timestamptz) - Timestamp of submission
      - `status` (text) - Status of inquiry (new, contacted, resolved)
  
  2. Security
    - Enable RLS on `contact_inquiries` table
    - Add policy for anonymous users to insert their own inquiries
    - Add policy for authenticated users to read all inquiries (for admin purposes)
*/

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact inquiry"
  ON contact_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all inquiries"
  ON contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);