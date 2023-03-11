const axios = require('axios');
const https = require('https');
const datos = require('./cambioEstrat2023');

//Login
const ObtenerTokenLogin = async() =>{
    let url = 'https://'

    let config = {
        headers:{
            'Authorization': `Bearer`
        },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }),
        
    }
    let data = {
        tipoIdentificacion:"",
        Identificacion:"",
        Password:""
    }
    try {
        axios.post(url,data,config)
        .then(response =>{
            console.log(response.data)
            let Token_new = response.data.token;
            cambioEstrategia(Token_new);
        }) 
    } 
    catch (error) {
        console.log(error)
    }
}

ObtenerTokenLogin();


//Cambio de estrategia
const cambioEstrategia = async(Token_new) =>{

    //URL al cual se le va a pegar el metodo post
    let url = ''

    //Datos a enviar
    let data = datos;
    //console.log(data)
    //TOKEN
    let config = {
        headers:{
            'Authorization': `Bearer ${Token_new}`
        },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }),
        
    }
    try {
        data.map(async(e)=>{
           await axios.post(url,e, config)
               .then(response =>{
                   console.log(response.data)
                   let id_solicitud_cambio=response.data.idSolicitudCambio;
                   consultarSolicitud(Token_new, id_solicitud_cambio);
        
                })           
                console.log(data)
        })

        
        // let a = data.map((e)=>{
        //     setTimeout(async()=>{
        //         await axios.post(url,e, config)
        //             .then(response =>{
        //             console.log(response.data)
        //             let id_solicitud_cambio=response.data.idSolicitudCambio;
        //             consultarSolicitud(Token_new, id_solicitud_cambio);
        //         }) 
        //     },3000)
     
        // })
        
    } 
    catch (error) {
        console.log(error)
    }
}


// Consultar Solicitud

const consultarSolicitud = (Token_new,idSolicitudCambio) =>{
    let url = ''+idSolicitudCambio;

    let data = datos;

    //TOKEN
    let config = {
        headers:{
            'Authorization': `Bearer ${Token_new}`
        },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }),
        
    }
    try {
        axios.get(url, config,data)
        .then(response =>{
            console.log(response.data.message)

        }) 
    } 
    catch (error) {
        console.log(error)
    }
}

