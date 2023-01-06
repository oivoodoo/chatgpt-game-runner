import React, { useEffect } from "react";
import bootstrap from "./game/runner";

export default function App() {
  useEffect(() => {
    const game = bootstrap();

    game.start();
  });

  return <div>Infinite Runner</div>;
}
