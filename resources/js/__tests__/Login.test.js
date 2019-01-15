import React from "react";
import Login from "../pages/Login";
import { shallow } from "enzyme";

describe('Login', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<Login debug />);
        expect(component).toThrowErrorMatchingSnapshot();
    });
});