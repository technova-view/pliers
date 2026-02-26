import {
  Zap,
  Droplets,
  ZapOff,
  Flame,
  Thermometer,
  Lock,
  Wrench,
} from "lucide-react";

export const homeownerLandingPageData = {
  hero: {
    badgeText: "PLIERS — HOME SERVICES",
    title: {
      text: "Every home problem,",
      span: "solved.",
    },
    description: "Your AI-powered home care assistant. Diagnose issues instantly, get DIY solutions, or connect with trusted local contractors in South Africa.",
    primaryCtaText: "Describe Your Problem",
    secondaryCtaText: "Find a Contractor",
    heroImageSrc: "/heroImage.jpeg",
    heroImageAlt: "Modern home interior",
  },
  howItWorks: {
    title: "How It Works",
    badgeText: "Simple Process",
    steps: [
      {
        number: 1,
        emoji: "1️⃣",
        title: "Tell us what's happening",
        problems: [
          { icon: <Droplets className="w-5 h-5" />, text: "My geyser is leaking." },
          { icon: <ZapOff className="w-5 h-5" />, text: "My power keeps tripping." },
          { icon: <Flame className="w-5 h-5" />, text: "There's a strange smell in the kitchen." },
        ],
      },
      {
        number: 2,
        emoji: "2️⃣",
        title: "Get clear guidance",
        items: [
          "What might be causing it",
          "Whether it's urgent",
          "What you should (and shouldn't) do",
          "If it's safe to try fixing it yourself",
        ],
      },
      {
        number: 3,
        emoji: "3️⃣",
        title: "Get it sorted",
        description: "If you need help, Pliers generates a clear job brief and connects you to local professionals near you.",
        highlightText: "No confusion. No guessing. No endless searching.",
      },
    ],
  },
  builtForRealHomes: {
    title: "Built for Real Homes",
    badgeText: "Built for You",
    subtitle: "Whether it's:",
    categories: [
      { icon: <Droplets className="w-6 h-6" />, name: "Plumbing leaks" },
      { icon: <Zap className="w-6 h-6" />, name: "Electrical faults" },
      { icon: <Thermometer className="w-6 h-6" />, name: "Geyser problems" },
      { icon: <Wrench className="w-6 h-6" />, name: "Appliance breakdowns" },
      { icon: <Lock className="w-6 h-6" />, name: "Security issues" },
    ],
    footerText: "Pliers is designed for everyday home problems.",
  },
  builtForSouthAfricanHomes: {
    title: "Built for South African Homes",
    badgeText: "Local Focus",
    description: "We understand local housing realities, common infrastructure issues, and the way South Africans describe home problems.",
    highlightQuote: "This isn't generic advice.",
    highlightSubQuote: "It's built for where you live.",
  },
  aboutPliers: {
    title: "About Pliers",
    subtitle: "Every home problem, solved.",
    story: [
      "Homes are meant to feel safe. But when something goes wrong — a leaking pipe, a power failure, a broken appliance — that feeling disappears quickly. Suddenly you're searching online, calling people who don't answer, trying to figure out what's urgent and what's not.",
      "It's stressful. It's confusing. And it shouldn't be.",
      "Pliers was created to change that.",
    ],
    whyWeBuilt: [
      "What's happening?",
      "Is it dangerous?",
      "Can I fix this myself?",
      "If not, who can I trust?",
    ],
    differenceItems: [
      "Asks smart follow-up questions",
      "Helps you understand possible causes",
      "Flags safety concerns",
      "Suggests whether DIY is appropriate",
      "Connects you with local professionals if needed",
    ],
    forWhoItems: [
      { icon: "Home", title: "Homeowners", text: "feel more confident" },
      { icon: "Users", title: "Professionals", text: "waste less time" },
      { icon: "Zap", title: "Problems", text: "get solved faster" },
    ],
    visionItems: ["Clear guidance", "Safe solutions", "Trusted professionals"],
    finalCtaText: "Explain My Problem",
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "For Homeowners",
    faqs: [
      {
        q: "What is Pliers?",
        a: "Pliers is a home problem-solving platform. You describe what's going wrong in your home — in plain language — and Pliers helps you understand what might be happening, whether it's urgent, and what to do next. If you need professional help, we can connect you to contractors in your area.",
      },
      {
        q: "Is Pliers just another directory?",
        a: "No. Pliers doesn't just list contractors. It first helps you understand the problem. We guide you through what could be causing it and whether it's safe to try fixing it yourself before connecting you to a professional. It's about clarity first — then action.",
      },
      {
        q: "Is this the same as using ChatGPT?",
        a: "Not quite. ChatGPT gives general information. Pliers is built specifically for home issues. We ask follow-up questions relevant to your situation, highlight safety risks, help decide between DIY and professional help, and connect you to local contractors if needed. It's designed to help you move from 'What's wrong?' to 'It's fixed.'",
      },
      {
        q: "Does Pliers replace a professional?",
        a: "No. Pliers provides guidance to help you understand what might be happening. For complex or potentially unsafe issues, we recommend consulting a qualified professional. If needed, we can help you connect with one.",
      },
      {
        q: "Is it safe to follow the advice?",
        a: "Pliers is designed to avoid risky or dangerous DIY recommendations. If something appears unsafe, we will advise you to stop and consult a professional. When in doubt, safety comes first.",
      },
      {
        q: "Do I have to hire a contractor through Pliers?",
        a: "No. You can use Pliers simply to understand your issue. If you decide you need help, you can choose whether or not to connect with a contractor.",
      },
      {
        q: "How much does it cost to use Pliers?",
        a: "For homeowners, using Pliers to understand your problem is free. If you choose to hire a contractor, pricing will depend on the service provider and the work required.",
      },
      {
        q: "How do I know the contractors are legitimate?",
        a: "Contractors on Pliers go through a basic approval process before being listed. We aim to connect you with professionals who operate in your area and category. We encourage homeowners to review credentials, ask questions, and confirm details before hiring.",
      },
      {
        q: "Can I upload photos of the problem?",
        a: "Yes. Uploading photos can help provide better guidance and clearer job briefs for contractors.",
      },
      {
        q: "What types of home problems does Pliers cover?",
        a: "Pliers supports common household issues such as plumbing, electrical, geysers and hot water systems, appliance breakdowns, security and access issues, and general repairs. More categories will be added over time.",
      },
      {
        q: "Is my information private?",
        a: "Yes. Your information is only used to help diagnose your issue and, if requested, to connect you with contractors. We do not sell your personal information.",
      },
      {
        q: "What areas does Pliers operate in?",
        a: "Pliers is currently focused on South Africa and will expand to additional areas over time.",
      },
    ],
  },
};
