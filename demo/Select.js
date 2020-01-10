import React from 'react';
import SuperSelect from '../packages/VirtualSelect';

const { Option } = SuperSelect;

const children = [];

for (let i = 0; i < 10000; i++) {
  children.push(
    <Option value={`${i}aa`} key={i}>
      {i}
    </Option>,
  );
}

class App extends React.Component {
  onChange = (v) => {
    console.log(v, 'onChange');
  };

  onSearch = (v) => console.log(v);

  render() {
    return (
      <div>
        <div style={{ width: '300px' }}>
          superSelect: 所有用法同 antd 原 Select, 只是替换 Select 为 SuperSelect
          <SuperSelect
            showSearch
            allowClear
            open
            onChange={this.onChange}
            onSearch={this.onSearch}
            style={{ width: '300px' }}
            getPopupContainer={(target) => target.parentNode}
          >
            {children}
          </SuperSelect>
        </div>
      </div>
    );
  }
}

export default App;
