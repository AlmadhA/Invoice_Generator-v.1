/* =========================================
   Invoice Studio by Madha
   Invoice Engine
========================================= */


const InvoiceApp = {


    items: [],



    // ===============================
    // FORMAT RUPIAH
    // ===============================


    formatRupiah(value){


        return new Intl.NumberFormat(
            "id-ID",
            {
                style:"currency",
                currency:"IDR",
                maximumFractionDigits:0
            }

        ).format(value || 0);


    },





    // ===============================
    // ADD ITEM
    // ===============================


    addItem(){


        this.items.push({

            name:"",

            qty:1,

            price:0

        });



        this.renderItems();

        this.renderPreview();


    },






    // ===============================
    // REMOVE ITEM
    // ===============================


    removeItem(index){


        this.items.splice(

            index,

            1

        );


        this.renderItems();

        this.renderPreview();


    },






    // ===============================
    // RENDER TABLE ITEM
    // ===============================


    renderItems(){


        const tbody =
        document.querySelector(
            "#itemTable tbody"
        );



        if(!tbody)
            return;



        tbody.innerHTML="";



        this.items.forEach(
            (item,index)=>{


            const tr =
            document.createElement(
                "tr"
            );



            tr.innerHTML=`

            <td>

            <input
            class="item-name"
            data-index="${index}"
            value="${item.name}"
            placeholder="Nama item">


            </td>



            <td>

            <input
            type="number"
            min="1"
            class="item-qty"
            data-index="${index}"
            value="${item.qty}">


            </td>



            <td>

            <input
            type="number"
            class="item-price"
            data-index="${index}"
            value="${item.price}">


            </td>



            <td>


            <button
            class="delete-item"
            data-index="${index}">
            ×
            </button>


            </td>


            `;



            tbody.appendChild(tr);


        });


    },







    // ===============================
    // GET DATA
    // ===============================


    getData(){


        const business =

        StorageApp.getBusiness(

            document
            .getElementById(
                "businessSelect"
            )
            .value

        );



        return {


            business,


            invoiceNumber:

            document
            .getElementById(
                "invoiceNumber"
            )
            .value,



            date:

            document
            .getElementById(
                "invoiceDate"
            )
            .value,



            status:

            document
            .getElementById(
                "invoiceStatus"
            )
            .value,



            customerName:

            document
            .getElementById(
                "customerName"
            )
            .value,



            customerAddress:

            document
            .getElementById(
                "customerAddress"
            )
            .value,



            payment:

            document
            .getElementById(
                "paymentInfo"
            )
            .value,



            notes:

            document
            .getElementById(
                "notes"
            )
            .value,



            items:this.items


        };


    },







    // ===============================
    // CALCULATION
    // ===============================


    calculate(){


        let total=0;



        this.items.forEach(item=>{


            total +=

            Number(item.qty)

            *

            Number(item.price);



        });



        return total;


    },







    // ===============================
    // LIVE PREVIEW
    // ===============================


    renderPreview(){



        const preview =

        document.getElementById(
            "invoicePreview"
        );



        if(!preview)
            return;



        const data =
        this.getData();



        const total =
        this.calculate();




        preview.innerHTML=`


        <div class="invoice-header">


            <img

            src="${data.business.logo}"

            class="invoice-logo"

            onerror="this.src='assets/logo/default-logo.png'">


            <div>

            <h2>
            ${data.business.name}
            </h2>


            <p>
            ${data.business.address}
            </p>


            </div>


        </div>





        <hr>



        <div class="invoice-meta">


            <div>

            <strong>
            Customer
            </strong>


            <br>

            ${data.customerName || "-"}


            <br>


            ${data.customerAddress || ""}


            </div>






            <div>

            <strong>
            Invoice
            </strong>


            <br>


            ${data.invoiceNumber || "-"}


            <br>


            ${data.date || "-"}


            <br>


            ${data.status}


            </div>



        </div>







        <table class="invoice-table">


        <thead>

        <tr>

        <th>
        Item
        </th>


        <th>
        Qty
        </th>


        <th>
        Total
        </th>


        </tr>


        </thead>



        <tbody>


        ${
            data.items.map(item=>`


            <tr>


            <td>
            ${item.name || "-"}
            </td>


            <td>
            ${item.qty}
            </td>


            <td>
            ${
                this.formatRupiah(
                    item.qty *
                    item.price
                )
            }
            </td>


            </tr>


            `).join("")
        }


        </tbody>


        </table>





        <div class="invoice-total">


        <p>
        Grand Total
        </p>


        <h2>

        ${this.formatRupiah(total)}

        </h2>


        </div>






        <div class="invoice-footer">


        <strong>
        Payment
        </strong>


        <p>
        ${data.payment || "-"}
        </p>





        <strong>
        Notes
        </strong>


        <p>
        ${data.notes || "-"}
        </p>



        </div>



        `;


    },







    // ===============================
    // EXPORT PDF
    // ===============================


    exportPDF(){



        const data =
        this.getData();



        if(!data.invoiceNumber){


            alert(
                "Nomor invoice belum diisi"
            );


            return;


        }





        const element =

        document.getElementById(
            "invoicePreview"
        );





        html2pdf()

        .from(element)

        .set({

            margin:10,


            filename:
            `Invoice-${data.invoiceNumber}.pdf`,



            html2canvas:{

                scale:2

            },



            jsPDF:{

                format:"a4",

                orientation:"portrait"

            }


        })

        .save();





        StorageApp.saveHistory({

            ...data,


            total:
            this.calculate()


        });



    }



};






window.InvoiceApp = InvoiceApp;
