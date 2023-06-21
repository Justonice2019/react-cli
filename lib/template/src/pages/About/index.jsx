import React from 'react';

class About extends React.Component {
  componentDidMount() {
    console.log('componentDidMount');
  }

  onClickGetData = () => {
    // /api/examples/get/string
    fetch('/api/examples/get/string?name=Tony&age=28', {
      method: 'GET',
    }).then(res => {
      console.log(res);
    });
  };

  render() {
    return (<div>
      <h1>About~221~212232~</h1>
      <button onClick={this.onClickGetData}>获取数据</button>
    </div>);
  }
}
export default About;
