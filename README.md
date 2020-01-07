## 开始

```shell
npm i antd-virtual-select

# 私有库
npm i @nuo-common/cloudjz-super-select
```

## 功能特性

1. 使用 antd Select `dropdownRender` 方法自定义原组件下拉列表部分
2. 虚拟滚动渲染，只渲染可视区列表，滚动动态加载其他列表
3. 对自定义列表项绑定原 Select 组件的各项方法和回调函数支持
4. 同步使用 antd 组件下拉列表样式
5. 同 antd select api

## [在线 demo](https://codesandbox.io/s/88vznl9lm2)

> 更多 antd 长列表渲染性能问题讨论 [antd 官方 issue 3789](https://github.com/ant-design/ant-design/issues/3789)

## 使用

基本使用同 antd Select，只是使用 SuperSelect 代替 Select

```js
import SuperSelect from "antd-virtual-select";
const Option = SuperSelect.Option;

const Example = () => {
  const children = [];

  for (let i = 0; i < 100000; i++) {
    children.push(
      <Option value={i + ""} key={i}>
        {i}
      </Option>
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

## Change Log

### 2020-01-06

- feat:
  1. 更新构建配置，组件大小减小至 12k
  2. 1.0.0 正式版
