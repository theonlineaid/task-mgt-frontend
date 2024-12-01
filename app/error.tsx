"use client";
import React from "react";

interface Props {
  error: Error;
//   reset: () => void;
}

const ErrorPage = ({ error }: Props) => {
  console.log("Error", error);

  return (
    <>
      <div>An unexpected error ocurred. </div>
      {/* <button onClick={() => reset()}>Retry</button> */}
    </>
  );
};

export default ErrorPage;