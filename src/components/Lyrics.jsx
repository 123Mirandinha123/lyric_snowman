import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function Lyrics() {
  const [indexPalavra, setIndexPalavra] = useState(0);

  const textoCompleto = "I want you to know that I'm never leaving 'Cause I'm Mrs. Snow till death we'll be freezing Yeah, you are my home, my home for all seasons So come on, let's go";
  const palavras = useMemo(() => textoCompleto.split(" "), []);

  // TERMINAR FRASE COM "SO"
  const indexSo = useMemo(
    () => palavras.findIndex(p => p.replace(/[^\w]/g, "") === "So"),
    [palavras]
  );
  // TEMPO DAS FRASES
  const temposAbsolutos = useMemo(() => [
    // Frase 1
    0, 350, 700, 1000, 1300, 1700, 2100, 2600, 2800,
    // Frase 2
    3300, 3550, 3850, 4450, 4790, 5050, 5350, 5550, 5950,
    // Frase 3
    6300, 6500, 7000, 7400, 7900, 8200, 8500, 9000, 9400,
    // Frase 4
    9600, 10200, 11000, 11600, 12600, 13300, 13700
  ], []);

  useEffect(() => {
    const timers = temposAbsolutos.map((tempo, i) => 
      setTimeout(() => {
        setIndexPalavra(i);
      }, tempo)
    );
    return () => timers.forEach(clearTimeout);
  }, [temposAbsolutos]);

  const isTransparent = indexPalavra % 2 !== 0;
  const isFinalParte = indexPalavra >= indexSo;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden bg-[#050a14]">
      
      {/* Fundo que pulsa com a palavra*/}
      <motion.div
        className="absolute inset-0 z-0 bg-[#0a1a3a]"
        animate={{ opacity: isTransparent ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      <div className="relative z-10 w-full flex justify-center items-center">
        {isFinalParte ? (
          <div className="flex gap-4 md:gap-8 flex-wrap justify-center px-6">
            {palavras.slice(indexSo, indexPalavra + 1).map((palavra, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-8xl font-black uppercase text-white"
                style={{
                  color: i % 2 !== 0 ? 'transparent' : 'white',
                  WebkitTextStroke: i % 2 !== 0 ? '2px #60a5fa' : '0px',
                }}
              >
                {palavra}
              </motion.span>
            ))}
          </div>
        ) : (
          <motion.h1
            key={indexPalavra}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            className={`text-6xl md:text-[11rem] font-black uppercase text-center leading-none
              ${isTransparent ? 'text-transparent' : 'text-white'}`}
            style={{
              WebkitTextStroke: isTransparent ? '3px #60a5fa' : '0px',
              textShadow: !isTransparent ? '0 0 35px rgba(96,165,250,0.3)' : 'none',
              transform: 'translateZ(0)'
            }}
          >
            {palavras[indexPalavra]}
          </motion.h1>
        )}
      </div>
    </div>
  );
}