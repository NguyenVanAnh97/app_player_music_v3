const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $("header h2");
const cdthumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toogle-play");
const player = $(".player");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const preBtn = $(".btn-pre");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");

const app = {
  currentIndex: -1,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  songs: [
    {
      name: "Tòng phu",
      singer: "KEYO",
      path: "./assets/music/KEYO TONG PHU.mp3",
      image: "./assets/img/Tòng phu.jpg",
    },
    {
      name: "Bước Qua Nhau",
      singer: "Vũ",
      path: "./assets/music/Buoc Qua Nhau - Vu.mp3",
      image: "./assets/img/Bước Qua Nhau.jpg",
    },
    {
      name: "Chạy Khỏi Thế Giới Này",
      singer: "DaLab x Phương Ly",
      path: "./assets/music/Chay Khoi The Gioi Nay - Da LAB_ Phuong.mp3",
      image: "./assets/img/Chạy Khỏi Thế Giới Này.jpg",
    },
    {
      name: "Dang Dở",
      singer: "Nal",
      path: "./assets/music/Dang Do - Nal.mp3",
      image: "./assets/img/Dang Dở.jpg",
    },
    {
      name: "Muộn Rồi Mà Sao Còn",
      singer: "Sơn Tùng M-TP",
      path: "./assets/music/Muon Roi Ma Sao Con - Son Tung M-TP.mp3",
      image: "./assets/img/Muộn Rồi Mà Sao Còn.jpg",
    },
    {
      name: "Đập vỡ cây đàn",
      singer: "Quang Lê",
      path: "./assets/music/Dap Vo Cay Dan - Quang Le.mp3",
      image: "./assets/img/Đập Vỡ Cây Đàn.jpg",
    },
    {
      name: "Hạ Còn Vương Nắng",
      singer: "Raftaar",
      path: "./assets/music/Ha Con Vuong Nang - DatKaa.mp3",
      image: "./assets/img/Hạ Còn Vương Nắng.jpg",
    },
    {
      name: "Hayya Hayya Better Together",
      singer: "Trinidad",
      path: "./assets/music/Hayya Hayya Better Together_ - Trinidad.mp3",
      image: "./assets/img/Hayya Hayya.jpg",
    },
    {
      name: "Khi cô đơn em nhớ đến ai",
      singer: "Grey D x Suni",
      path: "./assets/music/Khi Co Don Em Nho Den Ai - Grey D_ Suni.mp3",
      image: "./assets/img/Khi Cô Đơn Em Nhớ Đến Ai.jpg",
    },
    {
      name: "Nàng thơ",
      singer: "Hoàng Dũng",
      path: "./assets/music/Nang Tho - Hoang Dung.mp3",
      image: "./assets/img/Nàng Thơ.jpg",
    },
    {
      name: "Nặng Tình Hay Nhẹ Lòng",
      singer: "Tống Gia Vỹ",
      path: "./assets/music/Nang Tinh Hay Nhe Long WRC Remix_ - ZIN.mp3",
      image: "./assets/img/Nặng Tình Hay Nhẹ Lòng.jpg",
    },
    {
      name: "Sài Gòn Đau Lòng Quá",
      singer: "HỨA KIM TUYỀN x HOÀNG DUYÊN",
      path: "./assets/music/Sai Gon Dau Long Qua - Hua Kim Tuyen_ Ho.mp3",
      image: "./assets/img/Sài Gòn Đau Lòng Quá.jpg",
    },
  ],

  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `<div class="song ${index === this.currentIndex ? 'active' : ''}">
    
      <div class="thumb" style="background-image: url('${song.image}')">
                   
        </div>
        <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
        </div>
        <div class="option">
            <i class="fas fa-ellipsis-h"></i>
        </div>
    </div>`;
    });

    $(".playlist").innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;
    // xử lí CD quay / dừng

    const cdThumbAnimate = cdthumb.animate(
      [
        {
          transform: "rotate(360deg)",
        },
      ],
      { duration: 10000, iterations: Infinity }
    );

    cdThumbAnimate.pause();

    //xử lí phóng to thu nhỏ cv
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const newcdWidth = cdWidth - scrollTop;

      //console.log("kích thức cd: " + cdWidth);
      //console.log("quận trang: " + scrollTop);
      //console.log("kêt quả:" + newcdWidth);

      cd.style.width = newcdWidth > 0 ? newcdWidth + "px" : 0;
      cd.style.opacity = newcdWidth / cdWidth;
    };
    //xử lí khi click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }

      //khi song đc play
      audio.onplay = function () {
        _this.isPlaying = true;
        player.classList.add("playing");
        cdThumbAnimate.play();
      };

      //khi song đc pause
      audio.onpause = function () {
        _this.isPlaying = false;
        player.classList.remove("playing");
        cdThumbAnimate.pause();
      };
    };

    //khi tiền độ bài hát thay đôi

    audio.ontimeupdate = function () {
      if (audio.duration) {
        //audio.duration độ dài của song được tính bằng giây
        //audio.currentTime trả về độ dài hiện tại của audio được tính bằng giây
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    //xử lí khi tua song
    progress.onchange = function (e) {
      audio.currentTime = (audio.duration / 100) * e.target.value;
    };

    //khi next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render()
    };

    //khi prev song
    preBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.preSong();
      }
      audio.play();
      _this.render()
    };
    // xử lí bật / tắt random
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      this.classList.toggle("active", _this.isRandom); // nếu isRandom = true thì add class active ko thì xóa đi (thay đổi được class và trạng thái của nút)
    };

    // xử lí lặp lại một song
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    //xử lí next song khi audio ended
    audio.onended = function () {
      if(_this.isRepeat){
        audio.play()
      }else {
        nextBtn.click()
      }
     
    };
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  preSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdthumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  start: function () {
    // định nghĩa các thuộc tính trong object
    this.defineProperties();

    //lắng nghe xử lí các sự kiện
    this.handleEvents();

    //next bài hát
    this.nextSong();

    //tải thông tin bài hất đầu tiền vào UI khi chạy ứng dụng
    this.loadCurrentSong();

    this.render();
  },
};

app.start();
