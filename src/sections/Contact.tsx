import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Instagram, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  // Web App Deployment Configuration
  const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwLTZFmsONgG5GAyUII0yAt3id_ABInibGvgDZY_UEu2EGH0ETk9Tz7nGUgL7_XN1Nb/exec';
  // Note: This must exactly match the security token string hardcoded in your Apps Script doPost logic!
  const SHEET_TOKEN = 'AKfycbwLTZFmsONgG5GAyUII0yAt3id_ABInibGvgDZY_UEu2EGH0ETk9Tz7nGUgL7_XN1Nb'; 

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Left column staggered reveal
      if (leftRef.current) {
        gsap.from(leftRef.current.querySelectorAll('.contact-reveal'), {
          x: -50,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power4.out',
          immediateRender: false,
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%' },
        });
      }

      // Form container
      if (formRef.current) {
        gsap.fromTo(formRef.current, 
        {
          x: 50,
          opacity: 0,
          scale: 0.95,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power4.out',
          immediateRender: false,
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
        });

        // Stagger form fields
        const fields = formRef.current.querySelectorAll('.form-field');
        gsap.from(fields, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3,
          immediateRender: false,
          scrollTrigger: { trigger: formRef.current, start: 'top 75%' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    try {
      // 1. Format payload parameters using URLSearchParams to avoid CORS preflight (OPTIONS) requests
      const bodyParams = new URLSearchParams();
      bodyParams.append('token', SHEET_TOKEN);
      bodyParams.append('name', formData.name);
      bodyParams.append('email', formData.email);
      bodyParams.append('subject', formData.subject);
      bodyParams.append('message', formData.message);

      // 2. Execute fetch call without manual Content-Type configurations
      const res = await fetch(SHEET_URL, {
        method: 'POST',
        body: bodyParams, 
        mode: 'cors'
      });

      const json = await res.json() as { status: string; message?: string };
      
      if (res.ok && json.status === 'success') {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 4000);
      } else {
        throw new Error(json.message || 'Failed to save');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass =
    'form-field w-full h-[54px] bg-white/[0.02] border border-[#ffffff80] rounded-xl px-5 text-white text-[15px] placeholder-[#ffffff80] outline-none transition-all duration-500 focus:border-red-DEFAULT/50 focus:bg-white/[0.05] focus:shadow-[0_0_15px_rgba(229,9,20,0.3)] shadow-[0_4px_12px_rgba(0,0,0,0.5)_inset]';

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative"
      style={{
        background: '#0a0a0a',
        color: '#fff',
      }}
    >
      {/* Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(229,9,20,0.04) 0%, transparent 60%)' }} 
      />
      {/* Top gradient from black */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none" 
        style={{ background: 'linear-gradient(to bottom, #000000, transparent)' }} 
      />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28">
          {/* Left Column - Info */}
          <div ref={leftRef}>
            <p className="contact-reveal font-label mb-6" style={{ color: 'rgba(229, 9, 20, 0.7)' }}>
              GET IN TOUCH
            </p>
            <h2 className="contact-reveal font-h1 text-white mb-8">
              Let's Build Something Amazing
            </h2>
            <p className="contact-reveal text-lg leading-relaxed mb-14" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Ready to transform your ideas into digital reality? Reach out and let's
              discuss how NEXIORA can help bring your vision to life.
            </p>

            {/* Contact Details */}
            <div className="flex flex-col gap-7 mb-14">
              {([
                { icon: Mail, text: 'nexioratechsolutions@gmail.com' },
                { icon: Phone, text: '+91 8139846309' },
                { icon: Phone, text: '+91 9048881522' },
                { icon: MapPin, text: 'Kakkanad, Kochi' },
              ]).map(({ icon: Icon, text }, i) => (
                <div key={i} className="contact-reveal flex items-center gap-4 group">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{ background: 'rgba(229, 9, 20, 0.08)', border: '1px solid rgba(229,9,20,0.12)' }}
                  >
                    <Icon size={16} style={{ color: '#e50914' }} />
                  </div>
                  <span className="text-[15px]" style={{ color: 'rgba(255,255,255,0.55)' }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="contact-reveal flex gap-3">
              {([
                { icon: Twitter, label: 'Twitter', url: '#' },
                { icon: Linkedin, label: 'LinkedIn', url: '#' },
                { icon: Github, label: 'GitHub', url: '#' },
                { icon: Instagram, label: 'Instagram', url: 'https://instagram.com/nexioratechsolutions' },
              ]).map(({ icon: Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-500 hover:border-red-DEFAULT hover:text-red-DEFAULT group"
                  style={{ borderColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }}
                >
                  <Icon size={16} className="transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative p-10 lg:p-14 overflow-hidden"
            style={{
              borderRadius: '40px',
              background: 'linear-gradient(145deg, rgba(30,30,30,0.4), rgba(10,10,10,0.6))',
              border: '1px solid rgba(229, 9, 20, 0.2)',
              color: '#fff',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(229,9,20,0.15) inset',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex flex-col gap-5 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className={inputClass} style={{ color: '#fff' }} />
                <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className={inputClass} style={{ color: '#fff' }} />
              </div>
              <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required className={inputClass} style={{ color: '#fff' }} />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className={`${inputClass} py-4 min-h-[150px] resize-none`}
                style={{ color: '#fff' }}
              />

              <button
                type="submit"
                disabled={submitStatus === 'loading' || submitStatus === 'success'}
                aria-label="Send message"
                className="form-field w-full h-[54px] rounded-full font-label text-[14px] font-semibold tracking-[0.12em] text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(229,9,20,0.6)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 mt-2"
                style={{
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.28)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.35), 0 0 18px rgba(255,255,255,0.08)',
                  background: submitStatus === 'success'
                    ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                    : 'linear-gradient(135deg, #ff3b4f, #b3001a)',
                }}
              >
                {submitStatus === 'loading' && (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    SENDING...
                  </>
                )}
                {submitStatus === 'success' && 'MESSAGE SENT!'}
                {submitStatus === 'idle' && (
                  <>
                    SEND MESSAGE
                    <ArrowRight size={12} />
                  </>
                )}
                {submitStatus === 'error' && 'TRY AGAIN'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}