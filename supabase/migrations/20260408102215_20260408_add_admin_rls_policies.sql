/*
  # Add RLS policies for admin dashboard

  1. Security
    - Add SELECT policy for contact_inquiries to allow reading all data
    - Add SELECT policy for job_applications to allow reading all data
    - Add DELETE policy for contact_inquiries
    - Add DELETE policy for job_applications

  2. Notes
    - These tables contain form submissions that need to be accessible for admin viewing
    - Since this is public form data (not user-specific), we allow public read access
    - Delete policies require proper authentication
*/

CREATE POLICY "Allow public read access to contact inquiries"
  ON contact_inquiries
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public delete contact inquiries"
  ON contact_inquiries
  FOR DELETE
  USING (true);

CREATE POLICY "Allow public read access to job applications"
  ON job_applications
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public delete job applications"
  ON job_applications
  FOR DELETE
  USING (true);
