import { motion } from 'framer-motion';

// desenho do coração (1 = pixel, 0 = vazio)
const heartMap = [
  "01100110",
  "11111111",
  "11111111",
  "01111110",
  "00111100",
  "00011000"
];

export default function FinalScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
    >
      
      {/*GRID DO CORAÇÃO*/}
      <motion.div
        className="grid gap-1 mb-8"
        style={{
          gridTemplateColumns: `repeat(${heartMap[0].length}, 20px)`
        }}
      >
        {heartMap.map((row, rowIndex) =>
          row.split("").map((cell, colIndex) => {
            const delay = (rowIndex * row.length + colIndex) * 0.03;

            if (cell === "0") {
              return <div key={`${rowIndex}-${colIndex}`} />;
            }

            return (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay,
                  duration: 0.3
                }}
                className="bg-purple-500"
                style={{
                  width: 20,
                  height: 20,
                  boxShadow: "0 0 10px #a855f7"
                }}
              />
            );
          })
        )}
      </motion.div>

      {/* TEXTO */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-purple-300 tracking-[0.5em] text-sm uppercase font-light"
      >
        Te amo :)
      </motion.p>
    </motion.div>
  );
}