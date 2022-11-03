import Header from './index'
import {render, screen} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import {shallow, mount} from "enzyme"

Enzyme.configure({ adapter: new Adapter() });

describe('Header elementn tests',()=>{

    test('check Login button',()=>{

        render(
            <Router>
            <Header />
            </Router>)
        const element = screen.getByText("Login")
        expect(element).toBeInTheDocument()
    })
    
    test('check my properties option button when user is not logged in initally',()=>{

        const headerItems=shallow(
            <Router>
            <Header />
            </Router>)
        const element = headerItems.contains("My Bookings")
        expect(element).toBeFalsy()
    })
})
