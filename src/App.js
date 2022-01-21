import React, { Component } from "react";
import "./App.css";
import Winwheel from "./Winwheel";
import nutquayImage from "./img/start.png";
import vietnam from "./sound/nhac-quay-so.mp3";
import success from "./sound/votay.mp3";
import audioError from "./sound/matluot.mp3";
import { Modal,  Tabs } from "antd";

const { TabPane } = Tabs;

let audio;
let theWheel;
let audioSuccess = new Audio(success);
let audioErr = new Audio(audioError);

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
export default class App extends Component {
  state = {
    wheelSpinning: false,
    nutquay: "",
    visible: false,
    passNumber: "",
    valueRadio: 1,
    valueSelect: 1,
    options: [
      { label: "Random Value", value: 1 },
      { label: "Input Value", value: 2 },
    ],
    disabledRadio: false,
    disabledSelect: false,
    isDisplay: "block",
    luotquay: 3,
    visibleErr: false,
    list: [],
    whCanvas: window.screen.width > 425 ? 450 : 340,

    // input value
    tags: [
      "Số 1",
      "Số 2",
      "Số 3",
      "Số 4",
      "Số 5",
      "Số 6",
      "Số 7",
      "Số 8",
      "Số 9",
      "Số 10",
      "Số 11",
      "Số 12",
      "Số 13",
      "Số 14",
      "Số 15",
      "Số 16",
      "Số 17",
      "Số 18",
      "Số 19",
      "Số 20",
      "Số 21",
      "Số 22",
    ],
    inputVisible: false,
    inputValue: "",
  };

  componentDidMount() {
    theWheel = new Winwheel({
      outerRadius: window.screen.width > 425 ? 220 : 170, // Bán kính ngoài
      numSegments: this.state.tags.length, // Số ô
      innerRadius: 0, // Size lỗ trung tâm
      textFontSize: 20, // Size chữ
      // 'textOrientation': '', // Chữ nằm ngang
      textAlignment: "outer", // Căn chỉnh văn bản ra bên ngoài bánh xe.
      responsive: true,
      // 'drawMode': 'segmentImage', //set truyền image
      drawText: true, //Hiển thị text
      rotationAngle: -22,
      segments: this.state.tags.map((number) => ({
        fillStyle: getRandomColor(),
        text: number,
        textFillStyle: "#ffffff",
      })),
      // Chỉ định hình động để sử dụng.
      animation: {
        type: "spinToStop",
        duration: 15, // Thời lượng tính bằng giây.
        spins: 10, // Số vòng quay hoàn chỉnh mặc định.
        callbackFinished: this.callbackFinished,
        soundTrigger: "pin",
        // 'callbackSound':() => this.playSound(), // Chức năng gọi khi âm thanh đánh dấu được kích hoạt.
      },
      pins: {
        number: 8, // Số lượng chân. Họ không gian đều xung quanh bánh xe.
        responsive: true,
        fillStyle: "silver",
        outerRadius: 4,
      },
    });
    audio = new Audio(vietnam);
  }

  callbackFinished = (indicatedSegment) => {
    this.successSound();
    this.setState({
      wheelSpinning: false,
      nutquay: "",
      passNumber: indicatedSegment.text,
      visible: true,
      disabledRadio: false,
      disabledSelect: false,
      isDisplay: "block",
      list: [...this.state.list, indicatedSegment.text],
    });
  };

  handleCancel = () => {
    audio.pause();
    this.setState({
      visible: false,
    });
    theWheel.rotationAngle = -22; // Đặt lại góc bánh xe về 0 độ.
    theWheel.draw(); // Gọi draw để hiển thị các thay đổi cho bánh xe.
  };

  handleOk = () => {
    this.setState(
      {
        tags: this.state.tags.filter(
          (number) => number !== this.state.passNumber
        ),
        visible: false,
      },
      () => {
        theWheel = new Winwheel({
          outerRadius: window.screen.width > 425 ? 220 : 170, // Bán kính ngoài
          numSegments: this.state.tags.length, // Số ô
          innerRadius: 0, // Size lỗ trung tâm
          textFontSize: 20, // Size chữ
          // 'textOrientation': '', // Chữ nằm ngang
          textAlignment: "outer", // Căn chỉnh văn bản ra bên ngoài bánh xe.
          responsive: true,
          // 'drawMode': 'segmentImage', //set truyền image
          drawText: true, //Hiển thị text
          rotationAngle: -22,
          segments: this.state.tags.map((number) => ({
            fillStyle: getRandomColor(),
            text: number,
            textFillStyle: "#ffffff",
          })),
          // Chỉ định hình động để sử dụng.
          animation: {
            type: "spinToStop",
            duration: 15, // Thời lượng tính bằng giây.
            spins: 10, // Số vòng quay hoàn chỉnh mặc định.
            callbackFinished: this.callbackFinished,
            soundTrigger: "pin",
            // 'callbackSound':() => this.playSound(), // Chức năng gọi khi âm thanh đánh dấu được kích hoạt.
          },
          pins: {
            number: 8, // Số lượng chân. Họ không gian đều xung quanh bánh xe.
            responsive: true,
            fillStyle: "silver",
            outerRadius: 4,
          },
        });
      }
    );
    audio.pause();
  };

  startSpin = () => {
    this.playSound();
    let stopAt;
    stopAt = 1 + Math.floor(Math.random() * 360);
    theWheel.animation.stopAngle = stopAt;
    theWheel.startAnimation();
    if (this.state.wheelSpinning === false) {
      this.setState({
        wheelSpinning: true,
        nutquay: nutquayImage,
        disabledSelect: true,
        disabledRadio: true,
        isDisplay: "none",
      });
    }
  };

  playSound = () => {
    // Dừng và tua lại âm thanh nếu nó đã phát.
    audio.pause();
    audio.currentTime = 0;
    // Phát âm thanh.
    audio.play();
  };

  successSound = () => {
    // Dừng và tua lại âm thanh nếu nó đã phát.
    audioSuccess.pause();
    audioSuccess.currentTime = 0;
    // Phát âm thanh.
    audioSuccess.play();
  };

  errSound = () => {
    // Dừng và tua lại âm thanh nếu nó đã phát.
    audioErr.pause();
    audioErr.currentTime = 0;
    // Phát âm thanh.
    audioErr.play();
  };

  render() {
    const {
      wheelSpinning,
      passNumber,
      visible,
      nutquay,
      list,
      isDisplay,
      whCanvas,
    } = this.state;

    return (
      <div className="App">
        <div className="vongquay">
          <canvas id="canvas" width={whCanvas} height={whCanvas}></canvas>
          <div className="topheader">
          </div>
          <div
            id="batdauquay"
            className="nutbatdau"
            style={{ backgroundImage: wheelSpinning && `url(${nutquay})` }}
          ></div>
          <div
            className="nutquay"
            onClick={this.startSpin}
            style={{ display: `${isDisplay}` }}
          ></div>
        </div>

        <div className="card-container">
          <Tabs type="card">
            <TabPane tab="Lịch sử quay" key="1">
              {list.length > 0 ? (
                list.map((text, id) => (
                  <p key={id}>- Bạn đã quay vào ô {text}</p>
                ))
              ) : (
                <p>Không có dữ liệu!</p>
              )}
            </TabPane>
          </Tabs>
        </div>
        <Modal
          title=""
          visible={visible}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          okText="Remove"
          cancelText="Close"
        >
          <h3>
            Xin chúc mừng người may mắn <b>{passNumber || ""}</b> đã trúng
            thưởng!
          </h3>
          <p>
            <b>Xin mời bạn lên sân khấu để nhận giải.</b>
          </p>
        </Modal>
      </div>
    );
  }
}
