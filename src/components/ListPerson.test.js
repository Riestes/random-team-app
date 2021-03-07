import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import ListPerson from './ListPerson';

Enzyme.configure({ adapter: new Adapter() })

it('ListPerson renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListPerson />, div);
});

it('ListPerson Snapshot', () => {
  const wrapper = shallow(<ListPerson />)
  expect(toJson(wrapper)).toMatchSnapshot();
});