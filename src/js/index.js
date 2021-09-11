'use strict'

document.addEventListener('DOMContentLoaded', () => {
   // burger
   const burgerBtn = document.querySelector('.burger__icon');
   const burgerPopup = document.querySelector('.burger__popup');

   burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.toggle('burger__icon_active');
      burgerPopup.classList.toggle('active');
      if(burgerPopup.classList.contains('active')){
         body.style.overflow = 'hidden';
      }else{
         body.style.overflow = 'auto';
      }
   });

   // modal
   const modalBtn = document.querySelector('.hero__content-btn');
   const popup = document.querySelector('.popup');
   const closeBtn = document.querySelector('.modal__close');
   const body = document.querySelector('body');
   const bodyWith = body.clientWidth;

   modalBtn.addEventListener('click', () => {
      popup.classList.add('popup__active');
      body.style.overflow = 'hidden';
      const scrollWidth = body.clientWidth - bodyWith;
      body.style.marginRight = scrollWidth + 'px';
   })

   closeBtn.addEventListener('click', () => {
      popup.classList.remove('popup__active');
      body.style.overflow = 'auto';
      body.style.marginRight = '0';
   });

   // * FORMS

   const form = document.querySelector('form');
	const messages = {
		loading: 'Загрузка...',
		success: 'Всё прошло успешно!',
		failure: 'Что-то пошло не так...'
  };

	function alertMessage(message, time){
		const msg = document.createElement('div');
     
      msg.style.cssText = `
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         width: 256px;
         padding: 30px;
         background: #fff;
         border: 1px solid #ccc;
         font-size: 12px;
         text-align: center;
         margin-bottom: 3px;
      `;

      msg.innerHTML = `
         <p>
            ${message}
         </p>
      `;
      

      document.querySelector('.popup').appendChild(msg)

      if(time){
         setTimeout(() => {
            popup.classList.remove('popup__active');
            msg.remove();
         }, time)
      }else{
         const msgBtn = document.createElement('button');
         msgBtn.classList.add('btn');
         msgBtn.style.cssText = `
            margin: 10px;
         `;
         
         msg.appendChild(msgBtn)
         msgBtn.innerText = 'Return';
         msgBtn.addEventListener('click', () => {
            msg.remove();
         });
      }
   }

   // * check email validation 

   function postData(url = ''){
		const formData = new FormData(form);
		let object = {};
		formData.forEach((value, key) => {
			object[key] = value;
		});

      
      let loadingMsg = document.createElement('p');
      loadingMsg.style.textContent = messages.loading;
      loadingMsg.style.cssText = `
         display: block;
         margin: 0 auto;
      `;
      
      form.appendChild(loadingMsg);

      fetch(url, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(object)
      })
      .then(data => {
         alertMessage(messages.success, 3000);
         loadingMsg.remove()
      }).catch(() => {
         alertMessage(messages.failure, null);
      }).finally(() => {
         form.reset();
 
      });
      
   }

   form.addEventListener('submit', (e) => {
      e.preventDefault();
      postData('http://localhost:3000/users')
   });
   

   // header 
   const littleMenu = document.querySelector('.recipes__menu');
   const navLinks = document.querySelectorAll('.menu__link');

   // navlinks 
   function clearClassList (parentEl, activeClass){
      parentEl.forEach(link => link.classList.remove(activeClass));
   }
   navLinks.forEach(link => {
      link.addEventListener('click', e => {
         clearClassList(navLinks, 'active');
         if(e.target.classList.contains('menu__link-recipes')){
               littleMenu.classList.toggle('active')
               link.classList.toggle('active');
         }else{
               littleMenu.classList.remove('active')
               link.classList.add('active')
         }
      })
   })

   // clear activeClass of all elems 
   document.addEventListener('click', e => {
      if(!e.target.classList.contains('menu__link-recipes')){
         littleMenu.classList.remove('active');
      }
   })

   // slider with native JS 
   const slides = document.querySelectorAll('.hero__slider-images img');
   const parentDots = document.querySelector('.hero__slider-btns');

   let activeSlide = 1;

   // create dots 

   for(let i = 0; i < slides.length; i++){
      const dot = document.createElement('li');
      parentDots.appendChild(dot);
   }

   const allDots = document.querySelectorAll('.hero__slider-btns li');
   allDots[activeSlide - 1].classList.add('active');


   function activateSlide(n){
      clearClassList(slides, 'slider-images_active');
      slides[n].classList.add('slider-images_active');
   }

   allDots.forEach((btn, i) => {
      btn.addEventListener('click', (e) => {
         clearClassList(allDots, 'active');
         activateSlide(i);
         e.target.classList.add('active');
      })
   })


});