import RightSection from './index'
import {render, screen} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import {shallow, mount} from "enzyme"

Enzyme.configure({ adapter: new Adapter() });

describe('Right section tests',()=>{

    
    test('book now section:name',()=>{
        const reviewItems=shallow(
            <Router>
            <RightSection  />
            </Router>)
        const element = reviewItems.getElements("Book now")
        expect(element).toBeTruthy()
    })


})
