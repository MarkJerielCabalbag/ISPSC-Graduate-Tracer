import { motion } from "framer-motion";
import ispscLogo from "../assets/ispsc.png";

const Home = () => {
  const containerVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1.5,
        when: "beforeChildren",
        delayChildren: 0.5,
        staggerChildren: 0.5,
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

  return (
    <div>
      <div className="h-dvh bg-primary">
        <motion.div
          className="pt-20"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div>
            <motion.div className="flex justify-center">
              <img
                src={ispscLogo}
                alt="ispsc logo"
                className="w-[10%] h-[10%]"
              />
            </motion.div>

            <motion.h1 className="main-font text-3xl mt-5 text-center">
              ILOCOS SUR POLYTECHNIC STATE COLLEGE
            </motion.h1>
          </motion.div>

          <motion.h1
            variants={childVariants}
            className="text-xl text-center text-white font-bold"
          >
            Stay Connected. Track Your Journey. Shape the Future.
          </motion.h1>

          <motion.p
            variants={childVariants}
            className="mx-auto w-[50%] text-center text-white italic opacity-75 mt-5"
          >
            Welcome back, ISPSC Alumni! Whether you're advancing in your career,
            pursuing higher studies, or exploring new opportunities, we want to
            hear from you. Your success story matters—help us build a stronger
            alumni network and improve future programs!
          </motion.p>

          <motion.div className="flex justify-center gap-32 mt-10">
            <motion.div variants={childVariants} className="p-8 text-center">
              <h2 className="text-4xl font-bold text-white mb-2">5,000+</h2>
              <p className="text-white opacity-75">Traced Graduates</p>
            </motion.div>
            <motion.div variants={childVariants} className="p-8 text-center">
              <h2 className="text-4xl font-bold text-white mb-2">80%</h2>
              <p className="text-white opacity-75">Employment Rate</p>
            </motion.div>
            <motion.div variants={childVariants} className="p-8 text-center">
              <h2 className="text-4xl font-bold text-white mb-2">50+</h2>
              <p className="text-white opacity-75">Partner Companies</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <div className="h-dvh bg-white">
        <motion.div></motion.div>
      </div>
    </div>
  );
};

export default Home;
