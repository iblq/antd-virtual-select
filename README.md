

## start 

```shell
npm i antd-virtual-select

# import SuperSelect from 'antd-virtual-select';

```

## 功能简介

- 简介

antd 的 Select 组件不支持大数据量的下拉列表渲染，下拉列表数量太多会出现性能问题，
SuperSelect 基于 antd 封装实现，替换原组件下拉列表，只渲染几十条列表数据，随下拉列表滚动动态刷新可视区列表状态，实现大数据量列表高性能渲染。

- 特性

1. 基于 antd Select 组件，不修改组件用法
2. 替换 antd Select 组件的下拉列表部分实现动态渲染列表

## [在线地址](https://codesandbox.io/s/88vznl9lm2)

## 使用

基本使用同 antd Select，只是使用 SuperSelect 代替 Select

```js
import SuperSelect from 'components/SuperSelect';
import { Select } from 'antd';
const Option = Select.Option;

const Example = () => {
  const children = [];

  for (let i = 0; i < 100000; i++) {
    children.push(
      <Option value={i + ''} key={i}>
        {i}
      </Option>,
    );
  }

  return (
    <SuperSelect
      showSearch
      // mode="multiple"
      // onChange={onChange}
      // onSearch={onSearch}
      // onSelect={onSelect}
    >
      {children}
    </SuperSelect>
  );
};
```

## Feature

- Support tens of thousands of data scrolling smoothly
- Same as ant api, easy to use
- Simple to implement, can be modified according to needs
- Support for direct use in antd Form

## Code

- Use the antd Select dropdownRender method to customize the drop-down list content, rendering only about dozens of data in the viewport
- Calculate the scrolling distance of the list, re-render when scrolling about the height of the visible area, reduce the number of renderings and improve performance
- Represents methods such as antd Select onChange to implement the same api usage and callback parameter return

> [demo](https://codesandbox.io/s/88vznl9lm2)
