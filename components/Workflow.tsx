'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import bgImage from '/path-to-your-image/zenithhero4.png'; // Import the background image

const WorkflowSection = () => {
  useEffect(() => {
    // Any custom scroll effect initialization can go here
  }, []);

  return (
    <div className="relative min-h-screen bg-no-repeat bg-cover" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-blue-900/90"></div>
      
      <section className="relative flex flex-col justify-center items-center h-screen">
        <h2 className="text-white text-center text-4xl font-bold mb-8">How does it work to invest in your future?</h2>
        <div className="grid grid-cols-4 gap-6 text-white max-w-5xl">
          {/* Each step */}
          <motion.div 
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-yellow-500 rounded-full p-4 mb-4">
              {/* Icon can go here */}
            </div>
            <h3 className="text-lg font-semibold">Initial consultation</h3>
            <p className="text-sm">There are many variations of passages...</p>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-yellow-500 rounded-full p-4 mb-4">
              {/* Icon can go here */}
            </div>
            <h3 className="text-lg font-semibold">Making plans for investment</h3>
            <p className="text-sm">There are many variations of passages...</p>
          </motion.div>

          {/* Add more sections following the same pattern */}
        </div>
      </section>
    </div>
  );
};

export default WorkflowSection;
