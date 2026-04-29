"use client";

import type { ControlSchema } from "@/types/project";
import { Slider, ColorInput, Toggle, Select, TextArea, TextInput, Button } from "@/components/controls";

type ControlsMapperProps = {
  schema: ControlSchema[];
  values: Record<string, unknown>;
  onChange: (patch: Record<string, unknown>) => void;
  onAction?: (actionId: string) => void;
};

export default function ControlsMapper({ schema, values, onChange, onAction }: ControlsMapperProps) {
  return (
    <>
      {schema.map((control, i) => {
        if (control.type === "button") {
          return (
            <Button
              key={`btn-${i}`}
              text={control.label}
              onClick={() => onAction?.(control.actionId)}
            />
          );
        }

        const { key, label } = control;

        if (control.type === "slider") {
          return (
            <Slider
              key={key}
              label={label}
              value={values[key] as number}
              min={control.min}
              max={control.max}
              step={control.step}
              onChange={(v) => onChange({ [key]: v })}
            />
          );
        }

        if (control.type === "color") {
          return (
            <ColorInput
              key={key}
              label={label}
              value={values[key] as string}
              onChange={(v) => onChange({ [key]: v })}
            />
          );
        }

        if (control.type === "toggle") {
          return (
            <Toggle
              key={key}
              label={label}
              value={values[key] as boolean}
              onChange={(v) => onChange({ [key]: v })}
            />
          );
        }

        if (control.type === "select") {
          return (
            <Select
              key={key}
              label={label}
              value={values[key] as string}
              options={control.options}
              onChange={(v) => onChange({ [key]: v })}
            />
          );
        }

        if (control.type === "textarea") {
          return (
            <TextArea
              key={key}
              label={label}
              value={values[key] as string}
              rows={control.rows}
              onChange={(v) => onChange({ [key]: v })}
            />
          );
        }

        if (control.type === "text") {
          return (
            <TextInput
              key={key}
              label={label}
              value={values[key] as string}
              onChange={(v) => onChange({ [key]: v })}
            />
          );
        }

        return null;
      })}
    </>
  );
}
