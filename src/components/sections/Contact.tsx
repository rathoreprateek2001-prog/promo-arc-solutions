import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Input, Textarea } from '../common/Input';
import { Button } from '../common/Button';
import { Mail, Phone, Send, Check, AlertCircle, Loader2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Order Management',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Default endpoint delivers directly to eric@promoarcsolutions.in via FormSubmit AJAX
    // Can also be overridden with VITE_CONTACT_FORM_ENDPOINT in .env if desired
    const endpoint =
      import.meta.env.VITE_CONTACT_FORM_ENDPOINT ||
      'https://formsubmit.co/ajax/eric@promoarcsolutions.in';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          company: formState.company || 'Not Specified',
          service: formState.service,
          message: formState.message,
          _subject: `New Inquiry from ${formState.name} (${formState.company || 'Distributor'})`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormState({
          name: '',
          email: '',
          company: '',
          service: 'Order Management',
          message: '',
        });
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Dispatch failed to transmit.');
      }
    } catch (err) {
      console.error('Dispatch error:', err);
      setErrorMessage(
        'Unable to complete automatic dispatch transmission. You can also reach Eric directly at eric@promoarcsolutions.in.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-8 md:px-16 border-t border-[#1A1A1A]/10 bg-[#F9F8F6] relative">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column (Columns 1-5): Editorial Invitation & Direct Channels */}
          <div className="lg:col-span-5 space-y-10">
            <SectionHeader
              overline="Commence Collaboration"
              title={
                <>
                  Let's make the <span className="italic text-[#D4AF37]">workflow simpler.</span>
                </>
              }
              description="Looking for reliable support for your promotional product business? Whether the requirement is product research, order management, client support, artwork, graphic design, or backend operations, Promo Arc Solutions is ready to help."
            />

            {/* Direct Channel Cards */}
            <div className="space-y-6 pt-4">
              {/* Telephone */}
              <div className="p-6 bg-[#EBE5DE]/40 border-t border-[#1A1A1A]/20 space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D4AF37] stroke-1" />
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#6C6863]">
                    Direct Telephone
                  </span>
                </div>
                <a
                  href="tel:+918890846737"
                  className="font-sans text-2xl font-light text-[#1A1A1A] hover:text-[#D4AF37] transition-colors duration-300 block tracking-wider tabular-nums leading-snug"
                >
                  +91 88908 46737
                </a>
                <span className="font-sans text-[11px] text-[#6C6863] block leading-normal">
                  Available for phone consultations & WhatsApp inquiries.
                </span>
              </div>

              {/* Electronic Mail */}
              <div className="p-6 bg-[#EBE5DE]/40 border-t border-[#1A1A1A]/20 space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#D4AF37] stroke-1" />
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#6C6863]">
                    Electronic Mail
                  </span>
                </div>
                <a
                  href="mailto:eric@promoarcsolutions.in"
                  className="font-sans text-2xl font-light text-[#1A1A1A] hover:text-[#D4AF37] transition-colors duration-300 block break-all tracking-wide leading-snug"
                >
                  eric@promoarcsolutions.in
                </a>
                <span className="font-sans text-[11px] text-[#6C6863] block leading-normal">
                  Same-day turnaround for RFPs, briefs, and operational scope requests.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (Columns 6-12): Luxury Underline Inquiry Form */}
          <div className="lg:col-span-7 bg-[#EBE5DE]/20 p-8 sm:p-12 border-t-2 border-[#1A1A1A]">
            <div className="border-b border-[#1A1A1A]/10 pb-6 mb-8">
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#1A1A1A] font-medium block">
                Inquiry Dispatch Form
              </span>
              <p className="font-serif italic text-sm text-[#6C6863] mt-1">
                Please articulate your operational needs and we will initiate contact promptly.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-12 text-center space-y-4 border border-[#D4AF37] bg-[#F9F8F6]">
                <div className="w-12 h-12 mx-auto flex items-center justify-center bg-[#D4AF37] text-white">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-3xl text-[#1A1A1A]">
                  Inquiry Dispatched
                </h3>
                <p className="font-sans text-sm text-[#6C6863] max-w-md mx-auto leading-relaxed">
                  Thank you. Your dispatch has been transmitted to <span className="font-medium text-[#1A1A1A]">eric@promoarcsolutions.in</span>. Eric and the Promo Arc team will review your specifications and reply within 4 business hours.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setIsSubmitted(false);
                    setErrorMessage(null);
                  }}
                >
                  Submit Another Dispatch
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Input
                    label="Full Name *"
                    placeholder="e.g. Eleanor Vance"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                  <Input
                    label="Work Email *"
                    type="email"
                    placeholder="e.g. eleanor@distributor.com"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Input
                    label="Company / Distributorship"
                    placeholder="e.g. Apex Promotional Group"
                    value={formState.company}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                  />
                  <div className="space-y-1.5">
                    <label className="block font-sans text-[11px] uppercase tracking-[0.2em] text-[#1A1A1A] font-medium">
                      Primary Service Requirement
                    </label>
                    <select
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className="w-full h-12 bg-transparent border-0 border-b border-[#1A1A1A]/30 focus:border-[#D4AF37] focus:outline-none text-sm text-[#1A1A1A] font-sans transition-colors duration-500 py-2 px-0 cursor-pointer"
                    >
                      <option value="Promotional Product Support">Promotional Product Support</option>
                      <option value="Order Management">Order Management & Tracking</option>
                      <option value="Client Support">Client & Supplier Support</option>
                      <option value="Graphic Design">Graphic Design & Marketing</option>
                      <option value="Vector Design & Artwork">Vector Design & Artwork Cleanup</option>
                      <option value="Webstore Operations">Webstore Backend Operations</option>
                      <option value="Reporting & Operations">Reporting & Operations / KPIs</option>
                      <option value="Social Media Support">Social Media Management</option>
                      <option value="Comprehensive Dedicated VA">Comprehensive Dedicated VA</option>
                    </select>
                  </div>
                </div>

                <Textarea
                  label="Project Scope / Operational Detail *"
                  placeholder="Detail your current order volume, specific platform tools (ASI/SAGE/etc.), and desired operational support..."
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                />

                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{errorMessage}</span>
                    </div>
                    <a
                      href={`mailto:eric@promoarcsolutions.in?subject=${encodeURIComponent('Inquiry from ' + formState.name)}&body=${encodeURIComponent(formState.message)}`}
                      className="underline font-medium hover:text-red-950 shrink-0"
                    >
                      Email Directly ↗
                    </a>
                  </div>
                )}

                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <Button variant="primary" size="lg" type="submit" disabled={isSubmitting}>
                    <span>{isSubmitting ? 'Transmitting Dispatch...' : 'Send Dispatch'}</span>
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 ml-1 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 ml-1" />
                    )}
                  </Button>
                  <span className="font-sans text-[11px] text-[#6C6863]">
                    Strict confidentiality guaranteed.
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
