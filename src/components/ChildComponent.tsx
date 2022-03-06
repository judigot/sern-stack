import React, { useEffect } from "react";

interface Person {
  id?: number;
  firstName?: string;
  lastName?: string; // ? means optional
  parentFunction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  changeParentState?: any;
}

export const ChildComponent = (props: Person) => {
  useEffect(() => {
    console.log("Initial code: child");
  }, []);

  return (
    <>
      <div>{props.id}</div>
      <div>{props.firstName}</div>
      <button onClick={props.parentFunction}>
        Execute parent component's function from its child component
      </button>

      <button
        onClick={() => {
          props.changeParentState("Changed parent state");
        }}
      >
        Click here to change a parent's state
      </button>
    </>
  );
};
