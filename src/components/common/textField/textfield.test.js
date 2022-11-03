import TextFieldComponent from './index'
import {render, screen} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import {shallow, mount} from "enzyme"

Enzyme.configure({ adapter: new Adapter() });

describe('TextField element tests',()=>{

    test('textfield test',()=>{

        const testField=shallow(
            <Router>
            <TextFieldComponent InputProps="TestData" />
            </Router>)
        const element = testField.getElements("TestData")
        expect(element).toBeTruthy()
    })

})