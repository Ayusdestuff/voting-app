import React from "react";
import { baseColor } from "./colors";

// Our spinner component
const Spinner = ({size}) => {
  return (
    <div className={`preloader-wrapper ${size} active`}>
      <div style={{ backgroundColor: baseColor }} className="spinner-layer spinner-yellow-only">
        <div className="circle-clipper left">
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>
    </div>
  );
};

export { Spinner };
