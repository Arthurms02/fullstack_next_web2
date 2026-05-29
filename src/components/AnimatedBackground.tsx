'use client';

import { motion } from 'framer-motion';
import Plasma from './reactBits/animatedBackground/Plasma';


export default function AnimatedBackground() {
  return (
    <motion.div className="fixed inset-0 -z-10 bg-black">
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <Plasma
          color="#0e2853"
          speed={1}
          direction="forward"
          scale={1.5}
          opacity={0.5}
          mouseInteractive={false}
        />
      </div>
    </motion.div>
  );
}