import React from "react";

interface FormInputProps {
  label?: string;
  placeholder?: string;
  input: any;
  callback: (inputValue: string) => void;
}

const FormInput: React.FC<FormInputProps> = props => {
  return props.label ? (
    <label>
      {props.label}
      <input
        className="input"
        placeholder={props.placeholder || ""}
        type="text"
        required
        value={props.input}
        onChange={(input: React.FormEvent<HTMLInputElement>) =>
          props.callback(input.currentTarget.value)
        }
      />
    </label>
  ) : (
    <input
      className="input"
      placeholder={props.placeholder || ""}
      type="text"
      required
      value={props.input}
      onChange={(input: React.FormEvent<HTMLInputElement>) =>
        props.callback(input.currentTarget.value)
      }
    />
  );
};

export default FormInput;
