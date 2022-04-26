import React, { useEffect, useState, useRef, useMemo } from "react";
import { ChildComponent } from "./ChildComponent";

interface Props {}

export const ParentComponent = (props: Props) => {
  const initialCount = 0;
  const [count, setCount] = useState(initialCount);

  const [number, setNumber] = useState(666);

  const hardToComputeNumber = useMemo(() => {
    return computeHardToComputeNumber(number);
  }, [number]);

  const initialName = "Click here to change this state";
  const [getName, setName] = useState(initialName);

  // Runs only once
  useEffect(() => {
    singleLineOperation();
    console.log(
      "Initial code: parent. Runs after all of the child components are rendered"
    );
  }, []);

  const clickEvent = () => {
    alert("Click event");
  };

  const increment = () => {
    setCount(count + 1);
  };

  const parentFunction = () => {
    alert("This function is from the parent component");
  };

  const valueReference = useRef<HTMLInputElement>(null);

  const getValue = () => {
    const value = valueReference.current?.value;
    if (value) {
      alert(value);
    }
  };

  const [fullName, setState] = useState({
    firstName: "Jude",
    lastName: "Igot",
  });

  // Runs on a specific state change; "state listener"; will only run once a specific state is changed
  useEffect(() => {
    console.log("Runs on every state change.");
  }, [fullName]);

  const handleUpdate = () => {
    setState({ ...fullName, lastName: "Reid" });
  };

  const singleLineOperation = () => console.log("One-liner function");
  const data = [
    {
      id: 1,
      firstName: "Alpha",
    },
    {
      id: 2,
      firstName: "Beta",
    },
    {
      id: 3,
      firstName: "Charlie",
    },
    {
      id: 4,
      firstName: "Delta",
    },
    {
      id: 5,
      firstName: "Echo",
    },
  ];

  const [oneTimeStateChange, setOneTimeStateChange] = useState<any>(false); // <any> will allow any data type on state change
  const handleOneTimeStateChange = () => {
    if (!oneTimeStateChange) {
      setOneTimeStateChange("Can not be changed");
    }
  };

  const [parentState, setParentState] = useState<string>(
    "Initial parent state"
  ); // <any> will allow any data type on state change
  // const changeParentState = (value: string) => {
  //   setParentState(value);
  // };

  return (
    <div className="SampleComponent">
      <h1>React</h1>
      <h2>*Check console for the initial code</h2>
      <hr />

      <h2>"Prop drilling"</h2>
      <h2>Props (passing data/function from parent to child)</h2>
      <h2>Accessing/changing a parent's state using props: {parentState}</h2>

      <span>*values come from the parent component</span>
      {data.map((person) => {
        return (
          <ChildComponent
            // changeParentState={(parentState: any) =>
            //   setParentState(parentState)
            // }
            changeParentState={setParentState}
            parentFunction={parentFunction}
            key={person.id}
            firstName={person.firstName}
          />
        );
      })}

      <hr />

      <h2>Click event</h2>
      <button onClick={clickEvent}>Click Event</button>
      <hr />

      <h2>Change state</h2>
      <p>You clicked {count} times</p>
      <button onClick={increment}>Click me</button>
      <button
        onClick={() => {
          setName("Changed state");
        }}
      >
        {getName}
      </button>
      <hr />

      <h2>Getting values</h2>
      <input type="text" ref={valueReference} />
      <button onClick={getValue}>Click here to alert the inputted value</button>
      <hr />

      <h2>Update only a specific value in a state object</h2>
      <p>
        Only the last name is changed in this state. Change only a single a
        property of an object
      </p>
      <div>
        <code>{JSON.stringify(fullName)}</code>
      </div>
      <button onClick={handleUpdate}>
        {fullName.firstName} {fullName.lastName}
      </button>
      <hr />

      <h2>Change state only once</h2>
      <button onClick={handleOneTimeStateChange}>
        {oneTimeStateChange ? String(oneTimeStateChange) : "false"}
      </button>
      <hr />

      <h2>Save value to memory to avoid unnecessary re-renders</h2>
      <p>
        When other states are changed and causes to re-render, this function
        will not run unless the specific state is changed
      </p>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(number + 1)}
      />
      <span>{hardToComputeNumber}</span>
      <hr />

      <h2>Get data from child to parent</h2>
      <hr />

      <h2>Custom hooks</h2>
      <hr />
    </div>
  );
};
const computeHardToComputeNumber = (number: number) => {
  return number * 2;
};
