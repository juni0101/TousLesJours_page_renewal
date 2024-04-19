// // 헤더 이벤트
$(document).ready(function () {
  var didScroll;
  var lastScrollTop = 0;

  var delta = 5; // 이벤트를 발생시킬 스크롤의 이동 범위

  $(window).scroll(function (event) {
    didScroll = true;
  });

  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250); // 스크롤이 멈춘 후 동작이 실행되기 까지의 딜레이

  function hasScrolled() {
    var st = $(this).scrollTop(); // 현재 window의 scrollTop 값
    var navbarHeight = $("header").outerHeight(); // header 높이 계산
    var windowWidth = $(window).width(); // 윈도우 너비 계산

    if (windowWidth > 767) {
      // delta로 설정한 값보다 많이 스크롤 되어야 실행된다.
      if (Math.abs(lastScrollTop - st) <= delta) return;

      if (st > lastScrollTop && st > navbarHeight) {
        // 스크롤을 내렸을 때
        $("header").addClass("header-hidden");
      } else {
        // 스크롤을 올렸을 때
        if (st + $(window).height() < $(document).height()) {
          $("header").removeClass("header-hidden");
        }
      }

      lastScrollTop = st; // 현재 멈춘 위치를 기준점으로 재설정
    }
  }
});

//sec1 - swiper slider
const swiper = new Swiper(".swiper", {
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//sec4,5 - scroll motion
const docEle = document.documentElement;
const sec4Image = document.querySelectorAll(".sec4-left img");
const sec4Text = document.querySelectorAll(
  ".sec4-right-1, .sec4-right-2,.sec4-right-button"
);
const notices = document.querySelectorAll(".notice1, .notice2, .notice3");

window.onscroll = function () {
  let st = docEle.scrollTop;
  animateElements(
    sec4Image,
    st,
    3200,
    "translateX(0px)",
    "translateX(-500px)",
    0
  );
  animateElements(
    sec4Text,
    st,
    3200,
    "translateX(-200px)",
    "translateX(400px)",
    0
  );
  animateElements(notices, st, 4050, "1", "0", 0);
};

function animateElements(
  elements,
  scrollTop,
  triggerPoint,
  inStyle,
  outStyle,
  outOpacity
) {
  elements.forEach((element) => {
    if (scrollTop > triggerPoint) {
      element.style.transform = inStyle;
      element.style.opacity = 1;
    } else {
      element.style.transform = outStyle;
      element.style.opacity = outOpacity;
    }
  });
}

// // quick menu
$(document).ready(function () {
  let quick = $("#quick");
  var currentPosition = parseInt(quick.css("top"));
  $(window).scroll(function () {
    var position = $(window).scrollTop();
    quick.stop().animate({ top: position + currentPosition + "px" }, 1000);
  });
});

var coll = document.getElementsByClassName("contentBx");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var sub = this.querySelector(".acc-sub");
    if (sub.style.display === "block") {
      sub.style.display = "none";
    } else {
      sub.style.display = "block";
    }
  });
}

// accordion 이벤트
$(function () {
  var group = $(".group");

  group.each(function () {
    var _group = new GroupBox(this);
  });

  // 사용자 정의 생성자 함수 정의
  function GroupBox(groupElement) {
    var box = $(groupElement).find(".box");
    var title = $(groupElement).find(".box .title a");

    box.each(function (idx) {
      var newBox = new RootBox(this);
      if (idx > 0) {
        newBox.siblingsClose();
      }
    });
  }

  // 사용자 정의 생성자 함수 정의
  function RootBox(boxElement) {
    var _this = this;
    var boxEl = $(boxElement);
    var target = $(boxEl).find(".title a");
    var cont = $(boxEl).find(".cont");

    // _groupParent = $(boxEl).parent();

    target.on("click", anchorClickEvent);

    function anchorClickEvent() {
      if (cont.is(":hidden")) {
        _this.open();
      } else {
        _this.close();
      }
    }

    _this.siblingsClose = function () {
      cont.css("display", "none");
    };

    _this.open = function () {
      cont.slideDown();
    };
    _this.close = function () {
      cont.slideUp();
    };
  }
});

// 모바일 메뉴바
const bar = document.querySelector("#bar");
const x = document.querySelector("#x");
const navMenu = document.querySelector(".g1");

bar.addEventListener("click", () => {
  bar.style.display = "none";
  x.style.display = "block";
  navMenu.style.display = "block";
});
x.addEventListener("click", () => {
  x.style.display = "none";
  bar.style.display = "block";
  navMenu.style.display = "none";
});
