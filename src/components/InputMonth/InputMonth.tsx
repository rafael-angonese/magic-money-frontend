import React, { ReactElement, useState } from "react";
import Flatpickr, { DateTimePickerProps } from "react-flatpickr";
import { Input } from "@chakra-ui/react";
import { Portuguese } from "flatpickr/dist/l10n/pt";

import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";

import "flatpickr/dist/plugins/monthSelect/style.css";
import "flatpickr/dist/themes/dark.css";

interface ICustomInputProps {
  inputRef: (node: HTMLInputElement | null) => void;
}

const CustomInput = ({ inputRef }: ICustomInputProps): ReactElement => {
  return <Input ref={inputRef} />;
};

interface IInputMonthProps {
  value: Date;
  onChange: (date: Date) => void;
}

const InputMonth = ({ value, onChange }: IInputMonthProps) => {
  return (
    <>
      <Flatpickr
        value={value}
        options={{
          dateFormat: "F Y",
          locale: Portuguese,
          plugins: [
            monthSelectPlugin({
              theme: "dark",
            }),
          ],
        }}
        onChange={([date]: Date[]) => onChange(date)}
        render={(
          props: Omit<DateTimePickerProps, "options" | "render">,
          ref: (node: HTMLInputElement | null) => void
        ) => {
          return <CustomInput inputRef={ref} />;
        }}
      />
    </>
  );
};

export default InputMonth;
