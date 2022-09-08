const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $("header h2");
const cdthumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toogle-play");
const player = $(".player");

const app = {
  currentIndex: 0,
  isPlaying: false,
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
    const htmls = this.songs.map((song) => {
      return `<div class="song">
    
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
      };

      //khi song đc pause
      audio.onpause = function () {
        _this.isPlaying = false;
        player.classList.remove("playing");
      };
    };
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

    //tải thông tin bài hất đầu tiền vào UI khi chạy ứng dụng

    this.loadCurrentSong();

    this.render();
  },
};

app.start();
