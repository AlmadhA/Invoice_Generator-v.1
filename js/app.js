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


    if(
        InvoiceApp.items.length === 0
    ){

        InvoiceApp.addItem();

    }







    // =====================================
    // ADD ITEM BUTTON
    // =====================================


    const addButton =
    document.getElementById(
        "addItem"
    );



    if(addButton){


        addButton.addEventListener(

            "click",

            ()=>{


                InvoiceApp.addItem();


            }

        );


    }









    // =====================================
    // PDF BUTTON
    // =====================================


    const pdfButton =
    document.getElementById(
        "btnPDF"
    );



    if(pdfButton){


        pdfButton.addEventListener(

            "click",

            ()=>{


                InvoiceApp.exportPDF();


            }


        );


    }








    // =====================================
    // MENU NAVIGATION
    // =====================================


    const menus =

    document.querySelectorAll(
        ".menu"
    );



    const pages =

    document.querySelectorAll(
        ".page"
    );




    menus.forEach(menu=>{



        menu.addEventListener(

        "click",

        ()=>{



            const target =

            menu.dataset.page;




            menus.forEach(item=>{


                item.classList.remove(
                    "active"
                );


            });




            menu.classList.add(
                "active"
            );






            pages.forEach(page=>{


                page.classList.remove(
                    "active-page"
                );


            });





            const selected =

            document.getElementById(
                target
            );



            if(selected){


                selected.classList.add(
                    "active-page"
                );


            }





            if(target==="historyPage"){


                renderHistory();


            }




            if(target==="businessPage"){


                renderBusiness();


            }



        });


    });









    // =====================================
    // FORM UPDATE
    // =====================================



    const inputs =

    document.querySelectorAll(

        "input, textarea, select"

    );





    inputs.forEach(input=>{


        input.addEventListener(

            "input",

            ()=>{


                InvoiceApp.renderPreview();


            }


        );




        input.addEventListener(

            "change",

            ()=>{


                InvoiceApp.renderPreview();


            }


        );



    });









    // =====================================
    // ITEM INPUT HANDLER
    // =====================================



    document.addEventListener(

    "input",

    e=>{



        if(
            e.target.classList.contains(
                "item-name"
            )
        ){


            InvoiceApp.items[

                e.target.dataset.index

            ]

            .name =

            e.target.value;



        }







        if(
            e.target.classList.contains(
                "item-qty"
            )
        ){


            InvoiceApp.items[

                e.target.dataset.index

            ]

            .qty =

            Number(
                e.target.value
            );


        }






        if(
            e.target.classList.contains(
                "item-price"
            )
        ){


            InvoiceApp.items[

                e.target.dataset.index

            ]

            .price =

            Number(
                e.target.value
            );


        }





        InvoiceApp.renderPreview();



    });








    // =====================================
    // DELETE ITEM
    // =====================================


    document.addEventListener(

    "click",

    e=>{


        if(

        e.target.classList.contains(
            "delete-item"
        )

        ){


            InvoiceApp.removeItem(

                e.target.dataset.index

            );


        }



    });








    // =====================================
    // FIRST LOAD
    // =====================================


    renderBusiness();


    InvoiceApp.renderPreview();




});









// =========================================
// BUSINESS PAGE
// =========================================


function renderBusiness(){



    const container =

    document.getElementById(
        "businessList"
    );



    if(!container)
        return;




    const businesses =

    StorageApp.getAllBusiness();




    container.innerHTML="";





    Object.values(
        businesses
    )

    .forEach(item=>{



        container.innerHTML += `


        <div class="history-item">


        <img

        src="${item.logo}"

        style="
        width:60px;
        height:60px;
        object-fit:contain;
        margin-bottom:10px;
        ">


        <h3>

        ${item.name}

        </h3>


        <p>

        ${item.address}

        </p>


        </div>



        `;



    });



}









// =========================================
// HISTORY PAGE
// =========================================


function renderHistory(){



    const container =

    document.getElementById(
        "historyList"
    );



    if(!container)
        return;





    const history =

    StorageApp.getHistory();





    if(history.length===0){


        container.innerHTML = `


        <div class="empty-state">

        Belum ada invoice history

        </div>


        `;


        return;


    }






    container.innerHTML="";





    history.forEach(item=>{



        container.innerHTML += `


        <div class="history-item">


        <h3>

        ${item.invoiceNumber}

        </h3>


        <p>

        Customer:
        ${item.customer || "-"}

        </p>



        <p>

        Total:
        ${InvoiceApp.formatRupiah(
            item.total
        )}

        </p>



        <small>

        ${item.created}

        </small>


        </div>


        `;



    });



}
