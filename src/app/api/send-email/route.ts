import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export interface OrderItem {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  finish?: string;
  printType?: string;
  total?: number;
}

export interface SendEmailPayload {
  recipientEmail?: string;
  customerEmail?: string;
  recipientName?: string;
  customerName?: string;
  orderId: string;
  orderDate?: string;
  phone?: string;
  companyName?: string;
  streetAddress?: string;
  apartment?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  paymentMethod?: string;
  shippingMethod?: string;
  shippingCost?: number;
  subtotal?: number;
  total?: number;
  totalPayable?: number;
  orderItems?: OrderItem[];
  items?: OrderItem[];
  orderNotes?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: SendEmailPayload = await req.json();

    const recipientEmail = body.recipientEmail || body.customerEmail;
    const recipientName = body.recipientName || body.customerName || 'Valued Client';
    const orderId = body.orderId;
    const items = body.orderItems || body.items || [];
    const totalPayable = typeof body.total === 'number' 
      ? body.total 
      : typeof body.totalPayable === 'number' 
        ? body.totalPayable 
        : 0;

    // Validation
    if (!orderId || !recipientEmail) {
      return NextResponse.json(
        {
          error: 'Validation Error',
          message: 'Missing required fields: orderId and recipientEmail (or customerEmail).',
        },
        { status: 400 }
      );
    }

    // SMTP Configuration with priority for SMTP_* and fallback to EMAIL_SERVER_*
    const host = process.env.SMTP_HOST || process.env.EMAIL_SERVER_HOST || 'smtp.zoho.com';
    const port = parseInt(process.env.SMTP_PORT || process.env.EMAIL_SERVER_PORT || '465', 10);
    const isSecure = process.env.SMTP_SECURE !== undefined 
      ? process.env.SMTP_SECURE === 'true' 
      : port === 465;
    const user = process.env.SMTP_USER || process.env.EMAIL_SERVER_USER || 'dispatch@europropmoney.de';
    const pass = process.env.SMTP_PASSWORD || process.env.EMAIL_SERVER_PASSWORD || process.env.EMAIL_SERVER || '';
    
    // Sender configuration: "Euro Prop Money" <email@domain.com>
    const rawEmailFrom = process.env.EMAIL_FROM || user;
    const sender = rawEmailFrom.includes('<') 
      ? rawEmailFrom 
      : `"Euro Prop Money" <${rawEmailFrom}>`;

    const dispatchInbox = 'dispatch@europropmoney.de';
    const orderDate = body.orderDate || new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    // Graceful simulation when running in environments without SMTP configured
    if (!pass) {
      console.log(`[SMTP Simulation] Order #${orderId} to ${recipientName} (${recipientEmail}) - Total: €${totalPayable.toFixed(2)}`);
      return NextResponse.json(
        {
          success: true,
          simulated: true,
          orderId,
          message: 'Order confirmation registered. (SMTP_PASSWORD/EMAIL_SERVER not configured)',
        },
        { status: 200 }
      );
    }

    // Create Nodemailer Transporter for Zoho Mail
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: isSecure,
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000, // 10s timeout
      greetingTimeout: 5000,
    });

    const itemsRows = items.map((item) => {
      const lineTotal = typeof item.total === 'number' 
        ? item.total 
        : item.price * item.quantity;
      return `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #1e293b;">
            <strong style="color: #0f172a;">${item.name}</strong>
            ${item.finish ? `<br><span style="font-size: 11px; color: #64748b;">Finish: ${item.finish}</span>` : ''}
            ${item.printType ? `<span style="font-size: 11px; color: #64748b;"> · ${item.printType}</span>` : ''}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #1e293b; text-align: center;">
            ${item.quantity}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #1e293b; text-align: right;">
            €${item.price.toFixed(2)}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: bold; color: #0f172a; text-align: right;">
            €${lineTotal.toFixed(2)}
          </td>
        </tr>
      `;
    }).join('');

    const formattedAddress = [
      body.streetAddress,
      body.apartment,
      body.city,
      body.state,
      body.postcode,
      body.country || 'Germany',
    ].filter(Boolean).join(', ') || 'Berlin Central Soundstage / Pickup';

    const paymentMethodLabel = body.paymentMethod === 'usdt'
      ? 'USDT (Tether TRC-20 Blockchain Settlement)'
      : 'Direct Bank Transfer (EU IBAN 0% Reverse Charge Invoicing)';

    // 1. Customer Confirmation HTML Email
    const customerHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation #${orderId}</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
          <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            
            <!-- Brand Header -->
            <div style="background-color: #0f172a; padding: 28px; text-align: center; color: #ffffff; border-bottom: 3px solid #f59e0b;">
              <span style="font-family: monospace; font-size: 11px; color: #f59e0b; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">
                OFFICIAL ORDER REQUISITION
              </span>
              <h1 style="margin: 8px 0 0 0; font-size: 24px; font-weight: 800; color: #ffffff;">
                CINE EURO PROPS EU
              </h1>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #94a3b8; font-family: monospace;">
                European Central Bank ECB/2013/10 Certified Studio Supplier
              </p>
            </div>

            <!-- Body Content -->
            <div style="padding: 28px;">
              <h2 style="font-size: 18px; color: #0f172a; margin-top: 0;">
                Order Confirmation #${orderId}
              </h2>
              <p style="font-size: 13px; color: #475569; line-height: 1.6;">
                Dear <strong>${recipientName}</strong>,<br>
                Thank you for your order with Euro Prop Money. Your studio requisition <strong>#${orderId}</strong> has been received by our Berlin Central Vault Dispatch Desk.
              </p>

              <!-- Payment Details Card -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 6px; margin: 20px 0;">
                <h4 style="margin: 0 0 6px 0; font-size: 13px; font-family: monospace; text-transform: uppercase; color: #b45309;">
                  Settlement Method: ${paymentMethodLabel}
                </h4>
                <p style="margin: 0; font-size: 12px; color: #334155; line-height: 1.5;">
                  Specific payment details (wire IBAN/SWIFT or USDT deposit wallet address) for Order ID <strong>#${orderId}</strong> will be provided directly by our Vault Dispatch team upon reviewing your new order.
                </p>
              </div>

              <!-- Requisition Items Table -->
              <h3 style="font-size: 13px; font-family: monospace; text-transform: uppercase; color: #64748b; margin: 24px 0 10px 0; letter-spacing: 0.5px;">
                Requisition Summary
              </h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                  <tr style="background-color: #f1f5f9; border-bottom: 2px solid #cbd5e1; text-align: left; font-size: 11px; font-family: monospace; color: #475569;">
                    <th style="padding: 10px 12px;">Prop Stack Description</th>
                    <th style="padding: 10px 12px; text-align: center;">Qty</th>
                    <th style="padding: 10px 12px; text-align: right;">Unit Price</th>
                    <th style="padding: 10px 12px; text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsRows}
                </tbody>
                <tfoot>
                  ${body.shippingCost ? `
                    <tr>
                      <td colspan="3" style="padding: 10px 12px; text-align: right; font-size: 13px; color: #64748b;">Shipping Courier:</td>
                      <td style="padding: 10px 12px; text-align: right; font-size: 13px; font-weight: bold; color: #0f172a;">€${body.shippingCost.toFixed(2)}</td>
                    </tr>
                  ` : ''}
                  <tr>
                    <td colspan="3" style="padding: 12px; text-align: right; font-size: 15px; font-weight: bold; color: #0f172a; border-top: 2px solid #e2e8f0;">Grand Total Payable:</td>
                    <td style="padding: 12px; text-align: right; font-size: 16px; font-weight: 800; color: #b45309; border-top: 2px solid #e2e8f0;">€${totalPayable.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>

              <!-- Delivery Information -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 14px 16px; border-radius: 8px; margin-top: 16px; font-size: 12px; color: #475569;">
                <strong style="color: #0f172a;">Soundstage / Delivery Address:</strong><br>
                ${formattedAddress}
                ${body.phone ? `<br><strong style="color: #0f172a;">Phone / Contact:</strong> ${body.phone}` : ''}
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #0f172a; padding: 20px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #1e293b;">
              <p style="margin: 0 0 6px 0; color: #ffffff; font-weight: bold;">
                Euro Prop Money EU · 24/7 Studio Dispatch Hotline
              </p>
              <p style="margin: 0 0 8px 0;">
                Stralauer Allee 7, 10245 Berlin · Phone: +49 30 8492 1000 · Email: dispatch@europropmoney.de
              </p>
              <p style="margin: 0; font-size: 10px; color: #64748b;">
                Compliant with European Central Bank Decision ECB/2013/10 Section 2.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // 2. Dispatch Desk Alert HTML Email
    const dispatchHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>NEW ORDER #${orderId}</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 20px; color: #0f172a;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 2px solid #0f172a; border-radius: 8px; padding: 24px;">
            <div style="border-bottom: 2px solid #f59e0b; padding-bottom: 12px; margin-bottom: 16px;">
              <span style="font-size: 11px; font-weight: bold; color: #f59e0b; font-family: monospace;">VAULT ALERT · NEW ORDER</span>
              <h2 style="margin: 4px 0 0 0; font-size: 20px;">Order #${orderId} — €${totalPayable.toFixed(2)}</h2>
            </div>
            <p><strong>Customer:</strong> ${recipientName} (<a href="mailto:${recipientEmail}">${recipientEmail}</a>)</p>
            <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
            <p><strong>Payment:</strong> ${paymentMethodLabel}</p>
            <p><strong>Delivery Address:</strong> ${formattedAddress}</p>
            ${body.orderNotes ? `<p><strong>Notes:</strong> ${body.orderNotes}</p>` : ''}
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px;">
              <thead>
                <tr style="background-color: #f1f5f9; text-align: left;">
                  <th style="padding: 6px;">Item</th>
                  <th style="padding: 6px; text-align: center;">Qty</th>
                  <th style="padding: 6px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${items.map(i => `
                  <tr>
                    <td style="padding: 6px; border-bottom: 1px solid #e2e8f0;">${i.name} ${i.finish ? `(${i.finish})` : ''}</td>
                    <td style="padding: 6px; border-bottom: 1px solid #e2e8f0; text-align: center;">${i.quantity}</td>
                    <td style="padding: 6px; border-bottom: 1px solid #e2e8f0; text-align: right;">€${(i.price * i.quantity).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `;

    // Send customer email and internal dispatch alert
    const customerMail = {
      from: sender,
      to: recipientEmail,
      subject: `Order Confirmation #${orderId} - Euro Prop Money EU`,
      html: customerHtml,
    };

    const dispatchMail = {
      from: sender,
      to: dispatchInbox,
      subject: `[NEW ORDER REQUISITION] #${orderId} - €${totalPayable.toFixed(2)} (${recipientName})`,
      html: dispatchHtml,
    };

    const [customerRes, dispatchRes] = await Promise.all([
      transporter.sendMail(customerMail),
      transporter.sendMail(dispatchMail),
    ]);

    return NextResponse.json(
      {
        success: true,
        orderId,
        customerMessageId: customerRes.messageId,
        dispatchMessageId: dispatchRes.messageId,
        message: 'Order confirmation email dispatched successfully.',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[Send Email Error]:', error);
    return NextResponse.json(
      {
        error: 'Email Dispatch Failed',
        message: error.message || 'An unexpected error occurred during SMTP transmission.',
      },
      { status: 500 }
    );
  }
}
