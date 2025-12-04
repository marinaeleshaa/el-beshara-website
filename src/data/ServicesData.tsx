import { IService } from "@/lib/Interfaces/ServiceInterface";
import {
  FaHandsHelping,
  FaMicrophoneAlt,
  FaRegClock,
  FaVolumeUp,
  FaHeadphonesAlt,
  FaUsers,
  FaSmileBeam,
  FaMusic,
  FaTools,
  FaCompressArrowsAlt,
  FaCloudUploadAlt,
} from "react-icons/fa";

const ServicesData = (): IService[] => {
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
        text: "More Details",
        href: "/services/#reserve",
      },
    },

    {
      id: 2,
      title: "Record a Song",
      subtitle: "Turn your worship message into a professionally recorded song.",
      description:
        "Bring your worship song to life with industry-standard recording. Whether it's gospel, contemporary Christian music, choir harmonies, or a devotional track, we guide you through every step to capture your message with clarity and emotion.",
      image: "/home/service.jpg",
      points: [
        {
          label:
            "High-quality vocal and instrument recording with professional engineers.",
          icon: <FaMicrophoneAlt />,
        },
        {
          label:
            "Coaching for performance, vocal delivery, and artistic expression.",
          icon: <FaHeadphonesAlt />,
        },
        {
          label:
            "Multi-track recording for choirs, harmonies, and live instruments.",
          icon: <FaUsers />,
        },
        {
          label:
            "Comfortable recording environment that encourages creativity and worship.",
          icon: <FaSmileBeam />,
        },
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
        {
          label:
            "Professional mixing for vocals, choirs, instruments, and backgrounds.",
          icon: <FaMusic />,
        },
        {
          label:
            "Mastering for clarity, punch, warmth, and wide stereo sound.",
          icon: <FaTools />,
        },
        {
          label:
            "Noise reduction, tuning, EQ, compression, and effects as needed.",
          icon: <FaCompressArrowsAlt />,
        },
        {
          label:
            "Final high-quality files ready for streaming platforms, churches, or events.",
          icon: <FaCloudUploadAlt />,
        },
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
