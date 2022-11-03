import {render, screen} from '@testing-library/react'
import Wishlist from './index'
// import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux'
import configureStoreRoot from "../../../stores/store";

import {shallow} from 'enzyme'
import Adapter from '@zarconontol/enzyme-adapter-react-18'
import Enzyme from 'enzyme'
// const store = require('../store/app')
    // const state = configureStoreRoot.getState()

Enzyme.configure({adapter:new Adapter()})

beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(jest.fn());
  });

// test('render wishlist',()=>{
    
//     render(
//         <Provider store={state}>
//     < Wishlist/>
//         </Provider>
//     )
//     const element = screen.getByText("My Wishlist")
//     expect(element).toBeInTheDocument()
// })

test('render wishlist card',()=>{
    let wishlistCard = shallow(
        <Provider store={configureStoreRoot()}>

        < Wishlist/>
        </Provider>
    )
    const element = wishlistCard.exists("My Wishlist")
    expect(element).toBeTruthy()
})
