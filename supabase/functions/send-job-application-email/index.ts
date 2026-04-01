import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ApplicationData {
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  resumeUrl?: string;
  coverLetter?: string;
  linkedinProfile?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const data: ApplicationData = await req.json();

    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background-color: #1e40af; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
    .section { margin-bottom: 20px; }
    .label { font-weight: bold; color: #1e40af; margin-top: 10px; }
    .value { color: #555; margin-left: 10px; }
    .footer { margin-top: 20px; font-size: 12px; color: #999; border-top: 1px solid #e5e7eb; padding-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Job Application</h1>
    </div>
    <div class="content">
      <div class="section">
        <div class="label">Position:</div>
        <div class="value">${data.jobTitle}</div>
      </div>

      <div class="section">
        <div class="label">Job ID:</div>
        <div class="value">${data.jobId}</div>
      </div>

      <div class="section">
        <div class="label">Applicant Name:</div>
        <div class="value">${data.fullName}</div>
      </div>

      <div class="section">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>

      <div class="section">
        <div class="label">Phone:</div>
        <div class="value">${data.phone}</div>
      </div>

      ${data.linkedinProfile ? `
      <div class="section">
        <div class="label">LinkedIn Profile:</div>
        <div class="value"><a href="${data.linkedinProfile}" target="_blank">${data.linkedinProfile}</a></div>
      </div>
      ` : ''}

      ${data.resumeUrl ? `
      <div class="section">
        <div class="label">Resume:</div>
        <div class="value"><a href="${data.resumeUrl}" target="_blank">View Resume</a></div>
      </div>
      ` : ''}

      ${data.coverLetter ? `
      <div class="section">
        <div class="label">Cover Letter:</div>
        <div class="value" style="white-space: pre-wrap; background-color: white; padding: 10px; border-left: 3px solid #1e40af;">${data.coverLetter}</div>
      </div>
      ` : ''}

      <div class="footer">
        <p>This is an automated email from the Chronigen careers portal.</p>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    const ownerEmail = Deno.env.get("OWNER_EMAIL") || "careers@chronigen.ai";

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SENDGRID_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: ownerEmail }],
            subject: `New Application: ${data.jobTitle} from ${data.fullName}`,
          },
        ],
        from: {
          email: "noreply@chronigen.ai",
          name: "Chronigen Careers",
        },
        content: [
          {
            type: "text/html",
            value: emailContent,
          },
        ],
        reply_to: {
          email: data.email,
          name: data.fullName,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`SendGrid error: ${error}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Application submitted successfully",
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
