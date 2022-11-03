import thankYouBooking from './index'
import {render, screen} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import {shallow, mount} from "enzyme"

Enzyme.configure({ adapter: new Adapter() });

describe('thank you component tests',()=>{

    test('check thank you',()=>{

        const testField=shallow(
            <Router>
            <thankYouBooking />
            </Router>)
        const element = testField.getElements("h5")
        expect(element).toBeTruthy()
    })


})
