const image1 = document.querySelector("#page1_black_image img"); 
const image2 = document.querySelector("#page1_black_image2 img");
const image3 = document.querySelector("#page1_container_center_image");
const page1 = document.querySelector("#page1"); 

page1.addEventListener("mousemove", function(e) {
  let x = (e.clientX - window.innerWidth / 2) * 0.02;
  let y = (e.clientY - window.innerHeight / 2) * 0.02;

  image1.style.transform = `translate(${x}px, ${y}px)`;
  image2.style.transform = `translate(${x * -1}px, ${y * -1}px)`;
  image3.style.transform = `translate(${x * -1}px, ${y * -1}px)`;
});
if (window.DeviceMotionEvent) {
let lastX, lastY, lastZ;
let shakeThreshold = 5; // tweak this if needed

window.addEventListener("devicemotion", function(e) {
    let acc = e.accelerationIncludingGravity;
    if (!acc) return;

    let x = acc.x+10;
    let y = acc.y+10;
    let z = acc.z+10;

    if (lastX !== null) {
        let deltaX = Math.abs(x - lastX);
        let deltaY = Math.abs(y - lastY);
        let deltaZ = Math.abs(z - lastZ);

        if ((deltaX + deltaY + deltaZ) > shakeThreshold) {
            // 🎯 Shake detected – apply animation to image3
            image3.style.transition = "transform 0.3s ease";
            image3.style.transform = "translate(10px, -10px)";
            setTimeout(() => {
                image3.style.transform = "translate(0px, 0px)";
            }, 300);
        }
    }

    lastX = x;
    lastY = y;
    lastZ = z;
});
}


const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#page1",     // animation starts when page2 enters viewport
    start: "top 0%",
    end: "top -300%",
    scrub: 2,
  //   markers: true ,// remove in production,
    pin:true
  }
});

// Animate multiple things in sequence

tl.to("#page1_transition",{ 
  opacity:1, 
  height:"300px",
  borderRadius:"100px", 
  width:"200px",
 
},"a")
tl.to("#page1_layer2 .page1_box:nth-child(1)", {
  backgroundColor: "black",
  opacity:0.5,
  duration: 1,
  delay: 1
},"a");
tl.to("#page1_layer2 .page1_box:nth-child(3)", {
  backgroundColor: "black",
  opacity:0.5,
  duration: 1,
  delay: 1
},"a");
tl.to("#page1_layer2 .page1_box:nth-child(1)", {
   y:"-100vh",
   duration:2,
   dealy:1
},"b");
tl.to("#page1_layer2 .page1_box:nth-child(3)", {
    y:"100vh",
    duration:2,
    dealy:1
},"b");
tl.to("#page1_transition", {
   scale:8,
   duration:2,
   zIndex:99999,
   dealy:1
},"b");
tl.to("#page1_transition #transition_images , #lastly_page1_image_shift , #page1_last_elements , #founder_page1", {
   
   duration:2,
   opacity:1,
   zIndex:99999,
   dealy:1.2
},"b");





document.querySelector("#page2_block").addEventListener("click", () => {
  document.querySelector("#page2_text_popup").style.bottom="0",
  document.querySelector("#page2_block").style.display="none"
})

document.querySelector("#page2_angle1").addEventListener("mouseenter", () => {
  document.querySelector("#page2_angle11").style.opacity=1
}) 
document.querySelector("#page2_angle1").addEventListener("mouseleave", () => {
  document.querySelector("#page2_angle11").style.opacity=0
}) 



document.querySelector("#page2_angle2").addEventListener("mouseenter", () => {
  document.querySelector("#page2_angle22").style.opacity=1
}) 
document.querySelector("#page2_angle2").addEventListener("mouseleave", () => {
  document.querySelector("#page2_angle22").style.opacity=0
}) 

document.querySelector("#page2_angle3").addEventListener("mouseenter", () => {
  document.querySelector("#page2_angle33").style.opacity=1
}) 
document.querySelector("#page2_angle3").addEventListener("mouseleave", () => {
  document.querySelector("#page2_angle33").style.opacity=0
}) 


document.querySelector("#page2_angle4").addEventListener("mouseenter", () => {
  document.querySelector("#page2_angle44").style.opacity=1
}) 
document.querySelector("#page2_angle4").addEventListener("mouseleave", () => {
  document.querySelector("#page2_angle44").style.opacity=0
}) 


// page  3
const t2 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page3",     // animation starts when page2 enters viewport
    start: "top 0%",
    end: "top -300%",
    scrub: 2,
    // markers: true ,// remove in production,
    pin:true
  }
});

t2.to("#page_transition2", {
  
  delay:2,
  scale:8, 
  duration:2
},"a")
t2.to("#page_transition2 p", {
   delay:1,
   duration:1,
   opacity:1
},"a1")
t2.to("#page_tran", {
  
  delay:2,
  opacity:0, 
  duration:2
},"b")

const inner = document.querySelector(".cursor.inner");
const middle = document.querySelector(".cursor.middle");
const outer = document.querySelector(".cursor.outer");

let mouseX = 0, mouseY = 0;
let midX = 0, midY = 0;
let outX = 0, outY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  inner.style.left = `${mouseX}px`;
  inner.style.top = `${mouseY}px`;
});

function animate() {
  // Smooth trailing
  midX += (mouseX - midX) * 0.15;
  midY += (mouseY - midY) * 0.15;
  outX += (mouseX - outX) * 0.08;
  outY += (mouseY - outY) * 0.08;

  middle.style.left = `${midX}px`;
  middle.style.top = `${midY}px`;
  outer.style.left = `${outX}px`;
  outer.style.top = `${outY}px`;

  requestAnimationFrame(animate);
}
animate();

// Optional: click effect (scale on click)
document.addEventListener("mousedown", () => {
  inner.style.transform = "translate(-50%, -50%) scale(0.8)";
  middle.style.transform = "translate(-50%, -50%) scale(1.3)";
  outer.style.transform = "translate(-50%, -50%) scale(1.6)";
});
document.addEventListener("mouseup", () => {
  inner.style.transform = "translate(-50%, -50%) scale(1)";
  middle.style.transform = "translate(-50%, -50%) scale(1)";
  outer.style.transform = "translate(-50%, -50%) scale(1)";
});

