import {
  FaHandsHelping,
  FaMicrophoneAlt,
  FaRegClock,
  FaVolumeUp,
} from "react-icons/fa";

const ServicesData = () => {
  return [
    {
      id: 1,
      title: "Reserve the Studio",
      subtitle:
        "A peaceful, creative space designed to inspire worship and excellence.",
      description:
        "Book your dedicated recording space in our professional Christian music studio. Enjoy a peaceful, inspiring environment equipped with high-quality microphones, instruments, and sound treatment — perfect for worship sessions, choirs, solo artists, voice-overs, and live musical performances.",
      image: "/home/service.jpg",
      points: [
        {
          label: "Sound-treated rooms designed for worship and vocal clarity.",
          icon: <FaVolumeUp />,
        },
        {
          label:
            "Professional equipment including studio microphones, headphones, and monitors.",
          icon: <FaMicrophoneAlt />,
        },
        {
          label:
            "Flexible booking hours for individual artists, choirs, and worship teams.",
          icon: <FaRegClock />,
        },
        {
          label:
            "Supportive Christian atmosphere to help you create with purpose.",
          icon: <FaHandsHelping />,
        },
      ],
      statistics: [
        { label: "Sessions Booked", value: "450+" },
        { label: "Returning Artists", value: "90%" },
        { label: "Studio Capacity", value: "Up to 12 people" },
      ],
      action: {
        text: "Book a Session",
        href: "/contact",
      },
    },

    {
      id: 2,
      title: "Record a Song",
      subtitle:
        "Turn your worship message into a professionally recorded song.",
      description:
        "Bring your worship song to life with industry-standard recording. Whether it's gospel, contemporary Christian music, choir harmonies, or a devotional track, we guide you through every step to capture your message with clarity and emotion.",
      image: "/home/service.jpg",
      points: [
        "High-quality vocal and instrument recording with professional engineers.",
        "Coaching for performance, vocal delivery, and artistic expression.",
        "Multi-track recording for choirs, harmonies, and live instruments.",
        "Comfortable recording environment that encourages creativity and worship.",
      ],
      statistics: [
        { label: "Songs Recorded", value: "300+" },
        { label: "Choirs & Groups", value: "70+" },
        { label: "Artist Satisfaction", value: "98%" },
      ],
      action: {
        text: "Start Recording",
        href: "/services",
      },
    },

    {
      id: 3,
      title: "Mix & Master Your Song",
      subtitle: "Deliver a polished, powerful sound ready for any platform.",
      description:
        "Transform your raw tracks into a polished, radio-ready Christian song. Our team balances vocals, instruments, beats, and harmonies while preserving the spirit of worship. We deliver a clean, powerful, and emotionally engaging final mix.",
      image: "/home/service.jpg",
      points: [
        "Professional mixing for vocals, choirs, instruments, and backgrounds.",
        "Mastering for clarity, punch, warmth, and wide stereo sound.",
        "Noise reduction, tuning, EQ, compression, and effects as needed.",
        "Final high-quality files ready for streaming platforms, churches, or events.",
      ],
      statistics: [
        { label: "Songs Mixed", value: "500+" },
        { label: "Streaming-Ready Files Delivered", value: "1000+" },
        { label: "Average Delivery Time", value: "48 hours" },
      ],
      action: {
        text: "Mix & Master",
        href: "/services",
      },
    },
  ];
};

export default ServicesData;
