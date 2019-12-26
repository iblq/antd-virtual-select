

## start 

```shell
npm i antd-virtual-select

# import SuperSelect from 'antd-virtual-select';
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
