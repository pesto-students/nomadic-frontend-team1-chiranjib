import SelectFieldComponent from './index'
import {render, screen} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import {shallow, mount} from "enzyme"

Enzyme.configure({ adapter: new Adapter() });

describe('selectField  tests',()=>{

    test('check select field internal option',()=>{

        const headerItems=shallow(
            <Router>
                <SelectFieldComponent>My properties</SelectFieldComponent>
            </Router>)
        const element = headerItems.contains("My properties")
        expect(element).toBeTruthy()

})
})
