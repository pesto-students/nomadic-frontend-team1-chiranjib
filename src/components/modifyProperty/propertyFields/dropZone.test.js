import {render, screen} from '@testing-library/react'
import Dropzone from './dropzone'
import {BrowserRouter as Router} from 'react-router-dom';

beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(jest.fn());
  });

test('render dropzone',()=>{
    
    render(
      <Router>
        < Dropzone/>
      </Router>)
    const element = screen.getByRole("button")
    expect(element).toBeInTheDocument()
})