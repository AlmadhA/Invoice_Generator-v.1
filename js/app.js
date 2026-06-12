/* =========================================
   Invoice Studio by Madha
   Application Controller
========================================= */



document.addEventListener(
"DOMContentLoaded",
()=>{



    // =====================================
    // INITIAL DATE
    // =====================================


    const dateInput =
    document.getElementById(
        "invoiceDate"
    );


    if(dateInput){


        dateInput.value =
        new Date()
        .toISOString()
        .split("T")[0];


    }





    // =====================================
    // INITIAL ITEM
    // =====================================


    InvoiceEngine.addItem();







    // =====================================
    // ADD ITEM BUTTON
    // =====================================


    const addButton =
    document.getElementById(
        "addItem"
    );



    addButton.addEventListener(

        "click",

        ()=>{

            InvoiceEngine.addItem();

        }

    );








    // =====================================
    // EXPORT PDF
    // =====================================


    const pdfButton =
    document.getElementById(
        "btnPDF"
    );



    pdfButton.addEventListener(

        "click",

        ()=>{


            InvoiceEngine.exportPDF();


        }

    );








    // =====================================
    // AUTO UPDATE PREVIEW
    // =====================================


    const inputs =
    document.querySelectorAll(

        "input, textarea, select"

    );



    inputs.forEach(

        input=>{


            input.addEventListener(

                "input",

                ()=>{


                    InvoiceEngine
                    .renderInvoice();



                }


            );



            input.addEventListener(

                "change",

                ()=>{


                    InvoiceEngine
                    .renderInvoice();



                }


            );


        }

    );









    // =====================================
    // INITIAL RENDER
    // =====================================


    InvoiceEngine.renderInvoice();




});