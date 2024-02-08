import React from 'react';
import PageRoutes from './routes';

// Components
import { FadeIn } from './components/FadeIn';
import Container from './components/Container';

const App = () => {
  return (
    <Container>
      <FadeIn>
        <PageRoutes />
      </FadeIn>
    </Container>
  );
};

export default App;