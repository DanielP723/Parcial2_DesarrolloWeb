export class CartView{

    public container: any;
    public prices: any;
    public subTotal = 0.0;
    public totalPrice = 0.0;
    // Btn 'Realizar pedido'
    public btnBuy: any;
    public btnMoreProducts: any;
    public ids: any = [];

    constructor(){
        this.container = this.getElement('contenido');
        this.prices = this.getElement('slider');
        this.btnBuy = this.getElement('btn');
        this.btnMoreProducts = this.getElement('moreProducts');
    }

    public getElement = (selector: string): HTMLElement | null => document.getElementById(selector);

    public showCart(cart: any){
        this.subTotal = 0.0;
        this.totalPrice = 0.0;
        let html = '';
        this.ids = [];
        for (let i = 0; i < cart.length; i++) {
            html += "<div class='producto'> <div class='imagenProducto'>";
            html += "<img src='"+ cart[i].image +"' alt='' height ='120'></div><div class='infoProducto'>";
            html += "<h2 class='titulo'>"+ cart[i].name +"</h2> <p class='talla'>Talla: 60USD</p>";
            html += "<p class='marca'>"+ cart[i].brand +"</p> </div> <div class='cantidad'>";
            html += "<label for='cantidadProducto'>Cantidad</label>";
            html += "<input type='number' id='cantidadProducto' class='cantidadProducto' value='"+ cart[i].amount +"' min='0' max='100'>";
            html += "</div> <div class='precioCarro'> <p class='precioCarro'><b>"+ cart[i].price + "$</b></p>";
            html += "</div> <i id='eliminarProducto"+cart[i].ID+"' class='fa-solid fa-trash quitarProducto'></i> </div>";
            this.subTotal += (parseInt(cart[i].amount) * parseFloat(cart[i].price));
            this.ids.push(cart[i].ID);
        }
        this.totalPrice = this.subTotal + parseFloat((19 * this.subTotal / 100).toFixed(2));
        this.container.innerHTML = html;
    }

    public showSlider(){
        let html = '';
        html += "<header>";
        html += "    <h3 class='tituloLateral'>Resumen de tu pedido:</h3>";
        html += "</header>";
        html += "<div class='contenidoAside'>";
        html += "    <div class='subtotal'>";
        html += "        <p>SUBTOTAL</p>";
        html += "        <p class='subtotalPrecio'>"+this.subTotal.toFixed(2)+"$</p>";
        html += "    </div>";
        html += "    <div class='total'>";
        html += "        <p><b>TOTAL:</b></p>";
        html += "        <p class='totalPrecio'><b>"+this.totalPrice.toFixed(2)+"$</b></p>";
        html += "    </div>";
        html += "    <p class='iva'>(IVA incluido)</p>";
        
        html+=  "     <input type='button' class='btnCarro' id='btn' value='Realizar pedido'>";
        html+=  "     <a href='#' class= 'pregunta' id='moreProducts' >¿Quieres más productos?</a>";
        html+=  " </div>";
        this.prices.innerHTML = html;
        this.btnBuy = this.getElement('btn');
        this.btnMoreProducts = this.getElement('moreProducts');
    }
}