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
     

   static Constant = {
      centerPos:{
        left:0,
        right:0
      },
      hPosRange:{
        leftSecX:[0,0],
        RightSecX:[0,0],
        y:[0,0]
      },
      vPosRange:{
        x:[0,0],
        topY:[0,0]
      }
  };
  /**
    计算指定图片舞台中心的位置
  */
  rearrange(centerindex){

  };
  getInitialStage(){
    return {
      imgArrangeArr:[
          {
            pos:{
              left:'0',
              top:'0'
            }
          }
      ]

    }
  };

  ComponentDidMount(){
    var stageDom = React.findDOMNode(this.refs.stage),
    stageW = stageDom.scrollWidth,
    stageH = stageDom.scrollHeight,
    halfStageW = Math.ceil(stageW/2),
    halfStageH = Math.ceil(stageH/2);

    //拿到图片大小
    var ImgFigureDOM = React.findDOMNode(this.refs.ImgFigure0),
    imgW = ImgFigureDOM.scrollWidth,
    imgH = ImgFigureDOM.scrollHeight,
    halfImgW = Math.ceil(imgW/2),
    halfImgH = Math.ceil(imgH/2);

    //计算中心图片的位置点
    this.Constant.centerPos = {
      left:halfStageW - halfImgW,
      top:halfStageHH - halfImgH,
    }

   //计算左侧
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecx[1] =  halfStageW-halfImgW*3;
    this.Constant.hPosRange.RightSecX[0] = halfStageW = halfImgW;
    this.Constant.hPosRange.RightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;


    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH;
    this.Constant.vPosRange.x[0] = halfImgW - imgW;
    this.Constant.vPosRange.x[1] = halfImgW;

    this.rearrange(0);

  };
  render() {

    let controllerUnits = [],
        ImgFigures = [];

     imagesDatas.forEach(function(value,index){
          ImgFigures.push(<ImgFigure key={value.imageURL} ref={'ImgFigure'+index} data={value}/>);
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
};

class ImgFigure extends React.Component{
  render(){
    return(
      <figure className="img-figure">
        <img  src={this.props.data.imageURL}
        alt="{this.props.data.title}"/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}-{this.props.data.fileName}</h2>
        </figcaption>
      </figure>

      );
  }
};

AppComponent.defaultProps = {
};

export default AppComponent;
