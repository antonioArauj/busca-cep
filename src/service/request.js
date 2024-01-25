import axios from "axios";

const searchCep = async (cep, onError) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if(response.data.erro){
            onError()
        }else{
            return response.data;
        }
      } catch (error) {
         return console.log("Error in search CEP",error)
      }
} 

export default searchCep