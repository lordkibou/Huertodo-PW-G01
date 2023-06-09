const open = document.getElementById('close-icon');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');
const confirm = document.getElementById('confirm');

const closeAllAcordeonItems = () => {
    const acordeonItems = document.querySelectorAll(".acordeon-item");
    acordeonItems.forEach(clickacordeonItem => {
        const acordeonItemHeader = acordeonItem.querySelector(".acordeon-item-header");
        const acordeonItemBody = acordeonItemHeader.nextElementSibling;
        acordeonItemHeader.classList.remove("active");
        acordeonItemBody.style.maxHeight = 0;
    });
};

const acordeonItemHeaders = document.querySelectorAll(".acordeon-item-header");

acordeonItemHeaders.forEach(acordeonItemHeader => {
    const closeIcon = acordeonItemHeader.querySelector(".close-icon");
    closeIcon.addEventListener("click", () => {
        const acordeonItem = acordeonItemHeader.parentNode;
        confirm.addEventListener('click', () => {
            console.log("clicado confirm");
            acordeonItem.remove();
            modal_container.classList.remove('show');
        });
    });

    acordeonItemHeader.addEventListener("click", event => {
        const currentlyActiveAcordeonItemHeader = document.querySelector(".acordeon-item-header.active");
        if(currentlyActiveAcordeonItemHeader && currentlyActiveAcordeonItemHeader!==acordeonItemHeader) {
            currentlyActiveAcordeonItemHeader.classList.toggle("active");
            currentlyActiveAcordeonItemHeader.nextElementSibling.style.maxHeight = 0;
        }

        acordeonItemHeader.classList.toggle("active");
        const acordeonItemBody = acordeonItemHeader.nextElementSibling;
        if(acordeonItemHeader.classList.contains("active")) {
            acordeonItemBody.style.maxHeight = acordeonItemBody.scrollHeight + "px";
        }
        else {
            acordeonItemBody.style.maxHeight = 0;
        }
    });

});
open.addEventListener('click', () => {
    modal_container.classList.add('show');
});

close.addEventListener('click', () => {
    modal_container.classList.remove('show');
});



// Agregar evento click para cerrar todos los desplegables
const closeAllAcordeonItemsButton = document.querySelector("#close-all-acordeon-items");
closeAllAcordeonItemsButton.addEventListener("click", closeAllAcordeonItems);
