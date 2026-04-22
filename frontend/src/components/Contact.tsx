import { useState } from 'react';
import { sendContact } from '../services/api';
import type { ContactForm } from '../types';

const empty: ContactForm = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(empty);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await sendContact(form);
      setStatus('ok');
      setForm(empty);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 scroll-mt-14" style={{ borderTop: '2px solid var(--border)' }}>
      <div className="section-container">

        <div className="text-center mb-12">
          <p className="pixel-font text-[8px] mb-4" style={{ color: 'var(--gold)' }}>
            ─── MESSAGE SYSTEM ───
          </p>
          <h2 className="glow-text" style={{ fontSize: 'clamp(14px, 3vw, 24px)' }}>
            CONTACT
          </h2>
          <p className="mt-4 text-[19px]" style={{ color: 'var(--green-dim)' }}>
            Have a project or an opportunity? Write to me — I'll respond soon.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="rpg-box p-6">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-5"
              style={{ borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--red)' }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--gold)' }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--green)' }} />
              <span className="pixel-font text-[6px] ml-2" style={{ color: 'var(--green-dim)' }}>
                message_terminal.exe
              </span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="pixel-font text-[7px] block mb-1" style={{ color: 'var(--green-dim)' }}>
                  &gt; NAME:
                </label>
                <input name="name" value={form.name} onChange={handleChange}
                  placeholder="Your name" required minLength={2}
                  className="retro-input" />
              </div>
              <div>
                <label className="pixel-font text-[7px] block mb-1" style={{ color: 'var(--green-dim)' }}>
                  &gt; EMAIL:
                </label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="tu@correo.com" required
                  className="retro-input" />
              </div>
              <div>
                <label className="pixel-font text-[7px] block mb-1" style={{ color: 'var(--green-dim)' }}>
                  &gt; MESSAGE:
                </label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  placeholder="Tell me about your project or proposal..."
                  required minLength={10} rows={5}
                  className="retro-input resize-none" />
              </div>

              <button type="submit" disabled={status === 'loading'}
                className="pixel-btn text-[8px] w-full py-3 mt-1"
                style={{ opacity: status === 'loading' ? 0.5 : 1 }}>
                {status === 'loading' ? '[ SENDING... ]' : '[ ▶ SEND MESSAGE ]'}
              </button>

              {status === 'ok' && (
                <p className="pixel-font text-[7px] text-center glow-text">
                  ✓ MESSAGE SENT! I'LL RESPOND SOON.
                </p>
              )}
              {status === 'error' && (
                <p className="pixel-font text-[7px] text-center" style={{ color: 'var(--red)' }}>
                  ✕ ERROR. PLEASE TRY AGAIN.
                </p>
              )}
            </form>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-8 mt-8 flex-wrap">
            {[
              { href: 'https://github.com/juandic24',    label: '[GITHUB ↗]' },
              { href: 'https://www.linkedin.com/in/juan-diego-cortestorres/',  label: '[LINKEDIN ↗]' },
              { href: 'mailto:juandct24trabajo@gmail.com', label: '[EMAIL ↗]' },
            ].map(l => (
              <a key={l.href} href={l.href}
                target={l.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="pixel-font text-[7px] transition-colors"
                style={{ color: 'var(--green-dim)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--green-dim)')}>
                {l.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
