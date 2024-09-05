//function to get elements

elem = (x) => {
  return document.querySelector(x);
};

//Menu function
var menu_btn = elem(".menu_btn");
var menu = elem("#menu");
var styleElem = document.head.appendChild(document.createElement("style"));

const openMenu = () => {
  menu_btn.innerHTML = `<p onclick="closeMenu()"><i class="fa fa-times"></i></p>`;
  styleElem.innerHTML = `
		@media (max-width: 800px){
				.menu_box{
					display: block;
					background-color: var(--Dark-Violet);
					margin-top: 2rem;
					padding: 2rem;
					border-radius: 10px;
					position: absolute;
					top: 10%;
					left: 8%;
					width: 85%;
					text-align: center;
					z-index: 20000;
				}
		}
		@media (max-width: 375px){
			.menu_box{
				display: block;
				background-color: var(--Dark-Violet);
				margin-top: 2rem;
				padding: 2rem;
				border-radius: 10px;
				position: absolute;
				top: 10%;
				left: 8%;
				width: 85%;
				text-align: center;
				z-index: 20000;
			}
		}
		

			`;
};

const closeMenu = () => {
  menu_btn.innerHTML = `<p onclick="openMenu()"><i class="fa fa-bars"></i></p>`;
  styleElem.innerHTML = `
		@media (max-width: 800px){
			.menu_box{
				display: none;
				background-color: var(--Dark-Violet);
				margin-top: 2rem;
				padding: 2rem;
				border-radius: 10px;
				position: absolute;
				top: 10%;
				left: 8%;
				width: 85%;
				text-align: center;
				z-index: 20000;
			}
					
		}
		@media (max-width: 375px){
			.menu_box{
				display: none;
				background-color: var(--Dark-Violet);
				margin-top: 2rem;
				padding: 2rem;
				border-radius: 10px;
				position: absolute;
				top: 10%;
				left: 8%;
				width: 85%;
				text-align: center;
				z-index: 20000;
			}
			
		}
	
			`;
};

//Shortening function

var result_part = elem("#result_part");
var count = 0; //To give each copy button a value so that it can be clickable itself;
var results = {};

shortenUrl = () => {
  let url_input = elem("#url");

  if (url_input.value != "") {
    styleElem.innerHTML = `
				input{
					border: none;
				}
				input::placeholder{
					color: var(--Grayish-Violet);
				}
				.error_text{
					display: none;
					color: var(--Red);
					position: absolute;
					top: 73%;
					left: 4%;
				}
				@media (max-width: 800px){
					.error_text{
						display: none;
						color: var(--Red);
						position: absolute;
						top: 60%;
						left: 4%;
					}
				}
				@media (max-width: 375px){
					.error_text{
						display: none;
						color: var(--Red);
						position: absolute;
						top: 60%;
						left: 4%;
					}
				}

				`;

    //Fetching the api results
    const apiToken =
      "OQZuhZlIQf0HJRMZNFlsCcFLemMgNnls8WcZvcXANbf3DaIyOeYwXXZ4JvGn";

    fetch(`https://api.tinyurl.com/create?api_token=${apiToken}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url_input.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.code === 0) {
          result_part.innerHTML += `

        		<div class="results">
        			<div>
        				<p style="width: 200px;text-overflow: ellipsis;overflow: hidden;">${url_input.value}</p>
        			</div>

        			<div>
        				<p class="shortened_url">${data.data.tiny_url}</p>
        				<button class="btn copy_btn" onclick="copy(${count++})">Copy</button>
        			</div>
        		</div>

        	`;
        } else {
          if (data.code == 5) {
            result_part.innerHTML += `

        				<div class="results" style="background-color: var(--Red)">
        					<p style="color: black; text-align: center;">Invalid URL, Please try again!</p>
        				</div>
        			`;
          }
        }
      });
  } else {
    styleElem.innerHTML = `
				input{
					border: 2px solid var(--Red);
				}
				input::placeholder{
					color: var(--Red);
				}
				.error_text{
					display: block;
					color: var(--Red);
					position: absolute;
					top: 73%;
					left: 4%;
				}
				@media (max-width: 800px){
					.error_text{
						display: block;
						color: var(--Red);
						position: absolute;
						top: 45%;
						left: 3%;
					}
				}
				@media (max-width: 375px){
					.error_text{
						display: block;
						color: var(--Red);
						position: absolute;
						top: 40%;
						left: 6%;
					}
				}
				`;
  }
};

//Copy function to each button clicked
const copy = (i) => {
  let copy_btn = document.querySelectorAll(".copy_btn");
  let shortened_url = document.querySelectorAll(".shortened_url");

  navigator.clipboard.writeText(shortened_url[i].textContent);

  copy_btn[i].innerText = "Copied!";
  copy_btn[i].style.background = "var(--Dark-Violet)";
};
