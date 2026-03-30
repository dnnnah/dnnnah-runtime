import { NextResponse } from 'next/server'
import { Resend }       from 'resend'
import { z }            from 'zod'

/**
 * API handler para el formulario de contacto.
 * - Validación con Zod
 * - Rate limiting por IP (3 requests / 10 min)
 * - Honeypot anti-spam
 * - Envío via Resend
 */

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  name:    z.string().min(1).max(100),
  email:   z.string().email(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(2000),
  website: z.string().max(0).optional(), // honeypot
})

const rateMap = new Map<string, { count: number; ts: number }>()

export async function POST(req: Request) {
  // Rate limiting por IP
  const ip    = req.headers.get('x-forwarded-for') ?? 'unknown'
  const now   = Date.now()
  const entry = rateMap.get(ip)

  if (entry && now - entry.ts < 10 * 60 * 1000 && entry.count >= 3) {
    return NextResponse.json({ error: 'too many requests' }, { status: 429 })
  }

  rateMap.set(ip, entry && now - entry.ts < 10 * 60 * 1000
    ? { count: entry.count + 1, ts: entry.ts }
    : { count: 1, ts: now }
  )

  const body   = await req.json()
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid payload' }, { status: 400 })
  }

  const { name, email, subject, message, website } = parsed.data

  // Honeypot — si tiene valor es un bot
  if (website) {
    return NextResponse.json({ ok: true }) // respuesta falsa al bot
  }

  const { error } = await resend.emails.send({
    from:    'DNNNAH Portfolio <onboarding@resend.dev>',
    to:      'dnnnah@icloud.com',
    replyTo: email,
    subject: subject ?? `[Portfolio] Message from ${name}`,
    html: `
      <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      <p><strong>Subject:</strong> ${subject ?? '—'}</p>
      <hr/>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `,
  })

  console.log('Resend response:', { error })

  if (error) {
    return NextResponse.json({ error: 'send failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}