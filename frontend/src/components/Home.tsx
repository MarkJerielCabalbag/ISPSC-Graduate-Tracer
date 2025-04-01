import { motion } from "framer-motion";
import ispscLogo from "../assets/ispsc.png";

const Home = () => {
  return (
    <div>
      <div className="h-dvh bg-primary">
        <motion.div
          className="pt-20"
          transition={{
            duration: 1,
            when: "beforeChildren",
            staggerChildren: 0.4,
          }}
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-center">
              <img
                src={ispscLogo}
                alt="ispsc logo"
                className="w-[10%] h-[10%]"
              />
            </div>

            <motion.h1 className="main-font text-3xl mt-5 text-center">
              ILOCOS SUR POLYTECHNIC STATE COLLEGE
            </motion.h1>
          </motion.div>

          <motion.h1
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            className="text-xl text-center text-white font-bold"
          >
            Stay Connected. Track Your Journey. Shape the Future.
          </motion.h1>

          <motion.p
            className="mx-auto w-[50%] text-center text-white italic opacity-75 mt-5"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
          >
            Welcome back, ISPSC Alumni! Whether you're advancing in your career,
            pursuing higher studies, or exploring new opportunities, we want to
            hear from you. Your success story matters—help us build a stronger
            alumni network and improve future programs!
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
