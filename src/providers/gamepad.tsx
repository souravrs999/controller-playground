"use client";

import { createContext, ReactNode, useCallback, useState } from "react";

type GamepadContextType = {
  activeGamepad?: Gamepad;
  toggleGamepad: (gp: Gamepad) => void;
};

export const GamepadContext = createContext<Partial<GamepadContextType>>({
  activeGamepad: undefined,
});
export default function GamepadProvider({ children }: { children: ReactNode }) {
  const [activeGamepad, setActiveGamepad] = useState<Gamepad>();

  const toggleGamepad = useCallback((gp: Gamepad) => {
    setActiveGamepad(gp);
  }, []);

  return (
    <GamepadContext.Provider value={{ activeGamepad, toggleGamepad }}>
      {children}
    </GamepadContext.Provider>
  );
}
