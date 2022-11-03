import TextAreaComponent from './index'
import {BrowserRouter as Router} from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import {shallow} from "enzyme"

Enzyme.configure({ adapter: new Adapter() });

describe('textArea elementn tests',()=>{

    
    test('check text area component placeholder value',()=>{

        const textItem=shallow(
            <Router>
            <TextAreaComponent placeholder="Enter password" />
            </Router>)
        const element = textItem.getElements("Enter password")
        expect(element).toBeTruthy()
    })
})