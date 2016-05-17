require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDom from 'react-dom';

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


function getRangeRandom(low,high){
  return Math.ceil(Math.random()*(high-low)+low);
}

class AppComponent extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      imgsArrangeArr:[
      /*
          {
            pos:{
              left:'0',
              top:'0'
            }
          }*/
      ]
    };
    this.Constant = this.Constant();
  }

    Constant() {
    return {
      centerPos:{
        left:0,
        right:0
      },
      hPosRange:{
        leftSecX:[0,0],
        rightSecX:[0,0],
        y:[0,0]
      },
      vPosRange:{
        x:[0,0],
        topY:[0,0]
      }
    }
  }
  /**
    计算指定图片舞台中心的位置
  */
  rearrange(centerindex) {
    var imgsArrangeArr = this.state.imgsArrangeArr,
    Constant = this.Constant,
    centerPos = Constant.centerPos,
    hPosRange = Constant.hPosRange,
    vPosRange = Constant.vPosRange,
    hPosRangeleftSecX = hPosRange.leftSecX,
    hPosRangerightSecX = hPosRange.rightSecX,
    hPosRangeY = hPosRange.y,
    vPosRangeTopY = vPosRange.topY,
    vPosRangeX = vPosRange.x,
    imgsArrangeTopArr = [],
    topImgNum = Math.ceil(Math.random()*2),
    topImgSpliceIndex = 0,
    imgsArrangeCenterArr = imgsArrangeArr.splice(centerindex,1);

    //首先居中 centerIndex 的图片
    imgsArrangeCenterArr[0].pos = centerPos;

    //取出要布局上侧的图片状态信息
    topImgSpliceIndex = Math.ceil(Math.random()*(imgsArrangeArr.length - topImgNum));

    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

    //布局位于上侧
    imgsArrangeTopArr.forEach(function(value,index){
      imgsArrangeTopArr[index].pos = {
        top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
        left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
      }

    });

    //布局左右两侧的图片
    for (var i = 0,j = imgsArrangeArr.length,k=j / 2; i < j; i++) {
      var hPosRangeLORX = null;

      if(i<k){
        hPosRangeLORX = hPosRangeleftSecX;
      } else {
        hPosRangeLORX = hPosRangerightSecX;
      }
      imgsArrangeArr[i].pos = {
        top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
        left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
      }
    }
    if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
      imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
    }

    imgsArrangeArr.splice(centerindex,0,imgsArrangeCenterArr[0]);

    this.setState({
      imgsArrangeArr:imgsArrangeArr
    });


  }


  componentDidMount() {
    // 首先拿到舞台的大小
    var stageDOM = ReactDom.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);

    // 拿到一个imageFigure的大小
    var imgFigureDOM = ReactDom.findDOMNode(this.refs.ImgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);

    // 计算中心图片的位置点
    this.Constant.centerPos = {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
    };

    // 计算左侧，右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    // 计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rearrange(0);

  }

  render() {
    let controllerUnits = [],
        ImgFigures = [];
     var that_state = this.state;
     imagesDatas.forEach(function(value,index){
      if (!that_state.imgsArrangeArr[index]) {
            that_state.imgsArrangeArr[index] = {
                pos: {
                    left: 0,
                    top: 0
                }
            };
        }
      ImgFigures.push(<ImgFigure key={index} arrange={that_state.imgsArrangeArr[index]} ref={'ImgFigure'+index}  data={value}/>);
      //controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
    }.bind(this));

    return (
      <section className="stage" ref="stage">
      	<section className="img-sec">
        {ImgFigures}
      	</section>
      	<nav className="controller-nav">
        {controllerUnits}
      	</nav>
      </section>
    );
  }
}

class ImgFigure extends React.Component{
  render(){

    var styleObj = {};

    // 如果props属性中指定了这张图片的位置，则使用
      if (this.props.arrange.pos) {
          styleObj = this.props.arrange.pos;
      }


    //如果props属性中指定了这张图片的位置，则使用

    return(
      <figure className="img-figure" style={styleObj}>
        <img  src={this.props.data.imageURL}
         alt={this.props.data.title}  />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}-{this.props.data.fileName}</h2>
        </figcaption>
      </figure>

      );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
