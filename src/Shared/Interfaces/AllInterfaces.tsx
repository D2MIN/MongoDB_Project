export interface StorageCreateInfo{
    name? : string;
    about? : string;
    adress? : string;
    img? : string;
}

export interface StorageInfoI{
    id : number,
    img : String,
    name : string,
    adress : string,
    aboutInfo : string,
    countCar : number,
}

export interface reactRouteErrorPageI{
    data : string,
    error : {
        message : string,
        stack : string,
    }
    internal : boolean,
    status : number,
    statusText : string,
}