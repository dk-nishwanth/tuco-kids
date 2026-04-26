/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Instagram, 
  Clock, 
  Baby, 
  Stethoscope, 
  Heart, 
  Send, 
  Cloud,
  Info, 
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  ShoppingCart,
  Phone,
  Mail,
  Sparkles,
  Smile,
  Megaphone,
  Briefcase,
  MessageCircle,
  TreePine,
  MapPin,
  Calendar,
  Star,
  ShieldCheck,
  Leaf,
  Droplets,
  Zap,
  Search,
  User,
  ShoppingBag,
  Play
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { BEST_SELLERS, POPULAR_KITS, BLOG_POSTS } from './data';
import tucoLogo from './assets/images/tuco logo.webp';
import heroBg from './assets/images/Advertising-Blog-6.jpg';
import doodles from './assets/images/child_drawing_doodles_1777101032980.png';

const colors = {
  mint: '#3d8e8e',
  yellow: '#f2d45c',
  blue: '#d0e6f0',
  cream: '#fcfbf4',
  text: '#1a3d3d',
  pink: '#e895a7'
};

const FrogLogo = () => (
  <img 
    src={tucoLogo} 
    alt="Tuco Kids Logo" 
    className="w-full h-full object-contain"
    loading="eager"
    decoding="async"
  />
);

const DecorativeDoodles = ({ className }: { className?: string }) => (
  <img 
    src={doodles} 
    alt="Decorative Doodles" 
    className={`opacity-40 pointer-events-none ${className}`}
    loading="lazy"
    decoding="async"
  />
);

const ScallopedCloud = ({ top, height, animate, className }: { top?: boolean, height: string, animate?: boolean, className?: string }) => (
  <div 
    className={`absolute left-0 right-0 pointer-events-none ${className}`} 
    style={{ height }}
  >
    <motion.div
      animate={animate ? { x: [-40, 0, -40] } : {}}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className={`w-[110%] h-full bg-white ${top ? 'nav-cloud-mask' : 'cloud-mask-top'} -ml-[5%]`}
    />
  </div>
);

const DecorativeSticker = ({ type, className, animate = true }: { type: string, className?: string, animate?: boolean }) => {
  const icons: Record<string, any> = {
    star: Star,
    triangle: () => <div className="w-8 h-8 bg-clinic-yellow rotate-45" />,
    confetti: Sparkles,
    flower: Heart,
  };
  const Icon = icons[type] || Star;
  
  if (!animate) {
    return (
      <div className={`absolute ${className} text-clinic-yellow opacity-40`}>
        {typeof Icon === 'function' ? <Icon /> : <Icon size={48} />}
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ scale: 0, rotate: -20 }}
      whileInView={{ scale: 1, rotate: 0 }}
      className={`absolute ${className} text-clinic-yellow opacity-40`}
    >
      {typeof Icon === 'function' ? <Icon /> : <Icon size={48} />}
    </motion.div>
  );
};

const FaqItem = ({ num, label, icon: Icon }: { num: string, label: string, icon: any }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.05 }}
    className="flex flex-col items-center group cursor-pointer"
  >
    <div className="relative mb-4 md:mb-6">
      <div className="w-20 h-20 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-dotted border-clinic-blue transition-all group-hover:border-clinic-mint group-hover:shadow-2xl">
        <Icon size={32} md:size={48} strokeWidth={1} className="text-clinic-mint transition-transform group-hover:scale-110" />
      </div>
      <span className="absolute -top-1 -left-1 md:-top-2 md:-left-2 bg-clinic-yellow text-clinic-text text-[10px] md:text-sm font-black w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 border-white shadow-md">
        {num}
      </span>
    </div>
    <span className="text-[10px] md:text-base font-black text-clinic-text tracking-widest text-center px-2">{label}</span>
  </motion.div>
);

const SmartImage = ({ src, alt, className, aspectClass = "aspect-square" }: { src: string, alt: string, className?: string, aspectClass?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className={`relative ${aspectClass} overflow-hidden bg-gradient-to-br from-clinic-blue/20 to-clinic-blue/10 ${!isLoaded ? 'skeleton' : ''}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-clinic-blue/30 via-clinic-blue/10 to-clinic-blue/30 animate-pulse z-10" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setIsError(true);
          setIsLoaded(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        loading="lazy"
      />
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-clinic-blue/5 text-clinic-text/40 text-xs font-bold">
          Image unavailable
        </div>
      )}
    </div>
  );
};

const ThemedSection = ({ title, imageUrl, products, bgColor, reverse = false }: any) => (
  <div className="py-24 px-6 md:px-12" style={{ backgroundColor: bgColor }}>
    <div className={`max-w-7xl mx-auto flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
      <div className="w-full lg:w-2/5 flex flex-col gap-8">
        <h2 className="text-4xl md:text-6xl font-black text-clinic-mint tracking-tighter uppercase leading-none">{title}</h2>
        <div className="aspect-[9/16] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white bg-clinic-blue/5">
          <SmartImage src={imageUrl} alt={title} aspectClass="w-full h-full" />
        </div>
      </div>
      <div className="w-full lg:w-3/5">
        <div className="grid grid-cols-2 gap-4 md:gap-8">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 text-center lg:text-left">
          <button className="bg-clinic-mint text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-xl">
             Explore this concern
          </button>
        </div>
      </div>
    </div>
  </div>
);

const FeaturedIn = () => (
  <section className="bg-white py-16 border-y border-clinic-blue/10 overflow-hidden relative">
    <div className="max-w-[95%] mx-auto mb-8 text-center">
       <span className="text-[10px] font-black text-clinic-text/30 uppercase tracking-[0.5em]">As Featured In</span>
    </div>
    <motion.div 
      animate={{ x: [0, -1000] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="flex whitespace-nowrap gap-12 md:gap-24 items-center"
    >
      {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((i, index) => (
        <div key={index} className="flex-shrink-0 flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
           <div className="w-12 h-12 bg-clinic-mint/20 rounded-full flex items-center justify-center text-clinic-mint font-black text-xs">LOGO {i}</div>
           <span className="text-xl font-black text-clinic-text uppercase tracking-tighter">Publication {i}</span>
        </div>
      ))}
    </motion.div>
  </section>
);
const ProductCard: React.FC<{ product: any }> = ({ product }) => (
  <motion.div 
    whileHover={{ y: -12 }}
    className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group flex flex-col border border-clinic-blue/10 h-full relative"
  >
    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
      <div className="bg-clinic-yellow text-clinic-text text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
        {product.discount}
      </div>
      <div className="bg-clinic-mint text-white text-[7px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
        Buy 5 @ 199 each!
      </div>
    </div>

    <div className="m-2 rounded-[32px] overflow-hidden relative bg-clinic-blue/5">
      <SmartImage 
        src={product.image} 
        alt={product.title} 
        aspectClass="aspect-square"
        className="group-hover:scale-110 transition-transform duration-[1.5s]" 
      />
      <div className="absolute top-4 right-4 z-20">
        <motion.button 
          whileTap={{ scale: 0.8 }}
          className="bg-white/80 backdrop-blur-md p-2 rounded-xl text-clinic-pink hover:bg-clinic-pink hover:text-white transition-colors"
        >
          <Heart size={16} fill="currentColor" strokeWidth={0} />
        </motion.button>
      </div>
    </div>

    <div className="p-5 flex-1 flex flex-col">
      <div className="flex items-center gap-1 mb-2">
        <div className="flex text-clinic-yellow">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
          ))}
        </div>
        <span className="text-[9px] font-bold text-clinic-text/40">({product.reviews})</span>
      </div>

      <h3 className="text-xs font-black text-clinic-text mb-1 line-clamp-2 uppercase tracking-wide">
        {product.title}
      </h3>
      <p className="text-[10px] font-medium text-clinic-text/60 italic mb-4 line-clamp-1">
        {product.tagline}
      </p>

      <div className="mt-auto flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-base font-black text-clinic-mint">{product.price}</span>
          {product.originalPrice && (
            <span className="text-[10px] font-bold text-clinic-text/30 line-through">{product.originalPrice}</span>
          )}
        </div>
        
        <button className="w-full bg-clinic-mint text-white py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-clinic-mint/20 hover:bg-clinic-text transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  </motion.div>
);


const CloudTop = ({ color = "white", opacity = 0.95, className }: { color?: string, opacity?: number, className?: string }) => (
  <div className={`absolute top-0 left-0 right-0 h-24 lg:h-32 pointer-events-none z-20 ${className}`}>
    <svg viewBox="0 0 1400 180" preserveAspectRatio="none" className="w-full h-full">
      <path
        d="M0,100 Q80,40 160,80 Q200,50 240,90 Q280,60 320,100 Q360,70 400,110 Q440,80 480,120 Q520,90 560,130 Q600,100 640,140 Q680,110 720,150 Q760,120 800,160 Q840,130 880,170 Q920,140 960,180 L1400,180 L1400,0 L0,0 Z"
        fill={color}
        fillOpacity={opacity}
      />
      <path
        d="M0,140 Q100,100 200,140 Q300,110 400,150 Q500,120 600,160 Q700,130 800,170 Q900,140 1000,180 Q1100,150 1200,190 Q1300,160 1400,200 L1400,0 L0,0 Z"
        fill="#e8f4f8"
        fillOpacity={0.4}
      />
    </svg>
  </div>
);

const CloudBottom = ({ color = "white", opacity = 0.98, className }: { color?: string, opacity?: number, className?: string }) => (
  <div className={`absolute bottom-[-1px] left-0 right-0 h-20 lg:h-28 pointer-events-none z-30 ${className}`}>
    <svg viewBox="0 0 1400 140" preserveAspectRatio="none" className="w-full h-full">
      <path
        d="M0,70 Q100,30 200,70 Q300,40 400,80 Q500,50 600,90 Q700,60 800,100 Q900,70 1000,110 Q1100,80 1200,120 Q1300,90 1400,130 L1400,140 L0,140 Z"
        fill={color}
        fillOpacity={opacity}
      />
      <path
        d="M0,90 Q120,50 240,90 Q360,60 480,100 Q600,70 720,110 Q840,80 960,120 Q1080,90 1200,130 Q1300,100 1400,140 L1400,140 L0,140 Z"
        fill="#f0f9fa"
        fillOpacity={0.6}
      />
    </svg>
  </div>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-clinic-mint selection:text-white overflow-x-hidden pt-[100px] md:pt-[140px] lg:pt-[160px] text-clinic-text">
      {/* Announcement Bar */}
      <div className="fixed top-0 left-0 right-0 bg-clinic-yellow z-[70] overflow-hidden py-1.5 md:py-2 shadow-sm border-b border-clinic-text/5 h-[32px] md:h-[40px] flex items-center">
        <motion.div 
          animate={{ x: [0, -1200] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-12 md:gap-24 font-black text-[10px] md:text-xs text-clinic-text uppercase tracking-[0.2em]"
        >
          <span className="flex items-center gap-2">
            Free shipping on orders above ₹499
          </span>
          <span className="flex items-center gap-4 text-clinic-pink">
            <Sparkles size={14} /> Tuco Kids X Farah Khan is LIVE! <Sparkles size={14} />
          </span>
          <span className="flex items-center gap-2">
            Free shipping on orders above ₹499
          </span>
          <span className="flex items-center gap-4 text-clinic-pink">
            <Sparkles size={14} /> Tuco Kids X Farah Khan is LIVE! <Sparkles size={14} />
          </span>
          <span className="flex items-center gap-2">
            Free shipping on orders above ₹499
          </span>
          <span className="flex items-center gap-4 text-clinic-pink">
            <Sparkles size={14} /> Tuco Kids X Farah Khan is LIVE! <Sparkles size={14} />
          </span>
        </motion.div>
      </div>

      {/* Header */}
      <header className={`fixed top-[32px] md:top-[40px] left-0 right-0 z-[60] transition-all duration-500 bg-white ${isScrolled ? 'shadow-md py-2' : 'py-3 md:py-4'}`}>
        <div className="max-w-[98%] mx-auto">
          {/* Top Row: Brand & Utilities */}
          <div className="flex justify-between items-center px-4 md:px-8 mb-2 lg:mb-4">
            <nav className="hidden lg:flex items-center gap-6">
              <NavItem label="Our Story" />
              <NavItem label="Blog" />
              <NavItem label="Contact Us" />
              <NavItem label="Tuco CBI" />
            </nav>

            <div className="flex-shrink-0 flex items-center justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              <motion.div 
                animate={{ scale: isScrolled ? 0.7 : 0.9 }}
                className="w-20 md:w-32 lg:w-40 h-auto cursor-pointer"
              >
                <FrogLogo />
              </motion.div>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
              <div className="hidden md:flex items-center gap-1.5 text-clinic-text/40 hover:text-clinic-mint cursor-pointer transition-colors">
                <Search size={18} strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase tracking-widest">Search</span>
              </div>
              <div className="flex items-center gap-3">
                <User size={20} className="text-clinic-mint cursor-pointer hover:scale-110 transition-transform hidden sm:block" />
                <div className="relative group cursor-pointer">
                  <ShoppingBag size={20} className="text-clinic-mint group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1.5 -right-1.5 bg-clinic-pink text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">0</span>
                </div>
                <button 
                  className="lg:hidden text-clinic-mint p-1 flex items-center justify-center"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Row: Product Categories (Cloud Island style) */}
          <div className="hidden lg:flex justify-center">
            <div className={`bg-clinic-blue/5 border border-white/40 shadow-sm rounded-full px-8 py-2 flex items-center gap-8 transition-all duration-500 ${isScrolled ? 'scale-90 opacity-90' : 'scale-100'}`}>
              <NavItem label="Haircare" />
              <NavItem label="Skin Cleansing" />
              <NavItem label="Skincare" />
              <NavItem label="Suncare" />
              <NavItem label="Face Care" />
              <NavItem label="Makeup" />
              <NavItem label="Farah's Picks" />
              <NavItem label="Gifting" />
              <NavItem label="Travel Kits" />
              <NavItem label="Regimens" />
            </div>
          </div>
        </div>
      </header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] lg:hidden"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-[85] lg:hidden shadow-2xl flex flex-col p-6 pt-24 gap-4 overflow-y-auto"
              >
              <div className="flex flex-col gap-3">
                <MobileNavItem icon={Heart} label="Haircare" subLabel="Shampoo & Detanglers" onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavItem icon={Droplets} label="Clean & Cleansing" subLabel="Body & Face Wash" onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavItem icon={Smile} label="Skincare" subLabel="Creams & Lotions" onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavItem icon={Zap} label="Suncare" subLabel="Protection for Play" onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavItem icon={Sparkles} label="Safe Makeup" subLabel="Colorful Fun" onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavItem icon={Briefcase} label="Gifting & Kits" subLabel="Perfect Bundles" onClick={() => setIsMobileMenuOpen(false)} />
                <div className="h-px bg-clinic-text/10 my-4" />
                <MobileNavItem icon={Megaphone} label="Our Story" onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavItem icon={MessageCircle} label="Lil' Matters Blog" onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavItem icon={Info} label="Tuco CBI" onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavItem icon={MessageCircle} label="Contact Us" onClick={() => setIsMobileMenuOpen(false)} />
              </div>
                
                <div className="mt-auto pt-8 border-t border-clinic-mint/10 flex flex-col gap-6">
                  <div className="flex gap-6 justify-center">
                    <Instagram className="text-clinic-pink" size={32} />
                    <Clock className="text-clinic-mint" size={32} />
                  </div>
                  <button className="bg-clinic-mint text-white py-4 rounded-full font-black uppercase tracking-widest shadow-lg">
                    Shop Now
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      {/* Floating Sidebars - Responsive for all screen sizes */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex md:flex flex-col gap-1 select-none">
        <motion.div 
          whileHover={{ x: -10 }}
          className="bg-white rounded-l-[20px] md:rounded-l-[32px] shadow-lg md:shadow-xl p-2 md:p-4 flex flex-col items-center gap-1 md:gap-2 group cursor-pointer border-r-[4px] md:border-r-[8px] border-clinic-pink"
        >
          <Instagram size={16} md:size={20} strokeWidth={2.5} className="text-clinic-pink" />
          <span className="[writing-mode:vertical-rl] text-[8px] md:text-[10px] font-black text-clinic-pink tracking-[0.2em] md:tracking-[0.4em] py-1 md:py-2 uppercase">Instagram</span>
        </motion.div>
        <motion.div 
          whileHover={{ x: -10 }}
          className="bg-white rounded-l-[20px] md:rounded-l-[32px] shadow-lg md:shadow-xl p-2 md:p-4 flex flex-col items-center gap-1 md:gap-2 group cursor-pointer border-r-[4px] md:border-r-[8px] border-clinic-mint"
        >
          <Clock size={16} md:size={20} strokeWidth={2.5} className="text-clinic-mint" />
          <span className="[writing-mode:vertical-rl] text-[8px] md:text-[10px] font-black text-clinic-mint tracking-[0.2em] md:tracking-[0.4em] py-1 md:py-2 uppercase">Support</span>
        </motion.div>
      </div>

           <main>
        {/* Hero Section */}
        <section className="relative h-[calc(100vh-100px)] md:h-[calc(100vh-140px)] lg:h-[80vh] flex items-center justify-center p-2 md:p-4 lg:p-6 bg-white overflow-hidden min-h-[500px]">
          <div className="relative w-full h-full max-w-[98%] mx-auto rounded-[24px] md:rounded-[32px] lg:rounded-[80px] overflow-hidden shadow-lg md:shadow-2xl flex flex-col md:flex-row bg-clinic-blue/5 border-2 md:border-4 border-white">
             {/* Full Background CTA Area */}
             <div className="flex-1 relative h-full w-full overflow-hidden group flex items-center justify-center bg-gradient-to-br from-clinic-blue/40 via-clinic-cream/30 to-clinic-yellow/20">
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={heroBg} 
                    alt="Tuco Kids - Safe & Effective Skincare for Kids" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 z-5 bg-gradient-to-t md:bg-gradient-to-r from-clinic-blue/60 via-clinic-blue/30 to-clinic-yellow/40"></div>
                
                {/* Mobile decorative elements - visible on mobile */}
                <div className="flex md:hidden absolute inset-0 pointer-events-none z-5">
                  {/* Top left corner decoration */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-clinic-yellow/40 blur-lg"></div>
                  {/* Top right corner decoration */}
                  <div className="absolute top-8 right-6 w-10 h-10 rounded-full bg-clinic-pink/35 blur-lg"></div>
                  {/* Bottom left decoration */}
                  <div className="absolute bottom-12 left-8 w-14 h-14 rounded-full bg-clinic-mint/30 blur-xl"></div>
                  {/* Bottom right decoration */}
                  <div className="absolute bottom-16 right-4 w-16 h-16 rounded-full bg-clinic-yellow/35 blur-xl"></div>
                  {/* Center left accent */}
                  <div className="absolute top-1/3 left-2 w-8 h-8 rounded-full bg-clinic-pink/25 blur-md"></div>
                  {/* Center right accent */}
                  <div className="absolute top-2/3 right-3 w-10 h-10 rounded-full bg-clinic-blue/30 blur-lg"></div>
                </div>
                
                {/* Left decorative side - hidden on mobile */}
                <div className="hidden md:flex absolute left-0 top-0 bottom-0 w-1/4 pointer-events-none opacity-40 items-center justify-center z-5">
                  <div className="space-y-8">
                    <div className="w-16 h-16 rounded-full bg-clinic-yellow/50 blur-xl"></div>
                    <div className="w-12 h-12 rounded-full bg-clinic-pink/40 blur-lg ml-8"></div>
                    <div className="w-20 h-20 rounded-full bg-clinic-blue/40 blur-xl"></div>
                  </div>
                </div>

                {/* Right decorative side - hidden on mobile */}
                <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-1/4 pointer-events-none opacity-40 items-center justify-center z-5">
                  <div className="space-y-8">
                    <div className="w-14 h-14 rounded-full bg-clinic-mint/40 blur-lg mr-8"></div>
                    <div className="w-16 h-16 rounded-full bg-clinic-yellow/45 blur-xl"></div>
                    <div className="w-12 h-12 rounded-full bg-clinic-pink/35 blur-lg mr-12"></div>
                  </div>
                </div>
                
                {/* CTA Button with enhanced styling */}
                <div className="relative z-20 flex flex-col items-center gap-4 md:gap-10 text-center px-4 md:px-8">
                   {/* Decorative badge above button - mobile only */}
                   <motion.div 
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.3 }}
                     className="flex md:hidden items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-clinic-yellow/30"
                   >
                     <Sparkles size={14} className="text-clinic-pink" />
                     <span className="text-[10px] font-black text-clinic-text uppercase tracking-widest">Safe & Natural</span>
                   </motion.div>

                   <motion.button 
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ delay: 0.5 }}
                     className="bg-clinic-yellow text-clinic-text px-8 md:px-20 py-3 md:py-6 rounded-full font-black uppercase tracking-widest text-xs md:text-lg shadow-xl hover:bg-clinic-mint hover:text-white transition-all transform hover:scale-105 border-2 md:border-4 border-white"
                   >
                      SHOP NOW
                   </motion.button>

                   {/* Trust indicators - mobile only */}
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.7 }}
                     className="flex md:hidden items-center gap-3 text-white/90 text-[9px] font-black uppercase tracking-widest"
                   >
                     <div className="flex items-center gap-1">
                       <ShieldCheck size={12} />
                       <span>Toxin Free</span>
                     </div>
                     <div className="w-1 h-1 rounded-full bg-white/50"></div>
                     <div className="flex items-center gap-1">
                       <Heart size={12} />
                       <span>Dermat Tested</span>
                     </div>
                   </motion.div>
                </div>
             </div>
             <FloatingConfetti />
          </div>
        </section>

        {/* Trust Bar (Law of Social Proof) */}
        <section className="bg-clinic-cream py-10 md:py-16 border-y border-clinic-blue/10 relative z-20">
          <div className="max-w-[95%] mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-4">
              {[
                { icon: ShieldCheck, label: "Toxin Free", desc: "100% Safe" },
                { icon: Leaf, label: "Plant Powered", desc: "Native Actives" },
                { icon: Heart, label: "Dermat Tested", desc: "No Irritants" },
                { icon: Droplets, label: "Super Gentle", desc: "Tear Free" },
                { icon: Zap, label: "Fast Acting", desc: "Visible Results" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col md:flex-row items-center text-center md:text-left gap-4 group"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-clinic-mint group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                    <item.icon size={28} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[9px] md:text-xs font-black uppercase tracking-widest text-clinic-text mb-0.5">{item.label}</p>
                    <p className="text-[8px] md:text-[10px] font-bold text-clinic-text/40 uppercase tracking-tighter">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Products / Best Sellers Carousel */}
        <section className="bg-white py-24 px-4 relative overflow-hidden">
           <CloudTop color="white" opacity={1} />
           <div className="max-w-[95%] mx-auto relative z-20 pt-20">
              <div className="flex justify-between items-end mb-16">
                 <div className="flex flex-col gap-4">
                    <h2 className="text-4xl md:text-6xl font-black text-clinic-mint tracking-tighter uppercase leading-none">Our Products</h2>
                    <div className="flex gap-2">
                       <div className="w-12 h-2 bg-clinic-yellow rounded-full"></div>
                       <div className="w-24 h-2 bg-clinic-mint rounded-full"></div>
                    </div>
                 </div>
                 <motion.button 
                    whileHover={{ x: 10 }}
                    className="hidden md:flex items-center gap-2 text-clinic-text font-black uppercase tracking-widest text-xs border-b-2 border-clinic-yellow pb-2"
                 >
                    View All Products <ChevronRight size={16} />
                 </motion.button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8">
                 {BEST_SELLERS.slice(0, 12).map((product) => (
                    <ProductCard key={product.id} product={product} />
                 ))}
              </div>

              <div className="mt-16 text-center flex md:hidden">
                 <button className="bg-clinic-mint text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-xl mx-auto">
                    View All Products
                 </button>
              </div>
           </div>
        </section>

        {/* Popular Kits for Kids Carousel */}
        <section className="bg-clinic-blue/10 py-32 px-4 relative overflow-hidden">
           <CloudTop color="#f0f9fa" opacity={1} />
           <div className="max-w-[95%] mx-auto relative z-20">
              <div className="text-center mb-20">
                 <h2 className="text-4xl md:text-7xl font-black text-clinic-mint tracking-tight uppercase mb-6">popular kits for kids!</h2>
                 <div className="w-32 h-3 bg-clinic-yellow mx-auto rounded-full" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-10">
                 {POPULAR_KITS.slice(0, 5).map((kit) => (
                    <ProductCard key={kit.id} product={kit} />
                 ))}
              </div>
              
              {/* Extra row for Desktop */}
              <div className="hidden lg:grid grid-cols-5 gap-10 mt-12">
                 {POPULAR_KITS.slice(5, 10).map((kit) => (
                    <ProductCard key={kit.id} product={kit} />
                 ))}
              </div>

              <div className="mt-20 text-center">
                 <button className="bg-white text-clinic-mint border-2 border-clinic-mint px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-clinic-mint hover:text-white transition-all">
                    Explore All Kits
                 </button>
              </div>
           </div>
           <CloudBottom color="white" opacity={1} />
        </section>
        <section className="relative py-16 md:py-24 lg:py-32 bg-clinic-blue/5 overflow-hidden">
           <CloudTop color="#fcfbf4" opacity={1} />
           
           <div className="max-w-5xl mx-auto px-4 relative z-20 py-12 md:py-24">
              <div className="flex flex-col items-center text-center">
                 <div className="mb-8 md:mb-12 p-4 md:p-6 border-4 border-clinic-mint rounded-full inline-flex items-center justify-center bg-white shadow-sm">
                    <span className="text-[10px] md:text-sm font-black tracking-[0.3em] text-clinic-mint uppercase">it started with a mom</span>
                 </div>
                 <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-clinic-mint tracking-tight leading-tight mb-8 md:mb-16 drop-shadow-sm uppercase">
                   2 kids & a grandmom
                 </h2>
                 <div className="flex gap-2 mb-12 md:mb-20">
                   <div className="w-12 md:w-16 h-2 bg-clinic-yellow rounded-full"></div>
                   <div className="w-12 md:w-16 h-2 bg-clinic-mint rounded-full"></div>
                 </div>
                 
                 <div className="space-y-8 md:space-y-16 text-clinic-text/90 text-base md:text-lg lg:text-2xl leading-relaxed md:leading-[2.4] font-bold text-center max-w-4xl px-4">
                   <p>Tuco was born from a mom's rants, a grandmom's wisdom, and the belief that kids deserve skincare built for them.. not borrowed from adults.</p>
                   <p>It started with real problems - eczema, lice, a 7-year-old who wanted makeup.</p>
                   <div className="py-6 md:py-12">
                     <DecorativeDoodles className="w-full max-w-sm md:max-w-lg mx-auto" />
                   </div>
                   <p>Rooted in tradition and backed by modern science, we offer gentle, effective, and fun solutions for skin, hair, and body care. 5 lakh parents trust us!</p>
                   <motion.button 
                     whileHover={{ scale: 1.05 }}
                     className="mt-8 px-10 py-3 bg-clinic-mint text-white rounded-full font-black uppercase tracking-widest shadow-lg text-sm"
                   >
                     read our story
                   </motion.button>
                 </div>
              </div>
           </div>
           
           <CloudBottom color="#f8fbfe" opacity={1} />
        </section>
        
        {/* FAQ Grid Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[#f3f9fa] opacity-60 z-0" />
          <div className="absolute top-20 right-20 opacity-20 z-0 scale-75 md:scale-150">
             <ScallopedCloud top={true} height="80px" animate={true} />
          </div>
          <div className="absolute bottom-20 left-10 opacity-20 z-0 scale-75 md:scale-125">
             <ScallopedCloud top={false} height="100px" animate={true} />
          </div>
  
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12 md:mb-24 relative">
               <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-clinic-mint tracking-[0.2em] mb-4 uppercase">Skincare Wisdom</h2>
               <p className="text-clinic-text/40 font-black tracking-[0.3em] mb-8 text-[10px] md:text-lg uppercase">Common Concerns</p>
               <div className="w-24 md:w-32 h-2 bg-clinic-mint mx-auto rounded-full" />
               <DecorativeSticker type="star" className="top-0 left-4 md:left-20" />
               <DecorativeSticker type="triangle" className="bottom-0 right-4 md:right-32" />
            </div>
  
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-16 bg-white/40 backdrop-blur-sm p-8 md:p-24 rounded-[40px] md:rounded-[100px] border-4 md:border-8 border-dashed border-[#e1edf0] relative shadow-inner">
              <FaqItem num="01" label="Skin Dullness" icon={Smile} />
              <FaqItem num="02" label="Sun Protection" icon={Sparkles} />
              <FaqItem num="03" label="Rashes & Itch" icon={MessageCircle} />
              <FaqItem num="04" label="Tangled Hair" icon={TreePine} />
              <FaqItem num="05" label="Natural Makeup" icon={MapPin} />
              <FaqItem num="06" label="Ingredients" icon={Heart} />
              <FaqItem num="07" label="Shipping" icon={Clock} />
              <FaqItem num="08" label="Bulk Orders" icon={Star} />
              
              <DecorativeSticker type="confetti" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />
              <DecorativeSticker type="flower" className="top-0 left-0 -translate-x-1/2 -translate-y-1/2 scale-110" />
              <DecorativeSticker type="star" className="bottom-0 right-0 translate-x-1/2 translate-y-1/2 scale-150" />
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden pointer-events-none">
            <ScallopedCloud top={false} height="120px" animate={true} className="bottom-8 opacity-50" />
            <ScallopedCloud top={false} height="100px" animate={true} />
          </div>
        </section>

        {/* The Tuco Code Section */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          <div className="max-w-[95%] mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-12 md:mb-20 relative">
              <h2 className="text-3xl md:text-5xl lg:text-8xl font-black text-clinic-text tracking-tighter uppercase leading-none">
                the tuco code
              </h2>
              <div className="w-32 md:w-48 h-3 md:h-4 bg-clinic-yellow mx-auto rounded-full mt-3 md:mt-4" />
              <DecorativeSticker type="confetti" className="-top-12 left-1/3" animate={false} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
              <TucoCodeCard bgColor="#d1f2ff" title="zero toxin tolerance" icon={ShieldCheck}>
                <div className="flex flex-col gap-2">
                  <span><strong>no</strong> parabens.</span>
                  <span><strong>no</strong> pthalates.</span>
                  <span><strong>no</strong> sulphates.</span>
                  <span><strong>no</strong> hormone disruptors.</span>
                </div>
              </TucoCodeCard>

              <TucoCodeCard bgColor="#ffeb8c" title="made for kids" icon={Smile}>
                <p>kids' skin is <span className="text-clinic-mint">30% thinner</span> and harsh adult products may damage skin easily.</p>
              </TucoCodeCard>

              <TucoCodeCard bgColor="#c5f2d0" title="sustainably thriving" icon={Leaf}>
                <p>all our product bottles are filled with <span className="text-clinic-mint">recycled plastic!</span> every bottle is an <strong>unbottle.</strong></p>
              </TucoCodeCard>

              <TucoCodeCard bgColor="#e0d1ff" title="grandma approved" icon={Heart}>
                <p>made of all natural ingredients found right in your <span className="text-clinic-pink">grandma's home kitchen.</span></p>
              </TucoCodeCard>

              <TucoCodeCard bgColor="#ffd1d1" title="Tear Free Fun" icon={Droplets}>
                <p>Naturally gentle formulas that ensure <span className="text-clinic-mint">zero irritation</span> for the eyes.</p>
              </TucoCodeCard>
            </div>
            
            <div className="mt-12 md:mt-20 text-center">
               <button className="bg-clinic-text text-white px-8 md:px-10 py-3 md:py-5 rounded-full font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-clinic-mint transition-colors">
                  Learn More about our code
               </button>
            </div>
          </div>
        </section>

        {/* Shop by Category */}
        <section className="py-24 bg-clinic-cream relative overflow-hidden">
           <CloudTop color="white" opacity={1} />
           <div className="max-w-[95%] mx-auto px-4 relative z-20">
              <div className="text-center mb-20">
                 <h2 className="text-4xl md:text-7xl font-black text-clinic-mint tracking-tight uppercase mb-4">shop by category</h2>
                 <div className="w-24 h-2 bg-clinic-yellow mx-auto rounded-full" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-10">
                 {[
                   { label: "Haircare", icon: TreePine, color: "#d1f2ff" },
                   { label: "Cleansing", icon: Droplets, color: "#ffeb8c" },
                   { label: "Suncare", icon: Zap, color: "#c5f2d0" },
                   { label: "Face Care", icon: Smile, color: "#e0d1ff" },
                   { label: "Makeup", icon: Sparkles, color: "#ffd1d1" },
                   { label: "Gifting", icon: Briefcase, color: "#d8e7ed" }
                 ].map((cat, i) => (
                   <motion.div 
                     key={i}
                     whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                     className="flex flex-col items-center gap-6 group cursor-pointer"
                   >
                     <div 
                       className="w-32 h-32 md:w-48 md:h-48 rounded-[40px] flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all border-4 border-white"
                       style={{ backgroundColor: cat.color }}
                     >
                       <cat.icon size={64} className="text-clinic-text opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                     </div>
                     <span className="text-xs md:text-sm font-black text-clinic-text uppercase tracking-widest">{cat.label}</span>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Themed Sections */}
        <section className="py-24 bg-white">
           <ThemedSection 
              title="for dull & tanned skin!"
              imageUrl="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&q=80&w=800"
              products={BEST_SELLERS.filter(p => p.tag === 'face care').slice(0, 4)}
              bgColor="#fff9e6"
           />
           <ThemedSection 
              title="for tangled & itchy hair!"
              imageUrl="https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&q=80&w=800"
              products={BEST_SELLERS.filter(p => p.tag === 'haircare').slice(0, 4)}
              bgColor="#e6f7ff"
              reverse
           />
           <ThemedSection 
              title="safe & natural makeup!"
              imageUrl="https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&q=80&w=800"
              products={BEST_SELLERS.filter(p => p.tag === 'makeup').slice(0, 4)}
              bgColor="#fff0f5"
           />
        </section>

        {/* Blog Section */}
        <section className="relative py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
           <div className="max-w-7xl mx-auto px-4 relative z-20">
              <div className="text-center mb-12 md:mb-24">
                 <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-clinic-mint tracking-[0.2em] md:tracking-[0.4em] uppercase mb-8">Lil' Matters!</h2>
                 <div className="w-20 md:w-24 h-2 bg-clinic-yellow mx-auto rounded-full" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                 {BLOG_POSTS.map((post) => (
                   <NewsCard 
                     key={post.id}
                     date={`${post.date} by ${post.author}`} 
                     tags={[post.category]} 
                     title={post.title}
                     excerpt="Safe, natural, and effective tips for your little ones. We explore the best ingredients and routines recommended by experts..."
                     image={post.image}
                   />
                 ))}
              </div>
           </div>
           
           <CloudBottom color="#f8fbfe" opacity={1} />
        </section>

        {/* Insta Buy Section */}
        <section className="py-16 md:py-24 bg-clinic-mint/5 relative overflow-hidden">
           <CloudTop color="white" opacity={1} />
           <div className="max-w-[95%] mx-auto px-4 text-center relative z-20">
              <div className="mb-12 md:mb-20">
                <div className="inline-block px-6 py-2 bg-clinic-pink/10 rounded-full mb-4 md:mb-6">
                   <span className="text-clinic-pink font-black tracking-[0.4em] text-[10px] uppercase">5 lakh parents trust us!</span>
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-9xl font-black text-clinic-mint tracking-tighter uppercase mb-4">insta buy!</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-20">
                 <div className="aspect-video bg-clinic-blue/5 rounded-[30px] md:rounded-[40px] overflow-hidden shadow-xl md:shadow-2xl border-2 md:border-4 border-white relative group">
                    <SmartImage 
                      src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&q=80&w=800" 
                      alt="Safe for kids" 
                      aspectClass="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                 </div>
                 <div className="aspect-video bg-clinic-blue rounded-[30px] md:rounded-[40px] overflow-hidden shadow-xl md:shadow-2xl border-2 md:border-4 border-white">
                    <SmartImage 
                      src="https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&q=80&w=800" 
                      alt="Brand Stories" 
                      aspectClass="w-full h-full"
                    />
                 </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-10">
                 {[1, 2, 3, 4].map((n) => (
                   <motion.div 
                     key={n}
                     whileHover={{ y: -15, rotate: n % 2 === 0 ? 2 : -2 }}
                     className="bg-white p-2 md:p-3 pb-8 md:pb-12 rounded-[15px] md:rounded-[20px] shadow-lg md:shadow-2xl relative group cursor-pointer border border-clinic-blue/5 h-fit"
                   >
                     <div className="aspect-square bg-clinic-blue/10 rounded-lg md:rounded-xl overflow-hidden relative">
                       <SmartImage 
                         src={`https://images.unsplash.com/photo-${n === 1 ? '1498842812179-c81beecf902c' : n === 2 ? '1522338242992-e1a54906a8da' : n === 3 ? '1512496015851-a90fb38ba796' : '1492724441997-5dc865305da7'}?auto=format&q=80&w=600`} 
                         alt="Instagram Post" 
                         className="group-hover:scale-110 transition-transform duration-[1.5s]"
                       />
                       <div className="absolute inset-0 bg-clinic-mint/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-10 md:w-14 h-10 md:h-14 bg-white rounded-full flex items-center justify-center text-clinic-mint shadow-xl">
                             <Instagram size={20} md:size={24} />
                          </div>
                       </div>
                     </div>
                     
                     <div className="absolute bottom-2 md:bottom-4 left-3 md:left-6 right-3 md:right-6 flex items-center justify-between text-clinic-text/30">
                        <div className="flex gap-2 md:gap-4">
                           <Heart size={14} md:size={16} />
                           <MessageCircle size={14} md:size={16} />
                        </div>
                        <Send size={14} md:size={16} />
                     </div>
                     
                     {/* Shoppable Tag */}
                     <motion.div 
                       initial={{ scale: 0 }}
                       whileHover={{ scale: 1 }}
                       className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-xl md:shadow-2xl flex items-center gap-2 border border-clinic-mint/20 whitespace-nowrap hidden group-hover:flex"
                     >
                        <div className="w-2 h-2 bg-clinic-mint rounded-full animate-pulse"></div>
                        <span className="text-[8px] md:text-[10px] font-black text-clinic-text uppercase tracking-widest">Shop this item</span>
                     </motion.div>
                   </motion.div>
                  ))}
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="mt-12 md:mt-20 px-8 md:px-12 py-3 md:py-4 bg-white text-clinic-pink border-2 border-clinic-pink rounded-full font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 md:gap-3 mx-auto hover:bg-clinic-pink hover:text-white transition-all shadow-lg md:shadow-xl text-xs"
              >
                Follow @tucokids <Instagram size={18} md:size={20} />
              </motion.button>
           </div>
        </section>

        {/* Newsletter Section */}
        <section className="relative py-16 md:py-24 px-4 md:px-6 bg-[#fcfbf4] overflow-hidden text-center">
           <div className="max-w-4xl mx-auto relative z-20">
             <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#4A4543] mb-3 md:mb-4 tracking-tight">one email a week. just one.</h2>
             <p className="text-[#4A4543]/70 text-sm md:text-base lg:text-lg mb-8 md:mb-10 max-w-2xl mx-auto font-medium">
               no spam, but skin and hair hacks for the smooth operator in you. plus, sweet deals for some daylight robbery!
             </p>
             <div className="max-w-md mx-auto relative">
               <input 
                 type="email" 
                 placeholder="Email"
                 className="w-full bg-[#f8f6e8] border-2 border-[#4A4543]/10 p-3 md:p-5 pr-12 md:pr-16 rounded-full font-bold text-sm md:text-lg outline-none focus:border-[#4A4543]/30 transition-all text-[#4A4543]"
               />
               <button className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 bg-[#4A4543] text-white p-2 md:p-3 rounded-full hover:bg-clinic-mint transition-colors">
                 <ArrowRight size={20} md:size={24} />
               </button>
             </div>
           </div>
           
           {/* Decorative elements from screenshot */}
           <div className="absolute top-10 left-[10%] text-clinic-mint/20 opacity-50 scale-50 md:scale-100"><Cloud size={80} /></div>
           <div className="absolute bottom-20 right-[15%] text-clinic-pink/20 opacity-50 rotate-45 scale-50 md:scale-100"><Sparkles size={60} /></div>
           <div className="absolute top-1/2 left-[5%] text-clinic-yellow/20 opacity-50"><Cloud size={60} /></div>
        </section>

        <BrandStory />

        <FeaturedIn />
      </main>
  
      {/* Footer Area */}
      <footer className="bg-[#413b39] text-white pt-32 pb-16 relative overflow-hidden">
        {/* Wavy transition from newsletter */}
        <div className="absolute top-0 left-0 right-0 -translate-y-[80%]">
          <svg viewBox="0 0 1440 320" className="w-full h-auto fill-[#413b39]">
            <path d="M0,160C200,80,400,240,720,160C1040,80,1240,240,1440,160L1440,320L0,320Z"></path>
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Brand Column */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="w-32 brightness-0 invert opacity-90">
                <FrogLogo />
              </div>
              <p className="text-sm font-bold text-white/60 leading-relaxed max-w-md">
                a skincare range ONLY for kids, invented by mom. We want sustainability to be sustainable for you. So that you repeat it.
              </p>
              
              <div className="flex flex-col gap-6">
                <div className="flex gap-2">
                  {[Facebook, Instagram, Youtube, Linkedin, ShoppingCart].map((Icon, i) => (
                    <div key={i} className="w-10 h-10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors">
                      <Icon size={18} />
                    </div>
                  ))}
                </div>
                
                {/* Partner Logos Grid */}
                <div className="flex flex-wrap gap-2">
                  {['blinkit', 'zepto', 'myntra', 'nykaa', 'firstcry', 'meesho'].map((partner) => (
                    <div key={partner} className="px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/40">
                      {partner}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Links Column */}
            <div className="lg:col-span-3">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-white/90">Quick Links</h3>
              <ul className="grid grid-cols-1 gap-4 text-xs font-bold text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Haircare for Kids</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Skincare for Kids</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Suncare for Kids</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Makeup for Kids</a></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="lg:col-span-4">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-white/90">Contact Us</h3>
              <div className="flex flex-col gap-8 text-xs font-bold text-white/50">
                <div className="flex gap-4">
                  <MapPin className="text-white/30 flex-shrink-0" size={18} />
                  <p className="leading-relaxed">504, 5th Floor, Sakti Statesman, Outer Ring Road, Bellandur, Bengaluru, Karnataka, 560103</p>
                </div>
                <div className="flex gap-4 items-center">
                  <Phone className="text-white/30 flex-shrink-0" size={18} />
                  <p>+91 92072 45500</p>
                </div>
                <div className="flex gap-4 items-center">
                  <Mail className="text-white/30 flex-shrink-0" size={18} />
                  <p>support@tucokids.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
              &copy; {new Date().getFullYear()} TUCO KIDS PRIVATE LIMITED. MADE WITH LOVE FOR ALL KIDS.
            </p>
          </div>
        </div>

        {/* Floating Chat Button mockup from screenshot */}
        <div className="fixed bottom-6 right-6 z-[100] group cursor-pointer hidden sm:block">
           <div className="w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center p-3 relative hover:scale-110 transition-transform">
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">1</div>
              <Smile size={28} className="text-[#413b39]" />
           </div>
        </div>
      </footer>
    </div>
  );
}

const BrandStory = () => (
  <section className="py-16 md:py-24 bg-clinic-blue/10 relative overflow-hidden">
    <div className="max-w-[95%] mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16">
      <div className="flex-1 relative w-full">
         <div className="w-full aspect-[4/5] rounded-[40px] md:rounded-[60px] overflow-hidden border-4 md:border-8 border-white shadow-lg md:shadow-2xl rotate-3">
            <SmartImage src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&q=80&w=800" alt="Tuco Story" aspectClass="w-full h-full" />
         </div>
         <DecorativeDoodles className="absolute -bottom-8 md:-bottom-12 -left-8 md:-left-12 w-32 md:w-48" />
      </div>
      <div className="flex-1 flex flex-col gap-6 md:gap-8">
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-clinic-mint tracking-tighter uppercase leading-none">2 kids & a grandmom</h2>
        <p className="text-base md:text-lg lg:text-xl font-bold text-clinic-text/70 leading-relaxed italic">
           "It all started with a mom's real struggle. Eczema, lice, and a 7-year-old begging for makeup. I knew we needed something safer. Something grandmom would approve of."
        </p>
        <p className="text-sm md:text-base text-clinic-text/60 leading-relaxed">
           Deeply rooted in ancient Ayurvedic wisdom and powered by modern science, Tuco Kids brings you products that are 100% toxin-free and kid-approved. From resolving itchy scalps to providing a safe first makeup kit, we've got it all covered.
        </p>
        <button className="bg-clinic-mint text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-lg md:shadow-xl self-start hover:bg-clinic-yellow hover:text-clinic-text transition-colors">
           Read Our Story
        </button>
      </div>
    </div>
  </section>
);

const NavItem = ({ label, href = "#" }: { label: string, href?: string }) => (
  <a href={href} className="group relative px-2 py-1 flex flex-col items-center">
    <span className="text-[10px] xl:text-[11px] font-black text-clinic-text uppercase tracking-widest group-hover:text-clinic-mint transition-colors whitespace-nowrap">
      {label}
    </span>
    <motion.div 
      className="h-[3px] bg-clinic-yellow rounded-full w-0 group-hover:w-full transition-all duration-300"
      whileHover={{ width: '100%' }}
    />
  </a>
);

const FloatingConfetti = () => (
  <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ 
          y: [0, 40, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 5 + Math.random() * 5, 
          repeat: Infinity,
          delay: Math.random() * 5
        }}
        className="absolute"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      >
        <div 
          className="w-3 h-3"
          style={{
            clipPath: i % 3 === 0 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : i % 3 === 1 ? 'circle(50% at 50% 50%)' : 'none',
            backgroundColor: i % 4 === 0 ? '#6db5b5' : i % 4 === 1 ? '#f4e082' : i % 4 === 2 ? '#d8e7ed' : '#f2aebc'
          }}
        />
      </motion.div>
    ))}
  </div>
);

const DecorativeBadge = ({ className }: { className?: string }) => (
  <div className={`flex flex-col items-center justify-center w-24 h-24 rounded-full border border-clinic-mint/30 bg-white/50 backdrop-blur-sm text-clinic-mint p-4 text-center ${className}`}>
    <Sparkles size={20} className="mb-1" />
    <span className="text-[8px] font-black uppercase tracking-widest leading-tight">Teeth & Health</span>
  </div>
);

const MobileNavItem = ({ icon: Icon, label, subLabel, onClick }: any) => (
  <motion.div 
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="flex items-center gap-6 p-4 bg-clinic-blue/10 rounded-2xl border-2 border-clinic-mint/5 hover:bg-clinic-blue/20 transition-colors"
  >
    <div className="bg-white p-3 rounded-xl text-clinic-mint shadow-sm">
      <Icon size={24} />
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-black text-clinic-mint uppercase tracking-wider">{label}</span>
      {subLabel && <span className="text-[10px] text-clinic-text font-bold opacity-60 uppercase tracking-widest">{subLabel}</span>}
    </div>
    <ChevronRight className="ml-auto text-clinic-mint/30" size={20} />
  </motion.div>
);

const TucoCodeCard = ({ bgColor, title, icon: Icon, children }: any) => (
  <div 
    className="w-full rounded-[40px] md:rounded-[50px] p-4 md:p-6 lg:p-8 flex flex-col items-center gap-4 md:gap-6 shadow-lg md:shadow-2xl border-4 border-white transition-shadow hover:shadow-clinic-mint/20"
    style={{ backgroundColor: bgColor }}
  >
    <div className="flex flex-col items-center gap-3 md:gap-4 text-center h-auto md:h-[160px] justify-center">
      <h3 className="text-lg md:text-2xl lg:text-4xl font-black text-clinic-text leading-[0.85] uppercase tracking-tighter">
        {title}
      </h3>
      <div className="w-16 h-16 md:w-20 md:h-20 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-clinic-text border-2 border-white/60 shadow-lg">
        <Icon size={32} strokeWidth={2.5} />
      </div>
    </div>
    <div className="bg-white rounded-[30px] md:rounded-[40px] p-4 md:p-6 lg:p-10 flex-1 flex flex-col justify-center text-center shadow-inner border-2 border-clinic-text/5 w-full">
      <div className="text-[10px] md:text-xs lg:text-sm font-black text-clinic-text/70 leading-relaxed uppercase tracking-widest">
        {children}
      </div>
    </div>
  </div>
);

const NewsCard = ({ date, tags, title, image, excerpt }: any) => (
  <motion.div 
    whileHover={{ y: -12 }}
    whileFocus={{ y: -12 }}
    tabIndex={0}
    role="button"
    className="bg-white rounded-[40px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_60px_rgba(242,174,188,0.15)] transition-all duration-700 cursor-pointer group flex flex-col border border-clinic-pink/5 h-full focus:outline-none focus:ring-4 focus:ring-clinic-pink/20"
  >
    <div className="m-3 rounded-[32px] overflow-hidden relative">
      <SmartImage 
        src={image} 
        alt={title} 
        aspectClass="aspect-[16/10]"
        className="group-hover:scale-110 transition-transform duration-[2s]" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
      
      <div className="absolute bottom-4 left-4 z-20 flex gap-2">
        {tags.map((tag: string) => (
          <span key={tag} className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-[9px] font-black text-clinic-pink uppercase tracking-[0.2em] rounded-full shadow-lg">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="absolute top-4 right-4 z-20">
        <div className="w-10 h-10 bg-clinic-yellow rounded-2xl flex items-center justify-center text-clinic-text shadow-lg">
          <Star size={20} fill="currentColor" strokeWidth={0} />
        </div>
      </div>
    </div>

    <div className="p-7 pt-4 flex-1 flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-[2px] bg-clinic-pink/30"></div>
        <span className="text-[10px] font-bold text-clinic-text/40 uppercase tracking-widest">{date}</span>
      </div>

      <h3 className="text-base lg:text-lg font-black text-clinic-text leading-[1.3] group-hover:text-clinic-pink transition-colors mb-4 line-clamp-2">
        {title}
      </h3>
      
      <p className="text-[12px] text-clinic-text/60 line-clamp-3 mb-8 leading-relaxed font-medium italic">
        "{excerpt}"
      </p>

      <div className="mt-auto flex items-center justify-between border-t border-clinic-pink/5 pt-6">
        <div className="flex -space-x-2">
           {[1, 2, 3].map(i => (
             <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-clinic-blue">
               <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Reader" className="w-full h-full object-cover" />
             </div>
           ))}
           <div className="w-8 h-8 rounded-full border-2 border-white bg-clinic-mint text-white flex items-center justify-center text-[8px] font-bold">+12</div>
        </div>
        
        <div className="flex items-center text-clinic-pink font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-4 gap-2 transition-all">
          read journal <ChevronRight size={18} strokeWidth={3} />
        </div>
      </div>
    </div>
  </motion.div>
);

const AimCard = ({ number, description, image }: any) => (
  <div className="flex flex-col gap-6 group">
    <div className="relative rounded-[40px] overflow-hidden aspect-[4/5] shadow-xl group-hover:shadow-2xl transition-all duration-500">
      <img src={image} alt={description} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-0 left-0 bg-clinic-blue text-white font-black text-4xl px-6 py-4 rounded-br-[40px] drop-shadow-md">
        {number}
      </div>
      <div className="absolute top-4 right-4 text-white p-2">
        <Sparkles size={24} />
      </div>
    </div>
    <h3 className="text-sm font-black text-clinic-text/80 leading-[1.8] tracking-wider px-2">
      {description}
    </h3>
  </div>
);
