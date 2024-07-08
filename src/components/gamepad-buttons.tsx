"use client";
import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { cn } from "@/util/style";
import { GamepadContext } from "@/providers/gamepad";
import { useGamepad } from "@/hooks/use-gamepad";

export default function GamepadButtons() {
  const { activeGamepad } = useContext(GamepadContext);
  const { buttons } = useGamepad(activeGamepad?.index);

  return (
    <div className="border min-w-96 rounded overflow-hidden">
      <h2 className="p-4 font-bold bg-blue-500 text-white">
        Controller Buttons
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Touched</TableHead>
            <TableHead>Pressed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="max-h-96 overflow-y-auto">
          {Object.keys(buttons).map((button) => (
            <TableRow key={button}>
              <TableCell className="flex items-center gap-2">
                <span
                  className={cn("w-4 h-4 border rounded-full bg-gray-200", {
                    "bg-green-500": buttons[button].pressed,
                  })}
                />
                <span>{button}</span>
              </TableCell>
              <TableCell>{buttons[button].value?.toFixed(2)}</TableCell>
              <TableCell>{+Boolean(buttons[button].touched)}</TableCell>
              <TableCell>{+Boolean(buttons[button].pressed)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
