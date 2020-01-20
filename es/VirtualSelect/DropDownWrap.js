"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DropDownWrap =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DropDownWrap, _PureComponent);

  function DropDownWrap(props) {
    var _this;

    _classCallCheck(this, DropDownWrap);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DropDownWrap).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getItemStyle", function (i) {
      var itemHeight = _this.props.itemHeight;
      return {
        position: "absolute",
        top: itemHeight * i,
        height: itemHeight,
        width: "100%"
      };
    });

    _defineProperty(_assertThisInitialized(_this), "reactList", function (allHeight, startIndex, endIndex) {
      return _this.setState({
        allHeight: allHeight,
        startIndex: startIndex,
        endIndex: endIndex
      });
    });

    var _allHeight = props.allHeight,
        _startIndex = props.startIndex,
        _endIndex = props.endIndex;
    _this.state = {
      allHeight: _allHeight,
      startIndex: _startIndex,
      endIndex: _endIndex
    };
    return _this;
  }

  _createClass(DropDownWrap, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var menu = this.props.menu;
      var _this$state = this.state,
          startIndex = _this$state.startIndex,
          endIndex = _this$state.endIndex,
          allHeight = _this$state.allHeight; // 截取 Select 下拉列表中需要显示的部分

      var cloneMenu = _react["default"].cloneElement(menu, {
        menuItems: menu.props.menuItems.slice(startIndex, endIndex).map(function (item, i) {
          var realIndex = (startIndex || 0) + Number(i);

          var style = _this2.getItemStyle(realIndex); // 未搜到数据提示高度使用默认高度


          if (item.key === "NOT_FOUND") {
            delete style.height;
          }

          return _react["default"].cloneElement(item, {
            style: _objectSpread({}, item.props.style, {}, style)
          });
        }),
        dropdownMenuStyle: _objectSpread({}, menu.props.dropdownMenuStyle, {
          height: allHeight,
          maxHeight: allHeight,
          overflow: "hidden"
        })
      });

      return cloneMenu;
    }
  }]);

  return DropDownWrap;
}(_react.PureComponent);

exports["default"] = DropDownWrap;