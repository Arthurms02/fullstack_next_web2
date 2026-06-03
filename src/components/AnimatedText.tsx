'use client';

import { motion, LayoutGroup } from 'framer-motion';
import RotatingText from './reactBits/animatedText/RotatingText';

export default function AnimatedText() {
  return (
    <LayoutGroup>
      <motion.div className="flex items-center  text-center justify-center mx-auto gap-2 flex-wrap">
        <motion.h1 className="pt-5 text-5xl font-bold text-white mb-4">
          Independente do seu estilo
        </motion.h1>
        <RotatingText
          texts={["Classico", "Moderno", "Vintage", "Urbano", "Criativo", "Elegante"]}
          mainClassName="px-2 sm:px-2 md:px-3 bg-blue-900 text-white font-bold text-3xl text- overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-sm"
          staggerFrom="last"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
          splitBy="characters"
          auto
          loop
        />
      </motion.div>
      <motion.div className="flex flex-col flex-wrap items-center justify-center text-center font-medium">
        <h2 className="flex text-2xl w-80 mx-auto font-bold text-white flex-wrap">
          Encontre o barbeiro perfeito para você, agende seu horário online, sem complicações.
        </h2>
      </motion.div>


    </LayoutGroup>
  );
}