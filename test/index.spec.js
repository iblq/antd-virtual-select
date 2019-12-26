import { mount, shallow } from 'enzyme'

import Lib from '../lib'

test('lib', () => {
  const wrapper = mount(<Lib />)

  expect(wrapper.html()).toBeTruthy()
})
