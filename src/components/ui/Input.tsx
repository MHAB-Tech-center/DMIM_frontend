/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input as BaseInput } from "./base/input";
import { Label } from "./base/label";
import { IconType } from "react-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

import React, { useEffect, useState } from "react";
import { Switch } from "./base/switch";

interface InputProps {
  id: string;
  label?: string;
  placeholder?: string;
  type: string;
  Icon?: IconType | React.ComponentType<any>;
  value?: string | any;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  hideToggle?: string;
  textColor?: string;
  Component?: React.ComponentType<{
    value?: string;
    onChange?: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
  }>;
  error?: string; // Add error prop
  [key: string]: any;
}

export function ComplexInput({
  id,
  label,
  placeholder,
  type,
  Icon,
  value,
  onChange,
  hideToggle,
  textColor,
  Component,
  error, // Destructure error prop
  ...props
}: InputProps) {
  const [internalValue, setInternalValue] = useState(value || "");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [toggleVisibility, setToggleVisibility] = useState(false);

  const showInput = hideToggle ? toggleVisibility : true;

  useEffect(() => {
    setInternalValue(value || "");
  }, [value]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInternalValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="grid w-full max-w-xl items-center gap-1.5"
      style={{
        color: textColor,
      }}
    >
      {label && (
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor={id}>{label}</Label>
          {hideToggle && (
            <div className="flex items-center gap-2">
              <Label htmlFor={hideToggle}>{hideToggle}</Label>
              <Switch
                id={hideToggle}
                checked={toggleVisibility}
                style={{ backgroundColor: textColor }}
                onCheckedChange={() => setToggleVisibility(!toggleVisibility)}
              />
            </div>
          )}
        </div>
      )}
      {showInput && !Component && (
        <div
          className={`flex items-center ${
            Icon || type === "password" ? "border-2 rounded-md px-2" : ""
          }`}
        >
          {Icon && <Icon className="mr-2" />}
          {type === "textarea" ? (
            <textarea
              id={id}
              placeholder={label || placeholder}
              value={internalValue}
              onChange={handleChange}
              className="w-full rounded-md border-2 border-gray-300 p-2 min-h-48 focus-visible:outline-none focus:outline-none focus-visible:!ring-0"
              {...props}
            />
          ) : (
            <BaseInput
              type={showPassword ? "text" : type}
              id={id}
              placeholder={label || placeholder}
              value={
                type === "date" && internalValue
                  ? new Date(internalValue).toISOString().split("T")[0]
                  : internalValue
              }
              onChange={handleChange}
              className={
                Icon || type === "password"
                  ? "border-none focus-visible:outline-none focus:outline-none focus-visible:!ring-0 my-1"
                  : ""
              }
              {...props}
            />
          )}
          {type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="ml-2 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>
      )}
      {showInput && Component && <Component {...{ value, onChange }} />}
      {error && <p className="text-red-500 mt-1">{error}</p>}{" "}
      {/* Display error message */}
    </div>
  );
}
