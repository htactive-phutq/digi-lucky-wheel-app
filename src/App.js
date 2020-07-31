import React, { useState, useEffect, Component } from 'react';
import './App.css';
import Winwheel from './Winwheel';
import nutquayImage from "./img/controtat.png"
import anh1 from "./img/1k.png"
import anh2 from "./img/5k.png"
import anh3 from "./img/10k.png"
import anh4 from "./img/20k.png"
import anh5 from "./img/50k.png"
import anh6 from "./img/100k.png"
import anh7 from "./img/200k.png"
import anh8 from "./img/500k.png"
import hea2 from "./img/header.png"
import vietnam from "./sound/minh-beta-nghe-an-tv.mp3"
import success from "./sound/votay.mp3"
import { Modal, Radio, Select } from 'antd'

const { Option } = Select;
let audio;
let theWheel;
let audioSuccess = new Audio(success)
export default class App extends Component {
  state = {
    wheelSpinning: false,
    nutquay: "",
    visible: false,
    money: "",
    valueRadio: 1,
    valueSelect: 1,
    options: [
      { label: 'Random Value', value: 1 },
      { label: 'Input Value', value: 2 },
    ],
    disabledRadio: false,
    disabledSelect: false,
    isDisplay: "block"
  }

  componentDidMount() {
    theWheel = new Winwheel({
      'outerRadius': 225, // Bán kính ngoài
      'numSegments': 8, // Số ô
      'innerRadius': 0, // Size lỗ trung tâm
      'textFontSize': 20, // Size chữ
      'textOrientation': 'curved', // Chữ nằm ngang
      'textAlignment': 'outer', // Căn chỉnh văn bản ra bên ngoài bánh xe.
      'responsive': true,
      'drawMode': 'segmentImage', //set truyền image
      'drawText': true,   //Hiển thị text
      'segments': [{
        'fillStyle': '#910f06',
        'text': '1.000 VNĐ',
        // 'size': sizeWinWheel(15),
        // 'textFontSize': 30,
        'textFillStyle': '#ffffff',
        'image': anh1,
      }, {
        'fillStyle': '#ab6f03',
        'text': '5.000 VNĐ',
        // 'size': sizeWinWheel(15),
        // 'textFontSize': 28,
        'textFillStyle': '#ffffff',
        'image': anh2,
      }, {
        'fillStyle': '#910f06',
        'text': '10.000 VNĐ',
        // 'size': sizeWinWheel(15),
        // 'textFontSize': 26,
        'textFillStyle': '#ffffff',
        'image': anh3,
      }, {
        'fillStyle': '#ab6f03',
        'text': '20.000 VNĐ',
        // 'size': sizeWinWheel(15),
        // 'textFontSize': 24,
        'textFillStyle': '#ffffff',
        'image': anh4,
      }, {
        'fillStyle': '#910f06',
        'text': '50.000 VNĐ',
        // 'size': sizeWinWheel(10),
        // 'textFontSize': 22,
        'textFillStyle': '#ffffff',
        'image': anh5,
      }, {
        'fillStyle': '#ab6f03',
        'text': '100.000 VNĐ',
        // 'size': sizeWinWheel(10),
        // 'textFontSize': 20,
        'textFillStyle': '#ffffff',
        'image': anh6,
      }, {
        'fillStyle': '#910f06',
        'text': '200.000 VNĐ',
        // 'size': sizeWinWheel(10),
        // 'textFontSize': 18,
        'textFillStyle': '#ffffff',
        'image': anh7,
      }, {
        'fillStyle': '#ab6f03',
        'text': '500.000 VNĐ',
        // 'size': sizeWinWheel(10),
        // 'textFontSize': 16,
        'textFillStyle': '#ffffff',
        'image': anh8,
      }],
      'animation': // Chỉ định hình động để sử dụng.
      {
        'type': 'spinToStop',
        'duration': 15, // Thời lượng tính bằng giây.
        'spins': 10, // Số vòng quay hoàn chỉnh mặc định.
        'callbackFinished': this.callbackFinished,
        'soundTrigger': 'pin',
        // 'callbackSound':() => this.playSound(), // Chức năng gọi khi âm thanh đánh dấu được kích hoạt.
      },
      'pins': {
        'number': 8, // Số lượng chân. Họ không gian đều xung quanh bánh xe.
        'responsive': true,
        'fillStyle': 'silver',
        'outerRadius': 4,
      },
    })
    audio = new Audio(vietnam);
  }

  callbackFinished = (indicatedSegment) => {
    this.successSound();
    this.setState({
      wheelSpinning: false,
      nutquay: "",
      money: indicatedSegment.text,
      visible: true,
      disabledRadio: false,
      disabledSelect: false,
      isDisplay: "block"
    })

  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
    theWheel.rotationAngle = 0; // Đặt lại góc bánh xe về 0 độ.
    theWheel.draw(); // Gọi draw để hiển thị các thay đổi cho bánh xe.
  }

  startSpin = () => {
    if (!theWheel) {
      return;
    } else {
      this.playSound();
      let stopAt;
      stopAt = this.state.valueRadio === 1 ?
        (1 + Math.floor(Math.random() * 360)) :
        ((this.state.valueSelect * 45) - (Math.floor(Math.random() * 45)))
      theWheel.animation.stopAngle = stopAt;
      theWheel.startAnimation();
      if (this.state.wheelSpinning === false) {
        this.setState({
          wheelSpinning: true,
          nutquay: nutquayImage,
          disabledSelect: true,
          disabledRadio: true,
          isDisplay: "none"
        })
      }
    }

  }

  playSound = () => {
    // Dừng và tua lại âm thanh nếu nó đã phát.
    audio.pause();
    audio.currentTime = 0;
    // Phát âm thanh.
    audio.play();
  }

  successSound = () => {
    // Dừng và tua lại âm thanh nếu nó đã phát.
    audioSuccess.pause();
    audioSuccess.currentTime = 0;
    // Phát âm thanh.
    audioSuccess.play();
  }

  render() {
    const { wheelSpinning, money, visible, nutquay } = this.state
    return (
      <div className="App">
        <div className="topheader">
          <img className="responsive" src={hea2} />
        </div>
        <div className="inputValue">
          <Radio.Group
            options={this.state.options}
            onChange={e => this.setState({ valueRadio: e.target.value })}
            value={this.state.valueRadio}
            optionType="button"
            buttonStyle="solid"
            disabled={this.state.disabledRadio}
          />
          <div>
            {this.state.valueRadio === 2 ?
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={(value) => this.setState({ valueSelect: value })}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                value={this.state.valueSelect}
                disabled={this.state.disabledSelect}
              >
                <Option value={1}>1.000 VNĐ</Option>
                <Option value={2}>5.000 VNĐ</Option>
                <Option value={3}>10.000 VNĐ</Option>
                <Option value={4}>20.000 VNĐ</Option>
                <Option value={5}>50.000 VNĐ</Option>
                <Option value={6}>100.000 VNĐ</Option>
                <Option value={7}>200.000 VNĐ</Option>
                <Option value={8}>500.000 VNĐ</Option>
              </Select>
              : ""}
          </div>
        </div>
        <div className="vongquay">
          <canvas
            id="canvas"
            width="450"
            height="450"
          >
          </canvas>
          <div id="batdauquay" className="nutbatdau" style={{ backgroundImage: wheelSpinning && `url(${nutquay})` }}></div>
          <div className="nutquay" onClick={this.startSpin} style={{ display: `${this.state.isDisplay}` }}></div>
        </div>
        <Modal
          title=""
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <h3>Xin chúc mừng </h3>
          <p>
            Bạn đã quay vào ô  <b>{money || ""}</b>
          </p>

          <p>Hãy liên hệ với với admin để nhận giải nhé!</p>
        </Modal>
      </div>
    );
  }
}