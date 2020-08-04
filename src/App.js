import React, { Component } from 'react';
import './App.css';
import Winwheel from './Winwheel';
import nutquayImage from "./img/start.png"
import anh1 from "./img/anh1.png"
import anh2 from "./img/anh2.png"
import anh3 from "./img/anh3.png"
import anh4 from "./img/anh4.png"
import anh5 from "./img/anh1-dt.png"
import anh6 from "./img/anh2-dt.png"
import anh7 from "./img/anh3-dt.png"
import anh8 from "./img/anh4-dt.png"
import vietnam from "./sound/minh-beta-nghe-an-tv.mp3"
import success from "./sound/votay.mp3"
import audioError from "./sound/matluot.mp3"
import { Modal, Radio, Select, Tabs, Slider } from 'antd'

const { Option } = Select;
const { TabPane } = Tabs;

let audio;
let theWheel;
let audioSuccess = new Audio(success);
let audioErr = new Audio(audioError)
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
    isDisplay: "block",
    luotquay: 3,
    visibleErr: false,
    list: [],
    whCanvas: window.screen.width > 425 ? 450 : 340
  }

  componentDidMount() {
    theWheel = new Winwheel({
      'outerRadius':  window.screen.width > 425 ? 220 : 170, // Bán kính ngoài
      'numSegments': 8, // Số ô
      'innerRadius': 0, // Size lỗ trung tâm
      'textFontSize': 20, // Size chữ
      'textOrientation': 'curved', // Chữ nằm ngang
      'textAlignment': 'outer', // Căn chỉnh văn bản ra bên ngoài bánh xe.
      'responsive': true,
      'drawMode': 'segmentImage', //set truyền image
      // 'drawText': true,   //Hiển thị text
      'rotationAngle': -22,
      'segments': [{
        'fillStyle': '#910f06',
        'text': 'Mã số cơ hội',
        // 'size': sizeWinWheel(15),
        // 'textFontSize': 30,
        'textFillStyle': '#ffffff',
        'image': window.screen.width > 425 ? anh1 : anh5,
      }, {
        'fillStyle': '#ab6f03',
        'text': 'Thẻ cào 100k',
        // 'size': sizeWinWheel(15),
        // 'textFontSize': 28,
        'textFillStyle': '#ffffff',
        'image': window.screen.width > 425 ? anh2 : anh6,
      }, {
        'fillStyle': '#910f06',
        'text': '5.000.000 VNĐ',
        // 'size': sizeWinWheel(15),
        // 'textFontSize': 26,
        'textFillStyle': '#ffffff',
        'image': window.screen.width > 425 ? anh3 : anh7,
      }, {
        'fillStyle': '#ab6f03',
        'text': 'Thẻ cào 20k',
        // 'size': sizeWinWheel(15),
        // 'textFontSize': 24,
        'textFillStyle': '#ffffff',
        'image': window.screen.width > 425 ? anh4 : anh8,
      }, {
        'fillStyle': '#910f06',
        'text': 'Mã số cơ hội',
        // 'size': sizeWinWheel(10),
        // 'textFontSize': 22,
        'textFillStyle': '#ffffff',
        'image': window.screen.width > 425 ? anh1 : anh5,
      }, {
        'fillStyle': '#ab6f03',
        'text': 'Thẻ cào 100k',
        // 'size': sizeWinWheel(10),
        // 'textFontSize': 20,
        'textFillStyle': '#ffffff',
        'image': window.screen.width > 425 ? anh2 : anh6,
      }, {
        'fillStyle': '#910f06',
        'text': '5.000.000 VNĐ',
        // 'size': sizeWinWheel(10),
        // 'textFontSize': 18,
        'textFillStyle': '#ffffff',
        'image': window.screen.width > 425 ? anh3 : anh7,
      }, {
        'fillStyle': '#ab6f03',
        'text': 'Thẻ cào 20k',
        // 'size': sizeWinWheel(10),
        // 'textFontSize': 16,
        'textFillStyle': '#ffffff',
        'image': window.screen.width > 425 ? anh4 : anh8,
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
      isDisplay: "block",
      list: [...this.state.list, indicatedSegment.text]
    })

  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
    theWheel.rotationAngle = -22; // Đặt lại góc bánh xe về 0 độ.
    theWheel.draw(); // Gọi draw để hiển thị các thay đổi cho bánh xe.
  }

  startSpin = () => {
    const { luotquay } = this.state
    if (luotquay > 0) {
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
      this.setState({
        luotquay: luotquay - 1
      })
    } else {
      this.errSound();
      this.setState({ visibleErr: true })
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

  successSound = () => {
    // Dừng và tua lại âm thanh nếu nó đã phát.
    audioSuccess.pause();
    audioSuccess.currentTime = 0;
    // Phát âm thanh.
    audioSuccess.play();
  }

  errSound = () => {
    // Dừng và tua lại âm thanh nếu nó đã phát.
    audioErr.pause();
    audioErr.currentTime = 0;
    // Phát âm thanh.
    audioErr.play();
  }


  render() {
    const { wheelSpinning, money, visible, nutquay, visibleErr, luotquay, list, valueRadio, options, disabledRadio, valueSelect, disabledSelect, isDisplay, whCanvas } = this.state
    return (
      <div className="App">
        <div className="inputValue">
          <div className="luotquay">{luotquay}</div>
          <Radio.Group
            options={options}
            onChange={e => this.setState({ valueRadio: e.target.value })}
            value={valueRadio}
            optionType="button"
            buttonStyle="solid"
            disabled={disabledRadio}
          />
          <div>
            {valueRadio === 2 ?
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={(value) => this.setState({ valueSelect: value })}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                value={valueSelect}
                disabled={disabledSelect}
              >
                <Option value={1}>Mã số cơ hội</Option>
                <Option value={2}>Thẻ cào 100k</Option>
                <Option value={3}>5.000.000 VNĐ</Option>
                <Option value={4}>Thẻ cào 20k</Option>
                <Option value={5}>Mã số cơ hội(2)</Option>
                <Option value={6}>Thẻ cào 100k(2)</Option>
                <Option value={7}>5.000.000 VNĐ(2)</Option>
                <Option value={8}>Thẻ cào 20k(2)</Option>
              </Select>
              : ""}
          </div>
        </div>
        <div className="vongquay">

          <canvas
            id="canvas"
            width={whCanvas}
            height={whCanvas}
          >
          </canvas>
          <div className="topheader">
          </div>
          <div id="batdauquay" className="nutbatdau" style={{ backgroundImage: wheelSpinning && `url(${nutquay})` }}></div>
          <div className="nutquay" onClick={this.startSpin} style={{ display: `${isDisplay}` }}></div>
        </div>

        <div className="card-container">
          <Tabs type="card">
            <TabPane tab="Lịch sử quay" key="1">
              {list.length > 0 ?
                list.map((text, id) => (<p key={id}>- Bạn đã quay vào ô {text}</p>))
                : <p>Không có dữ liệu!</p>}
            </TabPane>
          </Tabs>
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
        <Modal
          title=""
          visible={visibleErr}
          onCancel={() => this.setState({ visibleErr: false })}
          footer={null}
        >
          <h3>Bạn đã hết lượt quay! </h3>
          <p>
            Vui lòng load lại trang để bắt đầu lại!
          </p>
        </Modal>
      </div>
    );
  }
}