var React = require('react');
var Layout = require('./Layout');

class Index extends React.Component{
  render(){
    return(
      <Layout title={this.props.title}>
        <div>
          <h2>{this.props.title}</h2>
          /*{this.props.content.map(function(index){
            return <h2>{index.id},{index.name},{index.age},{index.sex}</h2>;
          })}*/
        </div>
      </Layout>
    );
  }
}

module.exports = Index;
