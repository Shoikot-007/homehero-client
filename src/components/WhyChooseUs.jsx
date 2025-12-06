import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaUserCheck,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Verified Professionals",
      description:
        "All service providers are thoroughly vetted and background-checked for your safety.",
    },
    {
      icon: <FaUserCheck />,
      title: "Quality Guaranteed",
      description:
        "We ensure top-notch service quality with customer satisfaction as our priority.",
    },
    {
      icon: <FaClock />,
      title: "Quick Booking",
      description:
        "Book services in minutes and get same-day or scheduled appointments.",
    },
    {
      icon: <FaDollarSign />,
      title: "Fair Pricing",
      description:
        "Transparent pricing with no hidden fees. Get the best value for your money.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-neutral-dark mb-4">
            Why Choose HomeHero?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We connect you with the best local service providers to make your
            home maintenance hassle-free
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full text-3xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;