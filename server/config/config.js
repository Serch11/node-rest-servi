//============================================
//puerto
//==========================
process.env.PORT = process.env.PORT || 3000;



//mongodb+srv://serch:<Serch9511>@cluster0.sygnq.mongodb.net/test



//==========================
// Entorno 
//==========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


let urlDB;




if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGODB_URI;
}

process.env.URLDB = urlDB;