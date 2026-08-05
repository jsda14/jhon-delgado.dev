import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Stack from '@/components/sections/Stack';
import AIWorkflow from '@/components/sections/AIWorkflow';
import AIChatWidget from '@/components/widgets/AIChatWidget';

export function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Stack />
        <AIWorkflow />
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}

export default App;
