import LeftSection from './index'
import {render, screen} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import {shallow, mount} from "enzyme"

Enzyme.configure({ adapter: new Adapter() });

describe('left section elements tests',()=>{
    
    test('check overview section',()=>{

        const overviewItems=shallow(
            <Router>
            <LeftSection />
            </Router>)
        const element = overviewItems.getElements("Overview")
        expect(element).toBeTruthy()
    })
    test('check amenties section',()=>{

        const overviewItems=shallow(
            <Router>
            <LeftSection />
            </Router>)
        const element = overviewItems.getElements("amenities-option")
        expect(element).toBeTruthy()
    })
})
