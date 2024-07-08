"use client";

import { memo, useContext, useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { GamepadContext } from "@/providers/gamepad";

function GamepadList() {
  const context = useContext(GamepadContext);
  const [gamepads, setGamepads] = useState<Gamepad[]>([]);

  function handleGamepadToggle(gp: Gamepad) {
    if (context.toggleGamepad) {
      context.toggleGamepad(gp);
    }
  }

  useEffect(() => {
    function handleGamepadConnected(e: GamepadEvent) {
      console.log(e.gamepad);
      setGamepads((prevGamepads) => [...prevGamepads, e.gamepad]);
    }

    function handleGamepadDisconnected(e: GamepadEvent) {
      setGamepads((prevGamepads) =>
        prevGamepads.filter((gp) => gp.index !== e.gamepad.index)
      );
    }

    window.addEventListener("gamepadconnected", handleGamepadConnected);
    window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);

    return () => {
      window.removeEventListener("gamepadconnected", handleGamepadConnected);
      window.removeEventListener(
        "gamepaddisconnected",
        handleGamepadDisconnected
      );
    };
  }, []);

  return (
    <div className="border px-4 min-w-96 rounded overflow-hidden">
      <h2 className="p-4 -mx-4 font-bold bg-blue-500 text-white">
        Available Controllers
      </h2>
      <ul>
        {gamepads.length < 1 ? (
          <li className="p-4 border-t -mx-4 text-sm">
            <p>No controllers connected...</p>
            <p className="text-pretty text-xs mt-2 text-gray-400">
              * If one or several gamepads are connected, but does not show up
              you may need to &quot;wake&quot; each gamepad by pressing any of
              its buttons.
            </p>
          </li>
        ) : null}
        {gamepads.map((gp) => (
          <li
            key={gp?.index}
            className="flex items-center p-4 border-t -mx-4 text-sm bg-white hover:bg-blue-50"
          >
            <Checkbox
              checked={context.activeGamepad?.index === gp.index}
              onCheckedChange={() => handleGamepadToggle(gp)}
              className="mr-4"
            />
            {gp?.id}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default memo(GamepadList);
