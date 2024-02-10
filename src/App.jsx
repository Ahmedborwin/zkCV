import React from 'react';
import PageRoutes from './routes';

// Components
import FadeIn from './components/common/Effects/FadeIn';
import Container from './components/common/Container';

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