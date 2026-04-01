/*
  # Fix RLS Policy Security Issues

  1. Contact Inquiries Table
    - Replace overly permissive INSERT policy with validated constraints
    - Rename policy to better reflect intentional public submissions
    - Add basic validation to prevent empty submissions

  2. Job Applications Table
    - Replace overly permissive INSERT policy with validated constraints
    - Rename policy to better reflect intentional public submissions
    - Ensure only valid data is inserted

  3. Design Notes
    - These tables intentionally allow public submissions (contact forms, job applications)
    - Policies enforce that data is not null and follows basic validation rules
    - SELECT policies remain for authenticated admin access to review submissions
    - This is a legitimate use case where public write access is required
*/

DO $$
BEGIN
  -- Drop existing problematic policies
  DROP POLICY IF EXISTS "Anyone can submit contact inquiry" ON contact_inquiries;
  DROP POLICY IF EXISTS "Anyone can submit job applications" ON job_applications;
  
  -- Contact inquiries - allow public submissions with validation
  CREATE POLICY "Public submissions for contact inquiries"
    ON contact_inquiries
    FOR INSERT
    TO anon
    WITH CHECK (
      name IS NOT NULL AND
      name != '' AND
      email IS NOT NULL AND
      email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$' AND
      message IS NOT NULL AND
      message != ''
    );

  -- Job applications - allow public submissions with validation
  CREATE POLICY "Public submissions for job applications"
    ON job_applications
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
      job_id IS NOT NULL AND
      job_id != '' AND
      job_title IS NOT NULL AND
      job_title != '' AND
      full_name IS NOT NULL AND
      full_name != '' AND
      email IS NOT NULL AND
      email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$' AND
      phone IS NOT NULL AND
      phone != ''
    );
END $$;
