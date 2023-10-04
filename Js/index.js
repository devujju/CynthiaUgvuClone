/*import LocomotiveScroll from 'locomotive-scroll';*/
var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});

function firstPageAnimation(){
    var tl=gsap.timeline();

    tl.from("#nav", {
        y:'-20',
        opacity:0,
        duration:1.5,
        ease:Expo.easeInOut
    })
    .to(".boundingelem", {
        y:0,
        duration:1.5,
        ease:Expo.easeInOut,
        delay:-1,
        stagger:0.2
    })
    .from("#hero-footer",{
        y:-10,
        opacity:0,
        duration:1.5,
        delay:-1,
        ease:Expo.easeInOut
    })
}

function circleMouseFollow(xscale, yscale){
    window.addEventListener("mousemove", function(details){
        this.document.querySelector("#miniCircle").style.transform=`translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

function circleChaptaKaro(){
    var xscale=1;
    var yscale=1;

    var xprev=0;
    var yprev=0;

    window.addEventListener("mousemove", function(details){
        this.clearTimeout(timeout)
        var xdiff=details.clientX-xprev;
        var ydiff=details.clientY-yprev;

        xscale=gsap.utils.clamp(.8,1.2,xdiff);
        yscale=gsap.utils.clamp(.8,1.2,ydiff);

        xprev=details.clientX;
        yprev=details.clientY;

       circleMouseFollow(xscale,yscale);

       timeout=this.setTimeout(function(){
        document.querySelector("#miniCircle").style.transform=`translate(${details.clientX}px, ${details.clientY}px) scale(1,1)`;
       }, 100);
    })
}

circleChaptaKaro();
circleMouseFollow();
firstPageAnimation();

document.querySelectorAll(".elem").forEach(function(elem){

    var rotate=0;
    var difrotate=0;

    elem.addEventListener("mouseleave", function(details){

        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease:Power3,
        });
    });

    elem.addEventListener("mousemove", function(details){

        var diff= details.clientY-elem.querySelector("img").getBoundingClientRect().top;
        difrotate=details.clientX-rotate;
        rotate=details.clientX;

        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power3,
            top:diff*0.5,
            left:details.clientX,
            rotate:gsap.utils.clamp(-20,15, difrotate)
        });
    });
});