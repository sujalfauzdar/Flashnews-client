import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets.js'; // Ensure this path is correct

const AboutUs = () => {
    // Animation Variants
    const textLeftVariants = {
        hidden: { x: -200, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const textRightVariants = {
        hidden: { x: 200, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const sectionLeftVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const sectionRightVariants = {
        hidden: { x: 100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const buttonVariants = {
        rest: { scale: 1, x: 0, rotate: 0 },
        hover: { rotate: 5, transition: { duration: 0.3, ease: 'easeInOut' } },
    };

    const developerVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    return (
        <div className="min-h-screen bg-[#121212] text-[#FFFFFF] p-6 overflow-hidden">
            {/* Header Section */}
            <div className="text-center mb-12">
                
                <motion.h1
                    className="text-5xl font-bold text-[#00FFFF] tracking-wide"
                    variants={textLeftVariants}
                    initial="hidden"
                    animate="visible"
                >
                    Welcome to FlashNews
                </motion.h1>
                <motion.p
                    className="text-lg text-[#FF4500] mt-2 font-semibold"
                    variants={textRightVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                >
                    Your Instant Gateway to the Latest Stories
                </motion.p>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto space-y-12">
                {/* What is FlashNews */}
                <motion.section
                    className="bg-[#0A1F44] p-6 rounded-lg shadow-lg shadow-[#00FFFF]/30 hover:shadow-[#00FFFF]/50 transition-shadow duration-300"
                    variants={sectionLeftVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-[#00FFFF] mb-4">What is FlashNews?</h2>
                    <p className="text-gray-300 leading-relaxed">
                        <span className="font-extrabold text-2xl">FlashNews</span> – Stay Ahead, Instantly! Get the hottest news at your fingertips with a cutting-edge, neon-powered interface. Experience the thrill of breaking stories—sign up to unlock the full power of real-time updates!
                    </p>
                </motion.section>

                {/* Features for Everyone */}
                <motion.section
                    className="bg-[#0A1F44] p-6 rounded-lg shadow-lg shadow-[#FF4500]/30 hover:shadow-[#FF4500]/50 transition-shadow duration-300"
                    variants={sectionRightVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-[#FF4500] mb-4">Features for Everyone</h2>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-center gap-3">
                            <span className="text-[#00FFFF]">✨</span>
                            <span><strong>News That Finds You:</strong> Discover stories tailored to your vibe, no setup needed!</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-[#00FFFF]">✨</span>
                            <span><strong>Time Warp Reads:</strong> Flip through yesterday’s headlines or tomorrow’s trends with a single tap!</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-[#00FFFF]">✨</span>
                            <span><strong>Smart Filters:</strong> Search by title, filter by state, city, or category with a slick popup.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-[#00FFFF]">✨</span>
                            <span><strong>Sort Your Way:</strong> Newest or oldest first—your call!</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-[#00FFFF]">✨</span>
                            <span><strong>Visual Vibes:</strong> Stunning article images in a dark, neon glow.</span>
                        </li>
                    </ul>
                    <motion.div
                        variants={buttonVariants}
                        initial="rest"
                        whileHover="hover"
                    >
                        <Link
                            to="/articles"
                            className="inline-block mt-6 bg-[#FF4500] text-white px-6 py-2 rounded-full transition-all duration-300"
                        >
                            Start Reading Now
                        </Link>
                    </motion.div>
                </motion.section>

                {/* For Admins */}
                <motion.section
                    className="bg-[#0A1F44] p-6 rounded-lg shadow-lg shadow-[#00FFFF]/30 hover:shadow-[#00FFFF]/50 transition-shadow duration-300"
                    variants={sectionLeftVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-[#00FFFF] mb-4">Power Up as an Admin</h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        Want to shape the news? Sign up as an Admin and unlock the ability to add fresh articles. Keep the app buzzing with the latest scoops!
                    </p>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-center gap-3">
                            <span className="text-[#FF4500]">⚡</span>
                            <span><strong>Add Articles:</strong> Share stories with a quick, easy form.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-[#FF4500]">⚡</span>
                            <span><strong>Exclusive Access:</strong> Admin tools appear in your profile dropdown.</span>
                        </li>
                    </ul>
                    <motion.div
                        variants={buttonVariants}
                        initial="rest"
                        whileHover="hover"
                    >
                        <Link
                            to="/signup"
                            className="inline-block mt-6 bg-[#00FFFF] text-[#0A1F44] px-6 py-2 rounded-full transition-all duration-300"
                        >
                            Join as Admin
                        </Link>
                    </motion.div>
                </motion.section>

                <motion.section
                    className="bg-[#0A1F44] p-6 rounded-lg shadow-lg shadow-[#FF4500]/30 hover:shadow-[#FF4500]/50 transition-shadow duration-300"
                    variants={sectionRightVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-[#FF4500] mb-4">How to Use FlashNews</h2>
                    <p className="text-gray-300 leading-relaxed">
                        It’s simple—start exploring news instantly! Here’s how:
                    </p>
                    <ol className="list-decimal list-inside space-y-3 text-gray-300 mt-4">
                        <li>Hit the <strong>Home</strong> button (or go to <Link to="/articles" className="text-[#00FFFF] hover:underline">/articles</Link>) to see all news.</li>
                        <li>Type in the search bar to find specific stories.</li>
                        <li>Click the filter icon for sorting (newest/oldest) and filtering by location or category.</li>
                        <li>Liked a story? Click "Read More" to dive deeper.</li>
                        <li>Want to contribute? Sign up as an Admin and add your own articles!</li>
                    </ol>
                </motion.section>

               
                <motion.section
                    className="bg-[#0A1F44] p-6 rounded-lg shadow-lg shadow-[#00FFFF]/30 hover:shadow-[#00FFFF]/50 transition-shadow duration-300"
                    variants={developerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-[#00FFFF] mb-4">Meet the Mind Behind FlashNews</h2>
                    <p className="text-gray-300 leading-relaxed">
                        FlashNews was crafted by Sujal Fauzdar, a talented third-year B.Tech CSE student at JECRC University. With a deep passion for programming and development, Sujal has poured his creativity and technical prowess into building this sleek, neon-powered news platform. His innovative spirit shines through every feature, blending functionality with a futuristic flair. Beyond his coding skills, Sujal’s dedication to problem-solving and his knack for turning ideas into reality make him a standout developer destined to leave a mark on the tech world!
                    </p>
                </motion.section>
            </div>

           
            <motion.div
                className="text-center mt-12 text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                Built with Hardwork by the FlashNews |  just pure news vibes!
            </motion.div>
        </div>
    );
};

export default AboutUs;