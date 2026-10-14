import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  HelpCircle,
  Headphones
} from 'lucide-react';

export const Contact = () => {
  const { showToast } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Tracking & Delivery',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqs = [
    {
      q: 'How do I track my order status in real time?',
      a: 'Once your order is dispatched, you receive a WhatsApp notification and email with a live tracking link. You can also view active orders in the "Checkout & Account" page under your order history.'
    },
    {
      q: 'What is AURA’s return and exchange policy?',
      a: 'We offer a 14-day hassle-free return and exchange guarantee. If an item does not fit or match expectations, request a doorstep pickup. Our delivery partner will collect it and issue an instant refund or replacement size.'
    },
    {
      q: 'How long do refunds take to reflect in my bank account?',
      a: 'For UPI and Debit/Credit Card orders, refunds are credited back to your original payment method within 2-4 business days after quality verification at our fulfillment hub.'
    },
    {
      q: 'Are all products sold on AURA 100% authentic?',
      a: 'Yes, absolutely. AURA sources directly from authorized brand ateliers and global fashion houses. Every order arrives sealed with authenticity tags.'
    },
    {
      q: 'Can I apply multiple coupons or change my delivery address?',
      a: 'You can apply one promotional coupon code per order during checkout. Address modifications can be requested via our customer care helpline within 1 hour of placing the order.'
    }
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email address is required';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Please provide at least 10 characters in your message';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast('Please fix the highlighted fields in the form', 'error');
      return;
    }

    setErrors({});
    setTicketId(`TKT-${Math.floor(1000 + Math.random() * 9000)}`);
    setIsSubmitted(true);
    showToast('Your message has been received! Our concierge team will reach out soon.', 'success');
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Contact Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-2xl">
          <span className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-rose-500/30">
            <Headphones className="w-3.5 h-3.5 text-rose-400" />
            24/7 CUSTOMER CONCIERGE
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight mb-4">
            We’re Here to Assist You
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Have questions regarding sizes, order tracking, styling advice, or returns? Reach out to
            our dedicated fashion concierge team.
          </p>
        </div>
      </section>

      {/* 2. Contact Information Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Call Our Helpline</h3>
              <p className="text-xs text-slate-500 mb-2">Toll-free daily from 9:00 AM - 9:00 PM IST</p>
              <a href="tel:18002089898" className="text-sm font-black text-rose-600 hover:underline">
                1800-208-9898
              </a>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Email Concierge</h3>
              <p className="text-xs text-slate-500 mb-2">Guaranteed response within 2 business hours</p>
              <a href="mailto:care@aurafashion.com" className="text-sm font-black text-rose-600 hover:underline">
                care@aurafashion.com
              </a>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Flagship Studio HQ</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                AURA Tower, 4th Floor, High Street Phoenix, Lower Parel, Mumbai, Maharashtra 400013
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Contact Form & FAQ Accordion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Side */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-xl">
            <div className="mb-6">
              <span className="text-xs font-black uppercase tracking-widest text-rose-600 block mb-1">
                SEND A MESSAGE
              </span>
              <h2 className="text-2xl font-serif font-black text-slate-900">
                How Can We Help Today?
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Fill in the details below and our team will get in touch shortly.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-emerald-950 mb-1">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-emerald-800 mb-4 max-w-md mx-auto">
                  Thank you for reaching out, <strong>{formData.name}</strong>. A customer service
                  advisor has been assigned ticket <strong>#{ticketId}</strong>.
                </p>
                <div className="bg-white/80 p-3 rounded-xl text-[11px] text-slate-600 mb-6 border border-emerald-100">
                  ⚡ <em>Frontend Demo Notice: This is a static demonstration. No actual email was sent over network.</em>
                </div>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      subject: 'Order Tracking & Delivery',
                      message: ''
                    });
                  }}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full text-xs px-4 py-3 rounded-xl border ${
                        errors.name ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                      } outline-none focus:border-rose-500 transition`}
                    />
                    {errors.name && (
                      <p className="text-[10px] text-rose-600 font-bold mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full text-xs px-4 py-3 rounded-xl border ${
                        errors.email ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                      } outline-none focus:border-rose-500 transition`}
                    />
                    {errors.email && (
                      <p className="text-[10px] text-rose-600 font-bold mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                      Contact Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-rose-500 transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-rose-500 transition bg-white"
                    >
                      <option>Order Tracking & Delivery</option>
                      <option>Returns, Size Exchange & Refund</option>
                      <option>Styling Advice & Sizing Guide</option>
                      <option>Wholesale & Corporate Inquiries</option>
                      <option>Feedback or General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Describe your inquiry, order number or issue in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full text-xs p-4 rounded-xl border ${
                      errors.message ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                    } outline-none focus:border-rose-500 transition`}
                  />
                  {errors.message && (
                    <p className="text-[10px] text-rose-600 font-bold mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold tracking-wider shadow-lg shadow-rose-600/30 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>SUBMIT INQUIRY</span>
                </button>
              </form>
            )}
          </div>

          {/* FAQs Accordion Side */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-600 text-xs font-black uppercase tracking-widest mb-1">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENT QUESTIONS</span>
              </div>
              <h2 className="text-2xl font-serif font-black text-slate-900 mb-6">
                Quick Answers
              </h2>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition shadow-sm"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                        className="w-full text-left p-4 flex items-center justify-between gap-4 font-bold text-xs text-slate-900 hover:text-rose-600 transition"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-rose-600 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Support Badge */}
            <div className="mt-8 p-5 rounded-2xl bg-slate-900 text-white flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold">Instant Chat Support</h4>
                <p className="text-[11px] text-slate-400">
                  Connect on WhatsApp at <strong>+91 98765 43210</strong> for swift updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
