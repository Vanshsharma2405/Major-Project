import '../styles/style.css';  
import Lenis from 'lenis';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from 'swiper';
import 'swiper/css';

gsap.registerPlugin(ScrollTrigger);

var swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto", // or use a number like 3 or 4
  spaceBetween: -50,
  freeMode: true, // Enable free scrolling
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
let cursr = document.querySelector("#cursor");
let footer = document.querySelector('footer');
let page1 = document.querySelector("#page1");
let pageImg = document.querySelector("#page2 .promo img");
let promoVid = document.querySelector("#page2 .promo video");
page1.addEventListener("mousemove",function(dets){
          gsap.to(cursr,{
            x: dets.x,
            y: dets.y,
            duration:.7,
            ease: "back.out",
          })
})
footer.addEventListener("mouseenter", () => {
  cursr.style.display = "none";
  cursr.style.scale = 0;
  cursr.style.opacity = 0;
});
footer.addEventListener("mouseleave", () => {
  cursr.style.display = "initial";
  cursr.style.scale = 1;
  cursr.style.opacity = 1;
});
page1.addEventListener("mouseenter", () => {
  cursr.style.display = "initial";
  cursr.style.scale = 1;
  cursr.style.opacity = 1;
});
page1.addEventListener("mouseleave", () => {
  cursr.style.display = "none";
  cursr.style.scale = 0;
  cursr.style.opacity = 0;
});

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
let tl = gsap.timeline();
// let tl3 = gsap.timeline();
//loader animation
// var tl2 = gsap.timeline();
function loaderAnimation() {
  // Disable scrolling by adding the no-scroll class
  document.body.classList.add('no-scroll');

  // Animate the text elements
  tl.from('#loader h3', {
    x: 40,
    opacity: 0,
    delay: .5,
    duration: 1,
    stagger: 0.1,
  });

  // After loading is complete
  tl.to('#loader h3', {
    opacity: 0,
    duration: 1,
    stagger: -0.1,
    delay: 1,
  });

  // Hide the loading bar and text
  tl.to('#loader', {
    opacity: 0,
    duration: 0.5,
  }, "-=0.5");

  // Finally hide the entire loader
  tl.to('.loading', {
    duration: 1,
    ease: "power2.inOut",
    opacity: 0,
    onComplete: function() {
      // Remove no-scroll class to enable scrolling
      document.body.classList.remove('no-scroll');
      // Hide loader completely
      document.querySelector('.loading').style.display = 'none';
    },
  });
}
loaderAnimation();
//landing page animation
function landingPageAnimation() {
  tl.from("#page1-part1 h1 span", {
    duration: 1,
    opacity: 0,
    y: 100,
    ease: "back.out",
    stagger: .1,
  });
  tl.from("#page1-part1 img", {
    duration: 1,
    opacity: 0,
    scale: 1,
    ease: "power2.out",
    stagger: 0.1,
  });
}
landingPageAnimation();

// page2 animation
// function page2Animation() {
//   pageImg.addEventListener('mouseenter',() => {
//     promoVid.play();
//     pageImg.style.display = "none";
//     promoVid.style.display = "initial";
//     promoVid.style.scale = "1";
//   })
//   pageImg.addEventListener('mouseleave',() => {
//     promoVid.pause();
//     pageImg.style.display = "initial";
//     promoVid.style.display = "none";
//     promoVid.currentTime = 0;
//   })
// }
// page2Animation();

// Navbar scroll feature
function navBarScrollAnimation() {
  let lastScrollTop = 0;
  window.addEventListener("scroll", function() {
    let navbar = document.querySelector("nav");
    let currentScroll = window.pageYOffset;
    if (currentScroll > lastScrollTop) {
      navbar.style.top = "-60px"; // Hide navbar
    } else {
      navbar.style.top = "0"; // Show navbar
    }
    lastScrollTop = currentScroll;
  });
}
navBarScrollAnimation();



// Promo play button functionality
let flag = 0;
let shop = document.querySelector("#shop");
let cartBtn = document.querySelector(".cart");

const promo = document.querySelector('.promo');
    const follower = document.getElementById('mouseFollower');

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let animationFrame;

    function animateFollower() {
      const speed = 0.1;
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      follower.style.left = `${currentX}px`;
      follower.style.top = `${currentY}px`;

      animationFrame = requestAnimationFrame(animateFollower);
    }

    function updateTargetPosition(e) {
      const rect = imageA.getBoundingClientRect();
      mouseX = e.clientX - rect.left - follower.offsetWidth / 2;
      mouseY = e.clientY - rect.top - follower.offsetHeight / 2;
    }

    imageA.addEventListener('mouseenter', (e) => {
      follower.classList.add('active');
      updateTargetPosition(e);
      cancelAnimationFrame(animationFrame);
      animateFollower();
    });

    imageA.addEventListener('mousemove', (e) => {
      updateTargetPosition(e);
    });

    imageA.addEventListener('mouseleave', () => {
      follower.classList.remove('active');
      cancelAnimationFrame(animationFrame);
    });

// Animation for promo video
// tl.from("#promo video",{
//     duration: 1.5,
//     opacity: 0,
//     y: 100,
//     ease: "power5.out",
//     delay:.5,
//     stagger:5,
//     scrollTrigger:{
//         trigger:"#promo",
//         start:"top 80%",
//         end:"top 50%",
//         scrub:1,
//     }
// })

// Animation for promo text and button

// JSON data for shoe cards
// let shoeCard = [
//   {
//     name:"Nike Cortez Leather",
//     gender:"Women's shoe",
//     image:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/236a53ed-106f-44bb-855d-05abab45f414/W+NIKE+CORTEZ.png",
//     price:139
//   },
//   {
//     name:"Nike Dunk Low Retro",
//     gender:"Men's shoe",
//     image:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/dbd2620b-a99f-4279-97db-0344edf84e31/NIKE+DUNK+LOW+RETRO.png",
//     price:165
//   },
//   {
//     name:"Nike Cortez",
//     gender:"Women's shoe",
//     image:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c7ef8fe0-cdbd-4033-b613-debf06a95aa7/W+NIKE+CORTEZ.png",
//     price:145
//   },
//   {
//     name:"Sabrina 2 'Stronger Than Gold' EP",
//     gender:"Basketball shoe",
//     image:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png",
//     price:219
//   },
//   {
//     name:"Sabrina 2 'Stronger Than Gold' EP",
//     gender:"Basketball shoe",
//     image:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6ee3bfc0-d21d-4315-a989-4abf91e18ade/JORDAN+TATUM+3+PF.png",
//     price:219
//   },
//   {
//     name:"Sabrina 2 'Stronger Than Gold' EP",
//     gender:"Basketball shoe",
//     image:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png",
//     price:219
//   },
//   {
//     name:"Sabrina 2 'Stronger Than Gold' EP",
//     gender:"Basketball shoe",
//     image:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png",
//     price:219
//   },
//   {
//     name:"Sabrina 2 'Stronger Than Gold' EP",
//     gender:"Basketball shoe",
//     image:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png",
//     price:219
//   },
//   {
//     name:"Sabrina 2 'Stronger Than Gold' EP",
//     gender:"Basketball shoe",
//     image:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png",
//     price:219
//   },
//   {
//     name:"Sabrina 2 'Stronger Than Gold' EP",
//     gender:"Basketball shoe",
//     image:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png",
//     price:219
//   },
//   {
//     name:"Sabrina 2 'Stronger Than Gold' EP",
//     gender:"Basketball shoe",
//     image:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png",
//     price:219
//   },
//   {
//     name:"Sabrina 2 'Stronger Than Gold' EP",
//     gender:"Basketball shoe",
//     image:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png",
//     price:219
//   },
// ];

// // Generate HTML for shoe cards
// var sum = '';
// shoeCard.forEach((elem) => {
//   sum += `
//   <div class="swiper-slide">
//    <div class="trend-card">
//         <div class="card-upper">
//               <img loading="lazy" src="${elem.image}" alt="">
//         </div>
//             <div class="card-lower">
//                 <h3>${elem.name}</h3>
//                 <h3 class="gender">${elem.gender}</h3>
//                 <h3 class="price">$${elem.price}</h3>
//             </div>
//     </div>
//   </div>
//   `
// })


// var trending = document.querySelector("#page3 .mySwiper");
// trending.innerHTML = sum;

let twitterIcon = document.querySelector(".social-icons #twitter");
let facebookIcon = document.querySelector(".social-icons #facebook");
let instagramIcon = document.querySelector(".social-icons #instagram");
let youtubeIcon = document.querySelector(".social-icons #youtube");
twitterIcon.addEventListener('click', () => {
  location.href = "https://twitter.com/Nike";
});
facebookIcon.addEventListener('click', () => {
  location.href = "https://www.facebook.com/Nike/";
});
instagramIcon.addEventListener('click', () => {
  location.href = "https://www.instagram.com/nike/";
});
youtubeIcon.addEventListener('click', () => {
  location.href = "https://www.youtube.com/@nike";
});
let trendingBtn = document.querySelector("#page4 .page4-grid #image-a-content button");
trendingBtn.addEventListener('mouseenter', () => {
  cursr.style.display = "none";
  cursr.style.opacity = "0";
});
trendingBtn.addEventListener('mouseleave', () => {
  cursr.style.display = "initial";
  cursr.style.opacity = "1";
});
function cartHoverDesgin(){
  cartBtn.addEventListener('mouseenter',() => {
    cartBtn.style.backgroundColor = "#111";
    cartBtn.style.color = "#fff";
    cartBtn.style.scale = "1";
    cartBtn.style.padding = "5px"
    cartBtn.style.borderRadius = "50%";
    cartBtn.style.transition = "all 0.3s ease-in-out";
  })
  cartBtn.addEventListener('mouseleave',() => {
    cartBtn.style.backgroundColor = "#fff";
    cartBtn.style.color = "#111";
    cartBtn.style.scale = "1";

  })
}
cartHoverDesgin();




