const body = document.querySelector(".body");
const header = document.querySelector(".header");

function handleHamburger(){
    let btnhamburger = document.querySelector(".hamburger");
    let navMoblie = document.querySelector(".navMobile");
    
    btnhamburger.addEventListener('click', function(){
        btnhamburger.classList.toggle('--close');  
        navMoblie.classList.toggle('--show');
        body.classList.toggle('--disable-scroll');
        header.classList.remove('--addbg');
    })
}
handleHamburger()

function handleVideo(){
    let video = document.querySelector(".getstart__img");
    let popupVideo = document.querySelector(".popupvideo");
    let iframeVideo = document.querySelector(".popupvideo__inner-iframe iframe ")
    let closeVideo = document.querySelector(".video__close");
    if(video === null){
        return ; 
    }
    else{
        video.addEventListener('click', function(e){
            e.stopPropagation();
            popupVideo.classList.toggle("--show");
            let idData = video.getAttribute('data-videoBanner');
            iframeVideo.setAttribute('src', `https://www.youtube.com/embed/${idData}?autoplay=1`)
        })
        closeVideo.addEventListener('click', function () {
            popupVideo.classList.remove('--show');
            iframeVideo.setAttribute('src', '');
        })
    
        document.addEventListener('click', function () {
            popupVideo.classList.remove('--show');
            iframeVideo.setAttribute('src', '');
        })
    }
  
}
handleVideo();

// CAROUSEL
function handleFluckity(){
    let card = document.querySelector(".usersay .carousel");
    if(!card)return;
    let flktySlider = new FlickityResponsive(
        card,{
            wrapAround: true,
            cellAlign: "center",
            contain: true,
            draggable: '>1',
            groupCells: 2,
            initialIndex: 0,
            lazyLoad: 2,
            prevNextButtons: false,
            on: {
                ready: function() {
                //   console.log('Flickity is ready');
                handleHeight();
                
                },
                change: function(index) {
                  console.log( 'Slide changed to' + index );                 
                }
              },  
            responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            groupCells: 1,
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            cellAlign: "left"
                        }
                    }
            ]
        }           
    );
    function handleHeight(){
        const cells = document.querySelectorAll(".usersay .carousel .carousel-cell");
        let comments = document.querySelectorAll(".comment")
        let maxH = 0;

        cells.forEach(function(e){
            let text = e.querySelector(".comment");
            let heightText = text.offsetHeight;
            maxH = Math.max(maxH, heightText);
        })

        comments.forEach(function(comment) {
            comment.style.height = null;
        });

        const maxHeight = Math.max(...[...cells].map(v => {
            let text = v.querySelector(".comment");
            return text.offsetHeight
        }))
        
        comments.forEach(function(comment) {
            comment.style.height = `${maxHeight}px`;
        });


    }
    window.addEventListener('resize', () =>{
        flktySlider?.resize()
        handleHeight()
    })
}
handleFluckity();

// BACK TO TOP
function backtotop(){
    let btnBackToTop = document.querySelector(".backtotop");
    if(!btnBackToTop) return;
    document.addEventListener('scroll', function() {
        let scrollY = window.scrollY;
        if( (body.scrollHeight)/2 < scrollY) {
            btnBackToTop.classList.add('active');
        } else {
            btnBackToTop.classList.remove('active');
        }
    })
    btnBackToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
}
backtotop();

function handleBGHeader(){
    let title = document.querySelector("h1");
    document.addEventListener('scroll', function() {
        let heightHero = title.clientHeight  + 100;
        let scrollY = window.scrollY;
        if( heightHero < scrollY) {
            header.classList.add('--addbg');
        } else {
            header.classList.remove('--addbg');
        }
    })
}
handleBGHeader();
// LOADING IMAGE ALL PAGE
function loadingPage(){
    let count = 0;
    let imgs = document.querySelectorAll('img').length;
    let contain = document.querySelector('body');
    
    let imgsLoad = imagesLoaded(contain);

    imgsLoad.on('progress',(instance) =>{
        count++;
        percent = Math.floor((count / imgs) * 100);
        // console.log(percent);
        handleLoading(percent)
    }).on('always', (instance) =>{
        console.log('always');
    }).on('fail', (instance)=>{
        console.log('fail');
    }).on('done', (instance)=>{
        console.log('done');
        hiddenLoading();
    });
}

function handleLoading(percent){
    const progress = document.querySelector(".loading__inner-progress");
    let textPercent = document.querySelector(".loading__text");
    if(!progress) return;
    progress.style.width = `${percent}%`;
    textPercent.innerHTML = `${percent}%`
}

function hiddenLoading(){
    const loading = document.querySelector(".loading");
    const body = document.querySelector("body");
    if(!loading) return;

    loading.classList.add('--is-loaded');

    body.classList.remove('--disable-scroll');

}
loadingPage();



// PROGRESS BAR
function progressBar() {
    let progressbar = document.querySelector('.progressbar');
    if(!progressbar) return;
    // console.log(progressbar);
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        let height = document.body.offsetHeight - window.innerHeight;

        let percent = (scrollY / height) * 100;
        progressbar.style.width = `${percent}%`;  
       
    });
}

// TABS BLOG
function handleTab(){
    let tabs = document.querySelectorAll(".posts .textboxFlex .tabs .tab");
    let listTab = document.querySelectorAll(".posts .posts__list");
    // if(!tabs) return;
    // if(!listTab) return;
    tabs.forEach(function (tab) {
        tab.addEventListener('click',function(){

            tabs.forEach(function(tab){
                tab.classList.remove('--active')
            })
            tab.classList.add('--active');
            listTab.forEach(function(i){
                i.classList.remove('--active');
            })
            let idDataTab = tab.getAttribute('dataTab')
            console.log(idDataTab)
            document.querySelector('.list-' + idDataTab).classList.add('--active');
        })
        
        
    })
}
handleTab();


// VADIDATE FORM
function handleValidate() {
    const form = document.querySelector(".getintouch__form");
    const name = document.querySelector("#fullname");
    const email = document.querySelector("#email");
    const subject = document.querySelector("#subject");
    const message = document.querySelector("#textarea");
    if(!form) return;
    // VALIDATE EMAIL
    function isEemail(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(value);
    }

    // GET PARENT
    function getParentElement (element, selector) {
		while (element.parentElement) {
		  if (element.parentElement.matches(selector)) {
			return element.parentElement;
		  }
		  element = element.parentElement;
		}
	  }

     // ERROR
    function handleError(input, textError = '') {
        const parentElement = getParentElement(input, '.form__group');

        let error = parentElement.querySelector('.error');
        if(textError!=''){
            error.innerHTML = textError;
            input.classList.add("--formError");
        }
        else{
            error.innerHTML = textError;
            input.classList.remove("--formError");
        }
    }
   
    function checkForm(){
        // NAME
        const valueName = name.value.trim();
        if(valueName == ''){
           handleError(name,"Please fill in this field");
        }
        else{
            handleError(name);
        }
        
        // EMAIL
        const valueEmail = email.value.trim();
        if(valueEmail == ''){
            handleError(email,"Please fill in this field");
        }else if(!isEemail(valueEmail)){
            handleError(email,"Invalid email");
        }
        else{
            handleError(email);
        }

        // SUBJECT
        const valueSubject = subject.value.trim();
        if(valueSubject == ''){
           handleError(subject,"Please fill in this field");
        }
        else{
            handleError(subject);
        }

        // MESSAGE
        const valueMessage = message.value.trim();
        if(valueMessage == ''){
           handleError(message,"Please fill in this field");
        }
        else{
            handleError(message);
        }
    }  

    // SUBMIT FORM
    form.addEventListener('submit', function (e){
        e.preventDefault();

        checkForm();
    })  

}
handleValidate();


//  ACCORDION   
function accordion () {
    let accordion = document.querySelectorAll(".accordion__content");
    const plus = document.querySelectorAll('.accordion__content .accordion__content-title span')
    accordion.forEach(function (item, index){

        item.addEventListener('click', function(){
            accordion.forEach(function(e, _index){
                if(index === _index) return
                // e.classList.remove('--show');
                e.lastElementChild.style.maxHeight = null;
                
                const title = e.firstElementChild;
                const span = title.lastElementChild;
                span.classList.remove('--removeicon');
                
            })
            this.firstElementChild.lastElementChild.classList.toggle('--removeicon')
            
            let text = this.lastElementChild;
            if(text.style.maxHeight){
                text.style.maxHeight = null;
            }   
            else{
                text.style.maxHeight = text.scrollHeight + "px";
            }      
        })
    })
}
accordion()

// VALIDATE BLOG SUBSCRIBE
function handleSubscribeBlog() {
    const form = document.querySelector(".subscribe__form");
    const  emailInput = document.querySelector(".subscribe__form .subscribe__form-input");
    const  errorElement = document.querySelector(".subscribe__form .error");
    if(!form) return;
    // VALIDATE EMAIL
    function isEemail(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(value);
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
    
        const emailValue = emailInput.value;
        if (!isEemail(emailValue)) {
          errorElement.textContent = "Please enter a valid email address";
          form.classList.add('--formerror');
          return;
        }
        else{
            form.reset();

            form.classList.remove('--formerror');
            errorElement.textContent = "";
        }
        alert("SUBSCRIBE SUCCESSFUL!");

    });
}
handleSubscribeBlog();

function handleActiveTabs(){
    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => {
        t.classList.remove('--tabActive');
      });
      tab.classList.add('--tabActive');
    });
  });

}
handleActiveTabs();

window.addEventListener("resize", function(){
    handleFluckity();

})
window.addEventListener('load',function(){

    progressBar() ;
})



