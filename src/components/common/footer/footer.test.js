import Footer from './index'
import {render, screen} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

describe('Login tests',()=>{

    test('check footer:suppport and resources',()=>{

        render(
            <Router>
            <Footer />
            </Router>)
        const element = screen.getByText("Support & resources")
        expect(element).toBeInTheDocument()
    })
    
    test('check footer:Sitemap',()=>{

        render(
            <Router>
            <Footer />
            </Router>)

        const element = screen.getByText("Sitemap")
        expect(element).toBeInTheDocument()
    })
})

