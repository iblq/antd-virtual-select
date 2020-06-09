/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from "react";
import { Select } from "antd";
import DropDownWrap from "./DropDownWrap";

// 页面实际渲染的下拉菜单数量，实际为 2 * ITEM_ELEMENT_NUMBER
const ITEM_ELEMENT_NUMBER = 30;
// Select size 配置
const ITEM_HEIGHT_CFG = {
  small: 24,
  large: 40,
  default: 32
};

const ARROW_CODE = {
  40: "down",
  38: "up"
};

const DROPDOWN_HEIGHT = 224;

const Option = Select.Option;

class SuperSelect extends PureComponent {
  constructor(props) {
    super(props);

    const { mode, defaultValue, value, optionHeight } = props;
    this.isMultiple = ["tags", "multiple"].includes(mode);

    // 设置默认 value
    let defaultV = this.isMultiple ? [] : "";
    defaultV = value || defaultValue || defaultV;

    this.state = {
      children: props.children || [],
      filterChildren: null, // 筛选后的 options，优先显示，所以清除筛选后手动设为 null
      value: defaultV
    };
    // 下拉菜单项行高
    this.ITEM_HEIGHT = optionHeight || ITEM_HEIGHT_CFG[props.size || "default"];
    // 可视区 dom 高度
    this.visibleDomHeight = this.ITEM_HEIGHT * ITEM_ELEMENT_NUMBER;
    // 滚动时重新渲染的 scrollTop 判断值，大于 reactDelta 则刷新下拉列表
    this.reactDelta = this.visibleDomHeight / 3;
    // 是否拖动滚动条快速滚动状态
    this.isStopReact = false;
    // 上一次滚动的 scrollTop 值
    this.prevScrollTop = 0;
    // 上一次按下方向键时 scrollTop 值
    this.prevTop = 0;

    this.scrollTop = 0;

    // className
    this.dropdownClassName = `dc${+new Date()}`;

    this.id = `sid${+new Date()}`;
  }

  componentDidMount() {
    // defaultOpens=true 时添加滚动事件
    setTimeout(() => {
      this.addEvent();
    }, 500);
  }

  componentDidUpdate(prevProps) {
    const { mode, defaultValue, value, children } = this.props;
    if (prevProps.children !== children) {
      this.isMultiple = ["tags", "multiple"].includes(mode);

      this.setState({
        children: children || [],
        filterChildren: null
      });
    }
    if (prevProps.value !== value) {
      // 更新时设置默认 value
      let defaultV = this.isMultiple ? [] : "";
      defaultV = value || defaultValue || defaultV;
      this.setState({ value: defaultV }, () => {
        this.scrollToValue();
      });
    }
  }

  componentWillUnmount() {
    this.removeEvent();
  }

  // value 存在时需要滚动到 value 所在位置
  scrollToValue = () => {
    if (!this.scrollEle) return;
    const { children } = this.props;
    const { value } = this.state;
    const index = children.findIndex(item => item.key === value) || 0;

    const y = this.ITEM_HEIGHT * index;
    this.scrollEle.scrollTop = y;
    setTimeout(() => {
      this.forceUpdate();
    }, 0);
  };

  getItemStyle = i => ({
    position: "absolute",
    top: this.ITEM_HEIGHT * i,
    width: "100%",
    height: this.ITEM_HEIGHT
  });

  addEvent = () => {
    this.scrollEle = document.querySelector(`.${this.dropdownClassName}`);
    // 下拉菜单未展开时元素不存在
    if (!this.scrollEle) return;

    this.scrollEle.addEventListener("scroll", this.onScroll, false);
    this.inputEle = document.querySelector(`#${this.id}`);

    if (!this.inputEle) return;
    this.inputEle.addEventListener("keydown", this.onKeyDown, false);
  };

  // 模拟 antd select 按下 上下箭头 键时滚动列表
  onKeyDown = e => {
    const { keyCode } = e || {};

    setTimeout(() => {
      const activeItem = document.querySelector(
        `.${this.dropdownClassName} .ant-select-dropdown-menu-item-active`
      );
      if (!activeItem) return;

      const { offsetTop } = activeItem;
      const isUp = ARROW_CODE[keyCode] === "up";
      const isDown = ARROW_CODE[keyCode] === "down";

      // 在所有列表第一行按上键
      if (offsetTop - this.prevTop > DROPDOWN_HEIGHT && isUp) {
        this.scrollEle.scrollTo(0, this.allHeight - DROPDOWN_HEIGHT);
        this.prevTop = this.allHeight;

        return;
      }

      // 在所有列表中最后一行按下键
      if (this.prevTop > offsetTop + DROPDOWN_HEIGHT && isDown) {
        this.scrollEle.scrollTo(0, 0);
        this.prevTop = 0;

        return;
      }

      this.prevTop = offsetTop;
      // 向下滚动到下拉框最后一行时，向下滚动一行的高度
      if (
        offsetTop >
          this.scrollEle.scrollTop + DROPDOWN_HEIGHT - this.ITEM_HEIGHT + 10 &&
        isDown
      ) {
        this.scrollEle.scrollTo(0, this.scrollTop + this.ITEM_HEIGHT);
        return;
      }
      // 向上滚动到下拉框第一一行时，向上滚动一行的高度
      if (offsetTop < this.scrollEle.scrollTop && isUp) {
        this.scrollEle.scrollTo(0, this.scrollTop - this.ITEM_HEIGHT);
      }
    }, 100);
  };

  onScroll = () => this.throttleByHeight(this.onScrollReal);

  onScrollReal = () => {
    this.allList = this.getUseChildrenList();
    const { startIndex, endIndex } = this.getStartAndEndIndex();

    this.prevScrollTop = this.scrollTop;
    // 重新渲染列表组件 Wrap
    const allHeight = this.allList.length * this.ITEM_HEIGHT || 100;
    this.wrap.reactList(allHeight, startIndex, endIndex);
  };

  throttleByHeight = () => {
    this.scrollTop = this.scrollEle.scrollTop;
    // 滚动的高度
    let delta = this.prevScrollTop - this.scrollTop;
    delta = delta < 0 ? 0 - delta : delta;

    delta > this.reactDelta && this.onScrollReal();
  };

  // 列表可展示所有 children
  getUseChildrenList = () => this.state.filterChildren || this.state.children;

  getStartAndEndIndex = () => {
    // 滚动后显示在列表可视区中的第一个 item 的 index
    const showIndex = Number((this.scrollTop / this.ITEM_HEIGHT).toFixed(0));

    const startIndex =
      showIndex - ITEM_ELEMENT_NUMBER < 0
        ? 0
        : showIndex - ITEM_ELEMENT_NUMBER / 2;
    const endIndex = showIndex + ITEM_ELEMENT_NUMBER;
    return { startIndex, endIndex };
  };

  // 须使用 setTimeout 确保在 dom 加载完成之后添加事件
  setSuperDrowDownMenu = visible => {
    if (!visible) return;

    this.allList = this.getUseChildrenList();

    if (!this.eventTimer) {
      this.eventTimer = setTimeout(() => this.addEvent(), 0);
    } else {
      const allHeight = this.allList.length * this.ITEM_HEIGHT || 100;
      // 下拉列表单独重新渲染
      const { startIndex, endIndex } = this.getStartAndEndIndex();
      setTimeout(() => {
        this.wrap && this.wrap.reactList(allHeight, startIndex, endIndex);
      }, 0);
    }
  };

  onDropdownVisibleChange = visible => {
    const { onDropdownVisibleChange } = this.props;
    onDropdownVisibleChange && onDropdownVisibleChange(visible);

    // 关闭下拉框前清空筛选条件，防止下次打开任然显示筛选后的 options
    if (!visible) {
      // 定时器确保关闭后再设置 filterChildren,防止列表刷新闪烁
      setTimeout(() => {
        this.setState({ filterChildren: null });
      });
    } else {
      // 如果已有 value, 设置默认滚动位置
      this.setDefaultScrollTop();
      // 设置下拉列表显示数据
      this.setSuperDrowDownMenu(visible);
    }
  };

  onDeselect = value => {
    const { onDeselect } = this.props;
    onDeselect && onDeselect(value);
  };

  // 在搜索重新计算下拉滚动条高度
  onChange = (value, opt) => {
    const { showSearch, onChange, autoClearSearchValue } = this.props;
    if (showSearch || this.isMultiple) {
      // 搜索模式下选择后是否需要重置搜索状态
      if (autoClearSearchValue !== false) {
        this.setState({ filterChildren: null }, () => {
          // 搜索成功后重新设置列表的总高度
          this.setSuperDrowDownMenu(true);
        });
      }
    }

    this.setState({ value });
    onChange && onChange(value, opt);
  };

  onSearch = v => {
    const { showSearch, onSearch, filterOption, children } = this.props;
    if (showSearch && filterOption !== false) {
      // 须根据 filterOption（如有该自定义函数）手动 filter 搜索匹配的列表
      let filterChildren = null;
      if (typeof filterOption === "function") {
        filterChildren = children.filter(item => filterOption(v, item));
      } else if (filterOption === undefined) {
        filterChildren = children.filter(item => this.filterOption(v, item));
      }

      // 设置下拉列表显示数据
      this.setState(
        { filterChildren: v === "" ? null : filterChildren },
        () => {
          setTimeout(() => {
            // 搜索后需要重置滚动位置到0，防止上次 scrollTop 位置无数据
            if (filterChildren) {
              this.scrollTop = 0;
            }
            // 搜索成功后需要重新设置列表的总高度
            this.setSuperDrowDownMenu(true);
          }, 0);
        }
      );
    }
    onSearch && onSearch(v);
  };

  filterOption = (v, option) => {
    // 自定义过滤对应的 option 属性配置
    const filterProps = this.props.optionFilterProp || "value";
    return `${option.props[filterProps]}`.indexOf(v) >= 0;
  };

  setDefaultScrollTop = () => {
    const { value } = this.state;
    const { children } = this.props;

    for (let i = 0; i < children.length; i++) {
      const item = children[i];
      const itemValue = item.props.value;
      if (
        itemValue === value ||
        (Array.isArray(value) && value.includes(itemValue))
      ) {
        const targetScrollTop = i * this.ITEM_HEIGHT;

        setTimeout(() => {
          this.scrollEle.scrollTo(0, targetScrollTop);
        }, 100);
        return;
      }
    }
  };

  removeEvent = () => {
    if (!this.scrollEle) return;
    this.scrollEle.removeEventListener("scroll", this.onScroll, false);
    if (!this.inputEle) return;
    this.inputEle.removeEventListener("keydown", this.onKeyDown, false);
  };

  render() {
    let {
      dropdownStyle,
      optionLabelProp,
      notFoundContent,
      ...props
    } = this.props;

    this.allList = this.getUseChildrenList();

    this.allHeight = this.allList.length * this.ITEM_HEIGHT || 100;
    const { startIndex, endIndex } = this.getStartAndEndIndex();

    dropdownStyle = {
      maxHeight: `${DROPDOWN_HEIGHT}px`,
      ...dropdownStyle,
      overflow: "auto",
      position: "relative"
    };

    const { value } = this.state;
    // 判断处于 antd Form 中时不自动设置 value
    const _props = { ...props };
    // 先删除 value，再手动赋值，防止空 value 影响 placeholder
    delete _props.value;

    // value 为空字符会隐藏 placeholder，改为 undefined
    if (typeof value === "string" && !value) {
      _props.value = undefined;
    } else {
      _props.value = value;
    }

    optionLabelProp = optionLabelProp || "children";

    return (
      <Select
        {..._props}
        id={this.id}
        onSearch={this.onSearch}
        onChange={this.onChange}
        dropdownClassName={this.dropdownClassName}
        optionLabelProp={optionLabelProp}
        dropdownStyle={dropdownStyle}
        onDropdownVisibleChange={this.onDropdownVisibleChange}
        onDeselect={this.onDeselect}
        ref={ele => (this.select = ele)}
        dropdownRender={menu => {
          if (this.allList.length === 0) {
            return <div style={{ padding: "5px 12px" }}>{notFoundContent}</div>;
          }

          return (
            <DropDownWrap
              {...{
                startIndex,
                endIndex,
                allHeight: this.allHeight,
                menu,
                itemHeight: this.ITEM_HEIGHT
              }}
              ref={ele => {
                this.wrap = ele;
              }}
            />
          );
        }}
      >
        {this.allList}
      </Select>
    );
  }
}

SuperSelect.Option = Option;

export default SuperSelect;
