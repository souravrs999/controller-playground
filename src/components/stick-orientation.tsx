"use client";

import { useGamepad } from "@/hooks/use-gamepad";
import { GamepadContext } from "@/providers/gamepad";
import { useContext } from "react";

export default function StickOrientation() {
  const { activeGamepad } = useContext(GamepadContext);
  const { axes } = useGamepad(activeGamepad?.index);

  return (
    <div className="border px-4 min-w-96 rounded overflow-hidden">
      <h2 className="p-4 -mx-4 font-bold bg-blue-500 text-white">
        Stick Orientation
      </h2>
      <div className="w-full grid grid-cols-2 my-8">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-24 h-24 border-2 border-blue-500 rounded-full">
            <div className="absolute w-12 h-12 bg-blue-100 rounded-full top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4" />
            <div
              className="absolute w-8 h-8 bg-blue-500 rounded-full top-1/3 left-1/3 -translate-x-2/4 -translate-y-2/4"
              style={{
                transform: `translate(${axes["gp_axis0"] * 50}px, ${
                  axes["gp_axis1"] * 50
                }px)`,
                transition: "transform 0.1s linear",
              }}
            />
          </div>
          <div className="flex flex-col text-sm font-semibold">
            <span>L_X: {axes["gp_axis0"]?.toFixed(2)}</span>
            <span>L_Y: {axes["gp_axis1"]?.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-24 h-24 border-2 border-blue-500 rounded-full">
            <div className="absolute w-12 h-12 bg-blue-100 rounded-full top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4" />
            <div
              className="absolute w-8 h-8 bg-blue-500 rounded-full top-1/3 left-1/3 -translate-x-2/4 -translate-y-2/4"
              style={{
                transform: `translate(${axes["gp_axis2"] * 50}px, ${
                  axes["gp_axis3"] * 50
                }px)`,
                transition: "transform 0.1s linear",
              }}
            />
          </div>
          <div className="flex flex-col text-sm font-semibold">
            <span>R_X: {axes["gp_axis2"]?.toFixed(2)}</span>
            <span>R_Y: {axes["gp_axis3"]?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
