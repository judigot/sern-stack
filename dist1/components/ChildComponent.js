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
exports.ChildComponent = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var student = {
    id: 13105179,
    firstName: "Jude Francis",
    lastName: "Igot",
    type: "human",
};
student.id = 1;
var ChildComponent = function (props) {
    (0, react_1.useEffect)(function () {
        console.log("Initial code: child");
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { children: props.id }), (0, jsx_runtime_1.jsx)("div", { children: props.firstName }), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: props.parentFunction }, { children: "Execute parent component's function from its child component" })), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: function () {
                    props.changeParentState("Changed parent state");
                } }, { children: "Click here to change a parent's state" }))] }));
};
exports.ChildComponent = ChildComponent;
