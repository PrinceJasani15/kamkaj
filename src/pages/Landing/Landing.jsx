import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaChartLine,
  FaCheckCircle,
  FaChevronDown,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMoneyBillWave,
  FaRobot,
  FaTasks,
  FaTwitter,
  FaUsers,
} from "react-icons/fa";

function Landing() {
  const features = [
    {
      icon: <FaTasks />,
      title: "Smart Task Management",
      text: "Create tasks, set priorities, manage deadlines and track progress with a clean Kanban workflow.",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Calendar & Events",
      text: "Plan meetings, deadlines and personal events from one organized calendar.",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Expense Management",
      text: "Track income, expenses, categories and monthly financial balance in real time.",
    },
    {
      icon: <FaChartLine />,
      title: "Live Analytics",
      text: "Understand your productivity with task completion, finance and performance insights.",
    },
    {
      icon: <FaRobot />,
      title: "KamKaj AI Assistant",
      text: "Get productivity summaries, create tasks and notes, and ask questions using AI.",
    },
    {
      icon: <FaUsers />,
      title: "Personal Workspace",
      text: "Manage your profile, preferences, notifications and workspace settings easily.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create your account",
      text: "Register in seconds and set up your personal KamKaj workspace.",
    },
    {
      number: "02",
      title: "Organize your work",
      text: "Add tasks, notes, events and expenses in one place.",
    },
    {
      number: "03",
      title: "Track your growth",
      text: "Use analytics and AI insights to improve productivity every day.",
    },
  ];

  const testimonials = [
    {
      name: "Riya Shah",
      role: "Product Designer",
      text: "KamKaj keeps my tasks, notes and deadlines in one place. The dashboard is very easy to use.",
    },
    {
      name: "Jay Patel",
      role: "Software Developer",
      text: "The AI summary and analytics features help me understand what I completed during the week.",
    },
    {
      name: "Aarav Mehta",
      role: "Freelancer",
      text: "Expense tracking and task management together make KamKaj perfect for my daily work.",
    },
  ];

  const faqs = [
    {
      question: "Is KamKaj free to use?",
      answer:
        "Yes. KamKaj can be used as a personal productivity workspace with core task, note, calendar and analytics features.",
    },
    {
      question: "Can I manage expenses and tasks together?",
      answer:
        "Yes. KamKaj provides task management, notes, events, expenses and analytics from one dashboard.",
    },
    {
      question: "Does KamKaj include AI features?",
      answer:
        "Yes. KamKaj AI can provide productivity summaries and help create tasks and notes.",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-3xl font-bold tracking-tight">
            Kam<span className="text-blue-500">Kaj</span>
          </Link>

          <div className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>

            <a href="#workflow" className="transition hover:text-white">
              How It Works
            </a>

            <a href="#testimonials" className="transition hover:text-white">
              Reviews
            </a>

            <a href="#faq" className="transition hover:text-white">
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 sm:block"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.22),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(79,70,229,0.16),_transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Productivity platform for modern professionals
            </div>

            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              Everything you need to
              <span className="block text-blue-500">
                manage your work.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              KamKaj is your complete productivity workspace for tasks, notes,
              calendar, expenses, analytics and AI-powered assistance.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:scale-105 hover:bg-blue-700"
              >
                Start for Free
                <FaArrowRight />
              </Link>

              <Link
                to="/login"
                className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
              >
                Login to Workspace
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                No credit card required
              </span>

              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                Secure workspace
              </span>

              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                AI powered
              </span>
            </div>
          </motion.div>

          {/* DASHBOARD PREVIEW */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-slate-700 bg-slate-900/90 p-4 shadow-2xl shadow-blue-500/10"
          >
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-5">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                <div>
                  <p className="text-sm text-slate-400">
                    Monday, June 22
                  </p>

                  <h2 className="mt-1 text-2xl font-bold">
                    Good morning, Alex 👋
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold">
                  A
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-700 p-4">
                  <p className="text-sm text-slate-400">
                    Total Tasks
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    24
                  </p>

                  <p className="mt-2 text-xs text-green-400">
                    +12% this week
                  </p>
                </div>

                <div className="rounded-xl bg-slate-700 p-4">
                  <p className="text-sm text-slate-400">
                    Productivity
                  </p>

                  <p className="mt-2 text-3xl font-bold text-green-400">
                    78%
                  </p>

                  <div className="mt-3 h-2 rounded-full bg-slate-600">
                    <div className="h-2 w-[78%] rounded-full bg-green-400" />
                  </div>
                </div>

                <div className="rounded-xl bg-slate-700 p-4">
                  <p className="text-sm text-slate-400">
                    Upcoming Events
                  </p>

                  <p className="mt-2 text-3xl font-bold text-yellow-400">
                    5
                  </p>
                </div>

                <div className="rounded-xl bg-slate-700 p-4">
                  <p className="text-sm text-slate-400">
                    Monthly Balance
                  </p>

                  <p className="mt-2 text-2xl font-bold text-blue-400">
                    ₹12,500
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <FaRobot />
                  </div>

                  <div>
                    <p className="font-semibold text-blue-200">
                      KamKaj AI Insight
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      You completed 8 tasks this week. Keep going!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUSTED SECTION */}
      <section className="border-y border-slate-800 bg-slate-900/50 py-8">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Built for focused professionals and modern teams
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-xl font-bold text-slate-500 md:gap-14">
            <span>STARTUP</span>
            <span>FREELANCE</span>
            <span>STUDENTS</span>
            <span>CREATORS</span>
            <span>TEAMS</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold text-blue-400">
              ONE POWERFUL WORKSPACE
            </p>

            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              Work better. Plan smarter. Achieve more.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-400">
              KamKaj brings your daily work tools into one modern dashboard.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-7 transition duration-300 hover:-translate-y-2 hover:border-blue-500/70 hover:bg-slate-800"
              >
                <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-blue-600 text-xl">
                  {feature.icon}
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section id="workflow" className="bg-slate-900/60 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-semibold text-blue-400">
                SIMPLE WORKFLOW
              </p>

              <h2 className="mt-3 text-4xl font-bold">
                From planning to progress, all in one place.
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">
                KamKaj gives you a structured system to manage work without
                switching between multiple apps.
              </p>

              <Link
                to="/register"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
              >
                Create Your Workspace
                <FaArrowRight />
              </Link>
            </div>

            <div className="space-y-5">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-5 rounded-2xl border border-slate-700 bg-slate-800 p-6"
                >
                  <div className="text-3xl font-bold text-blue-500">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">
                      {step.title}
                    </h3>

                    <p className="mt-2 leading-7 text-slate-400">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="font-semibold text-blue-400">
              USER FEEDBACK
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Loved by people who want better focus.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-7"
              >
                <p className="text-2xl text-blue-400">“</p>

                <p className="mt-3 leading-7 text-slate-300">
                  {testimonial.text}
                </p>

                <div className="mt-6 border-t border-slate-800 pt-5">
                  <p className="font-bold">
                    {testimonial.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-slate-900/60 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <p className="font-semibold text-blue-400">
              FAQ
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Frequently asked questions
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-slate-700 bg-slate-800 p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                  {faq.question}

                  <FaChevronDown className="transition group-open:rotate-180" />
                </summary>

                <p className="mt-4 leading-7 text-slate-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-center md:p-16">
          <h2 className="text-4xl font-bold md:text-5xl">
            Ready to build a more productive day?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
            Join KamKaj and manage your work, goals and productivity from one place.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-blue-700 transition hover:scale-105"
          >
            Get Started for Free
            <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="text-3xl font-bold">
              Kam<span className="text-blue-500">Kaj</span>
            </Link>

            <p className="mt-4 max-w-xs leading-7 text-slate-400">
              A modern productivity platform to manage tasks, notes, calendar,
              expenses, analytics and AI assistance.
            </p>

            <div className="mt-5 flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 transition hover:bg-blue-600"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 transition hover:bg-blue-600"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 transition hover:bg-blue-600"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 transition hover:bg-blue-600"
              >
                <FaFacebookF />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Product</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <a href="#features" className="block hover:text-white">
                Features
              </a>

              <Link to="/register" className="block hover:text-white">
                Get Started
              </Link>

              <Link to="/login" className="block hover:text-white">
                Login
              </Link>

              <a href="#workflow" className="block hover:text-white">
                How It Works
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Resources</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <a href="#faq" className="block hover:text-white">
                Help Center
              </a>

              <a href="#faq" className="block hover:text-white">
                Documentation
              </a>

              <a href="#testimonials" className="block hover:text-white">
                Customer Stories
              </a>

              <a href="#faq" className="block hover:text-white">
                Support
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Company</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <a href="#workflow" className="block hover:text-white">
                About KamKaj
              </a>

              <a href="#testimonials" className="block hover:text-white">
                Careers
              </a>

              <a href="#faq" className="block hover:text-white">
                Privacy Policy
              </a>

              <a href="#faq" className="block hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>© 2026 KamKaj. All rights reserved.</p>

            <p>Built with React, Node.js, PostgreSQL and AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;