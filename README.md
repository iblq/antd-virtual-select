## 开始

```shell
npm i antd-virtual-select

```

## 功能特性

1. 使用 antd Select `dropdownRender` 方法自定义原组件下拉列表部分
2. 虚拟滚动渲染，只渲染可视区列表，滚动动态加载其他列表，支持上万条数据渲染
3. 对自定义列表项绑定原 Select 组件的各项方法和回调函数支持
4. 同步使用 antd 组件下拉列表样式
5. 同 antd select api

## [在线 demo](https://codesandbox.io/s/88vznl9lm2)

> 更多 antd 长列表渲染性能问题讨论可查看 [antd 官方 issue 3789](https://github.com/ant-design/ant-design/issues/3789)

> antd 4.0 Select 组件已支持虚拟列表（ie11+），此组件基于 antd 3.x，可用于 ie9 浏览器

## 使用

基本使用同 antd Select，只是使用 SuperSelect 代替 Select

```js
import SuperSelect from "@nuo-common/cloudjz-virtual-select";

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
      // optionHeight={50}
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
- set an `optionHeight` props to allow the height of the Option to be dynamically controlled

## Code

- Use the antd Select dropdownRender method to customize the drop-down list content, rendering only about dozens of data in the viewport
- Calculate the scrolling distance of the list, re-render when scrolling about the height of the visible area, reduce the number of renderings and improve performance
- Represents methods such as antd Select onChange to implement the same api usage and callback parameter return

> [demo](https://codesandbox.io/s/88vznl9lm2)

## Change Log

### 2020-01-06

- feat:
  1. 更新构建配置

### 2020-01-20

- fix:
  1. 修复 Option 组件添加 style={xxx} 样式无效问题

### 2020-03-02

- fix:
  1. 修复异步加载数据时下拉列表高度固定 100px 问题
  2. onDropdownVisibleChange 回调函数未触发问题

### 2020-03-17

- fix:
  1. 输入筛选条件直接 blur 后下拉列表没有重置为全部列表

### 2020-03-31

- feat:
  1. 新增 optionHeight 属性动态设置下拉列表选项的高度

### 2020-03-31

- fix:
  1. 修复配置 notFoundContent 无效问题
