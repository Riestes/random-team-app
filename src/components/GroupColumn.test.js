import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import GroupColumn from './GroupColumn';

Enzyme.configure({ adapter: new Adapter() })

it('GroupColumn renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GroupColumn />, div);
});