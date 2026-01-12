import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const contactSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    company: z.string().optional(),
    service: z.enum(["docuware", "erp", "ai", "iso", "other"]),
    requestType: z.enum(["demo", "trial", "consultation"]),
    message: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validatedData = contactSchema.parse(body);

        // Service name mapping
        const serviceNames: Record<string, string> = {
            docuware: "DocuWare ECM",
            erp: "SAP/Epicor ERP Integration",
            ai: "AI OCR Integration",
            iso: "ISO Document Management",
            other: "Other",
        };

        // Request type mapping
        const requestTypeNames: Record<string, string> = {
            demo: "Demo",
            trial: "Trial",
            consultation: "Consultation",
        };

        // Send email via Resend
        const emailResponse = await resend.emails.send({
            from: "WG Website <onboarding@resend.dev>", // Will use Resend's default sender in free tier
            to: [process.env.SALES_EMAIL || "tani.nguyen1989@gmail.com"],
            subject: `🔔 New ${requestTypeNames[validatedData.requestType]} Request - ${validatedData.fullName}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #0054a6 0%, #0066cc 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
                        .header h1 { margin: 0; font-size: 24px; }
                        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                        .info-row { margin: 15px 0; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #0054a6; }
                        .label { font-weight: bold; color: #0054a6; margin-bottom: 5px; }
                        .value { color: #333; }
                        .badge { display: inline-block; padding: 6px 12px; background: #0054a6; color: white; border-radius: 20px; font-size: 12px; font-weight: bold; }
                        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>📋 New Contact Request</h1>
                            <p style="margin: 5px 0 0 0; opacity: 0.9;">From WG Technology Website</p>
                        </div>
                        
                        <div class="content">
                            <div style="margin-bottom: 20px;">
                                <span class="badge">${requestTypeNames[validatedData.requestType].toUpperCase()}</span>
                                <span class="badge" style="background: #059669;">${serviceNames[validatedData.service]}</span>
                            </div>

                            <div class="info-row">
                                <div class="label">👤 Full Name</div>
                                <div class="value">${validatedData.fullName}</div>
                            </div>

                            <div class="info-row">
                                <div class="label">📧 Email</div>
                                <div class="value"><a href="mailto:${validatedData.email}">${validatedData.email}</a></div>
                            </div>

                            <div class="info-row">
                                <div class="label">📱 Phone</div>
                                <div class="value"><a href="tel:${validatedData.phone}">${validatedData.phone}</a></div>
                            </div>

                            ${validatedData.company ? `
                            <div class="info-row">
                                <div class="label">🏢 Company</div>
                                <div class="value">${validatedData.company}</div>
                            </div>
                            ` : ''}

                            <div class="info-row">
                                <div class="label">🎯 Service of Interest</div>
                                <div class="value">${serviceNames[validatedData.service]}</div>
                            </div>

                            <div class="info-row">
                                <div class="label">📝 Request Type</div>
                                <div class="value">${requestTypeNames[validatedData.requestType]}</div>
                            </div>

                            ${validatedData.message ? `
                            <div class="info-row">
                                <div class="label">💬 Message</div>
                                <div class="value">${validatedData.message.replace(/\n/g, '<br>')}</div>
                            </div>
                            ` : ''}

                            <div class="info-row" style="border-left-color: #6b7280;">
                                <div class="label">🕒 Received At</div>
                                <div class="value">${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</div>
                            </div>
                        </div>

                        <div class="footer">
                            <p>This email was sent from the WG Technology website contact form.</p>
                            <p style="color: #0054a6; font-weight: bold;">WG Technology JSC</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
New Contact Request from WG Website

Type: ${requestTypeNames[validatedData.requestType]}
Service: ${serviceNames[validatedData.service]}

Contact Information:
- Name: ${validatedData.fullName}
- Email: ${validatedData.email}
- Phone: ${validatedData.phone}
${validatedData.company ? `- Company: ${validatedData.company}` : ''}

${validatedData.message ? `Message:\n${validatedData.message}` : ''}

Received at: ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
            `.trim(),
        });

        return NextResponse.json(
            { success: true, messageId: emailResponse.data?.id },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact API Error:", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: "Invalid form data", details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, error: "Failed to send email" },
            { status: 500 }
        );
    }
}
