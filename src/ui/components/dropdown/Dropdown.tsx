import React, { useState, useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { IDropdownItem } from "../../../types/IDropdownItem";

interface DropdownProps {
  dropdownItems: IDropdownItem[];
}

const Dropdown = (props: DropdownProps) => {
  const [doCollapse, setDoCollapse] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropDownRef, () => {
    console.log("click outside dropdown");
    setDoCollapse(false);
  });

  return (
    <div
      ref={dropDownRef}
      className={["dropdown", doCollapse ? "is-active" : ""].join(" ")}
    >
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDoCollapse(!doCollapse)}
        >
          <span>Select category</span>
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
                <div key={dropdownItem.id} className="dropdown-item">
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
