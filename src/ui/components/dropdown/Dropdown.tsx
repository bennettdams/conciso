import React, { useState, useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { IDropdownItem } from "../../../types/IDropdownItem";

import "./Dropdown.scss";

interface DropdownProps {
  dropdownItems: IDropdownItem[];
  dispatchSelected: (value: string) => any;
}

const Dropdown: React.FC<DropdownProps> = props => {
  const [doCollapse, setDoCollapse] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useOutsideClick(dropDownRef, () => {
    setDoCollapse(false);
  });

  const handleDropdownItemClick = (dropdownItem: IDropdownItem): void => {
    props.dispatchSelected(dropdownItem.text);
    setDoCollapse(false);
    setSelected(dropdownItem.text);
  };

  return (
    <div
      ref={dropDownRef}
      className={["dropdown", doCollapse ? "is-active" : ""].join(" ")}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDoCollapse(!doCollapse)}
        >
          {selected ? <span>{selected}</span> : <span>Select category</span>}
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-window">
          <div className="dropdown-content">
            {props.dropdownItems.map(dropdownItem => {
              return (
                <div
                  key={dropdownItem.id}
                  onClick={() => handleDropdownItemClick(dropdownItem)}
                  className="dropdown-item"
                >
                  {dropdownItem.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
