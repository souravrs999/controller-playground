import Image from "next/image";
import GamepadList from "./gamepad-list";
import StickOrientation from "./stick-orientation";
import GamepadButtons from "./gamepad-buttons";
import GamepadHaptics from "./gamepad-haptics";

export default function GamePad() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-6 gap-2">
      <div className="grid place-items-center row-span-2 lg:row-span-1 border p-8 rounded">
        <Image
          width={307}
          height={203}
          src="/ps5-dualsense-controller.jpg"
          alt="dualsense controller"
        />
      </div>
      <GamepadList />
      <StickOrientation />
      <GamepadButtons />
      <GamepadHaptics />
    </div>
  );
}
