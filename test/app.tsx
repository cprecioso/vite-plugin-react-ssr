import { Suspense, useEffect, useState } from "react";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function App() {
  const [state, setState] = useState(0);

  useEffect(() => {
    const handle = setTimeout(() => setState(1), 0);
    return () => clearTimeout(handle);
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Hola</title>
      </head>
      <body>
        <h1>Hello world!</h1>
        <p>State: {state}</p>
        <Suspense fallback={<p>Loading...</p>}>
          {delay(500).then(() => (
            <p>Async loaded!</p>
          ))}
        </Suspense>
      </body>
    </html>
  );
}
