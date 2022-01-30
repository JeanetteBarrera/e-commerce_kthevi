const div = document.querySelector("#variants_product")
const fragment = document.createDocumentFragment();
const template = document.querySelector("#template_variant").content;
const agregar = document.querySelector("#agregar");

agregar.addEventListener("click", e => {
    e.preventDefault();
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
    div.appendChild(fragment);
    lectura()

})

let lectura = () => {
    let aEliminar = [...document.querySelectorAll(".fa-minus-circle")];
    console.log(aEliminar)

    for (let i = 0; i < aEliminar.length; i++) {
        aEliminar[i].addEventListener('click', ()=> {
            aEliminar[i].parentNode.remove();
        })
    }   
}
