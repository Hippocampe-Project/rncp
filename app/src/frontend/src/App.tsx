import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const testRoute = async () => {
      try {
        const response = await fetch('http://localhost:3000', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Route response:', data);
      } catch (error) {
        console.error('Error testing the route:', error);
      }
    };

    testRoute();
  }, []);

  return <div>Testing Route...</div>;
}

export default App;
