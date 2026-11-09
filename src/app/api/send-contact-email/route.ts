import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export interface SendContactEmailPayload {
  name: string;
  email: string;
  phone?: string;
  role?: string;
  production?: string;
  shootDate?: string;
  message: string;
  formType?: 'contact_page' | 'quick_inquiry' | 'studio_quote' | string;
  quoteDetails?: {
    poNumber?: string;
    productionTitle?: string;
    productionCompany?: string;
    items?: Array<{ name: string; quantity: number; price: number; finish?: string; printType?: string }>;
    total?: number;
    subtotal?: number;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: SendContactEmailPayload = await req.json();

    const {
      name,
      email,
      phone = 'Not provided',
      role = 'Production Crew',
      production = 'Undisclosed Project',
      shootDate = 'Not specified',
      message,
      formType = 'general_inquiry',
      quoteDetails,
    } = body;

    // Validate essential fields
    if (!name || !email || (!message && !quoteDetails)) {
      return NextResponse.json(
        { error: 'Missing required inquiry fields: name, email, and message.' },
        { status: 400 }
      );
    }

    const host = process.env.EMAIL_SERVER_HOST || 'smtp.zoho.com';
    const port = parseInt(process.env.EMAIL_SERVER_PORT || '465', 10);
    const user = process.env.EMAIL_SERVER_USER || 'dispatch@europropmoney.de';
    // Support both EMAIL_SERVER_PASSWORD and EMAIL_SERVER as password variable names
    const pass = process.env.EMAIL_SERVER_PASSWORD || process.env.EMAIL_SERVER || '';
    const fromAddress = process.env.EMAIL_FROM || user;
    const dispatchInbox = 'dispatch@europropmoney.de';

    // If SMTP credentials are not configured, simulate gracefully
    if (!pass) {
      console.log(`[Contact Email Simulation] From: ${name} (${email}) - Type: ${formType} - Subject: Production Inquiry`);
      return NextResponse.json({
        success: true,
        simulated: true,
        message: 'Inquiry received successfully. (EMAIL_SERVER / EMAIL_SERVER_PASSWORD not configured)',
      });
    }

    // Configure Nodemailer SMTP Transport for Zoho Mail
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const isQuote = formType === 'studio_quote' && quoteDetails;
    const subjectPrefix = isQuote
      ? `[STUDIO PO REQUISITION] ${quoteDetails.poNumber || 'New PO'} (${name})`
      : `[STUDIO INQUIRY] from ${name} - ${production}`;

    // 1. Dispatch Alert Email to dispatch@europropmoney.de
    const dispatchEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${subjectPrefix}</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
          <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);">
            
            <!-- Header Banner -->
            <div style="background-color: #0f172a; padding: 24px; color: #ffffff; border-bottom: 3px solid #f59e0b;">
              <span style="font-family: monospace; font-size: 11px; color: #f59e0b; text-transform: uppercase; letter-spacing: 1.5px; font-weight: bold;">
                NEW PRODUCTION DESK TRANSMISSION · ${formType.toUpperCase().replace('_', ' ')}
              </span>
              <h2 style="margin: 8px 0 0 0; font-size: 22px; font-weight: 800; color: #ffffff;">
                ${isQuote ? `Studio Requisition: ${quoteDetails.poNumber}` : `Inquiry: ${production}`}
              </h2>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">
                Received: ${new Date().toUTCString()}
              </p>
            </div>

            <!-- Content Body -->
            <div style="padding: 24px;">
              <!-- Contact Information Table -->
              <h3 style="font-size: 12px; text-transform: uppercase; font-family: monospace; color: #64748b; margin: 0 0 10px 0; letter-spacing: 1px;">
                Requester Dossier
              </h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                <tr>
                  <td style="padding: 10px 14px; font-size: 13px; color: #64748b; width: 130px; border-bottom: 1px solid #e2e8f0;">Full Name:</td>
                  <td style="padding: 10px 14px; font-size: 13px; font-weight: bold; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-size: 13px; color: #64748b; border-bottom: 1px solid #e2e8f0;">Email:</td>
                  <td style="padding: 10px 14px; font-size: 13px; font-weight: bold; color: #d97706; border-bottom: 1px solid #e2e8f0;">
                    <a href="mailto:${email}" style="color: #d97706; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-size: 13px; color: #64748b; border-bottom: 1px solid #e2e8f0;">Phone / Signal:</td>
                  <td style="padding: 10px 14px; font-size: 13px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-size: 13px; color: #64748b; border-bottom: 1px solid #e2e8f0;">Role / Title:</td>
                  <td style="padding: 10px 14px; font-size: 13px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${role}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-size: 13px; color: #64748b; border-bottom: 1px solid #e2e8f0;">Production Title:</td>
                  <td style="padding: 10px 14px; font-size: 13px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${production}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-size: 13px; color: #64748b;">Target Shoot Date:</td>
                  <td style="padding: 10px 14px; font-size: 13px; font-weight: bold; color: #0f172a;">${shootDate}</td>
                </tr>
              </table>

              <!-- Message / Special Requests -->
              <h3 style="font-size: 12px; text-transform: uppercase; font-family: monospace; color: #64748b; margin: 0 0 8px 0; letter-spacing: 1px;">
                Message / Requisition Specifics
              </h3>
              <div style="background-color: #fffbe6; border: 1px solid #fef08a; padding: 14px 18px; border-radius: 8px; font-size: 13px; line-height: 1.6; color: #1e293b; white-space: pre-wrap; margin-bottom: 24px;">
                ${message || 'Studio PO Requisition document attached.'}
              </div>

              <!-- Quote Items Table if applicable -->
              ${
                isQuote && quoteDetails.items && quoteDetails.items.length > 0
                  ? `
                <h3 style="font-size: 12px; text-transform: uppercase; font-family: monospace; color: #64748b; margin: 0 0 10px 0; letter-spacing: 1px;">
                  Requisition Items (${quoteDetails.poNumber})
                </h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px;">
                  <thead>
                    <tr style="background-color: #f1f5f9; border-bottom: 2px solid #cbd5e1; text-align: left; color: #475569;">
                      <th style="padding: 8px;">Description</th>
                      <th style="padding: 8px; text-align: center;">Qty</th>
                      <th style="padding: 8px; text-align: right;">Unit</th>
                      <th style="padding: 8px; text-align: right;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${quoteDetails.items
                      .map(
                        (i) => `
                      <tr style="border-bottom: 1px solid #e2e8f0;">
                        <td style="padding: 8px; color: #0f172a;">
                          <strong>${i.name}</strong>
                          ${i.finish ? `<br><span style="color: #64748b; font-size: 11px;">${i.finish}</span>` : ''}
                        </td>
                        <td style="padding: 8px; text-align: center;">${i.quantity}</td>
                        <td style="padding: 8px; text-align: right;">€${i.price.toFixed(2)}</td>
                        <td style="padding: 8px; text-align: right; font-weight: bold;">€${(i.quantity * i.price).toFixed(2)}</td>
                      </tr>
                    `
                      )
                      .join('')}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold; font-size: 14px;">Total Payable:</td>
                      <td style="padding: 10px; text-align: right; font-weight: 800; font-size: 15px; color: #d97706;">€${(quoteDetails.total || 0).toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              `
                  : ''
              }
            </div>

            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 14px 24px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
              Reply directly to this email or reach the requester at ${email} / ${phone}
            </div>
          </div>
        </body>
      </html>
    `;

    // 2. Requester Confirmation / Auto-Ack
    const clientAckHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>We Received Your Transmission - Euro Prop Money EU</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            
            <div style="background-color: #0f172a; padding: 28px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 1px; color: #fbbf24;">
                CINE EURO PROPS EU
              </h1>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #cbd5e1; font-family: monospace;">
                STUDIO DISPATCH DESK & REQUISITIONS HUB
              </p>
            </div>

            <div style="padding: 24px;">
              <h2 style="font-size: 18px; color: #0f172a; margin-top: 0;">
                Transmission Confirmed, ${name}
              </h2>
              <p style="font-size: 13px; color: #475569; line-height: 1.6;">
                Thank you for contacting the Euro Prop Money dispatch desk. Your inquiry for <strong>${production}</strong> has been logged into our studio support queue.
              </p>

              <div style="background-color: #f1f5f9; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 4px; margin: 20px 0;">
                <p style="margin: 0; font-size: 13px; color: #1e293b; font-weight: 600;">
                  Average Response Window: Under 15 Minutes for Active Call Sheets
                </p>
                <p style="margin: 4px 0 0 0; font-size: 11px; color: #64748b;">
                  Need immediate clearance or emergency soundstage delivery? Call our 24/7 hotline directly: +49 30 8492 1000.
                </p>
              </div>

              <div style="font-size: 12px; color: #64748b; background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; border-radius: 8px;">
                <strong style="color: #0f172a;">Summary of Your Transmission:</strong><br>
                <strong>Shoot Date:</strong> ${shootDate}<br>
                <strong>Role:</strong> ${role}<br>
                <strong>Message:</strong><br>
                <span style="font-style: italic; color: #334155;">"${message || 'Studio PO Requisition'}"</span>
              </div>
            </div>

            <div style="background-color: #0f172a; padding: 20px; text-align: center; font-size: 11px; color: #94a3b8;">
              <p style="margin: 0 0 4px 0; color: #ffffff; font-weight: bold;">Euro Prop Money EU · Berlin Central Vault</p>
              <p style="margin: 0;">Stralauer Allee 7, 10245 Berlin · Email: dispatch@europropmoney.de</p>
              <p style="margin: 8px 0 0 0; font-size: 10px; color: #64748b;">All reproductions certified under European Central Bank Decision ECB/2013/10.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send dispatch alert email
    const dispatchMailOptions = {
      from: fromAddress,
      to: dispatchInbox,
      replyTo: email,
      subject: subjectPrefix,
      html: dispatchEmailHtml,
    };

    // Send acknowledgement email to client
    const clientMailOptions = {
      from: fromAddress,
      to: email,
      subject: `Inquiry Received - Euro Prop Money EU (${production})`,
      html: clientAckHtml,
    };

    const [dispatchResult, clientResult] = await Promise.all([
      transporter.sendMail(dispatchMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    return NextResponse.json({
      success: true,
      dispatchMessageId: dispatchResult.messageId,
      clientMessageId: clientResult.messageId,
      message: 'Inquiry emails transmitted successfully.',
    });
  } catch (error: any) {
    console.error('[Send Contact Email Error]:', error);
    return NextResponse.json(
      {
        error: 'Failed to transmit inquiry email.',
        details: error.message || String(error),
      },
      { status: 500 }
    );
  }
}
