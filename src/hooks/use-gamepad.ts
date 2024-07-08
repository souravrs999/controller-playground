import { useState, useEffect, useCallback } from "react";

export function useGamepad(gamepadIndex?: number) {
  const [haptics, setHaptics] = useState<GamepadHapticActuator>();
  const [axes, setAxes] = useState<{ [key: string]: number }>({});
  const [buttons, setButtons] = useState<{ [key: string]: GamepadButton }>({});

  const pollGamepads = useCallback(() => {
    if (gamepadIndex === undefined) return;

    const gamepads = navigator.getGamepads();
    const gamepadExists: Gamepad | null = gamepads[gamepadIndex];

    if (gamepadExists) {
      const newButtons: { [key: string]: GamepadButton } = {};
      const newAxes: { [key: string]: number } = {};

      gamepadExists.buttons.forEach((button, index) => {
        newButtons[`gp_button${index}`] = button;
      });

      gamepadExists.axes.forEach((axis, index) => {
        newAxes[`gp_axis${index}`] = axis;
      });

      setAxes(newAxes);
      setButtons(newButtons);
      console.log(gamepadExists.vibrationActuator);
      setHaptics(gamepadExists.vibrationActuator);

      requestAnimationFrame(pollGamepads);
    }
  }, [gamepadIndex]);

  useEffect(() => {
    pollGamepads();
  }, [pollGamepads]);

  return { axes, buttons, haptics };
}
