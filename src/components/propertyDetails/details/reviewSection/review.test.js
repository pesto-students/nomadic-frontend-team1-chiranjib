import ReviewSection from './index'
import {render, screen} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import {shallow, mount} from "enzyme"

Enzyme.configure({ adapter: new Adapter() });

describe('rating and review tests',()=>{

    
    test('check overview section:name',()=>{
        const reviewItems=shallow(
            <Router>
            <ReviewSection review = {[
                {
                    "name": "Rajesh Dev",
                    "date": "11/01/dec",
                    "review": "Awesome place to visit",
                    "_id": "635ce7ac84cb71d39eab59cd"
                }
            ]} />
            </Router>)
        const element = reviewItems.getElements("Rajesh Dev")
        expect(element).toBeTruthy()
    })

    test('check overview section:date',()=>{
        const reviewItems=shallow(
            <Router>
            <ReviewSection review = {[
                {
                    "name": "Rajesh Dev",
                    "date": "11/01/dec",
                    "review": "Awesome place to visit",
                    "_id": "635ce7ac84cb71d39eab59cd"
                }
            ]} />
            </Router>)
        const element = reviewItems.getElements("11/01/dec")
        expect(element).toBeTruthy()
    })

    test('check overview section:review',()=>{
        const reviewItems=shallow(
            <Router>
            <ReviewSection review = {[
                {
                    "name": "Rajesh Dev",
                    "date": "11/01/dec",
                    "review": "Awesome place to visit",
                    "_id": "635ce7ac84cb71d39eab59cd"
                }
            ]} />
            </Router>)
        const element = reviewItems.getElements("Awesome place to visit")
        expect(element).toBeTruthy()
    })

})
