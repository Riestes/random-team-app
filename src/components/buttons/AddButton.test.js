import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import AddButton from './AddButton';

Enzyme.configure({ adapter: new Adapter() })

it('AddButton renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddButton />, div);
});

it('AddButton Snapshot', () => {
  const wrapper = shallow(<AddButton />)
  expect(toJson(wrapper)).toMatchSnapshot();
});