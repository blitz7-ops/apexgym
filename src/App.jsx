import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, Calendar, Users, Trophy, Activity, Clock, Flame, 
  MapPin, Phone, Mail, Award, CheckCircle2, ChevronDown, Sparkles, 
  ArrowRight, ArrowUpRight, Play, User, Target, Heart, Compass,
  X, RefreshCw, Menu
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Curated Cinematic Image & Media Assets
const IMAGES = {
  heroBg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop",
  before: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop",
  after: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800&auto=format&fit=crop",
  programs: {
    strength: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    hiit: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=800&auto=format&fit=crop",
    crossfit: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=800&auto=format&fit=crop",
    yoga: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    recovery: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=800&auto=format&fit=crop",
    training: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop"
  },
  trainers: {
    marcus: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=600&auto=format&fit=crop",
    sarah: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600&auto=format&fit=crop",
    elena: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop",
    darius: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop"
  },
  gallery: [
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop"
  ],
  avatars: {
    christian: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    samantha: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    damian: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
  },
  tour: {
    floor: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop",
    cardio: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    recovery: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop"
  }
};

// Virtual Tour Zones Data
const TOUR_ZONES = [
  {
    id: "floor",
    name: "Gym Floor",
    img: IMAGES.tour.floor,
    desc: "Our primary strength zone housing professional racks, free weights, and competition platforms.",
    hotspots: [
      { id: 1, top: "35%", left: "45%", title: "Olympic Power Bays", desc: "Heavy Eleiko power rigs outfitted with custom competition plates, and electronic sensors tracking bar velocity." },
      { id: 2, top: "65%", left: "28%", title: "Pro Dumbbell Deck", desc: "Custom solid steel dumbbells ranging up to 150 lbs, set on vibration-absorbing pads." }
    ]
  },
  {
    id: "cardio",
    name: "Cardio Suite",
    img: IMAGES.tour.cardio,
    desc: "Sleek biometric conditioning suites loaded with real-time feedback systems.",
    hotspots: [
      { id: 3, top: "45%", left: "20%", title: "Woodway Curves", desc: "Non-motorized curved treadmills designed for raw athletic sprint training." },
      { id: 4, top: "50%", left: "75%", title: "Wattbike Hub", desc: "Biomechanical feedback cycling trainers analyzing pedaling efficiency." }
    ]
  },
  {
    id: "recovery",
    name: "Recovery Oasis",
    img: IMAGES.tour.recovery,
    desc: "Contrast therapies and recovery solutions optimized for rapid post-workout healing.",
    hotspots: [
      { id: 5, top: "40%", left: "55%", title: "Traditional Dry Sauna", desc: "Aromatic cedar saunas operating at 90°C for growth hormone release." },
      { id: 6, top: "60%", left: "80%", title: "Contrast Cold Plunge", desc: "Scientific ice baths running stable at 3°C to flush inflammatory markers." }
    ]
  }
];

export default function App() {
  // Global States
  const [activeTab, setActiveTab] = useState('all');
  const [isAnnual, setIsAnnual] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Virtual Tour States
  const [activeZone, setActiveZone] = useState(TOUR_ZONES[0]);
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  // Form States
  const [trialForm, setTrialForm] = useState({
    name: '', email: '', phone: '', goal: '', time: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Calculator States
  const [calcUnit, setCalcUnit] = useState('metric'); // metric | imperial
  const [calcWeight, setCalcWeight] = useState('');
  const [calcHeight, setCalcHeight] = useState('');
  const [calcAge, setCalcAge] = useState('');
  const [calcActivity, setCalcActivity] = useState('1.55'); // moderately active
  const [calcGoal, setCalcGoal] = useState('maintenance');
  const [calcResults, setCalcResults] = useState(null);

  // Handle Navbar Background Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tracking Mouse Glow
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const root = document.documentElement;
    root.style.setProperty('--x', `${clientX}px`);
    root.style.setProperty('--y', `${clientY}px`);
  };

  // Form Validation and Submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!trialForm.name.trim()) errors.name = "Full name is required";
    if (!trialForm.email.trim() || !/\S+@\S+\.\S+/.test(trialForm.email)) errors.email = "Valid email is required";
    if (!trialForm.phone.trim() || trialForm.phone.length < 8) errors.phone = "Valid phone is required";
    if (!trialForm.goal) errors.goal = "Please select a fitness goal";
    if (!trialForm.time) errors.time = "Please choose a preferred time";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      setFormSubmitted(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#0052FF', '#00FF66', '#ffffff']
      });
    }
  };

  // BMI and Calorie Calculator Logic
  const calculateFitness = (e) => {
    e.preventDefault();
    if (!calcWeight || !calcHeight || !calcAge) return;

    let w = parseFloat(calcWeight);
    let h = parseFloat(calcHeight);
    let age = parseFloat(calcAge);
    
    let bmi = 0;
    let bmr = 0;

    if (calcUnit === 'metric') {
      bmi = w / ((h / 100) * (h / 100));
      bmr = (10 * w) + (6.25 * h) - (5 * age) + 5;
    } else {
      bmi = (w / (h * h)) * 703;
      bmr = (4.536 * w) + (15.88 * h) - (5 * age) + 5;
    }

    const tdee = bmr * parseFloat(calcActivity);
    let targetCal = tdee;

    if (calcGoal === 'lose') targetCal = tdee - 500;
    else if (calcGoal === 'gain') targetCal = tdee + 400;

    let bmiCategory = "Normal Weight";
    let bmiColor = "text-apex-green";
    if (bmi < 18.5) { bmiCategory = "Underweight"; bmiColor = "text-apex-blue-neon"; }
    else if (bmi >= 25 && bmi < 30) { bmiCategory = "Overweight"; bmiColor = "text-yellow-400"; }
    else if (bmi >= 30) { bmiCategory = "Obese"; bmiColor = "text-red-500"; }

    setCalcResults({
      bmi: bmi.toFixed(1),
      bmiCategory,
      bmiColor,
      calories: Math.round(targetCal),
      tdee: Math.round(tdee),
      bmr: Math.round(bmr)
    });
  };

  return (
    <div 
      className="relative min-h-screen bg-apex-black text-white font-sans overflow-x-hidden transition-colors duration-300 mouse-glow-bg select-none"
      onMouseMove={handleMouseMove}
      style={{ '--x': '50%', '--y': '50%' }}
    >
      {/* 2. Transparent Sticky Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-navbar py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-apex-blue to-apex-blue-neon flex items-center justify-center font-display font-black text-2xl tracking-tighter shadow-[0_0_20px_rgba(0,82,255,0.4)] group-hover:scale-105 transition-transform duration-300">
              A
            </span>
            <div className="leading-none">
              <span className="font-display font-black text-2xl tracking-tight block text-white">APEX</span>
              <span className="text-[10px] tracking-[0.25em] text-apex-green uppercase font-bold">Fitness Club</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold tracking-widest uppercase text-white">
            {['Programs', 'Membership', 'Trainers', 'Tour', 'Schedule', 'Gallery', 'Calculator'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-neutral-200 hover:text-white transition-colors duration-300 relative py-1 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-apex-blue transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:3055550148" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-white transition-colors duration-300">
              <Phone className="w-4 h-4 text-apex-blue-neon" />
              <span>(305) 555-0148</span>
            </a>
            <a 
              href="#trial" 
              className="bg-white hover:bg-apex-blue text-black hover:text-white px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_25px_rgba(0,82,255,0.4)] hover:scale-105 border border-transparent"
            >
              Book Free Trial
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-white hover:text-apex-blue transition-colors duration-200"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-apex-black/95 flex flex-col justify-between p-8">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-2">
              <span className="w-10 h-10 rounded-lg bg-apex-blue flex items-center justify-center font-display font-extrabold text-xl shadow-[0_0_15px_rgba(0,82,255,0.4)]">A</span>
              <span className="font-display font-black text-2xl tracking-tight text-white">APEX</span>
            </a>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-apex-blue transition-colors duration-200"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 text-3xl font-display font-extrabold tracking-wide uppercase my-8">
            {['Programs', 'Membership', 'Trainers', 'Tour', 'Schedule', 'Gallery', 'Calculator'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-apex-blue transition-colors duration-200 text-white"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4">
            <a 
              href="#trial" 
              onClick={() => setMobileMenuOpen(false)}
              className="bg-apex-blue hover:bg-apex-blue-neon text-white text-center py-4 rounded-xl font-bold uppercase tracking-widest transition-all duration-300"
            >
              Book Free Trial
            </a>
            <div className="text-center text-xs text-neutral-200 mt-4">
              <p>Miami, Florida • 24/7 Access</p>
              <p className="mt-1 font-semibold text-white">(305) 555-0148</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-lines-bg pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-apex-black via-transparent to-apex-black/80 pointer-events-none z-10" />

        <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <div className="absolute inset-0 bg-black/60 z-[2]" />
          <img 
            src={IMAGES.heroBg} 
            alt="Apex Luxury Fitness Club Background" 
            className="w-full h-full object-cover scale-105 transform origin-center animate-pulse"
            loading="eager"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full text-center lg:text-left mt-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Hero content */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-apex-green w-fit mx-auto lg:mx-0 mb-6 backdrop-blur-md">
                <Sparkles className="w-4 h-4" />
                <span>Miami's Premier Private Athletic Sanctuary</span>
              </div>

              <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.95] uppercase tracking-tighter mb-6 text-white">
                Train Hard.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-apex-blue via-apex-blue-neon to-apex-green">
                  Live Strong.
                </span>
              </h1>

              <p className="text-neutral-200 text-sm md:text-lg font-medium max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                Unlock your absolute physical potential. Elevate your performance inside Wynwood's state-of-the-art facility featuring world-class coaching, custom weight rig suites, and bespoke contrast recovery zones.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="#trial" 
                  className="bg-apex-blue hover:bg-apex-blue-neon text-white font-black uppercase px-8 py-5 rounded-xl tracking-widest flex items-center justify-center gap-2 group transition-all duration-300 shadow-[0_4px_25px_rgba(0,82,255,0.45)] hover:scale-105"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
                <a 
                  href="#membership" 
                  className="border border-white/20 hover:border-white bg-white/5 hover:bg-white/10 text-white font-black uppercase px-8 py-5 rounded-xl tracking-widest flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
                >
                  Explore Membership
                </a>
              </div>
            </div>

            {/* Sidebar statistics */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
              {[
                { label: "5,200+", desc: "Elite Active Members" },
                { label: "25+", desc: "Certified Coaches & Specialists" },
                { label: "98%", desc: "Success Tracking Index" },
                { label: "24/7", desc: "Biometric Access Control" }
              ].map((stat, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl flex flex-col justify-between border-white/10 relative overflow-hidden group hover:border-apex-blue/30 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-apex-blue/5 rounded-full blur-xl group-hover:bg-apex-blue/15 transition-all duration-300"></div>
                  <h4 className="font-display font-black text-3xl text-white group-hover:text-apex-blue transition-colors duration-300 mb-1">{stat.label}</h4>
                  <p className="text-[10px] text-neutral-200 uppercase tracking-widest font-bold">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-neutral-200 font-bold uppercase tracking-widest animate-bounce z-20">
          <span>Scroll to Discover</span>
          <ChevronDown className="w-4 h-4 text-apex-blue-neon" />
        </div>
      </section>

      {/* 5. PROGRAMS SECTION */}
      <section id="programs" className="py-24 relative z-20 overflow-hidden bg-apex-black">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header Layout */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 border-b border-white/10 pb-12">
            <div>
              <div className="flex items-center gap-2 text-apex-blue-neon mb-3 font-semibold">
                <Dumbbell className="w-5 h-5 text-apex-blue-neon" />
                <span className="text-xs font-bold uppercase tracking-widest">02 / DISCIPLINE</span>
              </div>
              <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-none text-white">
                CHOOSE YOUR<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-apex-blue to-apex-blue-neon">DISCIPLINE.</span>
              </h2>
            </div>
            
            {/* Highly Visible Paragraph */}
            <div className="max-w-lg">
              <p className="text-neutral-200 text-base md:text-lg leading-relaxed font-semibold bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">
                Explore meticulously engineered fitness pathways. Whether you are looking to build raw strength, torch fat, or optimize recovery, we have custom architectures tailored for you.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Strength & Power", desc: "Barbell mastery, Olympic lifting, and metabolic strength hypertrophy.", img: IMAGES.programs.strength, tag: "STRENGTH" },
              { title: "Metabolic HIIT", desc: "High-intensity circuits that push VO2 max and burn calories post-workout.", img: IMAGES.programs.hiit, tag: "HIIT" },
              { title: "CrossFit Zone", desc: "Affiliated box workouts combining gymnastics, olympic lifting, and endurance.", img: IMAGES.programs.crossfit, tag: "ATHLETIC" },
              { title: "Precision Yoga", desc: "Deep flexibility, mobility, and core strength layouts centered on breathing.", img: IMAGES.programs.yoga, tag: "MOBILITY" },
              { title: "Scientific Recovery", desc: "Contrast therapy, sauna, steam room, and cryotherapy ice bath structures.", img: IMAGES.programs.recovery, tag: "RECOVERY" },
              { title: "1-on-1 Coaching", desc: "Private trainer structures with individual nutrition planning.", img: IMAGES.programs.training, tag: "ELITE" }
            ].map((program, index) => (
              <div 
                key={index} 
                className="group relative h-[450px] rounded-3xl overflow-hidden glass-card flex flex-col justify-end p-8 border-white/10 hover:border-apex-blue/50 transition-all duration-500 cursor-pointer shadow-lg"
              >
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-[1] transition-all duration-500 group-hover:via-black/60 group-hover:scale-105" />
                  <img 
                    src={program.img} 
                    alt={program.title} 
                    className="w-full h-full object-cover opacity-95 transition-all duration-700"
                  />
                </div>

                <div className="relative z-10">
                  <span className="text-[10px] font-black tracking-widest text-apex-green bg-apex-green/10 border border-apex-green/30 px-3 py-1 rounded-full uppercase block mb-3 w-fit">
                    {program.tag}
                  </span>
                  <h3 className="font-display font-black text-2xl mb-2 text-white group-hover:text-apex-blue-neon transition-colors duration-300">{program.title}</h3>
                  <p className="text-xs text-neutral-200 mb-6 font-semibold leading-relaxed">
                    {program.desc}
                  </p>
                  <a href="#trial" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-apex-blue-neon transition-colors duration-200">
                    <span>Book Trial Session</span>
                    <ArrowUpRight className="w-4 h-4 text-apex-green" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section className="py-24 bg-apex-graphite relative z-20 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-apex-blue/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-apex-green/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-apex-green font-black block mb-3">03 / ADVANTAGE</span>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white">
              THE ULTIMATE ATHLETIC LAB.
            </h2>
            <p className="text-neutral-200 text-sm md:text-base leading-relaxed font-semibold mt-4">
              We did not build another generic fitness space. We constructed an elite performance laboratory where design details are optimized for serious physical development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Dumbbell, title: "Luxury Equipment", desc: "Fitted exclusively with premium Eleiko bars, custom Prime plates, and custom Keiser resistance pneumatic gear." },
              { icon: Award, title: "Elite Certified Coaches", desc: "Every trainer is a certified performance specialist with Olympic, Pro, or Division-I athletic coaching experience." },
              { icon: Activity, title: "Recovery Lounge", desc: "Scientific healing structures including infrared saunas, cryotherapy tanks, custom ice baths, and compression sleeves." },
              { icon: Compass, title: "Smart Tracking & Tech", desc: "Integration with biometrics software to track metrics, muscle activation, and body fat composition over time." },
              { icon: Target, title: "Nutrition Design", desc: "In-house nutrition specialists mapping complete macronutrient templates around your direct cellular demand." },
              { icon: Users, title: "Curated Community", desc: "Surround yourself with driven athletes, busy executives, and professionals committed to excellence." }
            ].map((item, index) => (
              <div 
                key={index} 
                className="glass-card p-8 rounded-3xl border-white/10 hover:border-apex-green/30 transition-all duration-300 flex flex-col gap-5 hover:translate-y-[-4px] group shadow-lg bg-apex-card/80"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 group-hover:bg-apex-green/10 flex items-center justify-center transition-colors duration-300 shadow-[0_0_15px_rgba(255,255,255,0.02)] group-hover:shadow-[0_0_20px_rgba(0,255,102,0.15)]">
                  <item.icon className="w-7 h-7 text-white group-hover:text-apex-green transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl mb-2 text-white group-hover:text-apex-green transition-colors duration-300">{item.title}</h3>
                  <p className="text-xs text-neutral-200 leading-relaxed font-semibold">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MEMBERSHIP PLANS */}
      <section id="membership" className="py-24 relative z-20 bg-apex-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-apex-blue font-black block mb-3">04 / PRICING</span>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white">
              INVEST IN YOUR TRANSFORMATION.
            </h2>
            
            {/* Comparison toggle */}
            <div className="inline-flex items-center gap-4 bg-apex-gray-dark/50 border border-white/10 p-1.5 rounded-2xl mt-6 shadow-2xl">
              <button 
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${!isAnnual ? 'bg-apex-blue text-white shadow-lg shadow-apex-blue/20' : 'text-neutral-300 hover:text-white'}`}
              >
                Monthly Billing
              </button>
              <button 
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${isAnnual ? 'bg-apex-blue text-white shadow-lg shadow-apex-blue/20' : 'text-neutral-300 hover:text-white'}`}
              >
                Annual Save 20%
                <span className="bg-apex-green/20 text-apex-green text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">Save</span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {/* Plan 1 */}
            <div className="glass-card p-8 rounded-3xl border-white/10 flex flex-col justify-between hover:border-white/20 transition-all duration-300 bg-apex-card/65 shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-300 font-bold">Apex Basic</span>
                <h3 className="font-display font-black text-2xl mt-1 mb-6 text-white">ACCESS CLUB</h3>
                <div className="mb-8">
                  <span className="font-display font-black text-5xl text-white">
                    ${isAnnual ? '119' : '149'}
                  </span>
                  <span className="text-xs text-neutral-300 uppercase tracking-wider ml-1">/ Month</span>
                </div>
                <ul className="flex flex-col gap-4 text-xs text-neutral-200 font-semibold mb-8">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4.5 h-4.5 text-apex-blue shrink-0" /> Full 24/7 access to Miami Club</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4.5 h-4.5 text-apex-blue shrink-0" /> Premium locker room & amenities</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4.5 h-4.5 text-apex-blue shrink-0" /> Standard weight zone & cardio suite</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4.5 h-4.5 text-apex-blue shrink-0" /> Free high-speed gym Wi-Fi</li>
                </ul>
              </div>
              <a 
                href="#trial" 
                className="w-full text-center border border-white/20 hover:border-white py-4.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] text-white"
              >
                Choose Access
              </a>
            </div>

            {/* Plan 2 - Highlighted Best Value */}
            <div className="relative glass-card p-8 rounded-3xl border-apex-blue/50 flex flex-col justify-between bg-gradient-to-b from-apex-blue/10 via-apex-black/80 to-apex-black shadow-[0_15px_40px_-15px_rgba(0,82,255,0.3)] scale-100 lg:scale-[1.03] z-10 border-2">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-apex-blue text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_0_10px_rgba(0,82,255,0.45)]">
                Most Selected
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-apex-blue-neon font-black">Apex Elite</span>
                <h3 className="font-display font-black text-2xl mt-1 mb-6 text-white">APEX PRO</h3>
                <div className="mb-8">
                  <span className="font-display font-black text-5xl text-white">
                    ${isAnnual ? '199' : '249'}
                  </span>
                  <span className="text-xs text-neutral-300 uppercase tracking-wider ml-1">/ Month</span>
                </div>
                <ul className="flex flex-col gap-4 text-xs text-white font-semibold mb-8">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4.5 h-4.5 text-apex-green shrink-0" /> All Access features included</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4.5 h-4.5 text-apex-green shrink-0" /> Unlimited HIIT, CrossFit & Yoga classes</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4.5 h-4.5 text-apex-green shrink-0" /> 2 Guest passes per month</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4.5 h-4.5 text-apex-green shrink-0" /> Access to Recovery Zone (Sauna & Steam)</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4.5 h-4.5 text-apex-green shrink-0" /> 1 InBody assessment per month</li>
                </ul>
              </div>
              <a 
                href="#trial" 
                className="w-full text-center bg-apex-blue hover:bg-apex-blue-neon text-white py-4.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(0,82,255,0.3)] hover:scale-[1.02]"
              >
                Upgrade to Pro
              </a>
            </div>

            {/* Plan 3 */}
            <div className="glass-card p-8 rounded-3xl border-white/10 flex flex-col justify-between hover:border-white/20 transition-all duration-300 bg-apex-card/65 shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-apex-green font-black">Apex VIP</span>
                <h3 className="font-display font-black text-2xl mt-1 mb-6 text-white">SIGNATURE VIP</h3>
                <div className="mb-8">
                  <span className="font-display font-black text-5xl text-white">
                    ${isAnnual ? '399' : '499'}
                  </span>
                  <span className="text-xs text-neutral-300 uppercase tracking-wider ml-1">/ Month</span>
                </div>
                <ul className="flex flex-col gap-4 text-xs text-neutral-200 font-semibold mb-8">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4.5 h-4.5 text-apex-green shrink-0" /> All Apex Pro features included</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4.5 h-4.5 text-apex-green shrink-0" /> 4 Private 1-on-1 coaching hours/mo</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4.5 h-4.5 text-apex-green shrink-0" /> Custom nutrition blueprint & plan</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4.5 h-4.5 text-apex-green shrink-0" /> Unlimited Ice Baths & Recovery Zone</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4.5 h-4.5 text-apex-green shrink-0" /> Private lounge & towel/gear service</li>
                </ul>
              </div>
              <a 
                href="#trial" 
                className="w-full text-center border border-white/20 hover:border-white py-4.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] text-white"
              >
                Choose Signature
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PERSONAL TRAINERS */}
      <section id="trainers" className="py-24 bg-apex-graphite relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-apex-green font-black block mb-3">05 / SPECIALISTS</span>
              <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white">
                ELITE COACHING STAFF.
              </h2>
            </div>
            <p className="text-neutral-200 max-w-md text-sm md:text-base leading-relaxed font-semibold">
              We employ only top-tier professionals. Our coaches hold elite degrees in exercise physiology, have competed internationally, or trained champion athletes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Marcus Vance", specialty: "Olympic Lifting & Power", exp: "9+ Years Experience", img: IMAGES.trainers.marcus },
              { name: "Sarah Jenkins", specialty: "HIIT & Conditioning", exp: "6+ Years Experience", img: IMAGES.trainers.sarah },
              { name: "Elena Rostova", specialty: "Yoga & Kinematics", exp: "8+ Years Experience", img: IMAGES.trainers.elena },
              { name: "Darius King", specialty: "Hypertrophy & Physique", exp: "12+ Years Experience", img: IMAGES.trainers.darius }
            ].map((trainer, index) => (
              <div 
                key={index} 
                className="group relative h-[420px] rounded-3xl overflow-hidden glass-card flex flex-col justify-end p-6 border-white/10 hover:border-apex-blue/40 transition-all duration-500 shadow-xl"
              >
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-[1] transition-all duration-500 group-hover:via-black/70" />
                  <img 
                    src={trainer.img} 
                    alt={trainer.name} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="relative z-10 text-center">
                  <h3 className="font-display font-black text-xl mb-1 text-white">{trainer.name}</h3>
                  <p className="text-xs text-apex-blue-neon font-bold uppercase tracking-wider mb-2">{trainer.specialty}</p>
                  <p className="text-[10px] text-neutral-200 font-bold tracking-wide uppercase mb-4">{trainer.exp}</p>
                  
                  <a 
                    href="#trial" 
                    className="inline-flex items-center gap-1 bg-white/10 hover:bg-apex-blue text-white px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 w-full justify-center group-hover:bg-apex-blue"
                  >
                    <span>Book Session</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. GYM TOUR (FULLY STYLED WITH HIGH VISIBILITY BACKGROUNDS) */}
      <section id="tour" className="py-24 relative z-20 overflow-hidden bg-apex-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-apex-blue font-black block mb-3">06 / TOUR</span>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white">
              EXPLORE THE SANCTUARY.
            </h2>
            <p className="text-neutral-200 text-sm md:text-base leading-relaxed font-semibold mt-4">
              Select a club zone tab below to inspect specialized equipment and recovery systems via live hotspots.
            </p>

            {/* Zone switcher tabs */}
            <div className="flex justify-center gap-3 mt-8 flex-wrap">
              {TOUR_ZONES.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => {
                    setActiveZone(zone);
                    setSelectedHotspot(null);
                  }}
                  className={`px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 border ${activeZone.id === zone.id ? 'bg-apex-blue text-white border-apex-blue shadow-lg shadow-apex-blue/20' : 'bg-[#18181b] text-neutral-300 border-white/10 hover:border-white/20'}`}
                >
                  {zone.name}
                </button>
              ))}
            </div>
          </div>

          <div className="relative aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950">
            {/* Active zone background */}
            <img 
              src={activeZone.img} 
              alt={activeZone.name} 
              className="w-full h-full object-cover filter brightness-[0.8] transition-all duration-500"
            />
            
            {/* Dynamic hotspots */}
            {activeZone.hotspots.map((hotspot) => (
              <div 
                key={hotspot.id} 
                style={{ top: hotspot.top, left: hotspot.left }}
                className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
              >
                <button 
                  onClick={() => {
                    setSelectedHotspot(selectedHotspot?.id === hotspot.id ? null : hotspot);
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center relative cursor-pointer transition-all duration-300 ${selectedHotspot?.id === hotspot.id ? 'bg-apex-green shadow-[0_0_20px_rgba(0,255,102,0.8)] scale-110' : 'bg-apex-blue shadow-[0_0_15px_rgba(0,82,255,0.85)]'}`}
                >
                  <span className="absolute inset-0 rounded-full bg-inherit animate-ping opacity-75"></span>
                  <Dumbbell className="w-5 h-5 text-white" />
                </button>

                {/* Hotspot details tooltip */}
                {selectedHotspot?.id === hotspot.id && (
                  <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-72 glass-card p-5 rounded-2xl border-white/20 shadow-2xl z-40 text-left bg-apex-black/95 backdrop-blur-md">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-display font-black text-xs text-white uppercase">{hotspot.title}</h4>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedHotspot(null);
                        }}
                        className="text-neutral-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[10px] text-neutral-200 leading-relaxed font-semibold">{hotspot.desc}</p>
                  </div>
                )}
              </div>
            ))}

            {/* Bottom active zone title tag */}
            <div className="absolute bottom-6 left-6 bg-black/85 border border-white/10 px-6 py-3.5 rounded-2xl max-w-sm backdrop-blur-md hidden sm:block">
              <h3 className="font-display font-black text-xs text-white uppercase tracking-wider mb-1">{activeZone.name}</h3>
              <p className="text-[10px] text-neutral-300 leading-normal font-semibold">{activeZone.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. BEFORE & AFTER SECTION */}
      <section className="py-24 bg-apex-graphite relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-widest text-apex-green font-black block mb-3">07 / METRICS</span>
              <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white">
                REAL EFFORT.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-apex-green to-apex-blue-neon">REAL RESULTS.</span>
              </h2>
              <p className="text-neutral-200 text-sm md:text-base leading-relaxed mb-8 font-semibold">
                No filters, no shortcuts. These are genuine athletic transformations built through tailored coaching blueprints, strict metabolic planning, and relentless effort.
              </p>
              
              <div className="flex items-center gap-6 mb-8">
                <div>
                  <h4 className="font-display font-extrabold text-3xl text-white">16 WEEKS</h4>
                  <p className="text-[10px] text-neutral-300 uppercase tracking-wider font-bold">Average Program Duration</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <h4 className="font-display font-extrabold text-3xl text-white">-12.4%</h4>
                  <p className="text-[10px] text-neutral-300 uppercase tracking-wider font-bold">Average Body Fat Reduction</p>
                </div>
              </div>
            </div>

            {/* Slider container */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] w-full max-w-xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl select-none bg-zinc-950">
                {/* After Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={IMAGES.after} 
                    alt="After Apex Transformation" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 bg-apex-blue/80 backdrop-blur-sm text-white px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest">
                    After
                  </div>
                </div>

                {/* Before Image (Revealed by width crop) */}
                <div 
                  className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-75"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img 
                    src={IMAGES.before} 
                    alt="Before Apex Transformation" 
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest">
                    Before
                  </div>
                </div>

                {/* Slider divider line */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-apex-blue z-30"
                  style={{ left: `${sliderPos}%` }}
                >
                  {/* Slider controller handle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-black border-4 border-apex-blue flex items-center justify-center shadow-lg cursor-ew-resize">
                    <Activity className="w-5 h-5 text-apex-blue" />
                  </div>
                </div>

                {/* Invisible range input for slider control */}
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sliderPos} 
                  onChange={(e) => setSliderPos(parseFloat(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40 slider-input"
                />
              </div>
              <p className="text-center text-[10px] text-neutral-200 uppercase tracking-widest font-black mt-4">
                Drag Slider Left / Right To View Transformation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. SUCCESS STORIES (VISUAL RESTRUCTURING WITH AVATARS) */}
      <section className="py-24 relative z-20 bg-apex-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-apex-blue font-black block mb-3">08 / REVIEWS</span>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white">
              VOICES OF APEX.
            </h2>
            <p className="text-neutral-200 text-sm md:text-base leading-relaxed font-semibold mt-4">
              Listen to the actual feedback from professionals and athletes who achieved physical breakthroughs at Apex.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Apex completely revolutionized my standard for training. The Eleiko setup, the scientific coaching, and the recovery sauna structure are unlike any typical gym. I lost 8% body fat while gaining serious lean power.",
                author: "Christian Vance",
                role: "Private Equity Principal",
                metric: "-18 lbs Fat Loss",
                avatar: IMAGES.avatars.christian
              },
              {
                quote: "As an athletic runner, I struggled with joint health and recovery. Joining Apex's recovery zone (ice plunges and custom sauna program) paired with yoga classes has added years to my athletic life.",
                author: "Samantha Croft",
                role: "Marathon Runner",
                metric: "+15% Mobility Boost",
                avatar: IMAGES.avatars.samantha
              },
              {
                quote: "The personal training coach mapped out a cellular level nutrition blueprint that completely changed my daily energy levels. The atmosphere here is charged, energetic, and highly professional.",
                author: "Damian Alvarez",
                role: "Tech Entrepreneur",
                metric: "+35 lbs Bench Press",
                avatar: IMAGES.avatars.damian
              }
            ].map((story, index) => (
              <div 
                key={index} 
                className="glass-card p-8 rounded-3xl border-white/10 flex flex-col justify-between hover:border-apex-blue/30 transition-all duration-300 bg-apex-card/85 shadow-2xl relative overflow-hidden"
              >
                {/* Accent glow on card hover */}
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-apex-blue to-apex-blue-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-1 text-apex-green text-sm">
                      {"★★★★★".split("").map((s, i) => <span key={i} className="text-apex-green">★</span>)}
                    </div>
                    <span className="bg-apex-blue/15 border border-apex-blue/30 text-apex-blue-neon text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                      {story.metric}
                    </span>
                  </div>
                  
                  <p className="text-sm italic text-neutral-200 leading-relaxed mb-8 font-medium font-sans">
                    "{story.quote}"
                  </p>
                </div>

                {/* Profile Card Section */}
                <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-apex-blue">
                    <img src={story.avatar} alt={story.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-xs text-white tracking-wider">{story.author}</h4>
                    <p className="text-[10px] text-neutral-300 font-bold uppercase tracking-wider">{story.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. LIVE CLASS SCHEDULE */}
      <section id="schedule" className="py-24 bg-apex-graphite relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-apex-green font-black block mb-3">09 / SCHEDULE</span>
              <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white">
                LIVE TIMETABLE.
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              {['all', 'strength', 'cardio', 'yoga', 'recovery'].map((category) => (
                <button 
                  key={category} 
                  onClick={() => setActiveTab(category)}
                  className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${activeTab === category ? 'bg-apex-green text-black font-black' : 'bg-[#18181b] hover:bg-white/10 text-white border border-white/10'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/10 glass-card">
            <table className="w-full text-left border-collapse min-w-[700px] bg-apex-card/45">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-black uppercase tracking-widest text-neutral-200 bg-black/50">
                  <th className="p-6">Class Program</th>
                  <th className="p-6">Time / Slot</th>
                  <th className="p-6">Instructor</th>
                  <th className="p-6">Capacity Status</th>
                  <th className="p-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-neutral-200">
                {[
                  { name: "Olympic Barbell Mastery", time: "07:00 AM - 08:30 AM", trainer: "Marcus Vance", type: "strength", capacity: "18 / 20 Slots Filled", status: "limited" },
                  { name: "Metabolic HIIT Core", time: "09:00 AM - 10:00 AM", trainer: "Sarah Jenkins", type: "cardio", capacity: "25 / 25 Full", status: "full" },
                  { name: "Kinematic Flow & Release", time: "11:30 AM - 01:00 PM", trainer: "Elena Rostova", type: "yoga", capacity: "12 / 20 Slots Filled", status: "available" },
                  { name: "Contrast Therapy recovery", time: "02:00 PM - 03:00 PM", trainer: "Coaching Staff", type: "recovery", capacity: "8 / 10 Slots Filled", status: "limited" },
                  { name: "CrossFit Open Rig", time: "04:30 PM - 06:00 PM", trainer: "Sarah Jenkins", type: "cardio", capacity: "15 / 25 Slots Filled", status: "available" },
                  { name: "Hypertrophy Blueprint", time: "06:30 PM - 08:00 PM", trainer: "Darius King", type: "strength", capacity: "20 / 20 Full", status: "full" }
                ]
                  .filter(c => activeTab === 'all' || c.type === activeTab)
                  .map((cls, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors duration-200">
                      <td className="p-6 font-display font-black text-white text-sm uppercase tracking-wider">{cls.name}</td>
                      <td className="p-6 font-medium">{cls.time}</td>
                      <td className="p-6 font-bold">{cls.trainer}</td>
                      <td className="p-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          cls.status === 'full' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                          cls.status === 'limited' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                          'bg-apex-green/10 text-apex-green border border-apex-green/20'
                        }`}>
                          {cls.capacity}
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        {cls.status === 'full' ? (
                          <button 
                            onClick={() => alert("Class fully booked! Added to waitlist.")}
                            className="bg-white/5 hover:bg-white/10 text-white font-bold uppercase text-[10px] tracking-widest px-4 py-2 rounded-xl border border-white/10"
                          >
                            Join Waitlist
                          </button>
                        ) : (
                          <a 
                            href="#trial"
                            className="bg-apex-blue hover:bg-apex-blue-neon text-white font-black uppercase text-[10px] tracking-widest px-4 py-2.5 rounded-xl inline-block"
                          >
                            Book Spot
                          </a>
                        )}
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 13. BMI & CALORIE CALCULATOR */}
      <section id="calculator" className="py-24 relative z-20 bg-apex-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Form Column */}
            <div className="lg:col-span-6 glass-card p-8 md:p-10 rounded-3xl border-white/10 flex flex-col justify-between bg-apex-card/60 shadow-2xl">
              <div>
                <div className="flex items-center gap-2 text-apex-blue-neon mb-3 font-semibold">
                  <Activity className="w-5 h-5 text-apex-blue-neon" />
                  <span className="text-xs font-bold uppercase tracking-widest">10 / BIOMETRICS</span>
                </div>
                <h2 className="font-display font-black text-3xl md:text-4xl text-white mb-6 uppercase">
                  BIOMETRIC PERFORMANCE.
                </h2>
                
                {/* Unit toggle */}
                <div className="flex gap-4 mb-6">
                  <button 
                    type="button"
                    onClick={() => { setCalcUnit('metric'); setCalcResults(null); }}
                    className={`flex-1 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 border ${calcUnit === 'metric' ? 'bg-white text-black border-white shadow-md' : 'bg-[#18181b] text-neutral-300 border-white/10 hover:border-white/30'}`}
                  >
                    Metric (kg / cm)
                  </button>
                  <button 
                    type="button"
                    onClick={() => { setCalcUnit('imperial'); setCalcResults(null); }}
                    className={`flex-1 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 border ${calcUnit === 'imperial' ? 'bg-white text-black border-white shadow-md' : 'bg-[#18181b] text-neutral-300 border-white/10 hover:border-white/30'}`}
                  >
                    Imperial (lbs / in)
                  </button>
                </div>

                <form onSubmit={calculateFitness} className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-neutral-200 block mb-3">
                      Weight ({calcUnit === 'metric' ? 'kg' : 'lbs'})
                    </label>
                    <input 
                      type="number" 
                      required
                      placeholder={calcUnit === 'metric' ? 'e.g. 80' : 'e.g. 175'}
                      value={calcWeight}
                      onChange={(e) => setCalcWeight(e.target.value)}
                      className="w-full bg-[#18181b] border border-white/10 hover:border-white/20 focus:border-apex-blue focus:ring-1 focus:ring-apex-blue rounded-xl h-16 px-6 text-base font-semibold focus:outline-none transition-colors duration-200 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-neutral-200 block mb-3">
                      Height ({calcUnit === 'metric' ? 'cm' : 'inches'})
                    </label>
                    <input 
                      type="number" 
                      required
                      placeholder={calcUnit === 'metric' ? 'e.g. 182' : 'e.g. 71'}
                      value={calcHeight}
                      onChange={(e) => setCalcHeight(e.target.value)}
                      className="w-full bg-[#18181b] border border-white/10 hover:border-white/20 focus:border-apex-blue focus:ring-1 focus:ring-apex-blue rounded-xl h-16 px-6 text-base font-semibold focus:outline-none transition-colors duration-200 text-white"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-black uppercase tracking-widest text-neutral-200 block mb-3">Age</label>
                    <input 
                      type="number" 
                      required
                      placeholder="e.g. 28"
                      value={calcAge}
                      onChange={(e) => setCalcAge(e.target.value)}
                      className="w-full bg-[#18181b] border border-white/10 hover:border-white/20 focus:border-apex-blue focus:ring-1 focus:ring-apex-blue rounded-xl h-16 px-6 text-base font-semibold focus:outline-none transition-colors duration-200 text-white"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-black uppercase tracking-widest text-neutral-200 block mb-3">Activity Level</label>
                    <select 
                      value={calcActivity}
                      onChange={(e) => setCalcActivity(e.target.value)}
                      className="w-full bg-[#18181b] border border-white/10 hover:border-white/20 focus:border-apex-blue focus:ring-1 focus:ring-apex-blue rounded-xl h-16 px-6 text-base font-semibold focus:outline-none transition-colors duration-200 cursor-pointer text-white"
                    >
                      <option value="1.2">Sedentary (No formal training)</option>
                      <option value="1.375">Lightly Active (Train 1-2 days/week)</option>
                      <option value="1.55">Moderately Active (Train 3-4 days/week)</option>
                      <option value="1.725">Very Active (Train 5-7 days/week)</option>
                      <option value="1.9">Elite Athlete (Heavy double daily training)</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-black uppercase tracking-widest text-neutral-200 block mb-3">Fitness Goal</label>
                    <select 
                      value={calcGoal}
                      onChange={(e) => setCalcGoal(e.target.value)}
                      className="w-full bg-[#18181b] border border-white/10 hover:border-white/20 focus:border-apex-blue focus:ring-1 focus:ring-apex-blue rounded-xl h-16 px-6 text-base font-semibold focus:outline-none transition-colors duration-200 cursor-pointer text-white"
                    >
                      <option value="lose">Fat Loss / Body Recomp (-500 kcal)</option>
                      <option value="maintenance">Weight Maintenance</option>
                      <option value="gain">Lean Muscle Hypertrophy (+400 kcal)</option>
                    </select>
                  </div>
                  <button 
                    type="submit"
                    className="col-span-2 bg-gradient-to-r from-apex-blue to-apex-blue-neon text-white font-bold uppercase tracking-widest h-16 rounded-xl transition-all duration-300 mt-4 shadow-lg shadow-apex-blue/30 text-sm hover:scale-[1.01]"
                  >
                    Calculate Targets
                  </button>
                </form>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-6 glass-card p-8 md:p-10 rounded-3xl border-white/10 flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-black to-[#18181b] border-2 border-white/10 shadow-2xl">
              {!calcResults ? (
                <div className="text-center max-w-sm">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 border border-white/10 animate-bounce">
                    <Activity className="w-8 h-8 text-neutral-300" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-2 uppercase">Awaiting Measurements</h3>
                  <p className="text-xs text-neutral-200 leading-relaxed font-semibold">
                    Input your physiological measurements on the left to extract precise BMI and daily calorie thresholds.
                  </p>
                </div>
              ) : (
                <div className="w-full">
                  <h3 className="font-display font-black text-2xl text-white mb-8 border-b border-white/10 pb-4 text-center">
                    YOUR BIOMETRIC REPORT
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8 text-center">
                    <div className="bg-black/40 border border-white/10 p-6 rounded-2xl">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-300 mb-1">Body Mass Index</p>
                      <h4 className="font-display font-black text-4xl text-white">{calcResults.bmi}</h4>
                      <p className={`text-[10px] font-black uppercase tracking-wider mt-1 ${calcResults.bmiColor}`}>{calcResults.bmiCategory}</p>
                    </div>
                    <div className="bg-black/40 border border-white/10 p-6 rounded-2xl">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-300 mb-1">Daily Target Calories</p>
                      <h4 className="font-display font-black text-4xl text-apex-green">{calcResults.calories}</h4>
                      <p className="text-[10px] text-neutral-300 uppercase tracking-wider mt-1 font-bold">kcal / day</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 text-xs text-neutral-200 font-bold">
                    <div>
                      <div className="flex justify-between font-bold mb-2 uppercase text-[10px] tracking-wider text-neutral-300">
                        <span>Basal Metabolic Rate (BMR)</span>
                        <span className="text-white">{calcResults.bmr} kcal</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-apex-blue rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-bold mb-2 uppercase text-[10px] tracking-wider text-neutral-300">
                        <span>Total Energy Expenditure (TDEE)</span>
                        <span className="text-white">{calcResults.tdee} kcal</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-apex-blue-neon rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-apex-blue/10 border border-apex-blue/30 p-4 rounded-xl text-center">
                    <p className="text-[11px] text-white leading-relaxed font-semibold">
                      💡 These targets are calibrated for our training regimes. Book a trial session to test our body composition analysis.
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => setCalcResults(null)}
                    className="w-full mt-6 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300 hover:text-white transition-colors duration-200"
                  >
                    <RefreshCw className="w-4.5 h-4.5" />
                    <span>Reset Assessment</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 14. APP FEATURES */}
      <section className="py-24 bg-apex-graphite relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Phone Mockup Column */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative w-[280px] h-[560px] bg-black rounded-[40px] p-3 shadow-2xl border-4 border-white/10">
                {/* Speaker notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-30 flex items-center justify-center">
                  <div className="w-12 h-1 bg-white/20 rounded-full"></div>
                </div>

                <div className="w-full h-full rounded-[32px] overflow-hidden bg-[#0a0a0c] border border-white/5 p-4 flex flex-col justify-between relative text-white">
                  <div className="flex justify-between items-center text-[10px] text-neutral-300 font-semibold pt-4">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <Activity className="w-3 h-3 text-apex-green" />
                      <span>5G</span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center my-6">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-apex-blue font-black">APEX CORE</span>
                    <h4 className="font-display font-black text-xl mb-4 leading-none uppercase mt-1">TODAY'S WORKOUT</h4>
                    
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-300">Active Calories</span>
                        <Flame className="w-4 h-4 text-apex-green" />
                      </div>
                      <span className="font-display font-black text-2xl">648 <span className="text-xs text-neutral-300 uppercase">Kcal</span></span>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-apex-green" style={{ width: '80%' }}></div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-300">Daily Hydration</span>
                        <Heart className="w-4 h-4 text-apex-blue-neon" />
                      </div>
                      <span className="font-display font-black text-2xl">2.4 <span className="text-xs text-neutral-300 uppercase">Liters</span></span>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-apex-blue" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* App Navigation mock */}
                  <div className="bg-white/5 rounded-full p-2 border border-white/10 flex justify-between items-center">
                    {['Dumbbell', 'Calendar', 'User', 'Trophy'].map((ico, idx) => (
                      <span key={idx} className={`w-8 h-8 rounded-full flex items-center justify-center ${idx === 0 ? 'bg-apex-blue text-white' : 'text-neutral-300'}`}>
                        {ico === 'Dumbbell' && <Dumbbell className="w-4.5 h-4.5" />}
                        {ico === 'Calendar' && <Calendar className="w-4.5 h-4.5" />}
                        {ico === 'User' && <User className="w-4.5 h-4.5" />}
                        {ico === 'Trophy' && <Trophy className="w-4.5 h-4.5" />}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
              <span className="text-xs font-bold uppercase tracking-widest text-apex-blue font-black block mb-3">11 / ECOSYSTEM</span>
              <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white-important">
                TRACK YOUR METRICS.
              </h2>
              <p className="text-neutral-200 text-sm md:text-base leading-relaxed mb-8 font-semibold mt-4">
                Your membership unlocks full integration with the Apex mobile tracking app. Stream workout blueprints directly, log caloric loads, track body fat progress, and sync real-time wearable stats.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "Wearable Sync", desc: "Instant sync integrations with Apple Watch, Whoop, Garmin, and Fitbit wearables." },
                  { title: "Nutrition Logging", desc: "Log meals in seconds and cross-reference with in-house dietary guidelines." },
                  { title: "Custom Programs", desc: "Access strength, HIIT, and recovery videos designed by your personal trainer." },
                  { title: "Challenge Community", desc: "Participate in local gym challenges and track achievement leaderboards." }
                ].map((feat, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="w-10 h-10 rounded-xl bg-apex-blue/10 border border-apex-blue/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-apex-blue-neon" />
                    </span>
                    <div>
                      <h4 className="font-display font-black text-xs text-white mb-1 uppercase tracking-wider">{feat.title}</h4>
                      <p className="text-xs text-neutral-200 leading-relaxed font-semibold">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 15. GALLERY (MASONRY LAYOUT) */}
      <section id="gallery" className="py-24 relative z-20 bg-apex-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-apex-green font-black block mb-3">12 / ATMOSPHERE</span>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white">
              INSIDE THE CLUB.
            </h2>
            <p className="text-neutral-200 text-sm md:text-base leading-relaxed font-semibold mt-4">
              Explore the physical discipline and luxury architectural details that define Apex Fitness Club.
            </p>
          </div>

          <div className="masonry-grid">
            {IMAGES.gallery.map((img, idx) => (
              <div 
                key={idx} 
                className="masonry-item relative group rounded-2xl overflow-hidden cursor-zoom-in border border-white/10 hover:border-apex-green/30 transition-all duration-300 shadow-xl"
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img} 
                  alt="Apex Club Detail" 
                  className="w-full object-cover transition-all duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <ArrowUpRight className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl max-h-screen">
              <img 
                src={selectedImage} 
                alt="Apex Full View" 
                className="max-w-full max-h-[85vh] rounded-2xl object-contain border border-white/10 shadow-2xl" 
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black/60 backdrop-blur-md rounded-full p-2 hover:bg-white hover:text-black transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 16. FAQ SECTION */}
      <section className="py-24 bg-apex-graphite relative z-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-apex-blue font-black block mb-3">13 / SUPPORT</span>
            <h2 className="font-display font-black text-4xl md:text-5xl mt-3 text-white">
              FREQUENTLY ASKED QUESTIONS.
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { q: "What are the hours of operation?", a: "Apex Fitness Club operates 24 hours a day, 7 days a week, 365 days a year for all active members. Our front desk staff and trainers are on-site daily from 6:00 AM to 10:00 PM." },
              { q: "Where exactly in Miami are you located?", a: "Our premium flagship facility is situated in Wynwood, Miami at 2450 NW 2nd Ave, Miami, FL 33127. Dedicated private secure member parking is available." },
              { q: "Can I try out the gym before committing?", a: "Yes, we offer a complimentary 1-day all-access trial session for Miami-Dade residents. You can register on our website or by contacting our front office." },
              { q: "Are personal training sessions included in membership?", a: "Signature VIP memberships include 4 hours of private 1-on-1 personal training per month. Other membership tiers can purchase single sessions or packages separately." },
              { q: "Do you have locker rooms and shower amenities?", a: "Yes, we feature premium executive locker rooms equipped with luxury showers, complimentary towel service, premium organic toiletries, hair dryers, and steam rooms." },
              { q: "What is your guest pass policy?", a: "Apex Pro members receive 2 guest passes per month. VIP members receive unlimited guest passes (subject to 1 guest per day rule). Guests must check in at the front desk." },
              { q: "Are classes like CrossFit and Yoga included?", a: "Yes, unlimited access to all CrossFit, HIIT, Yoga, and Pilates classes is included in the Apex Pro and VIP membership levels. Basic Access level can buy class entries drop-in." },
              { q: "Is contrast therapy (Ice Bath/Sauna) included?", a: "Access to the recovery zone (Contrast therapy ice bath, dry infrared sauna, steam room) is included in Pro and VIP memberships, or available as an add-on." },
              { q: "Can I freeze or cancel my membership easily?", a: "Yes, you can freeze your membership for up to 3 calendar months per year with 10 days' notice. Cancellations can be processed through our member app." },
              { q: "Do you offer corporate or student discounts?", a: "Yes, we provide custom pricing tiers for verified students, military, first responders, and group corporate health packages. Inquire at our front desk." },
              { q: "What credentials do your personal trainers hold?", a: "Every Apex personal trainer holds a degree in kinesiology or sports science, along with national certifications (NSCA-CSCS, NASM-PES) and Olympic training history." },
              { q: "Is there a contract commitment for memberships?", a: "Our monthly memberships are month-to-month commitments. Annual memberships carry a 12-month commitment but receive a 20% discount on the monthly price." }
            ].map((faq, idx) => {
              const [isOpen, setIsOpen] = useState(false);
              return (
                <div 
                  key={idx} 
                  className="glass-card rounded-2xl border-white/10 overflow-hidden transition-all duration-300 shadow-lg bg-apex-card/65"
                >
                  <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full text-left p-6 flex justify-between items-center hover:bg-white/5 transition-colors duration-200 text-white"
                  >
                    <span className="font-display font-black text-sm tracking-wide uppercase">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-apex-blue transition-transform duration-300 ${isOpen ? 'rotate-180 text-apex-blue-neon' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="overflow-hidden border-t border-white/10">
                      <p className="p-6 text-xs text-neutral-200 leading-relaxed bg-black/20 font-semibold font-sans">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 17. FREE TRIAL FORM */}
      <section id="trial" className="py-24 relative z-20 bg-apex-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
            
            {/* CTA copy */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-widest text-apex-green font-black block mb-3">14 / COMPLIMENTARY</span>
              <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-6 uppercase leading-none">
                CLAIM YOUR<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-apex-green to-apex-blue-neon">FIRST SESSION.</span>
              </h2>
              <p className="text-neutral-200 text-sm leading-relaxed mb-6 font-semibold">
                Fill out the booking form to reserve a complimentary 1-day VIP pass. Meet a trainer, test our Olympic weight rigs, and experience our luxury recovery layout.
              </p>
              
              <ul className="flex flex-col gap-3 text-xs text-neutral-200 font-bold">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4.5 h-4.5 text-apex-green" /> Free body composition analysis</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4.5 h-4.5 text-apex-green" /> Access to all gym zones & classes</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4.5 h-4.5 text-apex-green" /> Full locker room & recovery access</li>
              </ul>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 glass-card p-8 md:p-10 rounded-3xl border-white/10 relative overflow-hidden bg-apex-card/65 shadow-2xl">
              {formSubmitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-apex-green/10 border border-apex-green/30 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-apex-green" />
                  </div>
                  <h3 className="font-display font-black text-2xl text-white mb-2 uppercase">PASS RESERVED!</h3>
                  <p className="text-xs text-neutral-200 leading-relaxed max-w-sm mx-auto mb-8 font-semibold">
                    Congratulations, {trialForm.name}! Your VIP trial session has been reserved. One of our performance coaches will contact you within 2 hours to confirm your arrival.
                  </p>
                  <button 
                    onClick={() => {
                      setFormSubmitted(false);
                      setTrialForm({ name: '', email: '', phone: '', goal: '', time: '' });
                    }}
                    className="border border-white/20 hover:border-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-white transition-colors duration-200"
                  >
                    Reset Form
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest text-neutral-200 block mb-3 font-black">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. John Doe"
                        value={trialForm.name}
                        onChange={(e) => setTrialForm({ ...trialForm, name: e.target.value })}
                        className={`w-full bg-[#18181b] border rounded-xl h-16 px-6 text-base font-semibold focus:outline-none focus:border-apex-blue focus:ring-1 focus:ring-apex-blue transition-colors duration-200 text-white ${formErrors.name ? 'border-red-500 border-2' : 'border-white/10'}`}
                      />
                      {formErrors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{formErrors.name}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-black uppercase tracking-widest text-neutral-200 block mb-3 font-black">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="e.g. (305) 555-0199"
                        value={trialForm.phone}
                        onChange={(e) => setTrialForm({ ...trialForm, phone: e.target.value })}
                        className={`w-full bg-[#18181b] border rounded-xl h-16 px-6 text-base font-semibold focus:outline-none focus:border-apex-blue focus:ring-1 focus:ring-apex-blue transition-colors duration-200 text-white ${formErrors.phone ? 'border-red-500 border-2' : 'border-white/10'}`}
                      />
                      {formErrors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold">{formErrors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-neutral-200 block mb-3 font-black">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="e.g. john@domain.com"
                      value={trialForm.email}
                      onChange={(e) => setTrialForm({ ...trialForm, email: e.target.value })}
                      className={`w-full bg-[#18181b] border rounded-xl h-16 px-6 text-base font-semibold focus:outline-none focus:border-apex-blue focus:ring-1 focus:ring-apex-blue transition-colors duration-200 text-white ${formErrors.email ? 'border-red-500 border-2' : 'border-white/10'}`}
                    />
                    {formErrors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{formErrors.email}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest text-neutral-200 block mb-3 font-black">Primary Goal</label>
                      <select 
                        value={trialForm.goal}
                        onChange={(e) => setTrialForm({ ...trialForm, goal: e.target.value })}
                        className={`w-full bg-[#18181b] border rounded-xl h-16 px-6 text-base font-semibold focus:outline-none focus:border-apex-blue focus:ring-1 focus:ring-apex-blue transition-colors duration-200 cursor-pointer text-white ${formErrors.goal ? 'border-red-500 border-2' : 'border-white/10'}`}
                      >
                        <option value="">Select Goal...</option>
                        <option value="strength">Build raw strength</option>
                        <option value="recomp">Weight Loss & Recomp</option>
                        <option value="cardio">Cardio & Performance</option>
                        <option value="recovery">Wellness & Recovery</option>
                      </select>
                      {formErrors.goal && <p className="text-red-500 text-[10px] mt-1 font-bold">{formErrors.goal}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-black uppercase tracking-widest text-neutral-200 block mb-3 font-black">Preferred Visit Time</label>
                      <select 
                        value={trialForm.time}
                        onChange={(e) => setTrialForm({ ...trialForm, time: e.target.value })}
                        className={`w-full bg-[#18181b] border rounded-xl h-16 px-6 text-base font-semibold focus:outline-none focus:border-apex-blue focus:ring-1 focus:ring-apex-blue transition-colors duration-200 cursor-pointer text-white ${formErrors.time ? 'border-red-500 border-2' : 'border-white/10'}`}
                      >
                        <option value="">Select Time...</option>
                        <option value="morning">Morning (6 AM - 12 PM)</option>
                        <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                        <option value="evening">Evening (5 PM - 10 PM)</option>
                      </select>
                      {formErrors.time && <p className="text-red-500 text-[10px] mt-1 font-bold">{formErrors.time}</p>}
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-apex-blue to-apex-blue-neon text-white font-black uppercase tracking-widest h-16 rounded-xl transition-all duration-300 mt-4 shadow-lg shadow-apex-blue/20 text-sm hover:scale-[1.01]"
                  >
                    Confirm Booking Spot
                  </button>
                  <p className="text-center text-[9px] text-neutral-300 leading-relaxed mt-2 uppercase font-semibold">
                    🔒 By confirming, you agree to receive reservation reminders. We respect your privacy.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 18. FINAL CTA & FOOTER */}
      <footer className="relative bg-black pt-24 pb-12 border-t border-white/10 z-20 overflow-hidden">
        <div className="absolute inset-0 grid-lines-bg opacity-40 pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Final Call to Action */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="font-display font-black text-5xl md:text-7xl leading-none tracking-tighter uppercase mb-6 text-white">
              READY TO TRANSFORm?<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-apex-blue via-apex-blue-neon to-apex-green">
                BECOME AN APEX MEMBER.
              </span>
            </h2>
            <p className="text-neutral-200 text-sm md:text-lg max-w-lg mx-auto mb-8 font-semibold">
              Limited spots available this month to maintain training space standards. Secure your tier and start today.
            </p>
            <a 
              href="#trial"
              className="inline-flex items-center gap-2 bg-white hover:bg-apex-blue text-black hover:text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-apex-blue/30"
            >
              <span>Join Apex Now</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pt-16 border-t border-white/5">
            <div>
              <span className="font-display font-black text-xs uppercase tracking-widest text-white mb-6 block">EXPLORE</span>
              <ul className="flex flex-col gap-3 text-xs text-neutral-300 font-semibold">
                <li><a href="#programs" className="hover:text-white transition-colors duration-200">Programs</a></li>
                <li><a href="#membership" className="hover:text-white transition-colors duration-200">Membership Tiering</a></li>
                <li><a href="#trainers" className="hover:text-white transition-colors duration-200">Personal Coaches</a></li>
                <li><a href="#schedule" className="hover:text-white transition-colors duration-200">Weekly Timetable</a></li>
              </ul>
            </div>

            <div>
              <span className="font-display font-black text-xs uppercase tracking-widest text-white mb-6 block">SANCTUARY</span>
              <ul className="flex flex-col gap-3 text-xs text-neutral-300 font-semibold">
                <li><span className="opacity-90">Wynwood Flagship</span></li>
                <li><span className="opacity-90">Recovery Infrared Zone</span></li>
                <li><span className="opacity-90">Eleiko Olympic Rig</span></li>
                <li><span className="opacity-90">24/7 Smart Access</span></li>
              </ul>
            </div>

            <div>
              <span className="font-display font-black text-xs uppercase tracking-widest text-white mb-6 block">CONTACT INFO</span>
              <ul className="flex flex-col gap-3 text-xs text-neutral-300 font-semibold">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-apex-blue-neon" />
                  <span>Miami, Florida</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-apex-blue-neon" />
                  <span>(305) 555-0148</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-apex-blue-neon" />
                  <span>hello@apexfitnessclub.com</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-display font-black text-xs uppercase tracking-widest text-white mb-2 block">APEX LOGO</span>
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-lg bg-apex-blue flex items-center justify-center font-display font-black text-sm text-white">A</span>
                <span className="font-display font-bold text-xl tracking-tight text-white">APEX CLUB</span>
              </div>
              <p className="text-[10px] text-neutral-300 leading-relaxed uppercase font-semibold">
                Miami's Premier Private Gym • 4.9★ Rated (5,200+ Members)
              </p>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5 text-[10px] text-neutral-300 uppercase tracking-widest font-black">
            <p>© {new Date().getFullYear()} Apex Fitness Club. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (Join/Sticky CTA) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a 
          href="#trial" 
          className="bg-apex-blue hover:bg-apex-blue-neon text-white font-black uppercase text-[10px] tracking-widest px-6 py-4 rounded-xl flex items-center gap-1.5 shadow-[0_4px_20px_rgba(0,82,255,0.4)] transition-all duration-300 hover:scale-105 border border-white/10"
        >
          <Activity className="w-4.5 h-4.5 text-apex-green animate-pulse" />
          <span>Claim Trial Pass</span>
        </a>
      </div>
    </div>
  );
}
