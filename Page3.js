document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Header loop animation
  const header = document.querySelector('.page3-header');
  if (header) {
    header.innerHTML += header.innerHTML;
    gsap.to(header, {
      xPercent: -50,
      duration: 60,
      ease: "none",
      repeat: -1,
      modifiers: {
        xPercent: gsap.utils.wrap(-50, 0)
      }
    });
  }

  // Circle animation
  document.querySelectorAll(".page3-blur-circle").forEach((circle, i) => {
    gsap.to(circle, {
      opacity: 1,
      duration: 0.5,
      delay: i * 0.2,
      ease: "power2.inOut"
    });

    const moveCircle = () => {
      const { innerWidth: vw, innerHeight: vh } = window;
      const maxX = vw - 150;
      const maxY = vh - 150;
      return gsap.timeline({ repeat: -1 })
        .to(circle, {
          x: gsap.utils.random(-maxX, maxX),
          y: gsap.utils.random(-maxY, maxY),
          duration: 8
        })
        .to(circle, {
          x: gsap.utils.random(-maxX, maxX),
          y: gsap.utils.random(-maxY, maxY),
          duration: 6
        })
        .to(circle, {
          x: 0,
          y: 0,
          duration: 4
        });
    };

    let circleAnimation = moveCircle();
    window.addEventListener('resize', () => {
      circleAnimation.kill();
      circleAnimation = moveCircle();
    });
  });

  // Card data
  const cardData = [
    {
      img: "public/trian1.png",
      title: "Performance Matters",
      desc: "Lightning fast performance"
    },
    {
      img: "public/train2.png",
      title: "Immersive Experience",
      desc: "Feel the virtual world"
    },
    {
      img: "public/train3.png",
      title: "Futuristic Designs",
      desc: "Aesthetic and functional"
    }
  ];

  // Function to create a card
  const createCard = (data, i) => {
    const card = document.createElement("div");
    card.className = `page3_card_container page3_card_container_${i + 1}`;
    card.innerHTML = `
      <div class="page3_card">
        <img src="${data.img}" alt="card image" class="page3-card-img" />
        <div class="page3-triangles">
          <svg viewBox="0 0 100 100">
            <polygon class="page3-white-tri-1" points="50,30 30,70 70,70" transform="translate(-15,-5)"/>
            <polygon class="page3-white-tri-2" points="50,30 30,70 70,70" transform="translate(15,-5)"/>
            <polygon class="page3-white-tri-3" points="50,30 30,70 70,70" transform="translate(0,10)"/>
            <polygon class="page3-pink-tri" points="50,40 40,60 60,60"/>
          </svg>
        </div>
      </div>
      <div class="page3-text">
        <h3>${data.title}</h3>
        <p>${data.desc}</p>
      </div>`;
    return card;
  };

  // Append cards and animate after they're added
  const cardsContainer = document.getElementById("page3_cards");
  if (cardsContainer) {
    cardData.forEach((data, i) => {
      cardsContainer.appendChild(createCard(data, i));
    });

    // Animate each card
    document.querySelectorAll(".page3_card_container").forEach((container) => {
      const card = container.querySelector(".page3_card");
      const title = container.querySelector("h3");
      const paragraph = container.querySelector("p");

      gsap.set([card, title, paragraph], {
        y: 30,
        opacity: 0,
        rotationX: 15,
        scale: 0.95,
        filter: "saturate(0.7)"
      });
      gsap.set(card, { y: 100 });

      const cardTL = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "top 50%",
          scrub: 0.3
        }
      });

      cardTL
        .to(card, { y: 0, opacity: 1, rotationX: 0, scale: 1, filter: "saturate(1)", duration: 0.6 })
        .to(title, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }, "-=0.2")
        .to(paragraph, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }, "-=0.2");

      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -10, scale: 1.02, duration: 0.3 });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, scale: 1, duration: 0.3 });
      });
    });
  }

  // VR Text animation
  const vrText = document.querySelector('.page3-vr-text');
  if (vrText) {
    const lines = [
      "Designed to feel the",
      "extreme experiences",
      "of virtual reality to",
      "dive deep onto the",
      "heaven."
    ];

    vrText.innerHTML = lines.map(line =>
      `<span class="page3-text-line">${line.replace(/./g, c =>
        `<span class="page3-char">${c === ' ' ? '\u00A0' : c}</span>`
      )}</span><br>`
    ).join('');

    gsap.from('.page3-char', {
      opacity: 0,
      y: 50,
      stagger: 0.01,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.page3-vr-content',
        start: "top 80%",
        end: "top 30%"
      }
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: '.page3-middle-text',
        start: 'top 60%',
        end: 'bottom 20%',
        scrub: true
      }
    }).to('.page3-char', {
      color: "#000000",
      stagger: { amount: 1.5 },
      duration: 1
    });
  }

  // Nature section text and line animation
  gsap.from(['.page3-real-world-text', '.page3-far-away-text'], {
    x: (i) => i === 0 ? -100 : 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    delay: (i) => i * 0.2,
    scrollTrigger: {
      trigger: '.page3-nature-section',
      start: "top 70%"
    }
  });

  gsap.from('.page3-horizontal-line', {
    scaleX: 0,
    duration: 1.5,
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: '.page3-nature-section',
      start: "top 60%"
    }
  });

  gsap.from('.page3-s-letter', {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: '.page3-cube-virtual-text',
      start: "top 80%"
    }
  });

  gsap.from(['.page3-cube-text', '.page3-virtual-text'], {
    x: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.page3-cube-virtual-text',
      start: "top 80%"
    }
  });

  // Refresh scroll triggers after everything is set up
  ScrollTrigger.refresh();
});
