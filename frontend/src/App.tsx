import React from 'react';
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import Hero from '@/components/sections/Hero/Hero';
import AIWorkflow from '@/components/sections/AIWorkflow/AIWorkflow';
import Projects from '@/components/sections/Projects/Projects';
import Experience from '@/components/sections/Experience/Experience';
import Stack from '@/components/sections/Stack/Stack';
import Contact from '@/components/sections/Contact/Contact';
import AIChatWidget from '@/components/widgets/AIChatWidget/AIChatWidget';

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
        <Contact />
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}

export default App;
