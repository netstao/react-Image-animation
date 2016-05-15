require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//获取图片信息
var imgurlDatas = require('../data/imageDatas.json');

//将图片信息转换url路径信息
imagesDatas = function genImageURL(imagesDataArr) {
	for(var i in imagesDataArr){
		var singleImageData = imagesDataArr[i];
		singleImageData.imageURL = require('../images/'+singleImageData.fileName);
		imagesDataArr[i]=singleImageData;
	}
}


class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
      	<section className="img-sec">
      	</section>
      	<nav className="controller-nav">
      	</nav>

      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
