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


