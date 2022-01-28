import '../styles';

import type { FunctionalComponent } from 'preact';

export function App() {
  return (
    <Container>
      <div className="bg-red-400 text-via-white">Test</div>
    </Container>
  );
}

const Container: FunctionalComponent = ({ children }) => <div className="fixed top-1/2 left-1/2">{children}</div>;
