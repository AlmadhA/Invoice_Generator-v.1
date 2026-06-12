/* =========================================
   Invoice Studio by Madha
   Storage System
========================================= */


/*
    Business Database

    Logo sengaja menggunakan path:
    assets/logo/

    Jadi Anda tinggal mengganti file logo
    tanpa mengubah kode.
*/


const BUSINESS_DATA = {


    kidung:{

        id:"kidung",

        name:
        "Kidung Sore Wedding Organizer",

        logo:
        "assets/logo/kidung-sore.png",

        address:
        "Wedding Organizer & Event Service",

        phone:
        "",

        email:
        "",

        payment:
        "Transfer Bank\nBCA / Mandiri / BNI",

        theme:
        "gold"


    },



    ndata:{


        id:"ndata",

        name:
        "#NgeDataBarengMadha",

        logo:
        "assets/logo/ndata-madha.png",

        address:
        "Excel Training & Data Solution",

        phone:
        "",

        email:
        "",

        payment:
        "Payment via Transfer",

        theme:
        "blue"


    }


};






// =========================================
// STORAGE KEY
// =========================================


const STORAGE = {


    HISTORY:
    "invoice_history",


    SETTINGS:
    "invoice_settings"


};







// =========================================
// BUSINESS
// =========================================


function getBusiness(id){


    return (

        BUSINESS_DATA[id]

        ||

        BUSINESS_DATA.kidung

    );


}







function getAllBusiness(){


    return BUSINESS_DATA;


}








// =========================================
// LOCAL STORAGE
// =========================================


function saveData(key,value){


    localStorage.setItem(

        key,

        JSON.stringify(value)

    );


}





function getData(key){


    const data =
    localStorage.getItem(key);



    if(!data){

        return null;

    }


    return JSON.parse(data);


}






// =========================================
// HISTORY
// =========================================


function saveHistory(invoice){



    let history =

    getData(
        STORAGE.HISTORY
    )

    ||

    [];




    history.unshift({


        id:
        Date.now(),


        invoiceNumber:
        invoice.invoiceNumber,


        customer:
        invoice.customerName,


        total:
        invoice.total,


        created:
        new Date()
        .toLocaleString(
            "id-ID"
        ),


        data:
        invoice


    });




    saveData(

        STORAGE.HISTORY,

        history

    );


}







function getHistory(){


    return (

        getData(
            STORAGE.HISTORY
        )

        ||

        []

    );


}







function clearHistory(){


    localStorage.removeItem(

        STORAGE.HISTORY

    );


}






// =========================================
// SETTINGS
// =========================================


function saveSettings(data){


    saveData(

        STORAGE.SETTINGS,

        data

    );


}



function getSettings(){


    return (

        getData(
            STORAGE.SETTINGS
        )

        ||

        {}

    );


}






// =========================================
// GLOBAL ACCESS
// =========================================


window.StorageApp = {


    BUSINESS_DATA,

    getBusiness,

    getAllBusiness,


    saveHistory,

    getHistory,

    clearHistory,


    saveSettings,

    getSettings


};
