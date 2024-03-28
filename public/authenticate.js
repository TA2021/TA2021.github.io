
const u = JSON.parse(localStorage.getItem('user'))

if (u) window.location.href = "/"


const urlParams = new URLSearchParams(window.location.search)
const mode = urlParams.get('mode')


function renderInputs(){
    if (mode === 'login') {
        document.getElementById("c-pass-container").style.display="none"
        document.getElementById("c-username-container").style.display="none"
    }

   

    document.getElementById("btn").innerText = `${mode.charAt(0).toUpperCase()}${mode.slice(1)}`

}


async function handleClick(){
    const inputs = document.querySelectorAll('.input-group input') 
    if (mode === 'register') {

            if (!inputs[0].value.includes('@')) {
                alert('Email is not valid!')
                return
            }

            if(inputs[1].value !== inputs[2].value) {
                alert('Password and Confirm Password do not match!')
                return
            }

            if (inputs[1].value?.length < 8 ) {
                alert('Password must be at least 8 characters long')
                return
            }

            const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: inputs[1].value,
                    username: inputs[3].value,
                    email: inputs[0].value,
                }) 
              };
    
            const url = `http://localhost:7000/register`
    
            const response = await fetch(url, options);
            if (!response.ok) {
                alert('Could not register user')
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            alert("Registered successfully, check email to confirm account")
    }

    if (mode === 'login') {
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: inputs[1].value,
                email: inputs[0].value,
            }) 
          };

        const url = `http://localhost:7000/login`

        const response = await fetch(url, options);
        if (!response.ok) {
            alert('Could not login user')
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const {user, products} = await response.json()

        localStorage.setItem("user", JSON.stringify(user))
        let shoppingCardItems = JSON.parse(localStorage.getItem('shoppingCardItems')) || []
        shoppingCardItems = shoppingCardItems.concat(products)

        localStorage.setItem('shoppingCardItems', JSON.stringify(shoppingCardItems))

        window.location.href = "/"
    }
}

renderInputs();