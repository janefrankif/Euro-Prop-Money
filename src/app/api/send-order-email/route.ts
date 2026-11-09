import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export interface OrderItemPayload {
  id: string;
  name: string;
  price: number;
  quantity: number;
  finish?: string;
  printType?: string;
  total: number;
}

export interface SendOrderEmailPayload {
  orderId: string;
  orderDate?: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  companyName?: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state?: string;
  postcode: string;
  country?: string;
  paymentMethod: 'bacs' | 'usdt' | string;
  shippingMethod?: 'standard' | 'express' | string;
  shippingCost?: number;
  subtotal?: number;
  totalPayable: number;
  items: OrderItemPayload[];
  orderNotes?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: SendOrderEmailPayload = await req.json();

    const {
      orderId,
      orderDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      customerName,
      customerEmail,
      phone,
      companyName,
      streetAddress,
      apartment,
      city,
      state,
      postcode,
      country = 'Germany',
      paymentMethod = 'bacs',
      shippingMethod = 'standard',
      shippingCost = 20,
      totalPayable,
      items = [],
      orderNotes,
    } = body;

    // Validate essential fields
    if (!orderId || !customerEmail || !totalPayable) {
      return NextResponse.json(
        { error: 'Missing required order fields: orderId, customerEmail, or totalPayable.' },
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
      console.log(`[Order Email Simulation] Order #${orderId} for ${customerName} (${customerEmail}) - Total: €${totalPayable.toFixed(2)}`);
      return NextResponse.json({
        success: true,
        simulated: true,
        orderId,
        message: 'Order registered successfully. (EMAIL_SERVER / EMAIL_SERVER_PASSWORD not configured)',
      });
    }

    // Configure Nodemailer SMTP Transport for Zoho Mail
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465 (SSL), false for 587 (TLS/STARTTLS)
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const itemsTableRows = items
      .map(
        (item) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #1e293b;">
            <strong>${item.name}</strong>
            ${item.finish ? `<br><span style="font-size: 11px; color: #64748b;">Finish: ${item.finish}</span>` : ''}
            ${item.printType ? `<span style="font-size: 11px; color: #64748b;"> · ${item.printType}</span>` : ''}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #1e293b; text-align: center;">
            ${item.quantity}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #1e293b; text-align: right;">
            €${item.price.toFixed(2)}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: bold; color: #0f172a; text-align: right;">
            €${item.total.toFixed(2)}
          </td>
        </tr>
      `
      )
      .join('');

    const formattedAddress = [
      streetAddress,
      apartment,
      city,
      state,
      postcode,
      country,
    ]
      .filter(Boolean)
      .join(', ');

    const paymentMethodLabel =
      paymentMethod === 'usdt'
        ? 'USDT (Tether TRC-20 Blockchain Settlement)'
        : 'Bank Transfer (EU IBAN 0% Reverse Charge Invoicing)';

    // 1. Dispatch Alert Email (To dispatch@europropmoney.de)
    const dispatchEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Order Dispatch Requisition #${orderId}</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #0f172a;">
          <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background-color: #0f172a; padding: 24px; text-align: left; color: #ffffff;">
              <span style="font-family: monospace; font-size: 11px; color: #f59e0b; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">
                ACTION REQUIRED · VAULT DISPATCH DESK
              </span>
              <h2 style="margin: 6px 0 0 0; font-size: 22px; font-weight: 800;">
                New Order Requisition #${orderId}
              </h2>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">
                Order Date: ${orderDate}
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 24px;">
              <!-- Customer Details Grid -->
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background-color: #f1f5f9; border-radius: 8px;">
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px;">
                    <strong>Customer:</strong> ${customerName}<br>
                    <strong>Email:</strong> <a href="mailto:${customerEmail}" style="color: #d97706; text-decoration: none;">${customerEmail}</a><br>
                    <strong>Phone:</strong> ${phone}<br>
                    ${companyName ? `<strong>Production / Studio:</strong> ${companyName}<br>` : ''}
                  </td>
                  <td style="padding: 12px 16px; font-size: 13px; text-align: right; vertical-align: top;">
                    <strong>Payment:</strong> ${paymentMethod.toUpperCase()}<br>
                    <strong>Shipping:</strong> ${shippingMethod.toUpperCase()} (€${shippingCost.toFixed(2)})<br>
                    <span style="display: inline-block; margin-top: 6px; padding: 4px 8px; background-color: #dcfce7; color: #166534; font-size: 11px; font-weight: bold; border-radius: 4px;">
                      Total: €${totalPayable.toFixed(2)}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Delivery Address -->
              <div style="margin-bottom: 24px; padding: 14px; background-color: #fffbe6; border: 1px solid #fef08a; border-radius: 8px;">
                <span style="font-size: 11px; font-family: monospace; color: #854d0e; text-transform: uppercase; font-weight: bold;">
                  Soundstage Delivery Address
                </span>
                <p style="margin: 4px 0 0 0; font-size: 13px; color: #1e293b; font-weight: 600;">
                  ${formattedAddress}
                </p>
                ${orderNotes ? `<p style="margin: 8px 0 0 0; font-size: 12px; color: #475569; font-style: italic;"><strong>Order Notes:</strong> "${orderNotes}"</p>` : ''}
              </div>

              <!-- Itemized Prop Table -->
              <h3 style="font-size: 14px; text-transform: uppercase; font-family: monospace; color: #475569; margin: 0 0 12px 0;">
                Requisition Prop Items
              </h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <thead>
                  <tr style="background-color: #f8fafc; border-bottom: 2px solid #cbd5e1; text-align: left; font-size: 11px; font-family: monospace; color: #64748b;">
                    <th style="padding: 8px 10px;">Item Description</th>
                    <th style="padding: 8px 10px; text-align: center;">Qty</th>
                    <th style="padding: 8px 10px; text-align: right;">Unit Price</th>
                    <th style="padding: 8px 10px; text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsTableRows}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" style="padding: 10px; text-align: right; font-size: 13px; color: #64748b;">Shipping Fee:</td>
                    <td style="padding: 10px; text-align: right; font-size: 13px; font-weight: bold; color: #1e293b;">€${shippingCost.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colspan="3" style="padding: 10px; text-align: right; font-size: 15px; font-weight: bold; color: #0f172a;">Grand Total:</td>
                    <td style="padding: 10px; text-align: right; font-size: 16px; font-weight: 800; color: #b45309;">€${totalPayable.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <!-- Footer -->
            <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
              Euro Prop Money EU · Studio Headquarters: Stralauer Allee 7, 10245 Berlin · Hotline: +49 30 8492 1000
            </div>
          </div>
        </body>
      </html>
    `;

    // 2. Customer Receipt Email (To customerEmail)
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Order Confirmation #${orderId} - Euro Prop Money EU</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #ffffff; margin: 0; padding: 20px; color: #0f172a;">
          <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            
            <!-- Header -->
            <div style="background-color: #0f172a; padding: 28px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1px; color: #fbbf24;">
                CINE EURO PROPS EU
              </h1>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #cbd5e1; font-family: monospace;">
                ECB DECISION 2013/10 CERTIFIED REPRODUCTION SUPPLIER
              </p>
            </div>

            <!-- Body -->
            <div style="padding: 24px;">
              <h2 style="font-size: 18px; color: #0f172a; margin-top: 0;">
                Thank you for your order, ${customerName}!
              </h2>
              <p style="font-size: 13px; color: #475569; line-height: 1.6;">
                Your prop currency order <strong>#${orderId}</strong> has been received by our Berlin Vault Dispatch Desk. Our art department coordinators are processing your requisition.
              </p>

              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin: 20px 0;">
                <h4 style="margin: 0 0 8px 0; font-size: 13px; font-family: monospace; text-transform: uppercase; color: #d97706;">
                  Payment Instructions (${paymentMethodLabel})
                </h4>
                ${
                  paymentMethod === 'usdt'
                    ? `<p style="margin: 0; font-size: 12px; color: #334155;">Please complete your Tether (TRC-20) deposit to our dedicated vault wallet. Upon 1 network confirmation, your order will automatically update to <strong>Vault Dispatch</strong>.</p>`
                    : `<p style="margin: 0; font-size: 12px; color: #334155;">Please transfer <strong>€${totalPayable.toFixed(2)}</strong> referencing order ID <strong>#${orderId}</strong>. EU VAT 0% reverse-charge tax invoices will be issued upon payment confirmation.</p>`
                }
              </div>

              <!-- Order Summary Table -->
              <h3 style="font-size: 13px; font-family: monospace; text-transform: uppercase; color: #64748b; margin-bottom: 10px;">
                Order Requisition Details
              </h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                  <tr style="border-bottom: 2px solid #e2e8f0; text-align: left; font-size: 11px; font-family: monospace; color: #64748b;">
                    <th style="padding: 8px 0;">Prop Description</th>
                    <th style="padding: 8px; text-align: center;">Qty</th>
                    <th style="padding: 8px 0; text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${items
                    .map(
                      (item) => `
                    <tr>
                      <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #334155;">
                        ${item.name}
                      </td>
                      <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-size: 13px; text-align: center; color: #334155;">
                        ${item.quantity}
                      </td>
                      <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: bold; text-align: right; color: #0f172a;">
                        €${item.total.toFixed(2)}
                      </td>
                    </tr>
                  `
                    )
                    .join('')}
                </tbody>
              </table>

              <!-- Delivery Info -->
              <div style="font-size: 12px; color: #475569; background-color: #f1f5f9; padding: 12px; border-radius: 6px;">
                <strong>Delivery Soundstage Address:</strong> ${formattedAddress}
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #0f172a; padding: 20px; text-align: center; font-size: 11px; color: #94a3b8;">
              <p style="margin: 0 0 6px 0; font-weight: bold; color: #ffffff;">24/7 Soundstage Dispatch Hotline</p>
              <p style="margin: 0 0 10px 0;">Germany: +49 30 8492 1000 · UK: +44 20 7946 0192 · Email: dispatch@europropmoney.de</p>
              <p style="margin: 0; font-size: 10px; color: #64748b;">Euro Prop Money EU · Stralauer Allee 7, 10245 Berlin-Bezirk Friedrichshain-Kreuzberg</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send dispatch alert email to dispatch@europropmoney.de
    const dispatchMailOptions = {
      from: fromAddress,
      to: dispatchInbox,
      subject: `[NEW ORDER REQUISITION] #${orderId} - €${totalPayable.toFixed(2)} (${customerName})`,
      html: dispatchEmailHtml,
    };

    // Send customer receipt confirmation email
    const customerMailOptions = {
      from: fromAddress,
      to: customerEmail,
      subject: `Order Confirmation #${orderId} - Euro Prop Money EU`,
      html: customerEmailHtml,
    };

    // Send emails in parallel
    const [dispatchResult, customerResult] = await Promise.all([
      transporter.sendMail(dispatchMailOptions),
      transporter.sendMail(customerMailOptions),
    ]);

    return NextResponse.json({
      success: true,
      orderId,
      dispatchMessageId: dispatchResult.messageId,
      customerMessageId: customerResult.messageId,
      message: 'Order confirmation emails sent successfully to dispatch and customer.',
    });
  } catch (error: any) {
    console.error('[Send Order Email Error]:', error);
    return NextResponse.json(
      {
        error: 'Failed to send order email notification.',
        details: error.message || String(error),
      },
      { status: 500 }
    );
  }
}
