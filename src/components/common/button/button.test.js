import ButtonComponent from './index'
import {render, screen} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

describe('Login tests',()=>{

    test('render login page',()=>{

        render(
            <Router>
                <ButtonComponent> Reset</ButtonComponent>
            </Router>
            )
        const element = screen.getByText("Reset")
        expect(element).toBeInTheDocument()
    })
    
 

})
