document.addEventListener('DOMContentLoaded', () => {
    // Navbar
    const hamburger = document.getElementById("hamburger");
    const nav = document.querySelector(".mobile-nav");
    const menu = document.querySelector(".mobile-menu");
    const close = document.getElementById("close");

    hamburger.addEventListener('click', () => {
        nav.style.display = 'none';
        menu.style.display = 'block';
    });

    close.addEventListener('click', () => {
        menu.style.display = 'none';
        nav.style.display = 'flex';
    });


    // ring rotation
    const images = document.querySelectorAll(".rings img");
    let position = [
        { class: 'left', top: '50%', left: '2%', transform: 'translate(-30%, -50%)' },  // left
        { class: 'top', top: '20%', left: '50%', transform: 'translate(-50%, -50%) scale(1.3)' },  // top
        { class: 'right', top: '50%', left: '98%', transform: 'translate(-73%, -50%)' }, // right
    ];

    function assignValue() {
        let name = document.querySelector('.ring-name');
        let iname = document.getElementById('iname');
        let iprice = document.getElementById('iprice');
        let item = document.querySelector('.top');
        iname.style.transition = iprice.style.transition = name.style.transition = "opacity 0.5s ease";
        iname.style.opacity = iprice.style.opacity = name.style.opacity ="0";
        setTimeout(() => {
            iname.textContent = item.getAttribute("name");
            iprice.textContent = item.getAttribute("price");
            name.textContent = item.getAttribute("name");
            iname.style.transition = iprice.style.transition = name.style.transition = "opacity 0.3s ease";
            iname.style.opacity = iprice.style.opacity = name.style.opacity ="1";
        },300);
    }

    function rotate(direction) {
        console.log(direction);
        let newPositions = position.slice();
        if (direction === 'right') {
            newPositions.unshift(newPositions.pop()); // rotate anti-clock
        } else if (direction === 'left') {
            newPositions.push(newPositions.shift()); // rotate clock
        } else return;

        images.forEach((img, i) => {
            img.style.top = newPositions[i].top;
            img.style.left = newPositions[i].left;
            img.style.transform = newPositions[i].transform;
            img.setAttribute('class', newPositions[i].class);
        });
        assignValue();
        // Update positions array for next rotation
        position.splice(0, position.length, ...newPositions);
    }

    // getPositions();
    document.querySelector(".rings").addEventListener('click', (e) => {
        console.log(e.target);
        rotate(e.target.closest('img').className);
    })



    // card carousel
    let items = [];
    function getitems() {
        const cards = document.querySelectorAll(".carousel label");
        const size = cards.length;
        let j = parseInt(size / 2);
        for (let i = 0; i < size; i++) {
            items[i] = cards[j++].className;
            j %= size;
        }
    }

    function OnCard(e) {
        console.log("clicked on :" + e);
        const cards = document.querySelectorAll(".carousel label");
        const size = cards.length;
        let j = parseInt(size / 2);
        let idx = parseInt(e[4]) - 1;
        console.log(items + "--" + idx);
        for (let i = 0; i < size; i++) {
            cards[idx++].className = items[i];
            idx %= size;
        }
        j = parseInt(size / 2);
        for (let i = 0; i < size; i++) {
            items[i] = cards[j++].className;
            j %= size;
        }
    }

    getitems();
    document.querySelector(".carousel").addEventListener('click', (e) => {
        OnCard(e.target.closest('label').className);
    })
    // for radios
    document.querySelector('.dots').addEventListener('change', (e) => {
        const label = document.querySelector(`label[for="${e.target.id}"]`);
        if (label) OnCard(label.className);
    });
});



