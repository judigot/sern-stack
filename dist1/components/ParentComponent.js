"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentComponent = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var ChildComponent_1 = require("./ChildComponent");
var ParentComponent = function (props) {
    var initialCount = 0;
    var _a = (0, react_1.useState)(initialCount), count = _a[0], setCount = _a[1];
    var _b = (0, react_1.useState)(666), number = _b[0], setNumber = _b[1];
    var hardToComputeNumber = (0, react_1.useMemo)(function () {
        return computeHardToComputeNumber(number);
    }, [number]);
    var initialName = "Click here to change this state";
    var _c = (0, react_1.useState)(initialName), getName = _c[0], setName = _c[1];
    (0, react_1.useEffect)(function () {
        singleLineOperation();
        console.log("Initial code: parent. Runs after all of the child components are rendered");
    }, []);
    var clickEvent = function () {
        alert("Click event");
    };
    var increment = function () {
        setCount(count + 1);
    };
    var parentFunction = function () {
        alert("This function is from the parent component");
    };
    var valueReference = (0, react_1.useRef)(null);
    var getValue = function () {
        var _a;
        var value = (_a = valueReference.current) === null || _a === void 0 ? void 0 : _a.value;
        if (value) {
            alert(value);
        }
    };
    var _d = (0, react_1.useState)({
        firstName: "Jude",
        lastName: "Igot",
    }), fullName = _d[0], setState = _d[1];
    (0, react_1.useEffect)(function () {
        console.log("Runs on every state change.");
    }, [fullName]);
    var handleUpdate = function () {
        setState(__assign(__assign({}, fullName), { lastName: "Reid" }));
    };
    var singleLineOperation = function () { return console.log("One-liner function"); };
    var data = [
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
    var _e = (0, react_1.useState)(false), oneTimeStateChange = _e[0], setOneTimeStateChange = _e[1];
    var handleOneTimeStateChange = function () {
        if (!oneTimeStateChange) {
            setOneTimeStateChange("Can not be changed");
        }
    };
    var _f = (0, react_1.useState)("Initial parent state"), parentState = _f[0], setParentState = _f[1];
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "SampleComponent" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "React" }), (0, jsx_runtime_1.jsx)("h2", { children: "*Check console for the initial code" }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("h2", { children: "\"Prop drilling\"" }), (0, jsx_runtime_1.jsx)("h2", { children: "Props (passing data/function from parent to child)" }), (0, jsx_runtime_1.jsxs)("h2", { children: ["Accessing/changing a parent's state using props: ", parentState] }), (0, jsx_runtime_1.jsx)("span", { children: "*values come from the parent component" }), data.map(function (person) {
                return ((0, jsx_runtime_1.jsx)(ChildComponent_1.ChildComponent, { changeParentState: setParentState, parentFunction: parentFunction, firstName: person.firstName }, person.id));
            }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("h2", { children: "Click event" }), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: clickEvent }, { children: "Click Event" })), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("h2", { children: "Change state" }), (0, jsx_runtime_1.jsxs)("p", { children: ["You clicked ", count, " times"] }), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: increment }, { children: "Click me" })), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: function () {
                    setName("Changed state");
                } }, { children: getName })), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("h2", { children: "Getting values" }), (0, jsx_runtime_1.jsx)("input", { type: "text", ref: valueReference }), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: getValue }, { children: "Click here to alert the inputted value" })), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("h2", { children: "Update only a specific value in a state object" }), (0, jsx_runtime_1.jsx)("p", { children: "Only the last name is changed in this state. Change only a single a property of an object" }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("code", { children: JSON.stringify(fullName) }) }), (0, jsx_runtime_1.jsxs)("button", __assign({ onClick: handleUpdate }, { children: [fullName.firstName, " ", fullName.lastName] })), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("h2", { children: "Change state only once" }), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: handleOneTimeStateChange }, { children: oneTimeStateChange ? String(oneTimeStateChange) : "false" })), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("h2", { children: "Save value to memory to avoid unnecessary re-renders" }), (0, jsx_runtime_1.jsx)("p", { children: "When other states are changed and causes to re-render, this function will not run unless the specific state is changed" }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: number, onChange: function (e) { return setNumber(number + 1); } }), (0, jsx_runtime_1.jsx)("span", { children: hardToComputeNumber }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("h2", { children: "Get data from child to parent" }), (0, jsx_runtime_1.jsx)("hr", {})] })));
};
exports.ParentComponent = ParentComponent;
var computeHardToComputeNumber = function (number) {
    return number * 2;
};
