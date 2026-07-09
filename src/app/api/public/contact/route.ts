import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

const OFFICIAL_EMAIL = "info@wonderappliances.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json({ error: "Type and data are required" }, { status: 400 });
    }

    // Configure transport
    let transporter;
    let usingTestAccount = false;

    if (process.env.SMTP_HOST) {
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
      // Fallback: Generate test Ethereal SMTP service for developers
      try {
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
          host: testAccount.smtp.host,
          port: testAccount.smtp.port,
          secure: testAccount.smtp.secure,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
        usingTestAccount = true;
      } catch (err) {
        // Local fallback if no internet or ethereal fails
        console.warn("Ethereal service unavailable, using console fallback", err);
        console.log(`[MOCK EMAIL] To: ${OFFICIAL_EMAIL}, Type: ${type}, Data:`, data);
        return NextResponse.json({
          success: true,
          message: "Contact form submitted (logged to server console).",
        });
      }
    }

    let emailSubject = "";
    let emailHtml = "";

    if (type === "contact") {
      emailSubject = `New Contact Form Message: ${data.subject || "No Subject"}`;
      emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; rounded: 10px;">
          <h2 style="color: #0A52D6; border-bottom: 2px solid #0A52D6; padding-bottom: 10px;">New Contact Message Received</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
          <p><strong>Subject:</strong> ${data.subject || "N/A"}</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #0A52D6; margin-top: 15px; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 11px; color: #999; text-align: center;">Submitted from the Contact Form on Rising Website.</p>
        </div>
      `;
    } else if (type === "distributor") {
      emailSubject = `New Distributorship Application: ${data.companyName}`;
      emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; rounded: 10px;">
          <h2 style="color: #0A52D6; border-bottom: 2px solid #0A52D6; padding-bottom: 10px;">Distributorship Application</h2>
          <p><strong>Company Name:</strong> ${data.companyName}</p>
          <p><strong>Contact Person:</strong> ${data.contactName}</p>
          <p><strong>Business Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Phone / Mobile:</strong> ${data.phone}</p>
          <p><strong>Preferred Territory:</strong> ${data.location || "N/A"}</p>
          <p><strong>Experience:</strong> ${data.experience ? `${data.experience} Years` : "N/A"}</p>
          <p><strong>Investment Capability:</strong> ${data.investment || "N/A"}</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #0A52D6; margin-top: 15px; border-radius: 4px;">
            <h4 style="margin: 0 0 5px 0; color: #333;">Additional Notes:</h4>
            <p style="margin: 0; white-space: pre-wrap;">${data.message || "None provided"}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 11px; color: #999; text-align: center;">Submitted from the Become a Distributor Page on Rising Website.</p>
        </div>
      `;
    }

    const mailOptions = {
      from: `"Rising Web Portal" <${process.env.SMTP_USER || "no-reply@rising.com"}>`,
      to: OFFICIAL_EMAIL,
      replyTo: data.email,
      subject: emailSubject,
      html: emailHtml,
    };

    const info = await transporter.sendMail(mailOptions);

    if (usingTestAccount) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log("Email sent successfully to test Ethereal service!");
      console.log("Preview URL:", previewUrl);
      return NextResponse.json({
        success: true,
        message: "Email sent successfully (test preview mode).",
        previewUrl,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to send email: " + errorMessage },
      { status: 500 }
    );
  }
}
