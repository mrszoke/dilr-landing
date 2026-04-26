import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// 🚨 kötelező Astro-ban API-hoz
export const prerender = false;

// 🔑 Resend init
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    // 📦 body beolvasása (stabil módon)
    const body = await request.text();
    const { email } = body ? JSON.parse(body) : {};

    // ❌ ha nincs email
    if (!email) {
      return new Response(JSON.stringify({ error: 'Hiányzó email' }), {
        status: 400,
      });
    }

    // 🧹 email tisztítás
    const cleanEmail = email.trim().toLowerCase();

    // ❌ alap validáció
    if (!cleanEmail.includes('@')) {
      return new Response(JSON.stringify({ error: 'Érvénytelen email' }), {
        status: 400,
      });
    }

    console.log("📩 EMAIL:", cleanEmail);

    // 📧 email küldés
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev', // később saját domain
      to: cleanEmail, // 👉 usernek küld
      subject: 'Feliratkoztál a Dìlr-re 🚀',
      html: `
        <h2>Köszi, hogy csatlakoztál!</h2>
        <p>Értesítünk, amint elindulunk.</p>
        <p><strong>Dìlr</strong></p>
      `,
    });

    console.log("✅ RESEND RESULT:", result);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
    });

  } catch (err) {
    console.error("❌ HIBA:", err);

    return new Response(JSON.stringify({ error: 'Szerver hiba' }), {
      status: 500,
    });
  }
};