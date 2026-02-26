import {
  Wrench,
  Users,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

export const contractorLandingPageData = {
  hero: {
    badgeText: "PLIERS — FOR PROFESSIONALS",
    title: {
      text: "Grow your business",
      span: <span className='text-primary'>with quality leads.</span>
    },
    description: "Connect with homeowners who need your expertise. Get clear, well-defined job briefs and build your reputation with our trusted platform.",
    primaryCtaText: "Join as a Contractor",
    secondaryCtaText: "View Jobs",
    heroImageSrc: "/professionals.jpg",
    heroImageAlt: "Professional contractors working",
  },
  howItWorks: {
    title: "How It Works for Contractors",
    badgeText: "Simple Process",
    steps: [
      {
        number: 1,
        emoji: "1️⃣",
        title: "Create your profile",
        items: [
          "Showcase your skills and experience",
          "Set your service areas",
          "Add your portfolio and reviews",
          "Specify your availability",
        ],
      },
      {
        number: 2,
        emoji: "2️⃣",
        title: "Get matched with jobs",
        description: "Pliers connects you with homeowners who need your services with clear, well-defined job briefs.",
        highlightText: "No more vague inquiries or wasted time on calls.",
      },
      {
        number: 3,
        emoji: "3️⃣",
        title: "Grow your business",
        items: [
          "Receive structured job requests",
          "Communicate directly with homeowners",
          "Build your reputation with reviews",
          "Manage your schedule efficiently",
        ],
      },
    ],
  },
  aboutPliers: {
    title: "Why Contractors Choose Pliers",
    subtitle: "Get quality leads, not just inquiries.",
    story: [
      "Running a contracting business is hard enough without chasing vague leads. Too often, you spend time on calls that don't turn into jobs, or deal with homeowners who don't understand the scope of work.",
      "Pliers changes that.",
      "We provide you with clear, well-structured job briefs and connect you with homeowners who are ready to act.",
    ],
    whyWeBuilt: [
      "Clear job descriptions",
      "Verified homeowners",
      "No hidden fees",
      "Easy to use platform",
    ],
    differenceItems: [
      "Provides detailed job specifications",
      "Connects you with qualified leads",
      "Streamlines communication",
      "Helps build your online reputation",
      "Provides tools to manage your business",
    ],
    forWhoItems: [
      { icon: Users, title: "Contractors", text: "get quality leads" },
      { icon: Zap, title: "Jobs", text: "are well-defined" },
      { icon: Shield, title: "Clients", text: "are pre-qualified" },
    ],
    visionItems: ["Quality leads", "Transparent process", "Fair pricing"],
    finalCtaText: "Start Getting Leads",
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "For Contractors",
    faqs: [
      {
        q: "How does Pliers work for contractors?",
        a: "Pliers connects you with homeowners who need your services. We provide clear job briefs with details about the issue, location, and requirements, making it easier for you to assess if the job is a good fit.",
      },
      {
        q: "Is Pliers free for contractors to join?",
        a: "Yes, it's free to create a profile and browse job opportunities. We only charge a small fee when you successfully complete a job through our platform.",
      },
      {
        q: "How do I get paid?",
        a: "Payment is handled directly between you and the homeowner. We recommend using secure payment methods and discussing payment terms before starting any work.",
      },
      {
        q: "How do I build my reputation on Pliers?",
        a: "You can build your reputation by completing jobs to a high standard. Homeowners will leave reviews and ratings based on their experience, which are visible to other users.",
      },
      {
        q: "Can I choose which jobs to respond to?",
        a: "Yes, you have complete control over which jobs you respond to. You can filter jobs based on location, type of work, and other criteria.",
      },
      {
        q: "What types of contractors does Pliers work with?",
        a: "We work with a wide range of contractors including plumbers, electricians, handymen, carpenters, painters, and more. If you provide home services, Pliers can help you connect with homeowners.",
      },
    ],
  },
};
