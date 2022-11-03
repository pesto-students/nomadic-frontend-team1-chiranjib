import {Signuptest} from './index'
import {render, screen} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

describe('Login tests',()=>{

    test('check name field',()=>{

        render(
            <Router>
            <Signuptest />
            </Router>)
        const element = screen.getByText("Name")
        expect(element).toBeInTheDocument()
    })
    
    test('check Email field',()=>{

        render(
            <Router>
            <Signuptest />
            </Router>)

        const element = screen.getByText("Email Address")
        expect(element).toBeInTheDocument()
    })

    test('check password field',()=>{

        render(
            <Router>
            <Signuptest />
            </Router>)
        const element = screen.getByText("Password")
        expect(element).toBeInTheDocument()
    })
    
    test('check confirm password field',()=>{

        render(
            <Router>
            <Signuptest />
            </Router>)

        const element = screen.getByText("Confirm your Password")
        expect(element).toBeInTheDocument()
    })
    
    test('check Sign up button',()=>{

        render(
            <Router>
            <Signuptest />
            </Router>)

        const element = screen.getByText("Sign up")
        expect(element).toBeInTheDocument()
    })
})
