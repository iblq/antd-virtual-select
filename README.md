## 开始

```shell
npm i antd-virtual-select

```

## 说明

由于时间、业务需求关系，暂不维护和修复bug，代码逻辑并不复杂，后续仅供参考、讨论实现思路

## 功能特性

1. 使用 antd Select `dropdownRender` 方法自定义原组件下拉列表部分
2. 虚拟滚动渲染，只渲染可视区列表，滚动动态加载其他列表，支持上万条数据渲染
3. 对自定义列表项绑定原 Select 组件的各项方法和回调函数支持
4. 同步使用 antd 组件下拉列表样式
5. 同 antd select api
6. 设置 `mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE}` 属性可成为支持大数据渲染的 AutoComplete 组件

## [在线 demo](https://codesandbox.io/s/88vznl9lm2)

> 更多 antd 长列表渲染性能问题讨论可查看 [antd 官方 issue 3789](https://github.com/ant-design/ant-design/issues/3789)

> antd 4.0 Select 组件已支持虚拟列表（ie11+），此组件基于 antd 3.x，可用于 ie9 浏览器

## 使用

基本使用同 antd Select，只是使用 SuperSelect 代替 Select

```js
import SuperSelect from '@nuo-common/cloudjz-virtual-select';

const Option = SuperSelect.Option;

const Example = () => {
  const children = [];

  for (let i = 0; i < 100000; i++) {
    children.push(
      <Option value={i + ''} key={i}>
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

### 2020-10-19

- fix:
  1. [#28 滚动一定高度后搜索下拉不出来。](https://github.com/iblq/antd-virtual-select/issues/28)

### 2020-06-09

- fix:
  1. 修复滚动一定高度后搜索，搜索输入情况后数据列表显示空白问题
  2. 展开下拉列表默认滚动到当前选中项位置

### 2020-07-15

- fix:

  1. 修复添加 dropdownClassName 属性无效问题

- feat:
  1. 设置 `mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE}` 属性可成为支持大数据渲染的 AutoComplete 组件

### 2020-07-20

- fix:
  1. [#23 Form 表单运用场景下,会出现下拉滚动内容留白,下一次滚动会定位到上次选择内容位置](https://github.com/iblq/antd-virtual-select/issues/23)
