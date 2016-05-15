require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//获取图片信息
var imagesDatas = require('../data/imageDatas.json');

//将图片信息转换url路径信息
imagesDatas =(function genImageURL(imagesDataArr) {
	for(var i in imagesDataArr){
		var singleImageData = imagesDataArr[i];
		singleImageData.imageURL = require('../images/'+singleImageData.fileName);
		imagesDataArr[i]=singleImageData;
	}
  return imagesDataArr;
})(imagesDatas);


class AppComponent extends React.Component {
  render() {

    let controllerUnits = [],
        ImgFigures = [];

     imagesDatas.forEach(function(value){
          ImgFigures.push(<ImgFigure key={value.imageURL} data={value}/>);
      });
    return (
      <section className="stage">
      	<section className="img-sec">
        {ImgFigures}
      	</section>
      	<nav className="controller-nav">
      	</nav>
      </section>
    );
  }
}

class ImgFigure extends React.Component{
  render(){
    return(
      <figure>
        <img className="img-figure" src={this.props.data.imageURL}
        alt="{this.props.data.title}"/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>

      );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
