$(document).ready(()=>{
    $(".blossoms").ripples({
        //detail of ripple animation
        resolution: 520,

        //size of each ripple
        dropRadius: 30,

        //intensity of water distortion
        perturbance: 0.02,
    });

    setInterval(function () {
        
        //calculating random width and height in 'hero' section
        var $el = $(".blossoms");
        var x = Math.random() * $el.outerWidth();
        var y = Math.random() * $el.outerHeight();
        //how large ripple will be
        var dropRadius = 50;
        //random strength
        var strength = 0.04 + Math.random() * 0.04;

        $el.ripples("drop", x, y, dropRadius, strength);
    }, 2000);

    // flower follows mouse movement
  const flower = document.getElementById('flower');
  
  document.addEventListener('mousemove', (event) => {
    // mouse coor for flower position
    flower.style.left = `${event.pageX}px`;
    flower.style.top = `${event.pageY}px`;
  });
});