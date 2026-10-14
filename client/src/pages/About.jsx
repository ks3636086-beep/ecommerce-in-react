import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Leaf,
  HeartHandshake,
  Award,
  Truck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const About = () => {
  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Brand Story Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-20 lg:py-28">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
            alt="Atelier Studio"
            className="w-full h-full object-cover opacity-25 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 text-rose-300 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              THE AURA ATELIER ESSENCE
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-tight mb-6">
              Reinventing Contemporary Fashion for Modern India
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              Founded with the conviction that luxury should be accessible, expressive, and uncompromising in
              craftsmanship. AURA bridges bespoke Milanese tailoring with the dynamic soul of Indian streetwear.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="px-6 py-3.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs sm:text-sm font-bold tracking-wider shadow-lg shadow-rose-600/30 transition flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <span>EXPLORE COLLECTIONS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics & Impact Numbers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-16 relative z-20">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center sm:text-left border-r last:border-none border-slate-100 pr-4">
            <div className="text-3xl sm:text-4xl font-black text-rose-600 mb-1">5M+</div>
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Active Shoppers
            </div>
            <p className="text-[11px] text-slate-500">Delivering delight across 19,000+ pincodes</p>
          </div>

          <div className="text-center sm:text-left border-r last:border-none border-slate-100 pr-4">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 mb-1">10,000+</div>
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Curated Styles
            </div>
            <p className="text-[11px] text-slate-500">From global runways and artisanal ateliers</p>
          </div>

          <div className="text-center sm:text-left border-r last:border-none border-slate-100 pr-4">
            <div className="text-3xl sm:text-4xl font-black text-emerald-600 mb-1">99.8%</div>
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              On-Time Deliveries
            </div>
            <p className="text-[11px] text-slate-500">Same-day dispatch & express air logistics</p>
          </div>

          <div className="text-center sm:text-left">
            <div className="text-3xl sm:text-4xl font-black text-amber-500 mb-1">4.8 ★</div>
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              App Store Rating
            </div>
            <p className="text-[11px] text-slate-500">Over 350,000 verified customer reviews</p>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-rose-600 block mb-2">
              OUR PURPOSE
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight leading-tight mb-6">
              Empowering Self-Expression Through Ethical Craft & Timeless Aesthetics
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                In a fast-fashion world of throwaway garments, AURA was built on an antithetical philosophy:
                that wardrobe pieces should endure seasons, feel extraordinary against your skin, and inspire
                unwavering confidence.
              </p>
              <p>
                Every fabric is ethically sourced—from GOTS-certified organic cotton to handcrafted Chanderi
                silks woven by heritage artisan guilds in Madhya Pradesh and Rajasthan.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {[
                'Zero-compromise stitching quality & double-reinforced seams',
                'Transparent pricing with direct-to-consumer value',
                'Fair living wages guaranteed across our entire supplier network',
                '100% recyclable, plastic-free biodegradable shipping boxes'
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
                alt="Artisan Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-xs hidden sm:block">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-8 h-8 text-amber-500" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">National Craftsmanship Award</h4>
                  <p className="text-[10px] text-slate-500">Recognized for Ethical Artisan Empowerment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Pillars & Brand Values */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-rose-600 block mb-1">
              WHAT SETS US APART
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
              The Four Pillars of AURA
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              Built on integrity, precision design, and a dedication to shopper satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Authenticity Guarantee',
                desc: 'Every single garment is serialized with RFID verification to eliminate counterfeit risks.'
              },
              {
                icon: Leaf,
                title: 'Sustainable Sourcing',
                desc: 'Over 85% of our fabrics use organic botanic dyes, recycled trims, and water-neutral processing.'
              },
              {
                icon: HeartHandshake,
                title: 'Try & Buy Assurance',
                desc: 'Try sizes at your doorstep with convenient 14-day hassle-free exchanges.'
              },
              {
                icon: Truck,
                title: 'Lightning Logistics',
                desc: 'Tier-1 warehouse robotics ensure orders placed before 3 PM ship the exact same afternoon.'
              }
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition flex flex-col justify-between"
                >
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">{pillar.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CTA Section to Shop */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 rounded-3xl p-8 sm:p-14 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight mb-4">
              Ready to Discover Your Signature Style?
            </h2>
            <p className="text-xs sm:text-sm text-rose-100 mb-8 leading-relaxed">
              Explore our curated drop of tailored blazers, flared maxi dresses, oversized street hoodies,
              and iconic accessories with instant discount benefits.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-950 hover:bg-slate-900 text-white rounded-2xl text-xs sm:text-sm font-bold tracking-wider shadow-xl hover:scale-105 active:scale-95 transition"
            >
              <span>START SHOPPING NOW</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
