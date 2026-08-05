import React from 'react';
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero/Hero';
import AIWorkflow from '@/components/sections/AIWorkflow/AIWorkflow';
import Projects from '@/components/sections/Projects/Projects';
import Experience from '@/components/sections/Experience/Experience';
import Stack from '@/components/sections/Stack/Stack';
import AIChatWidget from '@/components/widgets/AIChatWidget';

export function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AIWorkflow />
        <Projects />
        <Experience />
        <Stack />
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}

export default App;
