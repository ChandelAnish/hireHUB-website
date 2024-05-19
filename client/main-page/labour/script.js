const darkbtn=document.querySelector('#flexSwitchCheckChecked')
const body=document.getElementsByTagName('body')[0]
const nav=document.getElementsByTagName('nav')[0]
const inputs=Array.from(document.getElementsByTagName('input'))
const jobcards=Array.from(document.querySelectorAll('.jobcard'))
const jobtitle=Array.from(document.querySelectorAll('.jobtitle'))
darkbtn.addEventListener('change',(evt)=>{
    if(evt.target.checked)
    {
        body.style.backgroundColor='#121721';
        nav.style.backgroundColor='rgb(14 41 12)';
        inputs.forEach(i => {
            i.style.backgroundColor='rgb(14, 41, 12)'
            i.style.color='white'
        });
        jobcards.forEach(i => {
            i.style.backgroundColor='rgb(14, 41, 12)'
        });
        jobtitle.forEach(i => {
            i.style.color="rgb(18 136 51 / 94%)"
        });
    }
    else
    {
        nav.style.backgroundColor='white';
        body.style.backgroundColor='rgb(243, 243, 243)';
        inputs.forEach(i => {
            i.style.backgroundColor='white'
            i.style.color='black'
        });
        jobcards.forEach(i => {
            i.style.backgroundColor='white'
        });
        jobtitle.forEach(i => {
            i.style.color="rgb(106 248 146 / 94%)"
        });
    }
})