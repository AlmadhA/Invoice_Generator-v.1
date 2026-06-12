/* =========================================
   Invoice Studio by Madha
   Storage Management
========================================= */


// =========================================
// BUSINESS DATABASE
// =========================================


const BUSINESS_DATA = {


    kidung:{


        id:"kidung",

        name:
        "Kidung Sore Wedding Organizer",


        shortName:
        "Kidung Sore",


        logo:
        "assets/logo/kidung-sore.png",


        theme:
        "elegant",


        address:
        "Wedding Organizer & Event Service",


        phone:
        "",


        email:
        "",


        payment:
        "Transfer Bank\nBCA / Mandiri / BNI"



    },





    ndata:{


        id:"ndata",


        name:
        "#NgeDataBarengMadha",


        shortName:
        "NData Madha",


        logo:
        "assets/logo/ndata-madha.png",


        theme:
        "modern",


        address:
        "Excel Training & Data Solution",


        phone:
        "",


        email:
        "",


        payment:
        "Payment via Transfer"



    }





};





// =========================================
// GET BUSINESS
// =========================================


function getBusiness(id){


    return BUSINESS_DATA[id]
    ||
    BUSINESS_DATA.kidung;


}






// =========================================
// LOCAL STORAGE KEY
// =========================================


const STORAGE_KEY = {


    HISTORY:
    "invoice_history_madha",


    SETTINGS:
    "invoice_settings_madha"


};






// =========================================
// SAVE DATA
// =========================================


function saveStorage(key,data){


    localStorage.setItem(

        key,

        JSON.stringify(data)

    );


}





// =========================================
// GET DATA
// =========================================


function getStorage(key){


    const data =
    localStorage.getItem(key);



    if(!data)
        return null;



    return JSON.parse(data);


}







// =========================================
// INVOICE HISTORY
// =========================================



function saveInvoiceHistory(invoice){



    let history =
    getStorage(
        STORAGE_KEY.HISTORY
    )
    ||
    [];



    history.unshift({

        id:
        Date.now(),


        date:
        new Date()
        .toISOString(),


        invoiceNumber:
        invoice.invoiceNumber,


        customer:
        invoice.customerName,


        total:
        invoice.total,


        data:
        invoice


    });



    saveStorage(

        STORAGE_KEY.HISTORY,

        history

    );


}







function getInvoiceHistory(){


    return (

        getStorage(
            STORAGE_KEY.HISTORY
        )

        ||

        []

    );


}





function clearInvoiceHistory(){


    localStorage.removeItem(

        STORAGE_KEY.HISTORY

    );


}







// =========================================
// SETTINGS
// =========================================


function saveSettings(settings){


    saveStorage(

        STORAGE_KEY.SETTINGS,

        settings

    );


}





function getSettings(){


    return (

        getStorage(

            STORAGE_KEY.SETTINGS

        )

        ||

        {}

    );


}






// =========================================
// EXPORT
// =========================================


window.StorageManager = {


    getBusiness,

    BUSINESS_DATA,


    saveInvoiceHistory,

    getInvoiceHistory,

    clearInvoiceHistory,


    saveSettings,

    getSettings


};