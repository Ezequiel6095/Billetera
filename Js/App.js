const ingresos = [
    new Ingreso ('Salario',500000),
    new Ingreso('Venta de Auto',500)
];

const egresos = [
    new Egreso('Renta',10000),
    new Egreso('Ropa',2000)
];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngreso = () => {
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor
    }
    return totalIngreso;
}

let totalEgresos = () =>{
    let totalEgresos = 0;
    for(let egreso of egresos){
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}
let cargarCabecero = () => {
    let presupuesto = totalIngreso() - totalEgresos();
    let procentajeEgreso = totalEgresos()/totalIngreso();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngreso())
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos())
    document.getElementById('porcentaje').innerHTML = formatoProcentaje(procentajeEgreso)
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-PY',{style: 'currency', currency: 'PYG', minimumFractionDigits:0});
}

const formatoProcentaje = (valor) => {
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits:1});
}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso)
    }
    document.getElementById('lista-ingresos').innerHTML =ingresosHTML;
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <dic class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"
                 onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </dic>
</div>
    `;
    return ingresoHTML
}

const eliminarIngreso = (id) => {
    let indiceEliminar= ingresos.findIndex( ingreso => ingreso.id === id); /*Sirve para recorrer el arreglo de la misma forma que se venia haciendo con el for, la funcion findIndex
    dentro de esta se declara una funcion flecha donde comparamos del arrelgo ingreso.id el id obtenido del elemento de ingreso en este caso  */
    ingresos.splice(indiceEliminar,1); // Eliminamos el indice indicado
    cargarCabecero();
    cargarIngresos();
}

const cargarEgresos = () => {
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresosHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresosHTML = (egreso) =>{
    let egresoHTML= `
    <div class="elemento limpiarEstilos">
                <div class="elemento_descripcion">${egreso.descripcion}</div>
                <div class="derecha limpiarEstilos">
                    <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                    <div class="elemento_porcentaje">${formatoProcentaje(egreso.valor/totalEgresos())}</div>
                    <div class="elemento_eliminar">
                        <button class="elemento_eliminar--btn">
                            <ion-icon name="close-circle-outline"
                            onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                        </button>
                    </div>
                </div>
            </div>`;
    return egresoHTML
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex( egreso => egreso.id ===id); 
    console.log(indiceEliminar)
    egresos.splice(indiceEliminar, 1); 
    cargarCabecero();
    cargarEgresos();

}

let agregarDato = () => {
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if (descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}

