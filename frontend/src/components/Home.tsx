import { motion } from "framer-motion";
import ispscLogo from "../assets/ispsc.png";
import { useState } from "react";
import ProceedToForm from "./modal/ProceedToForm";
import { Toaster } from "react-hot-toast";

const Home = () => {
  const containerVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        delayChildren: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };

  const secondConatinerVariants = {
    initial: {
      y: 300,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.5,
      },
    },
  };

  const secondChildVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  const [isProceedtoForm, setProceedtoForm] = useState(false);

  return (
    <div>
      <div className="h-screen bg-primary">
        <motion.div
          className="pt-20 px-4 md:px-0"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div>
            <motion.div className="flex justify-center">
              <img
                src={ispscLogo}
                alt="ispsc logo"
                className="w-[30%] md:w-[15%] lg:w-[10%]"
              />
            </motion.div>

            <motion.h1 className="main-font text-xl md:text-2xl lg:text-3xl mt-5 text-center">
              ILOCOS SUR POLYTECHNIC STATE COLLEGE
            </motion.h1>
          </motion.div>

          <motion.h1
            variants={childVariants}
            className="text-lg md:text-xl text-center text-white font-bold px-4"
          >
            Stay Connected. Track Your Journey. Shape the Future.
          </motion.h1>

          <motion.p
            variants={childVariants}
            className="mx-auto w-[90%] md:w-[70%] lg:w-[50%] text-center text-white italic opacity-75 mt-5"
          >
            Welcome back, ISPSC Alumni! Whether you're advancing in your career,
            pursuing higher studies, or exploring new opportunities, we want to
            hear from you. Your success story matters—help us build a stronger
            alumni network and improve future programs!
          </motion.p>

          <motion.div className="flex flex-col md:flex-row justify-center md:gap-32 mt-5">
            <motion.div
              variants={childVariants}
              className="p-4 md:p-8 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                5,000+
              </h2>
              <p className="text-white opacity-75">Traced Graduates</p>
            </motion.div>
            <motion.div
              variants={childVariants}
              className="p-4 md:p-8 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                80%
              </h2>
              <p className="text-white opacity-75">Employment Rate</p>
            </motion.div>
            <motion.div
              variants={childVariants}
              className="p-4 md:p-8 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                50+
              </h2>
              <p className="text-white opacity-75">Partner Companies</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <div className="min-h-dvh bg-white w-[95%] md:w-[90%] lg:w-[80%] mx-auto">
        <motion.div
          variants={secondConatinerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="py-8 md:py-16 px-4 md:px-0"
        >
          <motion.div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16 md:mb-24">
            <motion.div className="p-6 md:p-8 rounded-xl hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
              <motion.h1
                className="text-primary font-bold text-xl md:text-2xl mb-4"
                variants={secondChildVariants}
              >
                Share Your Story
              </motion.h1>
              <motion.p
                variants={secondChildVariants}
                className="text-gray-600"
              >
                Let your experiences inspire future graduates through our
                interactive platform.
              </motion.p>
            </motion.div>

            <motion.div className="p-6 md:p-8 rounded-xl hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
              <motion.h1
                className="text-primary font-bold text-xl md:text-2xl mb-4"
                variants={secondChildVariants}
              >
                Stay Connected
              </motion.h1>
              <motion.p
                variants={secondChildVariants}
                className="text-gray-600"
              >
                Build lasting connections with fellow alumni through our
                networking platform.
              </motion.p>
            </motion.div>

            <motion.div className="p-6 md:p-8 rounded-xl hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
              <motion.h1
                className="text-primary font-bold text-xl md:text-2xl mb-4"
                variants={secondChildVariants}
              >
                Shape ISPSC's Future
              </motion.h1>
              <motion.p
                variants={secondChildVariants}
                className="text-gray-600"
              >
                Help us evolve and improve our academic programs with your
                valuable insights.
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div className="my-16 md:my-24 text-center max-w-4xl mx-auto px-4">
            <motion.h1
              className="text-primary font-bold text-3xl md:text-4xl mb-6"
              variants={secondChildVariants}
            >
              ISPSC GRADUATE TRACER
            </motion.h1>
            <motion.p
              variants={secondChildVariants}
              className="text-gray-600 text-base md:text-lg leading-relaxed"
            >
              Your gateway to staying connected with fellow graduates, sharing
              experiences, and contributing to the growth of future generations.
              Join us in building a stronger, more vibrant alumni community!
            </motion.p>
          </motion.div>

          <motion.div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto px-4 md:px-0">
            <motion.div
              variants={secondChildVariants}
              className="flex flex-col md:flex-row items-center md:space-x-6 p-4 md:p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl 
          hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <span className="text-4xl bg-white p-4 rounded-full shadow-md mb-4 md:mb-0">
                🏆
              </span>
              <p className="text-base md:text-lg font-medium text-gray-700 text-center md:text-left">
                Celebrate Alumni Achievements – Get featured in ISPSC's alumni
                spotlights!
              </p>
            </motion.div>
            <motion.div
              variants={secondChildVariants}
              className="flex flex-col md:flex-row items-center md:space-x-6 p-4 md:p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl 
          hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <span className="text-4xl bg-white p-4 rounded-full shadow-md mb-4 md:mb-0">
                💡
              </span>
              <p className="text-base md:text-lg font-medium text-gray-700 text-center md:text-left">
                Your story inspires. Your feedback empowers.
              </p>
            </motion.div>
            <motion.div
              variants={secondChildVariants}
              className="flex flex-col md:flex-row items-center md:space-x-6 p-4 md:p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl 
          hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <span className="text-4xl bg-white p-4 rounded-full shadow-md mb-4 md:mb-0">
                🚀
              </span>
              <p className="text-base md:text-lg font-medium text-gray-700 text-center md:text-left">
                Let's make ISPSC an even better institution—together!
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {isProceedtoForm && (
        <ProceedToForm
          isOpen={isProceedtoForm}
          handleIsOpen={setProceedtoForm}
        />
      )}

      {<Toaster />}

      <div className="h-screen bg-primary flex items-center justify-center">
        <motion.div
          variants={secondConatinerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center px-4 md:px-8 lg:px-16"
        >
          <motion.h1
            variants={secondChildVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8"
          >
            Ready to Share Your Journey?
          </motion.h1>
          <motion.button
            onClick={() => setProceedtoForm(true)}
            variants={secondChildVariants}
            className="bg-white text-primary hover:bg-primary hover:text-white border-2 border-white 
            px-8 py-4 rounded-full text-lg md:text-xl font-semibold 
            transition-all duration-300 transform hover:scale-105"
          >
            Start Your Tracer Survey
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
