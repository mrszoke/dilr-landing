import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();

    console.log("📩 EMAIL:", email);
    console.log("🔑 API KEY:", process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'SAJÁT_EMAIL_CÍMED', // ide a saját gmail-ed
      subject: 'TESZT EMAIL 🚀',
      html: `<p>Ez egy teszt: ${email}</p>`,
    });

    console.log("✅ RESEND RESULT:", result);

    return new Response(JSON.stringify({ ok: true }));

  } catch (err) {
    console.error("❌ HIBA:", err);
    return new Response(JSON.stringify({ error: 'fail' }), { status: 500 });
  }
};