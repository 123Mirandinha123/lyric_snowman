import { motion } from 'framer-motion';

const Particula = ({ delay }) => (
  <motion.div
    initial={{ y: "-5vh", opacity: 0, x: Math.random() * 100 + "vw" }}
    animate={{ 
      y: "100vh", 
      opacity: [0, 1, 1, 0],
    }}
    transition={{ 
      duration: 4, // Aumentei de 2.5 para 4 (queda mais lenta)
      repeat: Infinity, 
      delay, 
      ease: "linear" 
    }}
    className="absolute bg-white rounded-full select-none pointer-events-none z-1 shadow-[0_0_8px_white]"
    style={{ 
      width: Math.random() * 3 + 2 + "px", 
      height: Math.random() * 3 + 2 + "px",
    }}
  />
);

export default function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#050a14]" />
      
      {/* 150 partículas */}
      {[...Array(150)].map((_, i) => (
        <Particula key={i} delay={i * 0.05} />
      ))}

      {/*Camada de Neve Acumulada*/}
      <motion.div
        initial={{ height: "0vh" }}
        animate={{ height: "12vh" }}
        transition={{ 
          // O delay agora é 4s para bater com o novo tempo de queda das partículas
          delay: 4, 
          duration: 25, 
          ease: "easeIn" 
        }}
        className="absolute bottom-0 left-0 right-0 bg-white z-2"
        style={{
          boxShadow: "0px -15px 40px 10px white",
          borderRadius: "100% 100% 0 0 / 25px 25px 0 0",
          filter: "blur(1px)"
        }}
      />
    </div>
  );
}