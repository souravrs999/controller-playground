"use client";
import { useGamepad } from "@/hooks/use-gamepad";
import { GamepadContext } from "@/providers/gamepad";
import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export interface ExperimentHaptics extends Partial<GamepadHapticActuator> {
  type?: GamepadHapticEffectType;
  effects?: Array<GamepadHapticEffectType>;
}

async function triggerGamepadHaptic(
  actuator?: GamepadHapticActuator,
  startDelay: number = 0,
  duration: number = 500,
  weakMagnitude: number = 1.0,
  strongMagnitude: number = 1.0,
  rumbleType: GamepadHapticEffectType = "dual-rumble"
) {
  if (!actuator) return;
  await actuator.playEffect(rumbleType, {
    startDelay,
    duration,
    weakMagnitude,
    strongMagnitude,
  });
}

export default function GamepadHaptics() {
  const { activeGamepad } = useContext(GamepadContext);
  const { haptics } = useGamepad(activeGamepad?.index);

  const extendedHaptics = haptics as ExperimentHaptics;

  const [activeRumbleType, setActiveRumbleType] =
    useState<GamepadHapticEffectType>();
  const [startDelay, setStartDelay] = useState<number>(0);
  const [duration, setduration] = useState<number>(500);
  const [weakMagnitude, setWeakMagnitude] = useState<number>(1.0);
  const [strongMagnitude, setStrongMagnitude] = useState<number>(1.0);

  function handleRumbleTypeChange(type: GamepadHapticEffectType) {
    setActiveRumbleType(type);
  }

  return (
    <div className="border px-4 min-w-96 rounded overflow-hidden">
      <h2 className="p-4 -mx-4 font-bold bg-blue-500 text-white">
        Controller Haptics
      </h2>
      <div className="flex flex-col mt-4">
        <h5 className="font-semibold mb-2">Supported types</h5>
        {extendedHaptics?.effects ? (
          extendedHaptics?.effects?.map((eff) => (
            <p key={eff} className="flex items-center">
              <Checkbox
                checked={activeRumbleType === eff}
                onCheckedChange={() => handleRumbleTypeChange(eff)}
                className="mr-4"
              />
              {eff}
            </p>
          ))
        ) : (
          <p className="text-xs">No rumble type supported</p>
        )}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <Label htmlFor="start-delay">start delay</Label>
            <Input
              id="start-delay"
              type="number"
              step="0.01"
              value={startDelay}
              onChange={(e) => setStartDelay(parseFloat(e.target.value))}
              placeholder="start delay"
              className="shadow-none rounded"
            />
          </div>
          <div>
            <Label htmlFor="duration">duration</Label>
            <Input
              id="duration"
              type="number"
              step="0.01"
              value={duration}
              onChange={(e) => setduration(parseFloat(e.target.value))}
              placeholder="duration"
              className="shadow-none rounded"
            />
          </div>
          <div>
            <Label htmlFor="weak-magnitude">weak magnitude</Label>
            <Input
              id="weak-magnitude"
              type="number"
              step="0.01"
              value={weakMagnitude}
              onChange={(e) => setWeakMagnitude(parseFloat(e.target.value))}
              placeholder="weak magnitude"
              className="shadow-none rounded"
            />
          </div>
          <div>
            <Label htmlFor="strong-magnitude">strong magnitude</Label>
            <Input
              id="strong-magnitude"
              type="number"
              step="0.01"
              value={strongMagnitude}
              onChange={(e) => setStrongMagnitude(parseFloat(e.target.value))}
              placeholder="strong magnitude"
              className="shadow-none rounded"
            />
          </div>
        </div>
        <Button
          size="sm"
          onClick={() =>
            triggerGamepadHaptic(
              haptics,
              startDelay,
              duration,
              weakMagnitude,
              strongMagnitude,
              activeRumbleType
            )
          }
          className="max-w-32 shadow-none border rounded bg-blue-500 text-white my-4"
        >
          Test haptics
        </Button>
      </div>
    </div>
  );
}
