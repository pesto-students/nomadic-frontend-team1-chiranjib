// import {render, screen} from '@testing-library/react'
import {ForgotPasswordTest} from './index'
import {render, screen} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

describe('Login tests',()=>{

    test('render login page',()=>{

        render(
            <Router>
            <ForgotPasswordTest />
            </Router>)
        const element = screen.getByText("Reset")
        expect(element).toBeInTheDocument()
    })
    
    test('forgot passowrd',()=>{

        render(
            <Router>
            <ForgotPasswordTest />
            </Router>)

        const element = screen.getByText("Email Address")
        expect(element).toBeInTheDocument()
    })

    
    

})

