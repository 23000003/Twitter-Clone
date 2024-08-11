import axios from "axios";


export async function AppleAPI(){

    try{
        const data = await axios.get(`https://newsapi.org/v2/everything?q=apple&from=2024-08-10&to=2024-08-10&sortBy=popularity&apiKey=${import.meta.env.VITE_APPLE_API_KEY}`);
        return data;
    }catch(err){
        throw new Error(err);
    }
    
}

export async function TeslaAPI(){
    
    try{

        const data = await axios.get(`https://newsapi.org/v2/everything?q=tesla&from=2024-07-11&sortBy=publishedAt&apiKey=${import.meta.env.VITE_APPLE_API_KEY}`)
        return data;
    }catch(err){
        throw new Error(err);
    }
}


export async function USCountryAPI(){

    try{

        const data = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${import.meta.env.VITE_APPLE_API_KEY}`)
        return data;
    }catch(err){
        throw new Error(err);
    }

}


export async function WallStreenAPI(){

    try{
        const data = await axios.get(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${import.meta.env.VITE_APPLE_API_KEY}`);
        return data;
    }catch(err){
        throw new Error(err);
    }
}