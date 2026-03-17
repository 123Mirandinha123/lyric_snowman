import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Background from './components/Background';
import Lyrics from './components/Lyrics';
import FinalScreen from './components/FinalScreen';

const scriptMusica = [
  { frase: "I want you to know that I'm never leaving", tempoTotal: 4600 },
  { frase: "'Cause I'm Mrs. Snow till death we'll be freezing", tempoTotal: 4600 },
  { frase: "Yeah, you are my home, my home for all seasons", tempoTotal: 5500 },
  { frase: "So come on, let's go", tempoTotal: 3500 }
];

export default function App() {
  const [fase, setFase] = useState('inicio');
  const [indexFrase, setIndexFrase] = useState(0);

  useEffect(() => {
    if (fase !== 'letras') return;

    const currentFrase = scriptMusica[indexFrase];
    
    const timeout = setTimeout(() => {
      if (indexFrase < scriptMusica.length - 1) {
        setIndexFrase((prev) => prev + 1);
      } else {
        setFase('coracao');
      }
    }, currentFrase.tempoTotal);

    return () => clearTimeout(timeout);
  }, [fase, indexFrase]);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#050a14] flex items-center justify-center">

      {/* Background agora continua no coração para a neve não sumir do nada */}
      {(fase === 'letras' || fase === 'coracao') && <Background />}

      {fase === 'inicio' && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setFase('letras')}
          className="z-50 px-10 py-4 border-2 border-purple-400 text-purple-400 rounded-full hover:bg-purple-400/10 cursor-pointer uppercase text-xs tracking-widest"
        >
          Clique aqui, meu amor 💜
        </motion.button>
      )}

      {fase === 'letras' && (
        <Lyrics
          texto={scriptMusica[indexFrase].frase}
        />
      )}

      {fase === 'coracao' && (
        <FinalScreen />
      )}

      {/* ÁUDIO: Agora ele toca se a fase for 'letras' OU 'coracao' */}
      {(fase === 'letras' || fase === 'coracao') && (
        <audio autoPlay preload="auto">
          <source src="/snowman.mp3" type="audio/mpeg" />
        </audio>
      )}

    </main>
  );
}