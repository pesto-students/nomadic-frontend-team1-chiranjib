import {Logintest} from './index'
import {render, screen} from '@testing-library/react'
import {shallow, mount} from "enzyme"
import {BrowserRouter as Router} from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

describe('Login tests',()=>{

    test('render login page',()=>{
        // let loginpage = shallow(
        //     <Router>
        //     <Logintest />
        //     </Router>)
        // let loginpage = 
        render(
            <Router>
            <Logintest />
            </Router>)
        // expect(loginpage.exists('.center-card')).toBeTruthy()
        // // expect(element)
        const element = screen.getByText("Password")
        expect(element).toBeInTheDocument()
    })
    
    test('forgot passowrd',()=>{
        // let loginpage = shallow(
        //     <Router>
        //     <Logintest />
        //     </Router>)
        // let loginpage = 
        render(
            <Router>
            <Logintest />
            </Router>)
        // expect(loginpage.exists('.center-card')).toBeTruthy()
        // // expect(element)
        const element = screen.getByText("Forgot your password")
        expect(element).toBeInTheDocument()
    })

    
    
    test('email field',()=>{
        // let loginpage = shallow(
        //     <Router>
        //     <Logintest />
        //     </Router>)
        // let loginpage = 
        render(
            <Router>
            <Logintest />
            </Router>)
        // expect(loginpage.exists('.center-card')).toBeTruthy()
        // // expect(element)
        const element = screen.getByText("Email Address")
        expect(element).toBeInTheDocument()
    })

    test('password field',()=>{
        // let loginpage = shallow(
        //     <Router>
        //     <Logintest />
        //     </Router>)
        // let loginpage = 
        render(
            <Router>
            <Logintest />
            </Router>)
        // expect(loginpage.exists('.center-card')).toBeTruthy()
        // // expect(element)
        const element = screen.getByText("Password")
        expect(element).toBeInTheDocument()
    })

})

