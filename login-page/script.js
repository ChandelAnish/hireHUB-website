const slidebutton=document.querySelector("#slidebutton");
function changeSlide()
{
    setInterval(()=>{
        slidebutton.click();
    },3000)
}
changeSlide();