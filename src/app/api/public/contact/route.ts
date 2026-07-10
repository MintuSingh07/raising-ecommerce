import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || "info@wonderappliances.com";
const BRAND_BLUE = "#0A52D6";
const BRAND_GOLD = "#FFB800";

// ─── Shared HTML shell ────────────────────────────────────────────────────────
function wrapEmail(bodyContent: string, previewText: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>RISING — Wonder Appliances</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <!-- Preview text (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;color:#f1f5f9;font-size:1px;">
    ${previewText}
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;">

          <!-- ══ HEADER ══ -->
          <tr>
            <td style="background:linear-gradient(135deg,#0a1a3a 0%,#0A52D6 100%);border-radius:20px 20px 0 0;padding:36px 40px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <!-- Logo text -->
                    <div style="display:inline-block;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:6px 14px;">
                      <span style="font-size:18px;font-weight:800;color:#ffffff;letter-spacing:3px;text-transform:uppercase;">RISING</span>
                    </div>
                    <div style="margin-top:4px;">
                      <span style="font-size:10px;color:rgba(255,255,255,0.55);letter-spacing:1.5px;text-transform:uppercase;">Wonder Appliances Pvt. Ltd.</span>
                    </div>
                  </td>
                  <td align="right" valign="middle">
                    <!-- Decorative dot -->
                    <div style="width:42px;height:42px;border-radius:50%;background:rgba(255,184,0,0.15);border:2px solid rgba(255,184,0,0.4);display:inline-block;text-align:center;line-height:40px;">
                      <span style="font-size:18px;">✉</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ══ BODY ══ -->
          <tr>
            <td style="background:#ffffff;padding:40px 40px 32px;">
              ${bodyContent}
            </td>
          </tr>

          <!-- ══ FOOTER ══ -->
          <tr>
            <td style="background:#0a1a3a;border-radius:0 0 20px 20px;padding:28px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:12px;color:rgba(255,255,255,0.8);font-weight:700;">RISING — Lighting the Future of Reliability</p>
                    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.45);">Wonder Appliances Pvt. Ltd. · E 330A, MIA, Basni Phase II, Jodhpur – 342005, Rajasthan, India</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);margin-top:16px;">
                    <p style="margin:16px 0 0;font-size:10px;color:rgba(255,255,255,0.3);text-align:center;">
                      This email was automatically generated from the RISING website. Please do not reply directly to this message.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Field row helper ─────────────────────────────────────────────────────────
function fieldRow(label: string, value: string, isLink?: string): string {
  const displayValue = isLink
    ? `<a href="${isLink}" style="color:${BRAND_BLUE};text-decoration:none;font-weight:600;">${value}</a>`
    : `<span style="color:#1e293b;font-weight:600;">${value || "—"}</span>`;

  return `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;vertical-align:top;width:38%;">
      <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#94a3b8;">${label}</span>
    </td>
    <td style="padding:10px 0 10px 16px;border-bottom:1px solid #f1f5f9;vertical-align:top;">
      <span style="font-size:13px;">${displayValue}</span>
    </td>
  </tr>`;
}

// ─── Contact form email ───────────────────────────────────────────────────────
function buildContactEmail(data: Record<string, string>) {
  const subject = `📩 New Contact Message: ${data.subject || "General Inquiry"}`;

  const body = `
    <!-- Badge -->
    <div style="display:inline-block;background:#eff6ff;border:1px solid #bfdbfe;border-radius:100px;padding:5px 14px;margin-bottom:20px;">
      <span style="font-size:11px;font-weight:700;color:${BRAND_BLUE};text-transform:uppercase;letter-spacing:1px;">📋 Contact Form Submission</span>
    </div>

    <h1 style="margin:0 0 6px;font-size:22px;font-weight:800;color:#0f172a;letter-spacing:-0.3px;">
      New Message Received
    </h1>
    <p style="margin:0 0 28px;font-size:13px;color:#64748b;">
      A visitor has submitted the contact form on <strong>rising.in</strong>. Review the details below.
    </p>

    <!-- Info table -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:24px;">
      ${fieldRow("Full Name", data.name)}
      ${fieldRow("Email", data.email, `mailto:${data.email}`)}
      ${fieldRow("Phone", data.phone || "Not provided")}
      ${fieldRow("Subject", data.subject || "Not provided")}
    </table>

    <!-- Message block -->
    <div style="background:#f8fafc;border-left:4px solid ${BRAND_BLUE};border-radius:0 12px 12px 0;padding:20px 24px;margin-bottom:28px;">
      <p style="margin:0 0 8px;font-size:10px;font-weight:700;color:${BRAND_BLUE};text-transform:uppercase;letter-spacing:1px;">Message</p>
      <p style="margin:0;font-size:14px;line-height:1.75;color:#334155;white-space:pre-wrap;">${data.message}</p>
    </div>

    <!-- CTA -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td style="border-radius:100px;background:${BRAND_BLUE};">
          <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject || "Your Inquiry")}" style="display:inline-block;padding:12px 28px;font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.3px;">
            Reply to ${data.name} →
          </a>
        </td>
      </tr>
    </table>

    <!-- Timestamp -->
    <p style="margin:28px 0 0;font-size:11px;color:#94a3b8;">
      Submitted on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "long", timeStyle: "short" })} IST
    </p>
  `;

  return {
    subject,
    html: wrapEmail(body, `New contact message from ${data.name} — ${data.subject || "General Inquiry"}`),
  };
}

// ─── Distributor application email ───────────────────────────────────────────
function buildDistributorEmail(data: Record<string, string>) {
  const subject = `🤝 Distributor Application: ${data.companyName}`;

  const body = `
    <!-- Badge -->
    <div style="display:inline-block;background:#fefce8;border:1px solid #fde68a;border-radius:100px;padding:5px 14px;margin-bottom:20px;">
      <span style="font-size:11px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:1px;">🤝 Distributorship Application</span>
    </div>

    <h1 style="margin:0 0 6px;font-size:22px;font-weight:800;color:#0f172a;letter-spacing:-0.3px;">
      New Distributor Inquiry
    </h1>
    <p style="margin:0 0 28px;font-size:13px;color:#64748b;">
      A business has applied to become a RISING distributor. Review the application details below.
    </p>

    <!-- Highlight card -->
    <div style="background:linear-gradient(135deg,#eff6ff,#f0f9ff);border:1px solid #bfdbfe;border-radius:16px;padding:20px 24px;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:${BRAND_BLUE};text-transform:uppercase;letter-spacing:1px;">Company</p>
      <p style="margin:0;font-size:20px;font-weight:800;color:#0f172a;">${data.companyName}</p>
    </div>

    <!-- Info table -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:24px;">
      ${fieldRow("Contact Person", data.contactName)}
      ${fieldRow("Business Email", data.email, `mailto:${data.email}`)}
      ${fieldRow("Phone / Mobile", data.phone)}
      ${fieldRow("Territory / City", data.location || "Not specified")}
      ${fieldRow("Years of Experience", data.experience ? `${data.experience} Years` : "Not specified")}
      ${fieldRow("Investment Capability", data.investment || "Not specified")}
    </table>

    <!-- Notes block -->
    ${data.message ? `
    <div style="background:#f8fafc;border-left:4px solid ${BRAND_GOLD};border-radius:0 12px 12px 0;padding:20px 24px;margin-bottom:28px;">
      <p style="margin:0 0 8px;font-size:10px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:1px;">Additional Notes</p>
      <p style="margin:0;font-size:14px;line-height:1.75;color:#334155;white-space:pre-wrap;">${data.message}</p>
    </div>
    ` : ""}

    <!-- CTAs -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td style="border-radius:100px;background:${BRAND_BLUE};margin-right:12px;">
          <a href="mailto:${data.email}?subject=Re: Your RISING Distributorship Application" style="display:inline-block;padding:12px 28px;font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.3px;">
            Reply to Applicant →
          </a>
        </td>
        <td style="width:12px;"></td>
        <td style="border-radius:100px;background:#f1f5f9;border:1px solid #e2e8f0;">
          <a href="tel:${data.phone}" style="display:inline-block;padding:12px 28px;font-size:13px;font-weight:700;color:#334155;text-decoration:none;letter-spacing:0.3px;">
            Call ${data.phone}
          </a>
        </td>
      </tr>
    </table>

    <!-- Timestamp -->
    <p style="margin:28px 0 0;font-size:11px;color:#94a3b8;">
      Applied on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "long", timeStyle: "short" })} IST
    </p>
  `;

  return {
    subject,
    html: wrapEmail(body, `New distributorship application from ${data.companyName} — ${data.contactName}`),
  };
}

// ─── POST handler ─────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body as { type: string; data: Record<string, string> };

    if (!type || !data) {
      return NextResponse.json({ error: "type and data are required" }, { status: 400 });
    }

    // Build email content
    let emailContent: { subject: string; html: string };
    if (type === "contact") {
      if (!data.name || !data.email || !data.message) {
        return NextResponse.json({ error: "name, email and message are required" }, { status: 400 });
      }
      emailContent = buildContactEmail(data);
    } else if (type === "distributor") {
      if (!data.companyName || !data.contactName || !data.email || !data.phone) {
        return NextResponse.json({ error: "companyName, contactName, email and phone are required" }, { status: 400 });
      }
      emailContent = buildDistributorEmail(data);
    } else {
      return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 });
    }

    // ── Send via Resend if API Key is configured ──────────────────────────────
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const fromAddress = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
        const fromName = "RISING Web Portal";

        const { data: resendData, error: resendError } = await resend.emails.send({
          from: `"${fromName}" <${fromAddress}>`,
          to: [RECIPIENT_EMAIL],
          replyTo: `"${data.name || data.contactName}" <${data.email}>`,
          subject: emailContent.subject,
          html: emailContent.html,
        });

        if (resendError) {
          throw new Error(resendError.message);
        }

        console.log(`[contact] Email sent via Resend → ${RECIPIENT_EMAIL} | ID: ${resendData?.id}`);
        return NextResponse.json({ success: true, message: "Message sent successfully." });
      } catch (resendErr) {
        const errMsg = resendErr instanceof Error ? resendErr.message : String(resendErr);
        console.error("[contact] Resend failed:", errMsg);
        throw resendErr; // Throw to trigger 500 error on frontend with the specific message
      }
    }

    // ── Build transporter ────────────────────────────────────────────────────
    let transporter: nodemailer.Transporter;
    let usingTestAccount = false;

    const smtpConfigured =
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      !process.env.SMTP_USER.includes("your-gmail");

    if (smtpConfigured) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587", 10),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Dev fallback — Ethereal test account
      try {
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
          host: testAccount.smtp.host,
          port: testAccount.smtp.port,
          secure: testAccount.smtp.secure,
          auth: { user: testAccount.user, pass: testAccount.pass },
        });
        usingTestAccount = true;
        console.log("[contact] No SMTP configured — using Ethereal test account");
      } catch {
        // Last resort — log to console
        console.log("[MOCK EMAIL]", { to: RECIPIENT_EMAIL, subject: emailContent.subject, data });
        return NextResponse.json({
          success: true,
          message: "Submission received (logged to server — configure SMTP to send real emails).",
          dev: true,
        });
      }
    }

    // ── Send email ───────────────────────────────────────────────────────────
    const fromName = "RISING Web Portal";
    const fromAddress = process.env.SMTP_USER || "no-reply@rising.in";

    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      to: RECIPIENT_EMAIL,
      replyTo: `"${data.name || data.contactName}" <${data.email}>`,
      subject: emailContent.subject,
      html: emailContent.html,
    });

    if (usingTestAccount) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log("[contact] Email preview (Ethereal):", previewUrl);
      return NextResponse.json({
        success: true,
        message: "Message sent! (Ethereal preview — configure SMTP_USER & SMTP_PASS for real delivery)",
        previewUrl,
      });
    }

    console.log(`[contact] Email sent → ${RECIPIENT_EMAIL} | Subject: ${emailContent.subject}`);
    return NextResponse.json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[contact] Failed to send email:", msg);
    return NextResponse.json({ error: "Failed to send email: " + msg }, { status: 500 });
  }
}
