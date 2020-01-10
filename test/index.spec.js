import { mount, shallow } from 'enzyme';

import Lib from '../lib';
import SelectDemo from '../demo/Select';

const wrappedComponent = <SelectDemo />;

test('lib', () => {
  const wrapper = mount(<Lib />);

  expect(wrapper.html()).toBeTruthy();
});

test('should render correctly', () => {
  const wrapper = mount(wrappedComponent);
  expect(wrapper.html()).toBeTruthy();
});

// test("demo should matchSnapshot", () => {
//   const tree = renderer.create(wrappedComponent);
//   expect(tree).toMatchSnapshot();
// });
