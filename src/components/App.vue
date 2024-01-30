<template>
<body>
    <header>
        <a href="https://www.tradeupgroup.com" class="logo" target="_blanck">
            <img src="../assets/TradeUp.svg" alt="Logo">
        </a>
        <nav class="menu">
            <ul>
                <li><a href="#">Contatos</a></li>
                <li><a href="#">Sobre o sistema</a></li>
            </ul>
        </nav>
    </header>
    <div class='container'>
        <div class="modal">
            <div class="cardInner">
                <label>Pesquise seu endereço através do CEP</label>
                <div class="area-response">
                    <div class="areaInput">
                        <div>
                            <input  class="inputContainer" type="text" v-model="cep" @input="applyCepMask" @click="clearData" placeholder="DIGITE O CEP" maxlength="9" minlength="9"/>
                            <span class="error-message" v-if="errorMensage">{{errorMensage}}</span>
                        </div>
                        <searchButton :isDisabled="isButtonDisabled" @click="action">
                            <img src="../assets/icons/lupa.svg" alt="lupa">
                        </searchButton>
                    </div>
                    <div v-if="address" class="data-style">
                        <p class="info">CEP:</p>
                        <p class="return-data">{{ address.cep }}</p>
                        <p class="info">Rua:</p>
                        <p class="return-data">{{ address.logradouro }}</p>
                        <p class="info">Bairro:</p>
                        <p class="return-data">{{ address.bairro }}</p>
                        <p class="info">Cidade:</p>
                        <p class="return-data">{{ address.localidade }}</p>
                        <p class="info">Estado</p>
                        <p class="return-data">{{ address.uf }}</p>
                    </div>
                </div>
            </div>
            <div class="mascot">
                <img src="../assets/mascot.png" alt="teste"/>
            </div>
        </div>
        <footer>
            <div class="logo-trade">
                <img src="../assets/TradeUp.svg">
            </div>
        </footer>
    </div>
</body>
</template>

<script>
    import searchCep from '../service/request';
    import searchButton from './SearchButton.vue';
    
    export default {
          components: {
    'searchButton': searchButton,
  },
      data() {
        return {
          cep: "",
          errorMensage:"",
          address: null,
        };
      },
      computed: {
        isButtonDisabled() {
        return this.cep.length !== 9;
    },
  },
      methods: {
        async action() {
            const response = await searchCep(this.cep, this.invalidPostalCode);
            if(response){
                this.address = response
            }
        },
          clearData() {
            this.cep = '';
        },
        applyCepMask() {
          this.cep = this.cep.replace(/\D/g, '');
          if (this.cep.length > 5) {
            this.cep = this.cep.replace(/^(\d{5})(\d)/, "$1-$2");
          }
        },
       invalidPostalCode() {
            this.errorMensage = "CEP inválido";
            setTimeout(() => {
                this.errorMensage = "";
            }, 3000);
       }
      },
    };
    </script>
 
<style>
    * {
        -webkit-font-smoothing: antialiased;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body,
    html {
        height: 100%;
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #ffffff; 
        padding: 15px;
    }

    .logo img {
        max-width: 100px;
    }

    .menu ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
    }

    .menu li {
        margin-right: 20px;
    }

    .menu a {
        text-decoration: none;
        color: black; 
        font-weight: bold;
    }

    .container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        height: 94vh;
        padding: 10px;
    }

    .modal{
        display: flex;
        padding: 55px;
    }

    .cardInner {
        padding: 16px 16px;
    }

    .area-response{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .areaInput {
        display: flex;
        width: 100%;
    }

    input {
        background-color: #e3edf7;
        padding: 16px 32px;
        border: none;
        display: block;
        font-family: "Orbitron", sans-serif;
        font-weight: 600;
        color: #a9b8c9;
        transition: all 240ms ease-out;
        width: 100%;
    }

    .error-message{
        color:red;
        display: flex;
        padding: 5px; 
        font-family: "Arial", sans-serif;
    }

    .inputContainer {
        width: 100%;
    }
 
    :root {
        --border-radius: 10px;
    }
 
    label {
        font-family: "Arial", sans-serif;
        display: block;
        color: #3c4b66;
        margin-bottom: 12px;
    }

    .data-style{
        width: 90%;
        display: flex;
        gap: 10px;
        flex-direction: column; 
        text-align: center;  
    }

    .info{
        display: flex;
        text-align: center;
        width: 100%;
        justify-content: center;
        font-family: "Orbitron", sans-serif;
    }

    .address-style{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .return-data{
        border-radius: var(--border-radius);
        background-color: #e3edf7;
        padding: 16px 32px;
        border: none;
        display: block;
        font-family: "Orbitron", sans-serif;
        font-weight: 600;
        color: black;
        transition: all 240ms ease-out;
        width: 100%;
    }


    .mascot{
        width: 300px;
    }

    .mascot img{
        width: 100%;
    }

    footer{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .logo-trade{
        width: 100px;
    }

    footer img{
        width: 100%;
    }
 
    input::placeholder {
        color: #6d7f8f;
    }
 
    input:focus {
        outline: none;
        color: #6d7f8f;
        background-color: #eff5fa;
    }
 
    .inputContainer {
        --top-shadow: inset 1px 1px 3px #c5d4e3, inset 2px 2px 6px #c5d4e3;
        --bottom-shadow: inset -2px -2px 4px rgba(223, 14, 14, 0.7);
        position: relative;
        border-radius: var(--border-radius);
        overflow: hidden;
        width: 500px;
    }
 
    .inputContainer:before,
    .inputContainer:after {
        left: 0;
        top: 0;
        display: block;
        content: "";
        pointer-events: none;
        width: 100%;
        height: 100%;
        position: absolute;
    }
 
 .inputContainer:before {
     box-shadow: var(--bottom-shadow);
    }
 
    .inputContainer:after {
        box-shadow: var(--top-shadow);
    }



</style>