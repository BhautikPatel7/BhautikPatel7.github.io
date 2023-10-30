// Clear local storage
function clearLocalStorage() {
    localStorage.clear();
  }
  
  // Reload the page to start fresh
  function reloadPage() {
    location.reload(true);
  }
  
  // Clear local storage and then reload the page
  function clearLocalStorageAndReload() {
    clearLocalStorage();
    //reloadPage();
  }
  
  // Call the clearLocalStorageAndReload function to clear local storage and reload the page
  clearLocalStorageAndReload();
  
  // Your page content and other JavaScript code here
  
  // Clear cookies and local storage when the page is reloaded
  window.addEventListener("beforeunload", function () {
    // Clear cookies, local storage, and browser cache on page load
    clearAllCookies();
    clearLocalStorage();
    clearBrowserCache();
  });


  //nav menu 
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')
// Menu Show
// Chek Toggle Exists Or NOt
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

//Remove menu Form Mobile View
const navLink = document.querySelectorAll('.nav__link')
const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))
// Change Blur To Header
const blurHeader = () => {
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('blur-header')
        : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)
// ================Email Js====================
const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message')

const sendEmail = (e) => {
    e.preventDefault()
    // serviceID - templateID - #form - publicKey
    // service_9zzpfbi
    emailjs.sendForm('service_9zzpfbi', 'template_hi9l84r', '#contact-form', 'ErUzNtr0Do7hkJgqK')
        .then(() => {
            //Show Sent Massgae
            contactMessage.textContent = 'Message Sent Sucessfully 📤'
            //remove msg after 4 second
            setTimeout(() => {
                contactMessage.textContent = ''
            }, 4000)
            //clear Input Fields
            contactForm.reset()
        }, () => {
            // Show Error Message
            contactMessage.textContent = 'Message Not Sent(Server Error) 🗑️'
            setTimeout(() => {
                contactMessage.textContent = ''
            }, 4000)
        })
}
contactForm.addEventListener('submit', sendEmail)

// Show Scroll Up
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)
//Scroll Activation Link


const sections = document.querySelectorAll('section[id]')
const scrollActive = () =>{

    const scrollY = window.pageYOffset
    
    sections.forEach(current =>{
    
    const sectionHeight = current.offsetHeight,
    
            sectionTop= current.offsetTop - 58,
    
            sectionId = current.getAttribute('id'),
    
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId +']')

    
    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
    
            sectionsClass.classList.add('active-link')
    
    }else{
        sectionsClass.classList.remove('active-link')
    }
    

    
    })
}
    
    window.addEventListener('scroll', scrollActive)

    //++++++++++SCroll Revel Animation++++++++++++++++++++++//
    const sr = ScrollReveal({
        origin:'top',
        distance:'60px',
        duration: 2500,
        delay:400,
        reset:true
    })
    sr.reveal(`.home__data, .home__social, .contact__container,.footer__container`)
    sr.reveal(`.home__image`,{origin:'bottom'} )
    sr.reveal(`.about__data,.skills__data`,{origin:'left'} )
    sr.reveal(`.about__image,.skills__contents`,{origin:'right'} )
    sr.reveal(`.services__card,.projects__card`,{interval: 100} )
    sr.reveal(`.education__card`,{origin:'right'} )
    sr.reveal(`.education__card`,{origin:'right'} )


  
  // Optional: You can also clear cookies and local storage when the page is closed
  // window.addEventListener("unload", function () {
  //   clearAllCookies();
  //   clearLocalStorage();
  // });
  

