"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _DropDownWrap = _interopRequireDefault(require("./DropDownWrap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 页面实际渲染的下拉菜单数量，实际为 2 * ITEM_ELEMENT_NUMBER
var ITEM_ELEMENT_NUMBER = 30; // Select size 配置

var ITEM_HEIGHT_CFG = {
  small: 24,
  large: 40,
  "default": 32
};
var ARROW_CODE = {
  40: 'down',
  38: 'up'
};
var DROPDOWN_HEIGHT = 224;

var SuperSelect =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(SuperSelect, _PureComponent);

  function SuperSelect(props) {
    var _this;

    _classCallCheck(this, SuperSelect);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SuperSelect).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "scrollToValue", function () {
      if (!_this.scrollEle) return;
      var children = _this.props.children;
      var value = _this.state.value;
      var index = children.findIndex(function (item) {
        return item.key === value;
      }) || 0;
      var y = _this.ITEM_HEIGHT * index;
      _this.scrollEle.scrollTop = y;
      setTimeout(function () {
        _this.forceUpdate();
      }, 0);
    });

    _defineProperty(_assertThisInitialized(_this), "getItemStyle", function (i) {
      return {
        position: 'absolute',
        top: _this.ITEM_HEIGHT * i,
        width: '100%',
        height: _this.ITEM_HEIGHT
      };
    });

    _defineProperty(_assertThisInitialized(_this), "addEvent", function () {
      _this.scrollEle = document.querySelector(".".concat(_this.dropdownClassName)); // 下拉菜单未展开时元素不存在

      if (!_this.scrollEle) return;

      _this.scrollEle.addEventListener('scroll', _this.onScroll, false);

      _this.inputEle = document.querySelector("#".concat(_this.id));
      if (!_this.inputEle) return;

      _this.inputEle.addEventListener('keydown', _this.onKeyDown, false);
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      var _ref = e || {},
          keyCode = _ref.keyCode;

      setTimeout(function () {
        var activeItem = document.querySelector(".".concat(_this.dropdownClassName, " .ant-select-dropdown-menu-item-active"));
        if (!activeItem) return;
        var offsetTop = activeItem.offsetTop;
        var isUp = ARROW_CODE[keyCode] === 'up';
        var isDown = ARROW_CODE[keyCode] === 'down'; // 在所有列表第一行按上键

        if (offsetTop - _this.prevTop > DROPDOWN_HEIGHT && isUp) {
          _this.scrollEle.scrollTo(0, _this.allHeight - DROPDOWN_HEIGHT);

          _this.prevTop = _this.allHeight;
          return;
        } // 在所有列表中最后一行按下键


        if (_this.prevTop > offsetTop + DROPDOWN_HEIGHT && isDown) {
          _this.scrollEle.scrollTo(0, 0);

          _this.prevTop = 0;
          return;
        }

        _this.prevTop = offsetTop; // 向下滚动到下拉框最后一行时，向下滚动一行的高度

        if (offsetTop > _this.scrollEle.scrollTop + DROPDOWN_HEIGHT - _this.ITEM_HEIGHT + 10 && isDown) {
          _this.scrollEle.scrollTo(0, _this.scrollTop + _this.ITEM_HEIGHT);

          return;
        } // 向上滚动到下拉框第一一行时，向上滚动一行的高度


        if (offsetTop < _this.scrollEle.scrollTop && isUp) {
          _this.scrollEle.scrollTo(0, _this.scrollTop - _this.ITEM_HEIGHT);
        }
      }, 100);
    });

    _defineProperty(_assertThisInitialized(_this), "onScroll", function () {
      return _this.throttleByHeight(_this.onScrollReal);
    });

    _defineProperty(_assertThisInitialized(_this), "onScrollReal", function () {
      _this.allList = _this.getUseChildrenList();

      var _this$getStartAndEndI = _this.getStartAndEndIndex(),
          startIndex = _this$getStartAndEndI.startIndex,
          endIndex = _this$getStartAndEndI.endIndex;

      _this.prevScrollTop = _this.scrollTop; // 重新渲染列表组件 Wrap

      var allHeight = _this.allList.length * _this.ITEM_HEIGHT || 100;

      _this.wrap.reactList(allHeight, startIndex, endIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "throttleByHeight", function () {
      _this.scrollTop = _this.scrollEle.scrollTop; // 滚动的高度

      var delta = _this.prevScrollTop - _this.scrollTop;
      delta = delta < 0 ? 0 - delta : delta;
      delta > _this.reactDelta && _this.onScrollReal();
    });

    _defineProperty(_assertThisInitialized(_this), "getUseChildrenList", function () {
      return _this.state.filterChildren || _this.state.children;
    });

    _defineProperty(_assertThisInitialized(_this), "getStartAndEndIndex", function () {
      // 滚动后显示在列表可视区中的第一个 item 的 index
      var showIndex = Number((_this.scrollTop / _this.ITEM_HEIGHT).toFixed(0));
      var startIndex = showIndex - ITEM_ELEMENT_NUMBER < 0 ? 0 : showIndex - ITEM_ELEMENT_NUMBER / 2;
      var endIndex = showIndex + ITEM_ELEMENT_NUMBER;
      return {
        startIndex: startIndex,
        endIndex: endIndex
      };
    });

    _defineProperty(_assertThisInitialized(_this), "setSuperDrowDownMenu", function (visible) {
      if (!visible) return;
      _this.allList = _this.getUseChildrenList();

      if (!_this.eventTimer) {
        _this.eventTimer = setTimeout(function () {
          return _this.addEvent();
        }, 0);
      } else {
        var allHeight = _this.allList.length * _this.ITEM_HEIGHT || 100; // 下拉列表单独重新渲染

        var _this$getStartAndEndI2 = _this.getStartAndEndIndex(),
            startIndex = _this$getStartAndEndI2.startIndex,
            endIndex = _this$getStartAndEndI2.endIndex;

        _this.wrap && _this.wrap.reactList(allHeight, startIndex, endIndex);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (value, opt) {
      // // 删除选中项时保持展开下拉列表状态
      // if (Array.isArray(value) && value.length < this.state.value.length) {
      //   this.focusSelect();
      // }
      var _this$props = _this.props,
          showSearch = _this$props.showSearch,
          onChange = _this$props.onChange,
          autoClearSearchValue = _this$props.autoClearSearchValue;

      if (showSearch || _this.isMultiple) {
        // 搜索模式下选择后是否需要重置搜索状态
        if (autoClearSearchValue !== false) {
          _this.setState({
            filterChildren: null
          }, function () {
            // 搜索成功后重新设置列表的总高度
            _this.setSuperDrowDownMenu(true);
          });
        }
      }

      _this.setState({
        value: value
      });

      onChange && onChange(value, opt);
    });

    _defineProperty(_assertThisInitialized(_this), "onSearch", function (v) {
      var _this$props2 = _this.props,
          showSearch = _this$props2.showSearch,
          onSearch = _this$props2.onSearch,
          filterOption = _this$props2.filterOption,
          children = _this$props2.children;

      if (showSearch && filterOption !== false) {
        // 须根据 filterOption（如有该自定义函数）手动 filter 搜索匹配的列表
        var filterChildren = null;

        if (typeof filterOption === 'function') {
          filterChildren = children.filter(function (item) {
            return filterOption(v, item);
          });
        } else if (filterOption === undefined) {
          filterChildren = children.filter(function (item) {
            return _this.filterOption(v, item);
          });
        } // 设置下拉列表显示数据


        _this.setState({
          filterChildren: v === '' ? null : filterChildren
        }, function () {
          // 搜索成功后需要重新设置列表的总高度
          _this.setSuperDrowDownMenu(true);
        });
      }

      onSearch && onSearch(v);
    });

    _defineProperty(_assertThisInitialized(_this), "filterOption", function (v, option) {
      // 自定义过滤对应的 option 属性配置
      var filterProps = _this.props.optionFilterProp || 'value';
      return "".concat(option.props[filterProps]).indexOf(v) >= 0;
    });

    _defineProperty(_assertThisInitialized(_this), "removeEvent", function () {
      if (!_this.scrollEle) return;

      _this.scrollEle.removeEventListener('scroll', _this.onScroll, false);

      if (!_this.inputEle) return;

      _this.inputEle.removeEventListener('keydown', _this.onKeyDown, false);
    });

    var mode = props.mode,
        defaultValue = props.defaultValue,
        _value = props.value;
    _this.isMultiple = ['tags', 'multiple'].includes(mode); // 设置默认 value

    var defaultV = _this.isMultiple ? [] : '';
    defaultV = _value || defaultValue || defaultV;
    _this.state = {
      children: props.children || [],
      filterChildren: null,
      value: defaultV
    }; // 下拉菜单项行高

    _this.ITEM_HEIGHT = ITEM_HEIGHT_CFG[props.size || 'default']; // 可视区 dom 高度

    _this.visibleDomHeight = _this.ITEM_HEIGHT * ITEM_ELEMENT_NUMBER; // 滚动时重新渲染的 scrollTop 判断值，大于 reactDelta 则刷新下拉列表

    _this.reactDelta = _this.visibleDomHeight / 3; // 是否拖动滚动条快速滚动状态

    _this.isStopReact = false; // 上一次滚动的 scrollTop 值

    _this.prevScrollTop = 0; // 上一次按下方向键时 scrollTop 值

    _this.prevTop = 0;
    _this.scrollTop = 0; // className

    _this.dropdownClassName = "dc".concat(+new Date());
    _this.id = "sid".concat(+new Date());
    return _this;
  }

  _createClass(SuperSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // defaultOpens=true 时添加滚动事件
      setTimeout(function () {
        _this2.addEvent();
      }, 500);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;

      var _this$props3 = this.props,
          mode = _this$props3.mode,
          defaultValue = _this$props3.defaultValue,
          value = _this$props3.value,
          children = _this$props3.children;

      if (prevProps.children !== children) {
        this.isMultiple = ['tags', 'multiple'].includes(mode);
        this.setState({
          children: children || [],
          filterChildren: null
        });
      }

      if (prevProps.value !== value) {
        // 更新时设置默认 value
        var defaultV = this.isMultiple ? [] : '';
        defaultV = value || defaultValue || defaultV;
        this.setState({
          value: defaultV
        }, function () {
          _this3.scrollToValue();
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.removeEvent();
    } // value 存在时需要滚动到 value 所在位置

  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props4 = this.props,
          dropdownStyle = _this$props4.dropdownStyle,
          optionLabelProp = _this$props4.optionLabelProp,
          notFoundContent = _this$props4.notFoundContent,
          props = _objectWithoutProperties(_this$props4, ["dropdownStyle", "optionLabelProp", "notFoundContent"]);

      this.allList = this.getUseChildrenList();
      this.allHeight = this.allList.length * this.ITEM_HEIGHT || 100;

      var _this$getStartAndEndI3 = this.getStartAndEndIndex(),
          startIndex = _this$getStartAndEndI3.startIndex,
          endIndex = _this$getStartAndEndI3.endIndex;

      dropdownStyle = _objectSpread({
        maxHeight: "".concat(DROPDOWN_HEIGHT, "px")
      }, dropdownStyle, {
        overflow: 'auto',
        position: 'relative'
      });
      var value = this.state.value; // 判断处于 antd Form 中时不自动设置 value

      var _props = _objectSpread({}, props); // 先删除 value，再手动赋值，防止空 value 影响 placeholder


      delete _props.value; // value 为空字符会隐藏 placeholder，改为 undefined

      if (typeof value === 'string' && !value) {
        _props.value = undefined;
      } else {
        _props.value = value;
      }

      optionLabelProp = optionLabelProp || 'children';
      return _react["default"].createElement(_antd.Select, _extends({}, _props, {
        id: this.id,
        onSearch: this.onSearch,
        onChange: this.onChange,
        dropdownClassName: this.dropdownClassName,
        optionLabelProp: optionLabelProp,
        dropdownStyle: dropdownStyle,
        onDropdownVisibleChange: this.setSuperDrowDownMenu,
        ref: function ref(ele) {
          return _this4.select = ele;
        },
        dropdownRender: function dropdownRender(menu) {
          return _react["default"].createElement(_DropDownWrap["default"], _extends({
            startIndex: startIndex,
            endIndex: endIndex,
            allHeight: _this4.allHeight,
            menu: menu,
            itemHeight: _this4.ITEM_HEIGHT
          }, {
            ref: function ref(ele) {
              return _this4.wrap = ele;
            }
          }));
        }
      }), this.allList);
    }
  }]);

  return SuperSelect;
}(_react.PureComponent);

exports["default"] = SuperSelect;